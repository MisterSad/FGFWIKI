import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, '../src/data/mirandusVideos.json');
const PLAYLIST_ID = 'UUkwuVMbcFtaKk37i2_5CR5A';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`;
const API_KEY = process.env.YOUTUBE_API_KEY || '';

// Best-effort CORS proxies used when the direct feed is blocked (YouTube
// intermittently refuses datacenter IPs, e.g. GitHub Actions runners).
const PROXIES = [
    'https://api.allorigins.win/raw?url={url}',
    'https://api.codetabs.com/v1/proxy?quest={url}',
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function decodeXmlEntities(str) {
    return str
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'");
}

function isRelevant(title) {
    // Filter out non-FGF games (Godforge, Dune, etc.)
    const lower = title.toLowerCase();
    return !lower.includes('godforge') && !lower.includes('dune');
}

async function fetchWithRetries(url, attempts = 3) {
    for (let i = 0; i < attempts; i++) {
        try {
            const response = await fetch(url, {
                headers: { 'user-agent': 'Mozilla/5.0 (FGFWiki video updater)' },
            });
            if (response.ok) {
                return await response.text();
            }
            console.warn(`Attempt ${i + 1}: HTTP ${response.status} from ${url}`);
        } catch (error) {
            console.warn(`Attempt ${i + 1}: ${error.message}`);
        }
        if (i < attempts - 1) await sleep(2000 * (i + 1));
    }
    return null;
}

/**
 * Fetch the playlist via the official YouTube Data API v3.
 * Requires the YOUTUBE_API_KEY environment variable.
 */
async function fetchViaApi() {
    const videos = [];
    let pageToken = '';
    do {
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${API_KEY}${pageToken ? `&pageToken=${pageToken}` : ''}`;
        const text = await fetchWithRetries(url);
        if (!text) return null;
        const data = JSON.parse(text);
        if (data.error) {
            throw new Error(`YouTube API error: ${data.error.message}`);
        }
        for (const item of data.items || []) {
            const id = item?.snippet?.resourceId?.videoId;
            const title = item?.snippet?.title || '';
            const published = item?.snippet?.publishedAt || '';
            if (id && title && isRelevant(title)) {
                videos.push({ id, title, published });
            }
        }
        pageToken = data.nextPageToken || '';
    } while (pageToken);
    return videos;
}

/**
 * Fetch the uploads RSS feed: direct request first, then each proxy in order.
 * Returns the first response body that looks like a valid feed.
 */
async function fetchViaRss() {
    const sources = [
        { label: 'direct YouTube feed', url: RSS_URL },
        ...PROXIES.map((template) => ({ label: template, url: template.replace('{url}', encodeURIComponent(RSS_URL)) })),
    ];
    for (const source of sources) {
        console.log(`Fetching RSS feed via ${source.label}...`);
        const text = await fetchWithRetries(source.url);
        if (text && text.includes('<entry>')) {
            return text;
        }
    }
    return null;
}

function parseRss(xmlText) {
    const matches = [...xmlText.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];
    const videos = [];
    for (const match of matches) {
        const entryContent = match[1];
        const videoIdMatch = entryContent.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
        const titleMatch = entryContent.match(/<title>([^<]+)<\/title>/);
        const publishedMatch = entryContent.match(/<published>([^<]+)<\/published>/);
        if (videoIdMatch && titleMatch && publishedMatch) {
            const id = videoIdMatch[1].trim();
            const title = decodeXmlEntities(titleMatch[1].trim());
            const published = publishedMatch[1].trim();
            if (isRelevant(title)) {
                videos.push({ id, title, published });
            }
        }
    }
    return videos;
}

async function updateVideos() {
    let fetchedVideos = null;
    let source = '';

    if (API_KEY) {
        try {
            fetchedVideos = await fetchViaApi();
            source = 'YouTube Data API v3';
        } catch (error) {
            console.warn('YouTube Data API failed, falling back to RSS:', error.message);
        }
    }

    if (!fetchedVideos) {
        const xmlText = await fetchViaRss();
        if (xmlText) {
            fetchedVideos = parseRss(xmlText);
            source = 'RSS feed';
        }
    }

    if (!fetchedVideos) {
        // Every source was unreachable (transient blocking/outage). Do not fail
        // the workflow: a later run will pick up anything missed.
        console.warn('All video sources unreachable — skipping this update (will retry next run).');
        process.exit(0);
    }

    console.log(`Parsed ${fetchedVideos.length} matching videos from ${source}.`);

    // Read existing static videos
    let existingVideos = [];
    if (fs.existsSync(DATA_FILE)) {
        existingVideos = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }

    // Merge videos by ID (fetched data takes priority for title/published updates)
    const mergedMap = new Map();
    fetchedVideos.forEach((v) => mergedMap.set(v.id, v));
    existingVideos.forEach((v) => {
        if (!mergedMap.has(v.id)) {
            mergedMap.set(v.id, v);
        }
    });

    const mergedList = Array.from(mergedMap.values());

    // Sort by publication date (newest first)
    mergedList.sort((a, b) => new Date(b.published) - new Date(a.published));

    // Write updated list back to file
    fs.writeFileSync(DATA_FILE, JSON.stringify(mergedList, null, 4), 'utf8');
    console.log(`Successfully updated ${DATA_FILE}. Total videos: ${mergedList.length}`);
}

updateVideos();
