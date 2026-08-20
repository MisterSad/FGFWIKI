import { jsPDF } from 'jspdf';
import { calculateCommunityScore, getDynamicDemandTier, getDynamicTimelineProgress } from './evolutions';
import { translateText } from '../services/translate';

const CATEGORY_NAMES_EN = {
    all: 'All Categories',
    combat: 'PvP & PvE Combat',
    fleet: 'Fleet & Flagships',
    economy: 'Economy & Base Building',
    ui: 'User Interface & UX',
    guild: 'Guild & Alliances',
    events: 'Events & Minigames',
    other: 'General Feature'
};

const STATUS_NAMES_EN = {
    pending: 'PENDING REVIEW',
    approved: 'APPROVED',
    review: 'UNDER REVIEW',
    progress: 'IN DEVELOPMENT',
    done: 'IMPLEMENTED',
    declined: 'DECLINED'
};

const TIER_COLORS = {
    critical: [239, 68, 68], // #ef4444
    high: [245, 158, 11],    // #f59e0b
    moderate: [59, 130, 246], // #3b82f6
    low: [16, 185, 129]      // #10b981
};

/**
 * Summarizes community comments into structured English bullet points.
 * 
 * @param {Array} comments - List of comment objects
 * @returns {Promise<Array<string>>} List of summary bullet points in English
 */
export async function summarizeComments(comments) {
    if (!comments || comments.length === 0) {
        return ['No community feedback posted yet.'];
    }

    const summaries = [];
    const count = comments.length;
    summaries.push(`Total Community Contributions: ${count} comment${count > 1 ? 's' : ''}.`);

    // Extract top constructive points
    const topComments = comments.slice(0, 4);
    for (let i = 0; i < topComments.length; i++) {
        const comm = topComments[i];
        const rawContent = comm.content || '';
        if (rawContent.trim().length > 0) {
            // Translate comment to English if needed
            const englishText = await translateText(rawContent, 'en');
            const truncated = englishText.length > 180 ? `${englishText.substring(0, 177)}...` : englishText;
            const author = comm.displayName || 'Commander';
            const server = comm.serverNumber ? ` (S${comm.serverNumber})` : '';
            summaries.push(`• ${author}${server}: "${truncated}"`);
        }
    }

    return summaries;
}

/**
 * Generates and downloads a landscape A4 PDF executive report.
 * 1 proposition per page, 100% in English with graphical priority bars.
 * 
 * @param {Array} threads - List of evolution proposals
 * @param {Function} [fetchCommentsFn] - Optional callback to fetch comments for a thread: async (threadId) => comments
 * @param {Function} [onProgress] - Optional progress callback: (current, total) => void
 * @returns {Promise<void>}
 */
