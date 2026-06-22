import { doc, getDoc, setDoc, collection, addDoc } from "firebase/firestore";
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
 * Submit game UID for the Stella Anomaly event.
 * 
 * @param {string} gameUid In-game User ID
 * @param {string|null} firebaseUid Logged in user's ID
 * @param {string} lang Current language code
 */
export const submitStellaAnomalyUid = async (gameUid, firebaseUid = null, lang = 'en') => {
    if (!db) {
        throw new Error("Firebase database not initialized");
    }
    
    try {
        const colRef = collection(db, "stella_anomaly_submissions");
        await addDoc(colRef, {
            gameUid,
            firebaseUid,
            lang,
            submittedAt: new Date().toISOString()
        });
        return true;
    } catch (error) {
        console.error("Error submitting Stella Anomaly UID: ", error);
        throw error;
    }
};
