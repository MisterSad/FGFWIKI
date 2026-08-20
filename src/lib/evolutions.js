import { Flame, Star, Zap, Lightbulb } from 'lucide-react';

/**
 * Calculate dynamic composite engagement score for a proposal.
 * Weighted by votes and constructive community discussion activity.
 */
export function calculateCommunityScore(votesCount = 0, commentCount = 0) {
    const v = typeof votesCount === 'number' ? votesCount : 0;
    const c = typeof commentCount === 'number' ? commentCount : 0;
    return (v * 1.0) + (c * 0.5);
}

/**
 * Dynamic, evolutive priority tier calculation.
 * Adapts organically to the active ecosystem of feedback without fixed arbitrary cutoffs.
 */
export function getDynamicDemandTier(threadOrVotes, allThreads = []) {
    let votes = 0;
    let comments = 0;

    if (typeof threadOrVotes === 'object' && threadOrVotes !== null) {
        votes = threadOrVotes.votesCount || (Array.isArray(threadOrVotes.votes) ? threadOrVotes.votes.length : 0);
        comments = threadOrVotes.commentCount || 0;
    } else if (typeof threadOrVotes === 'number') {
        votes = threadOrVotes;
    }

    const currentScore = calculateCommunityScore(votes, comments);

    // If no context pool provided, evaluate dynamically against baseline scale
    if (!allThreads || allThreads.length === 0) {
        if (currentScore >= 25 || votes >= 25) {
            return {
                id: 'critical',
                level: 4,
                label: 'Critical / Top Priority',
                color: '#ef4444',
                gradient: 'linear-gradient(135deg, #ef4444, #f97316)',
                icon: Flame,
                glow: 'rgba(239, 68, 68, 0.45)',
            };
        }
        if (currentScore >= 12 || votes >= 12) {
            return {
                id: 'high',
                level: 3,
                label: 'Important',
                color: '#eab308',
                gradient: 'linear-gradient(135deg, #eab308, #ca8a04)',
                icon: Star,
                glow: 'rgba(234, 179, 8, 0.35)',
            };
        }
        if (currentScore >= 4 || votes >= 4) {
            return {
                id: 'moderate',
                level: 2,
                label: 'Moderate',
                color: '#06b6d4',
                gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                icon: Zap,
                glow: 'rgba(6, 182, 212, 0.35)',
            };
        }
        return {
            id: 'low',
            level: 1,
            label: 'Emerging / Low Demand',
            color: '#64748b',
            gradient: 'linear-gradient(135deg, #64748b, #475569)',
            icon: Lightbulb,
            glow: 'rgba(100, 116, 139, 0.25)',
        };
    }

    // Relative calculation across the distribution of all active proposals
    const allScores = allThreads.map(t => calculateCommunityScore(t.votesCount, t.commentCount));
    const maxScore = Math.max(...allScores, 5); // baseline minimum to avoid division by zero
    const relativeRatio = currentScore / maxScore;

    // Percentile rank
    const lowerCount = allScores.filter(s => s < currentScore).length;
    const sameCount = allScores.filter(s => s === currentScore).length;
    const percentile = (lowerCount + (0.5 * sameCount)) / allScores.length;

    // Dynamic Composite Index between 0 and 1
    const dynamicIndex = allThreads.length <= 3 
        ? relativeRatio 
        : (0.55 * relativeRatio + 0.45 * percentile);

    if (currentScore > 0 && dynamicIndex >= 0.70) {
        return {
            id: 'critical',
            level: 4,
            label: 'Critical / Top Priority',
            color: '#ef4444',
            gradient: 'linear-gradient(135deg, #ef4444, #f97316)',
            icon: Flame,
            glow: 'rgba(239, 68, 68, 0.45)',
        };
    }
    if (currentScore > 0 && dynamicIndex >= 0.45) {
        return {
            id: 'high',
            level: 3,
            label: 'Important',
            color: '#eab308',
            gradient: 'linear-gradient(135deg, #eab308, #ca8a04)',
            icon: Star,
            glow: 'rgba(234, 179, 8, 0.35)',
        };
    }
    if (currentScore > 0 && dynamicIndex >= 0.20) {
        return {
            id: 'moderate',
            level: 2,
            label: 'Moderate',
            color: '#06b6d4',
            gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
            icon: Zap,
            glow: 'rgba(6, 182, 212, 0.35)',
        };
    }
    return {
        id: 'low',
        level: 1,
        label: 'Emerging / Low Demand',
        color: '#64748b',
        gradient: 'linear-gradient(135deg, #64748b, #475569)',
        icon: Lightbulb,
        glow: 'rgba(100, 116, 139, 0.25)',
    };
}

// Backward-compatible getDemandTier export
export function getDemandTier(votesCount = 0, allThreads = []) {
    return getDynamicDemandTier(votesCount, allThreads);
}

// Calculate dynamic progress percentage on the timeline (4% to 100%)
export function getDynamicTimelineProgress(threadOrVotes, allThreads = []) {
    let votes = 0;
    let comments = 0;

    if (typeof threadOrVotes === 'object' && threadOrVotes !== null) {
        votes = threadOrVotes.votesCount || (Array.isArray(threadOrVotes.votes) ? threadOrVotes.votes.length : 0);
        comments = threadOrVotes.commentCount || 0;
    } else if (typeof threadOrVotes === 'number') {
        votes = threadOrVotes;
    }

    const currentScore = calculateCommunityScore(votes, comments);

    if (!allThreads || allThreads.length === 0) {
        return Math.min(100, Math.max(4, Math.round((currentScore / 25) * 100)));
    }

    const allScores = allThreads.map(t => calculateCommunityScore(t.votesCount, t.commentCount));
    const maxScore = Math.max(...allScores, 5);
    const ratio = Math.min(1.0, currentScore / maxScore);
    return Math.min(100, Math.max(4, Math.round(ratio * 100)));
}
