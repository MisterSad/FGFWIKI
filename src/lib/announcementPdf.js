import { jsPDF } from 'jspdf';

/**
 * Generates and downloads an A4 portrait PDF of the official community announcement
 * styled as a professional press release / communiqué.
 * 
 * @param {Function} t - i18next translation function
 * @param {string} [lang='en'] - current language code
 */
export function exportAnnouncementToPDF(t, lang = 'en') {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 16;
    const contentWidth = pageWidth - (margin * 2);

    let y = 18;

    const checkPageBreak = (neededHeight) => {
        if (y + neededHeight > pageHeight - 20) {
            doc.addPage();
            y = 20;
            return true;
        }
        return false;
    };

    // Helper: draw text with automatic wrapping
    const drawParagraph = (text, fontSize = 9.5, color = [30, 41, 59], lineHeight = 4.8, isBold = false) => {
        doc.setFontSize(fontSize);
        doc.setTextColor(color[0], color[1], color[2]);
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');

        const lines = doc.splitTextToSize(text, contentWidth);
        const blockHeight = lines.length * lineHeight;
        checkPageBreak(blockHeight + 2);

        doc.text(lines, margin, y);
        y += blockHeight;
    };

    // Helper: draw section title
    const drawSectionTitle = (num, title) => {
        checkPageBreak(12);
        y += 2;
        doc.setFontSize(11);
        doc.setTextColor(180, 83, 9); // Gold / Dark Amber
        doc.setFont('helvetica', 'bold');
        doc.text(num + '. ' + title.toUpperCase(), margin, y);
        y += 2;

        // Subtle accent underline
        doc.setDrawColor(212, 175, 55);
        doc.setLineWidth(0.4);
        doc.line(margin, y, margin + 40, y);
        y += 4;
    };

    // Helper: draw structured card
    const drawCard = (title, desc) => {
        doc.setFontSize(9);
        const titleText = title + ': ';
        doc.setFont('helvetica', 'bold');
        const descLines = doc.splitTextToSize(titleText + desc, contentWidth - 8);
        const cardHeight = Math.max(12, descLines.length * 4.4 + 6);

        checkPageBreak(cardHeight + 2);

        // Card background
        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.3);
        doc.roundedRect(margin, y, contentWidth, cardHeight, 2, 2, 'FD');

        // Gold left indicator bar
        doc.setFillColor(212, 175, 55);
        doc.rect(margin, y, 2, cardHeight, 'F');

        doc.setTextColor(30, 41, 59);
        doc.setFont('helvetica', 'normal');
        doc.text(descLines, margin + 5, y + 4.5);

        y += cardHeight + 2.5;
    };

    // --- 1. TOP HEADER / BRANDING ---
    // Header background bar
    doc.setFillColor(15, 23, 42); // Slate dark
    doc.rect(margin, y, contentWidth, 16, 'F');

    doc.setFontSize(13);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('FGF WIKI', margin + 6, y + 7);

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(203, 213, 225);
    doc.text('FOUNDATION: GALACTIC FRONTIER COMMUNITY ENCYCLOPEDIA', margin + 6, y + 12);

    // Right header badge
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(212, 175, 55);
    doc.text('FOR IMMEDIATE RELEASE', pageWidth - margin - 6, y + 7, { align: 'right' });
    doc.setTextColor(148, 163, 184);
    doc.setFont('helvetica', 'normal');
    doc.text('AUGUST 21, 2026 | REF: FGF-2026-08-CC', pageWidth - margin - 6, y + 12, { align: 'right' });

    y += 20;

    // Gold accent separator rule
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.8);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;

    // --- 2. MAIN COMMUNIQUÉ TITLE ---
    const badgeText = t('announcement_modal.badge', 'Official community statement').toUpperCase();
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(180, 83, 9);
    doc.text('[ ' + badgeText + ' ]', margin, y);
    y += 5;

    const mainTitle = t('announcement_modal.title', 'Why FGF WIKI is leaving the official program: defending the community, exposing the silence');
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    const titleLines = doc.splitTextToSize(mainTitle, contentWidth);
    doc.text(titleLines, margin, y);
    y += titleLines.length * 6 + 4;

    // --- 3. EXECUTIVE SUMMARY / OPENING CALLOUT ---
    const introText = t('announcement_modal.intro_p1', 'I have officially terminated my Content Creator Agreement with FunPlus for Foundation: Galactic Frontier. This decision is not a retreat - it is an act of clarity. I want to lay out the plain truth for the entire community, without corporate sugarcoating.');
    const introLines = doc.splitTextToSize(introText, contentWidth - 10);
    const introBoxHeight = introLines.length * 4.6 + 8;

    doc.setFillColor(254, 252, 232); // Amber tinted light box
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin, y, contentWidth, introBoxHeight, 2, 2, 'FD');

    // Accent line
    doc.setFillColor(212, 175, 55);
    doc.rect(margin, y, 3, introBoxHeight, 'F');

    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.text(introLines, margin + 6, y + 5.5);

    y += introBoxHeight + 5;

    // --- 4. SECTION 1 ---
    drawSectionTitle('1', t('announcement_modal.sec1_title', 'The real allies: unconditional respect for the community team'));
    drawParagraph(t('announcement_modal.sec1_p1', 'Before addressing the core failure, I want to draw a crystal-clear line: the Community Managers in charge of creators are genuine, dedicated allies.'));
    y += 1.5;
    drawParagraph(t('announcement_modal.sec1_p2', 'They work relentlessly, caught between an ambitious community and a rigid corporate machine. They listened, they negotiated, and they fought internally to find workarounds to support FGF WIKI. I have immense respect for their daily battles. They are trying to build bridges with their hands tied behind their backs, and it is impossible not to empathize with the position they are put in by their leadership.'));
    y += 1.5;
    drawParagraph(t('announcement_modal.sec1_p3', 'The failure does not lie with community management. It lies entirely at the feet of the studio and the development leadership.'), 9.5, [15, 23, 42], 4.8, true);

    y += 4;

    // --- 5. SECTION 2 ---
    drawSectionTitle('2', t('announcement_modal.sec2_title', "The studio's failure: refusing to support the very engine of player retention"));
    drawParagraph(t('announcement_modal.sec2_p1', 'Every seasoned strategy player knows an undeniable reality: complex games do not survive on lore or marketing trailers; they survive on data, theorycrafting, and precision tools.'));
    y += 1.5;
    drawParagraph(t('announcement_modal.sec2_p2', "When FGF WIKI serves over 10,000 to 11,000 monthly active players and exceeds 40,000 page views, it is doing the studio's job. It is calculating building costs, mapping progression curves, and keeping players invested and spending wisely. I build, code, and maintain this platform alone - investing 10 to 15 hours every week on top of my 45-hour full-time job, while covering 100% of the infrastructure costs out of my own pocket."));
    y += 1.5;
    drawParagraph(t('announcement_modal.sec2_p3', 'What was asked from the studio in return? Not money. Not recognition. Only raw data.'), 9.5, [15, 23, 42], 4.8, true);
    y += 1;

    // Bullet points
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    doc.setFont('helvetica', 'normal');
    const b1 = '• ' + t('announcement_modal.sec2_bullet1', 'Simple structured sheets or JSON exports for upgrade costs, research trees, timers, and multipliers.');
    const b1Lines = doc.splitTextToSize(b1, contentWidth - 6);
    checkPageBreak(b1Lines.length * 4.4);
    doc.text(b1Lines, margin + 4, y);
    y += b1Lines.length * 4.4;

    const b2 = '• ' + t('announcement_modal.sec2_bullet2', 'Standard assets that take a developer minutes to export, but save hundreds of community hours.');
    const b2Lines = doc.splitTextToSize(b2, contentWidth - 6);
    checkPageBreak(b2Lines.length * 4.4);
    doc.text(b2Lines, margin + 4, y);
    y += b2Lines.length * 4.4 + 1.5;

    drawParagraph(t('announcement_modal.sec2_p4', "The developers' response? Persistent, total silence."), 9.5, [220, 38, 38], 4.8, true);

    y += 4;

    // --- 6. SECTION 3 ---
    drawSectionTitle('3', t('announcement_modal.sec3_title', 'The double standard: respecting the rules vs. indifference'));
    drawParagraph(t('announcement_modal.sec3_intro', 'Consider the stark contrast in ethics and commitment:'));
    y += 2;

    drawCard(
        t('announcement_modal.sec3_bullet1_title', 'Respecting the game'),
        t('announcement_modal.sec3_bullet1_desc', 'As a developer myself, I strictly refused to datamine, reverse-engineer, or breach terms of service out of professional integrity and respect for the studio. I chose the honest path: asking through official channels.')
    );
    drawCard(
        t('announcement_modal.sec3_bullet2_title', "The studio's apathy"),
        t('announcement_modal.sec3_bullet2_desc', 'Instead of providing non-confidential numbers to validate community calculators, the studio treated a database powering tens of thousands of players as if it were a casual creative blog, demanding 600-word fan-fiction pieces in exchange for capped in-game credits.')
    );
    drawCard(
        t('announcement_modal.sec3_bullet3_title', 'The missed win-win'),
        t('announcement_modal.sec3_bullet3_desc', "Refusing Creator Codes and withholding data hurts no one more than the studio itself. Accurate tools drive player confidence, engagement, and purchases. Withholding public gameplay statistics from the people building tools for your players is an incomprehensible barrier to the game's own growth.")
    );

    y += 3;

    // --- 7. SECTION 4 ---
    drawSectionTitle('4', t('announcement_modal.sec4_title', 'Regaining full sovereignty'));
    drawParagraph(t('announcement_modal.sec4_p1', 'Operating under a contract that imposes exclusivity and legal liabilities, while the studio refuses to provide the bare minimum technical data to support the player base, is an unacceptable compromise.'));
    y += 1.5;
    drawParagraph(t('announcement_modal.sec4_p2', 'FGF WIKI was built for the players, not corporate metrics.'), 10, [180, 83, 9], 5, true);
    y += 1.5;
    drawParagraph(t('announcement_modal.sec4_p3', 'By terminating this contract, FGF WIKI regains complete operational freedom. I will continue to code, host, and evolve the platform on my own terms. The tools will remain free, accessible, and community-driven.'));

    y += 3;

    // Closing box with direct messages
    const cmMsg = t('announcement_modal.sec4_cm', 'To our Community Managers: thank you for trying.');
    const studioMsg = t('announcement_modal.sec4_studio', 'To the studio leadership: players remember who builds the tools, and who withholds the numbers.');
    const thanksMsg = t('announcement_modal.sec4_thanks', 'Thank you to everyone in the community for your unwavering support.');

    const closeBoxHeight = 24;
    checkPageBreak(closeBoxHeight + 4);

    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, y, contentWidth, closeBoxHeight, 2, 2, 'FD');

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 41, 59);
    doc.text(cmMsg, margin + 5, y + 6);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(180, 83, 9);
    doc.text(studioMsg, margin + 5, y + 12);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 116, 139);
    doc.text(thanksMsg, margin + 5, y + 18);

    // --- 8. FOOTERS & PAGINATION ON ALL PAGES ---
    const totalPages = doc.internal.getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
        doc.setPage(p);

        // Footer top divider
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.3);
        doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);

        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(148, 163, 184);
        doc.text('FGF WIKI • https://fgfwiki.com • Official Community Statement', margin, pageHeight - 9);
        doc.text('Page ' + p + ' of ' + totalPages, pageWidth - margin, pageHeight - 9, { align: 'right' });
    }

    // Save and download the PDF
    const filename = 'FGF_WIKI_Official_Statement_August_2026_' + lang.toUpperCase() + '.pdf';
    doc.save(filename);
}
