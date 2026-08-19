import { doc, getDoc, setDoc, updateDoc, collection, addDoc, runTransaction, query, orderBy, where, deleteDoc, onSnapshot, serverTimestamp, getDocs, limit, arrayUnion, arrayRemove, increment } from "firebase/firestore";
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
 * Submit game UID for the Stella Anomaly event and return the user's rank.
 * 
 * @param {string} gameUid In-game User ID
 * @param {string} secretCode Secret event passkey code
 * @param {string|null} firebaseUid Logged in user's ID
 * @param {string} lang Current language code
 * @returns {Promise<number>} User's rank (1 for 1st place, 2 for 2nd, etc.)
 */
export const submitStellaAnomalyUid = async (gameUid, secretCode, firebaseUid = null, lang = 'en') => {
    if (!db) {
        // Fallback for local testing: increment a counter in localStorage
        const mockCount = parseInt(localStorage.getItem('stella_anomaly_mock_count') || '0', 10) + 1;
        localStorage.setItem('stella_anomaly_mock_count', mockCount.toString());
        return mockCount;
    }
    
    try {
        const submittedAt = new Date().toISOString();
        const colRef = collection(db, "stella_anomaly_submissions");
        const counterRef = doc(db, "stella_anomaly_meta", "counter");

        // Atomically allocate a rank and persist the submission.
        // The transaction guarantees that two simultaneous submissions
        // never receive the same rank (no client-side race condition).
        const rank = await runTransaction(db, async (tx) => {
            const counterSnap = await tx.get(counterRef);
            const nextCount = (counterSnap.exists() ? counterSnap.data().count : 0) + 1;
            await tx.set(counterRef, { count: nextCount });
            return nextCount;
        });

        await addDoc(colRef, {
            gameUid,
            secretCode,
            firebaseUid,
            lang,
            submittedAt,
            rank
        });

        return rank;
    } catch (error) {
        console.error("Error submitting Stella Anomaly UID and getting rank: ", error);
        throw error;
    }
};

/**
 * Fetch top submissions for the Stella Anomaly event leaderboard.
 * 
 * @param {number} maxEntries Maximum number of submissions to fetch (default 20)
 * @returns {Promise<Array<{id: string, rank: number, gameUid: string, submittedAt: string}>>}
 */
