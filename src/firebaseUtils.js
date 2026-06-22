import { doc, getDoc, setDoc, collection, addDoc, query, where, getDocs } from "firebase/firestore";
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
 * @param {string|null} firebaseUid Logged in user's ID
 * @param {string} lang Current language code
 * @returns {Promise<number>} User's rank (1 for 1st place, 2 for 2nd, etc.)
 */
export const submitStellaAnomalyUid = async (gameUid, firebaseUid = null, lang = 'en') => {
    if (!db) {
        // Fallback for local testing: increment a counter in localStorage
        const mockCount = parseInt(localStorage.getItem('stella_anomaly_mock_count') || '0', 10) + 1;
        localStorage.setItem('stella_anomaly_mock_count', mockCount.toString());
        return mockCount;
    }
    
    try {
        const submittedAt = new Date().toISOString();
        const colRef = collection(db, "stella_anomaly_submissions");
        
        // Save the submission
        await addDoc(colRef, {
            gameUid,
            firebaseUid,
            lang,
            submittedAt
        });
        
        // Query previous submissions
        const q = query(colRef, where("submittedAt", "<", submittedAt));
        const snap = await getDocs(q);
        
        // Rank is number of previous submissions + 1
        const rank = snap.size + 1;
        return rank;
    } catch (error) {
        console.error("Error submitting Stella Anomaly UID and getting rank: ", error);
        throw error;
    }
};
