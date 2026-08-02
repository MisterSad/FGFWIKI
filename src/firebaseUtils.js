import { doc, getDoc, setDoc, collection, addDoc, runTransaction } from "firebase/firestore";
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
