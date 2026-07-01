import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, '../src/data/mirandusVideos.json');
const RSS_URL = 'https://www.youtube.com/feeds/videos.xml?playlist_id=UUkwuVMbcFtaKk37i2_5CR5A';

function decodeXmlEntities(str) {
    return str
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'");
}

async function updateVideos() {
    try {
        console.log('Fetching YouTube uploads RSS feed...');
        const response = await fetch(RSS_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const xmlText = await response.text();

        console.log('Parsing XML feed...');
        const matches = [...xmlText.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];
        const fetchedVideos = [];

        for (const match of matches) {
            const entryContent = match[1];
            const videoIdMatch = entryContent.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
            const titleMatch = entryContent.match(/<title>([^<]+)<\/title>/);
            const publishedMatch = entryContent.match(/<published>([^<]+)<\/published>/);

            if (videoIdMatch && titleMatch && publishedMatch) {
                const id = videoIdMatch[1].trim();
                const title = decodeXmlEntities(titleMatch[1].trim());
                const published = publishedMatch[1].trim();

                // Filter out non-FGF games (Godforge, Dune, etc.)
                const lowerTitle = title.toLowerCase();
                if (!lowerTitle.includes('godforge') && !lowerTitle.includes('dune')) {
                    fetchedVideos.push({ id, title, published });
                }
            }
        }

        console.log(`Parsed ${fetchedVideos.length} matching videos from feed.`);

        // Read existing static videos
        let existingVideos = [];
        if (fs.existsSync(DATA_FILE)) {
            existingVideos = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        }

        // Merge videos by ID (feed takes priority for title/published updates)
        const mergedMap = new Map();
        
        // 1. Insert fetched videos
        fetchedVideos.forEach(v => mergedMap.set(v.id, v));
        
        // 2. Insert existing static videos if not already present
        existingVideos.forEach(v => {
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

    } catch (error) {
        console.error('Error updating videos:', error);
        process.exit(1);
    }
}

updateVideos();
