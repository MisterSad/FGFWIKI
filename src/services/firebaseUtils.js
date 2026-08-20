import { doc, getDoc, setDoc, updateDoc, collection, addDoc, runTransaction, query, orderBy, where, deleteDoc, onSnapshot, serverTimestamp, getDocs, arrayUnion, arrayRemove, increment } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Save configuration data for a specific tool for a specific user.
 * 
 * @param {string} uid User ID
 * @param {string} toolId Unique identifier for the tool (e.g. 'buildTime')
 * @param {object} data The configuration data to save
 */
export const saveUserToolData = async (uid, toolId, data) => {
    if (!uid) return;

    try {
        const docRef = doc(db, "users", uid);

        // We use merge: true to avoid overwriting other tools
        await setDoc(docRef, {
            tools: {
                [toolId]: data
            },
            lastUpdated: new Date().toISOString()
        }, { merge: true });

    } catch (error) {
        console.error("Error saving tool data: ", error);
    }
};

/**
 * Load configuration data for a specific tool for a specific user.
 * 
 * @param {string} uid User ID
 * @param {string} toolId Unique identifier for the tool
 * @returns {object|null} The saved configuration, or null if it doesn't exist
 */
export const loadUserToolData = async (uid, toolId) => {
    if (!uid) return null;

    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.tools && data.tools[toolId]) {
                return data.tools[toolId];
            }
        }
        return null;
    } catch (error) {
        console.error("Error loading tool data: ", error);
        return null;
    }
};

/**
 * Load the public profile (nickname + server number) of a user.
 *
 * @param {string} uid User ID
 * @returns {Promise<{displayName: string, serverNumber: number}|null>}
 */
export const getUserProfile = async (uid) => {
    if (!db || !uid) return null;
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        const data = docSnap.exists() ? docSnap.data() : {};
        if (typeof data.displayName !== 'string' || typeof data.serverNumber !== 'number') {
            return null;
        }
        return { displayName: data.displayName, serverNumber: data.serverNumber };
    } catch (error) {
        console.error("Error loading user profile: ", error);
        return null;
    }
};

/**
 * Save (or update) the public profile of a user.
 *
 * @param {string} uid User ID
 * @param {{displayName: string, serverNumber: number}} profile
 */
export const saveUserProfile = async (uid, { displayName, serverNumber }) => {
    if (!db || !uid) return;
    try {
        const docRef = doc(db, "users", uid);
        await setDoc(docRef, {
            displayName,
            serverNumber,
            updatedAt: new Date().toISOString()
        }, { merge: true });
    } catch (error) {
        console.error("Error saving user profile: ", error);
        throw error;
    }
};

/**
 * Subscribe to the comments of a news article or guide (live updates).
 *
 * @param {'news'|'guide'} type
 * @param {string} itemId
 * @param {(comments: Array) => void} onData Called with the list, newest last.
 * @returns {() => void} Unsubscribe function.
 */
export const subscribeComments = (type, itemId, onData) => {
    if (!db) {
        // Local dev without Firebase: report an empty list asynchronously.
        Promise.resolve().then(() => onData([]));
        return () => {};
    }
    const q = query(
        collection(db, "comments"),
        where("type", "==", type),
        where("itemId", "==", itemId),
        orderBy("createdAt", "asc")
    );
    return onSnapshot(q, (snapshot) => {
        const comments = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
        }));
        onData(comments);
    }, (error) => {
        console.error("Error subscribing to comments: ", error);
        onData([]);
    });
};

/**
 * Post a comment on a news article or guide.
 *
 * @param {'news'|'guide'} type
 * @param {string} itemId
 * @param {string} content
 * @param {{displayName: string, serverNumber: number}} profile
 * @param {string} uid
 */
