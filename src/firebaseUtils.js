import { doc, getDoc, setDoc, collection, addDoc, runTransaction, query, orderBy, where, deleteDoc, onSnapshot, serverTimestamp, getDocs, limit } from "firebase/firestore";
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