export async function exportEvolutionsToPDF(threads, fetchCommentsFn, onProgress) {
    if (!threads || threads.length === 0) {
        throw new Error('No evolution proposals to export.');
    }

    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
    });

    const pageWidth = 297;
    const pageHeight = 210;
    const margin = 12;
    const contentWidth = pageWidth - (margin * 2);

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    for (let i = 0; i < threads.length; i++) {
        const thread = threads[i];
        if (onProgress) {
            onProgress(i + 1, threads.length);
        }

        if (i > 0) {
            doc.addPage('a4', 'landscape');
        }

        // 1. Dark Background
        doc.setFillColor(13, 17, 26); // #0D111A
        doc.rect(0, 0, pageWidth, pageHeight, 'F');

        // Subtle Card Container Border
        doc.setDrawColor(201, 168, 76); // Gold #C9A84C
        doc.setLineWidth(0.4);
        doc.rect(margin, margin, contentWidth, pageHeight - (margin * 2), 'S');

        // 2. Top Header Bar
        doc.setFillColor(20, 24, 36);
        doc.rect(margin, margin, contentWidth, 18, 'F');
        doc.line(margin, margin + 18, margin + contentWidth, margin + 18);

        // Header Title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(201, 168, 76);
        doc.text('FGF WIKI · GAME EVOLUTIONS EXECUTIVE ROADMAP REPORT', margin + 6, margin + 11.5);

        // Header Date & Category
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(160, 165, 180);
        doc.text(formattedDate, margin + contentWidth - 6, margin + 11.5, { align: 'right' });

        // 3. Category & Status Badges
        const startY = margin + 24;
        const categoryLabel = CATEGORY_NAMES_EN[thread.category] || thread.category || 'General';
        const statusLabel = STATUS_NAMES_EN[thread.status] || (thread.status || 'PENDING').toUpperCase();

        // Category Tag
        doc.setFillColor(30, 36, 52);
        doc.roundedRect(margin + 6, startY, 52, 7, 2, 2, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(201, 168, 76);
        doc.text(categoryLabel.toUpperCase(), margin + 32, startY + 4.8, { align: 'center' });

        // Status Tag
        const isApproved = thread.status === 'approved';
        doc.setFillColor(isApproved ? 16 : 40, isApproved ? 185 : 44, isApproved ? 129 : 58);
        doc.roundedRect(margin + 62, startY, 46, 7, 2, 2, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text(statusLabel, margin + 85, startY + 4.8, { align: 'center' });

        // Author & Server
        const authorName = thread.displayName || 'Commander';
        const serverNum = thread.serverNumber ? `#${thread.serverNumber}` : '';
        const submissionDate = thread.createdAt?.toDate 
            ? thread.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : 'Recent';

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(140, 145, 160);
        doc.text(`Submitted by: ${authorName} (Server ${serverNum}) on ${submissionDate}`, margin + 116, startY + 5);

        // 4. Proposition Title (Translated to English)
        const translatedTitle = await translateText(thread.title, 'en');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(15);
        doc.setTextColor(255, 255, 255);
        const splitTitle = doc.splitTextToSize(translatedTitle, contentWidth - 12);
        doc.text(splitTitle, margin + 6, startY + 16);

        const titleHeight = (splitTitle.length * 7);
        const metricsY = startY + 18 + titleHeight;

        // 5. Demand Score & Priority Gauge Matrix
        const votesCount = Array.isArray(thread.votes) ? thread.votes.length : (thread.voteCount || thread.votesCount || 0);
        const commentsCount = thread.commentCount || (Array.isArray(thread.comments) ? thread.comments.length : 0);
        const demandScore = Math.round(calculateCommunityScore(votesCount, commentsCount));
        const demandTier = getDynamicDemandTier(thread, threads);
        const progressVal = getDynamicTimelineProgress(thread, threads);
        const tierColor = TIER_COLORS[demandTier?.id] || [201, 168, 76];
        const tierLabel = String(demandTier?.label || demandTier?.name || 'Emerging').toUpperCase();

        // Metrics Background Box
        doc.setFillColor(18, 22, 33);
        doc.roundedRect(margin + 6, metricsY, contentWidth - 12, 26, 3, 3, 'F');
        doc.setDrawColor(tierColor[0], tierColor[1], tierColor[2]);
        doc.setLineWidth(0.3);
        doc.roundedRect(margin + 6, metricsY, contentWidth - 12, 26, 3, 3, 'S');

        // Metric Left: Votes & Demand Score
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(255, 255, 255);
        doc.text(`COMMUNITY DEMAND SCORE: ${demandScore} / 100`, margin + 12, metricsY + 8);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(160, 165, 180);
        doc.text(`Total Player Votes: ${votesCount} votes`, margin + 12, metricsY + 14);

        // Metric Right: Priority Tier Label
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10.5);
        doc.setTextColor(tierColor[0], tierColor[1], tierColor[2]);
        doc.text(`PRIORITY TIER: ${tierLabel}`, margin + contentWidth - 12, metricsY + 8, { align: 'right' });

        // Graphical Progress Bar
        const barX = margin + 12;
        const barY = metricsY + 18;
        const barWidth = contentWidth - 24;
        const barHeight = 4.5;

        // Background Bar
        doc.setFillColor(30, 36, 52);
        doc.roundedRect(barX, barY, barWidth, barHeight, 1.5, 1.5, 'F');

        // Fill Progress Bar
        const fillWidth = Math.max(4, Math.min(barWidth, (barWidth * (progressVal / 100))));
        doc.setFillColor(tierColor[0], tierColor[1], tierColor[2]);
        doc.roundedRect(barX, barY, fillWidth, barHeight, 1.5, 1.5, 'F');

        // 6. Proposal Description (Translated to English)
        const descBoxY = metricsY + 31;
        const descBoxHeight = 52;
        doc.setFillColor(16, 20, 30);
        doc.roundedRect(margin + 6, descBoxY, contentWidth - 12, descBoxHeight, 3, 3, 'F');
        doc.setDrawColor(40, 46, 64);
        doc.setLineWidth(0.2);
        doc.roundedRect(margin + 6, descBoxY, contentWidth - 12, descBoxHeight, 3, 3, 'S');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(201, 168, 76);
        doc.text('PROPOSAL SPECIFICATIONS & DETAILS (EN)', margin + 12, descBoxY + 7);

        const translatedDesc = await translateText(thread.description, 'en');
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(220, 224, 235);
        const splitDesc = doc.splitTextToSize(translatedDesc, contentWidth - 24);
        doc.text(splitDesc.slice(0, 7), margin + 12, descBoxY + 14);

        // 7. Community Feedback & AI Summarization Box
        const feedbackY = descBoxY + descBoxHeight + 5;
        const feedbackHeight = 44;
        doc.setFillColor(16, 20, 30);
        doc.roundedRect(margin + 6, feedbackY, contentWidth - 12, feedbackHeight, 3, 3, 'F');
        doc.setDrawColor(40, 46, 64);
        doc.setLineWidth(0.2);
        doc.roundedRect(margin + 6, feedbackY, contentWidth - 12, feedbackHeight, 3, 3, 'S');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(201, 168, 76);
        doc.text('COMMUNITY FEEDBACK & EXECUTIVE AI SYNTHESIS', margin + 12, feedbackY + 7);

        // Fetch comments if fetch function provided
        let comments = [];
        if (fetchCommentsFn) {
            try {
                comments = await fetchCommentsFn(thread.id);
            } catch (e) {
                console.warn(`Unable to fetch comments for thread ${thread.id}`, e);
            }
        }

        const summaryPoints = await summarizeComments(comments);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(180, 185, 200);

        let currentPointY = feedbackY + 13;
        for (let p = 0; p < summaryPoints.length && p < 4; p++) {
            const splitPoint = doc.splitTextToSize(summaryPoints[p], contentWidth - 24);
            doc.text(splitPoint.slice(0, 2), margin + 12, currentPointY);
            currentPointY += (splitPoint.slice(0, 2).length * 4.5);
        }

        // 8. Footer on Every Page
        const footerY = pageHeight - margin - 4;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(110, 115, 130);
        doc.text('FGF WIKI Executive Briefing · Confidential Game Roadmap Document', margin + 6, footerY);
        doc.text(`Page ${i + 1} of ${threads.length}`, margin + contentWidth - 6, footerY, { align: 'right' });
    }

    // Save and Trigger Download
    const fileNameDate = now.toISOString().split('T')[0];
    doc.save(`FGF_Game_Evolutions_Executive_Report_${fileNameDate}.pdf`);
}