export const addComment = async (type, itemId, content, profile, uid) => {
    if (!db || !uid || !profile) return;
    try {
        await addDoc(collection(db, "comments"), {
            content,
            authorUid: uid,
            displayName: profile.displayName,
            serverNumber: profile.serverNumber,
            type,
            itemId,
            createdAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error posting comment: ", error);
        throw error;
    }
};

/**
 * Delete one of the current user's comments.
 *
 * @param {string} commentId
 */
export const deleteComment = async (commentId) => {
    if (!db) return;
    try {
        await deleteDoc(doc(db, "comments", commentId));
    } catch (error) {
        console.error("Error deleting comment: ", error);
        throw error;
    }
};

// ==========================================
// GAME EVOLUTIONS & FEEDBACK SYSTEM
// ==========================================

const SEED_EVOLUTIONS = [];

/**
 * Subscribe to all evolution threads (live updates).
 *
 * @param {(threads: Array) => void} onData
 * @returns {() => void} Unsubscribe function
 */
export const subscribeEvolutionThreads = (onData) => {
    if (!db) {
        const loadLocal = () => {
            const stored = localStorage.getItem('fgf_evolutions_list');
            if (!stored) {
                localStorage.setItem('fgf_evolutions_list', JSON.stringify([]));
                onData([]);
            } else {
                try {
                    onData(JSON.parse(stored));
                } catch {
                    onData([]);
                }
            }
        };
        loadLocal();
        const handler = () => loadLocal();
        window.addEventListener('storage_evolutions_updated', handler);
        return () => window.removeEventListener('storage_evolutions_updated', handler);
    }

    const colRef = collection(db, "evolutions");
    const q = query(colRef, orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
        const list = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
                id: docSnap.id,
                ...data,
                votesCount: typeof data.votesCount === 'number' ? data.votesCount : (Array.isArray(data.votes) ? data.votes.length : 0),
                commentCount: typeof data.commentCount === 'number' ? data.commentCount : 0,
            };
        });
        onData(list);
    }, (error) => {
        console.error("Error subscribing to evolutions: ", error);
        onData([]);
    });
};

/**
 * Add a new evolution thread.
 *
 * @param {{title: string, category: string, description: string, displayName?: string, serverNumber?: number|string}} threadData
 * @param {string} uid
 * @param {boolean} isAdmin
 * @returns {Promise<string>} Created thread ID
 */