export const getStellaAnomalyLeaderboard = async (maxEntries = 20) => {
    if (!db) {
        // Fallback for mock/local data
        const localUid = localStorage.getItem('stella_anomaly_submitted_uid');
        const localRank = localStorage.getItem('stella_anomaly_submitted_rank');
        if (localUid && localRank) {
            return [{
                id: 'local-submission',
                rank: parseInt(localRank, 10),
                gameUid: localUid,
                submittedAt: new Date().toISOString()
            }];
        }
        return [];
    }

    try {
        const colRef = collection(db, "stella_anomaly_submissions");
        const q = query(colRef, orderBy("rank", "asc"), limit(maxEntries));
        const querySnapshot = await getDocs(q);
        const list = [];
        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            list.push({
                id: docSnap.id,
                rank: data.rank,
                gameUid: data.gameUid,
                submittedAt: data.submittedAt
            });
        });
        return list;
    } catch (error) {
        console.error("Error fetching Stella Anomaly leaderboard: ", error);
        return [];
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

const SEED_EVOLUTIONS = [
    {
        id: 'seed-evo-1',
        title: 'Ajouter un bouton "Collecter Tout" pour les récompenses de courrier',
        category: 'qol',
        description: 'Actuellement, ouvrir 50 rapports de guerre et courriers quotidiens un par un prend plusieurs minutes. Un simple bouton "Tout collecter" et "Tout marquer comme lu" dans la boîte de réception améliorerait grandement le confort de jeu au quotidien.',
        status: 'approved',
        authorUid: 'user-admin',
        displayName: 'HawkTuah',
        serverNumber: 1061,
        votes: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5', 'user-6', 'user-7', 'user-8', 'user-9', 'user-10', 'user-11', 'user-12', 'user-13', 'user-14', 'user-15', 'user-16', 'user-17', 'user-18', 'user-19', 'user-20', 'user-21', 'user-22', 'user-23', 'user-24', 'user-25', 'user-26', 'user-27', 'user-28', 'user-29', 'user-30', 'user-31', 'user-32', 'user-33', 'user-34'],
        votesCount: 34,
        commentCount: 8,
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
    {
        id: 'seed-evo-2',
        title: 'Système de présélection de composition de flotte pour les ralliements SvS',
        category: 'gameplay',
        description: 'Pendant les guerres d\'état (SvS), devoir sélectionner manuellement chaque vaisseau et héros lors de chaque ralliement rapide fait perdre de précieuses secondes. Permettre de sauvegarder 3 presets d\'armada pour rejoindre un ralliement en 1 clic.',
        status: 'in_progress',
        authorUid: 'user-2',
        displayName: 'AegisCommander',
        serverNumber: 1042,
        votes: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5', 'user-6', 'user-7', 'user-8', 'user-9', 'user-10', 'user-11', 'user-12', 'user-13', 'user-14', 'user-15', 'user-16', 'user-17', 'user-18', 'user-19', 'user-20'],
        votesCount: 20,
        commentCount: 5,
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
    {
        id: 'seed-evo-3',
        title: 'Revalorisation de l\'énergie Ion en PvP contre les compositions Cinétiques',
        category: 'balance',
        description: 'La méta actuelle est trop dominée par les tanks cinétiques (Doug Rockwell / Ironclad). Les compositions Ioniques devraient bénéficier d\'une perforation de blindage énergétique accrue ou d\'un ralentissement plus marqué pour diversifier les affrontements.',
        status: 'approved',
        authorUid: 'user-3',
        displayName: 'IonStorm',
        serverNumber: 1088,
        votes: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5', 'user-6', 'user-7', 'user-8', 'user-9', 'user-10', 'user-11'],
        votesCount: 11,
        commentCount: 3,
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
        id: 'seed-evo-4',
        title: 'Indicateur de temps de rechargement des compétences de héros dans l\'arène',
        category: 'qol',
        description: 'Avoir un compte à rebours numérique précis au lieu d\'une simple jauge circulaire pour anticiper les ultimes de Kama Moai et Jodie Beart.',
        status: 'approved',
        authorUid: 'user-4',
        displayName: 'NovaSniper',
        serverNumber: 1015,
        votes: ['user-1', 'user-2', 'user-3'],
        votesCount: 3,
        commentCount: 1,
        createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    },
    {
        id: 'seed-evo-5',
        title: 'Correction de la désynchronisation des chronos lors de l\'attaque des stations de guilde',
        category: 'bugs',
        description: 'Sur certains appareils Android, le compte à rebours de fin de bouclier des stations a un décalage de 3 secondes avec le serveur.',
        status: 'implemented',
        authorUid: 'user-5',
        displayName: 'TechOfficer',
        serverNumber: 1061,
        votes: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5', 'user-6', 'user-7', 'user-8', 'user-9', 'user-10', 'user-11', 'user-12', 'user-13', 'user-14', 'user-15', 'user-16', 'user-17', 'user-18', 'user-19', 'user-20', 'user-21', 'user-22', 'user-23', 'user-24', 'user-25', 'user-26', 'user-27', 'user-28'],
        votesCount: 28,
        commentCount: 12,
        createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    }
];

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
                localStorage.setItem('fgf_evolutions_list', JSON.stringify(SEED_EVOLUTIONS));
                onData(SEED_EVOLUTIONS);
            } else {
                try {
                    onData(JSON.parse(stored));
                } catch {
                    onData(SEED_EVOLUTIONS);
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
        if (list.length === 0) {
            onData(SEED_EVOLUTIONS);
        } else {
            onData(list);
        }
    }, (error) => {
        console.error("Error subscribing to evolutions: ", error);
        onData(SEED_EVOLUTIONS);
    });
};

/**
 * Add a new evolution thread. Always created with status 'pending' (requires fgfwiki approval).
 *
 * @param {{title: string, category: string, description: string}} threadData
 * @param {{displayName: string, serverNumber: number}} profile
 * @param {string} uid
 * @returns {Promise<string>} Created thread ID
 */
export const addEvolutionThread = async ({ title, category, description }, profile, uid) => {
    if (!uid || !profile) throw new Error("Authentication required");
    const newThread = {
        title: title.trim(),
        category: category || 'general',
        description: description.trim(),
        status: 'pending', // Requires validation by admin fgfwiki
        authorUid: uid,
        displayName: profile.displayName || 'Commander',
        serverNumber: profile.serverNumber || 1,
        votes: [uid],
        votesCount: 1,
        commentCount: 0,
        createdAt: new Date().toISOString(),
    };

    if (!db) {
        const stored = localStorage.getItem('fgf_evolutions_list');
        const list = stored ? JSON.parse(stored) : [...SEED_EVOLUTIONS];
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