export const addEvolutionThread = async ({ title, category, description, displayName, serverNumber }, uid, isAdmin = false) => {
    if (!uid) throw new Error("Authentication required");
    const authorName = (displayName || '').trim() || 'Commander';
    const serverNum = parseInt(serverNumber, 10) || 1;

    const newThread = {
        title: title.trim(),
        category: category || 'general',
        description: description.trim(),
        status: isAdmin ? 'approved' : 'pending',
        authorUid: uid,
        displayName: authorName,
        serverNumber: serverNum,
        votes: [uid],
        votesCount: 1,
        commentCount: 0,
        createdAt: new Date().toISOString(),
    };

    if (!db) {
        const stored = localStorage.getItem('fgf_evolutions_list');
        const list = stored ? JSON.parse(stored) : [];
        const threadWithId = { ...newThread, id: `local-evo-${Date.now()}` };
        list.unshift(threadWithId);
        localStorage.setItem('fgf_evolutions_list', JSON.stringify(list));
        window.dispatchEvent(new Event('storage_evolutions_updated'));
        return threadWithId.id;
    }

    try {
        const docRef = await addDoc(collection(db, "evolutions"), {
            ...newThread,
            createdAt: serverTimestamp(),
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding evolution thread: ", error);
        throw error;
    }
};

/**
 * Toggle user's vote on an evolution thread.
 *
 * @param {string} threadId
 * @param {string} uid
 */
export const toggleVoteEvolution = async (threadId, uid) => {
    if (!uid) throw new Error("Authentication required");

    if (!db) {
        const stored = localStorage.getItem('fgf_evolutions_list');
        const list = stored ? JSON.parse(stored) : [...SEED_EVOLUTIONS];
        const index = list.findIndex(t => t.id === threadId);
        if (index !== -1) {
            const thread = list[index];
            const currentVotes = Array.isArray(thread.votes) ? thread.votes : [];
            const hasVoted = currentVotes.includes(uid);
            const newVotes = hasVoted ? currentVotes.filter(id => id !== uid) : [...currentVotes, uid];
            list[index] = {
                ...thread,
                votes: newVotes,
                votesCount: newVotes.length,
            };
            localStorage.setItem('fgf_evolutions_list', JSON.stringify(list));
            window.dispatchEvent(new Event('storage_evolutions_updated'));
        }
        return;
    }

    try {
        const threadRef = doc(db, "evolutions", threadId);
        await runTransaction(db, async (tx) => {
            const docSnap = await tx.get(threadRef);
            if (!docSnap.exists()) return;
            const data = docSnap.data();
            const currentVotes = Array.isArray(data.votes) ? data.votes : [];
            const hasVoted = currentVotes.includes(uid);
            if (hasVoted) {
                tx.update(threadRef, {
                    votes: arrayRemove(uid),
                    votesCount: increment(-1),
                });
            } else {
                tx.update(threadRef, {
                    votes: arrayUnion(uid),
                    votesCount: increment(1),
                });
            }
        });
    } catch (error) {
        console.error("Error toggling evolution vote: ", error);
        throw error;
    }
};

/**
 * Admin action: update evolution thread status.
 *
 * @param {string} threadId
 * @param {'pending'|'approved'|'in_progress'|'implemented'|'rejected'} newStatus
 */
export const updateEvolutionStatus = async (threadId, newStatus) => {
    if (!db) {
        const stored = localStorage.getItem('fgf_evolutions_list');
        const list = stored ? JSON.parse(stored) : [...SEED_EVOLUTIONS];
        const index = list.findIndex(t => t.id === threadId);
        if (index !== -1) {
            list[index] = { ...list[index], status: newStatus };
            localStorage.setItem('fgf_evolutions_list', JSON.stringify(list));
            window.dispatchEvent(new Event('storage_evolutions_updated'));
        }
        return;
    }

    try {
        const docRef = doc(db, "evolutions", threadId);
        await updateDoc(docRef, { status: newStatus, updatedAt: serverTimestamp() });
    } catch (error) {
        console.error("Error updating evolution status: ", error);
        throw error;
    }
};

/**
 * Delete an evolution thread (admin or author).
 *
 * @param {string} threadId
 */
export const deleteEvolutionThread = async (threadId) => {
    if (!db) {
        const stored = localStorage.getItem('fgf_evolutions_list');
        const list = stored ? JSON.parse(stored) : [...SEED_EVOLUTIONS];
        const filtered = list.filter(t => t.id !== threadId);
        localStorage.setItem('fgf_evolutions_list', JSON.stringify(filtered));
        window.dispatchEvent(new Event('storage_evolutions_updated'));
        return;
    }

    try {
        await deleteDoc(doc(db, "evolutions", threadId));
    } catch (error) {
        console.error("Error deleting evolution thread: ", error);
        throw error;
    }
};

/**
 * Subscribe to comments for a specific evolution thread.
 *
 * @param {string} threadId
 * @param {(comments: Array) => void} onData
 * @returns {() => void} Unsubscribe function
 */
export const subscribeEvolutionComments = (threadId, onData) => {
    if (!db) {
        const key = `fgf_evo_comments_${threadId}`;
        const loadLocal = () => {
            const stored = localStorage.getItem(key);
            onData(stored ? JSON.parse(stored) : []);
        };
        loadLocal();
        const handler = () => loadLocal();
        window.addEventListener(`storage_evo_comments_${threadId}`, handler);
        return () => window.removeEventListener(`storage_evo_comments_${threadId}`, handler);
    }

    const q = query(
        collection(db, "evolution_comments"),
        where("threadId", "==", threadId),
        orderBy("createdAt", "asc")
    );
    return onSnapshot(q, (snapshot) => {
        const comments = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
        }));
        onData(comments);
    }, (error) => {
        console.error("Error subscribing to evolution comments: ", error);
        onData([]);
    });
};

/**
 * Fetch comments once for an evolution thread (useful for report exports).
 * 
 * @param {string} threadId
 * @returns {Promise<Array>}
 */
export const fetchEvolutionComments = async (threadId) => {
    if (!db) {
        const key = `fgf_evo_comments_${threadId}`;
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : [];
    }

    try {
        const q = query(
            collection(db, "evolution_comments"),
            where("threadId", "==", threadId),
            orderBy("createdAt", "asc")
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
        }));
    } catch (error) {
        console.error("Error fetching evolution comments:", error);
        return [];
    }
};

/**
 * Add a comment to an evolution thread.
 *
 * @param {string} threadId
 * @param {string} content
 * @param {{displayName: string, serverNumber: number}} profile
 * @param {string} uid
 * @param {boolean} isAdmin
 */
export const addEvolutionComment = async (threadId, content, profile, uid, isAdmin = false) => {
    if (!uid || !profile) return;
    const newComment = {
        threadId,
        content: content.trim(),
        authorUid: uid,
        displayName: profile.displayName || 'Commander',
        serverNumber: profile.serverNumber || 1,
        isAdmin: !!isAdmin,
        createdAt: new Date().toISOString(),
    };

    if (!db) {
        const key = `fgf_evo_comments_${threadId}`;
        const stored = localStorage.getItem(key);
        const list = stored ? JSON.parse(stored) : [];
        list.push({ ...newComment, id: `local-comm-${Date.now()}` });
        localStorage.setItem(key, JSON.stringify(list));
        window.dispatchEvent(new Event(`storage_evo_comments_${threadId}`));

        // Update commentCount on thread
        const storedThreads = localStorage.getItem('fgf_evolutions_list');
        if (storedThreads) {
            const tList = JSON.parse(storedThreads);
            const idx = tList.findIndex(t => t.id === threadId);
            if (idx !== -1) {
                tList[idx].commentCount = (tList[idx].commentCount || 0) + 1;
                localStorage.setItem('fgf_evolutions_list', JSON.stringify(tList));
                window.dispatchEvent(new Event('storage_evolutions_updated'));
            }
        }
        return;
    }

    try {
        await addDoc(collection(db, "evolution_comments"), {
            ...newComment,
            createdAt: serverTimestamp(),
        });
        const threadRef = doc(db, "evolutions", threadId);
        await updateDoc(threadRef, {
            commentCount: increment(1),
        });
    } catch (error) {
        console.error("Error adding evolution comment: ", error);
        throw error;
    }
};

/**
 * Delete an evolution comment.
 *
 * @param {string} threadId
 * @param {string} commentId
 */
export const deleteEvolutionComment = async (threadId, commentId) => {
    if (!db) {
        const key = `fgf_evo_comments_${threadId}`;
        const stored = localStorage.getItem(key);
        if (stored) {
            const list = JSON.parse(stored);
            const filtered = list.filter(c => c.id !== commentId);
            localStorage.setItem(key, JSON.stringify(filtered));
            window.dispatchEvent(new Event(`storage_evo_comments_${threadId}`));

            const storedThreads = localStorage.getItem('fgf_evolutions_list');
            if (storedThreads) {
                const tList = JSON.parse(storedThreads);
                const idx = tList.findIndex(t => t.id === threadId);
                if (idx !== -1) {
                    tList[idx].commentCount = Math.max(0, (tList[idx].commentCount || 1) - 1);
                    localStorage.setItem('fgf_evolutions_list', JSON.stringify(tList));
                    window.dispatchEvent(new Event('storage_evolutions_updated'));
                }
            }
        }
        return;
    }

    try {
        await deleteDoc(doc(db, "evolution_comments", commentId));
        const threadRef = doc(db, "evolutions", threadId);
        await updateDoc(threadRef, {
            commentCount: increment(-1),
        });
    } catch (error) {
        console.error("Error deleting evolution comment: ", error);
        throw error;
    }
};
