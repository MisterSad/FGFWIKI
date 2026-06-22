import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Helper to load env variables manually from .env files in Node
function loadEnv() {
    const envPaths = [
        path.join(projectRoot, '.env.local'),
        path.join(projectRoot, '.env.production'),
        path.join(projectRoot, '.env')
    ];
    
    for (const envPath of envPaths) {
        if (fs.existsSync(envPath)) {
            const content = fs.readFileSync(envPath, 'utf8');
            content.split('\n').forEach(line => {
                const match = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);
                if (match) {
                    const key = match[1];
                    let value = match[2] || '';
                    if (value.startsWith('"') && value.endsWith('"')) {
                        value = value.slice(1, -1);
                    }
                    process.env[key] = value;
                }
            });
            console.log(`Loaded environment configuration from: ${path.basename(envPath)}`);
            return true;
        }
    }
    return false;
}

async function fetchWinners() {
    loadEnv();
    
    const firebaseConfig = {
        apiKey: process.env.VITE_FIREBASE_API_KEY,
        authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.VITE_FIREBASE_APP_ID
    };
    
    if (!firebaseConfig.apiKey) {
        console.error("Error: VITE_FIREBASE_API_KEY not found. Please ensure you have a .env file configured.");
        process.exit(1);
    }
    
    try {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        
        console.log("Connecting to Firestore database...");
        const colRef = collection(db, "stella_anomaly_submissions");
        const q = query(colRef, orderBy("submittedAt", "asc"));
        
        const querySnapshot = await getDocs(q);
        const submissions = [];
        
        querySnapshot.forEach((doc) => {
            submissions.push({ id: doc.id, ...doc.data() });
        });
        
        console.log(`\nFound ${submissions.length} total submissions.\n`);
        console.log("==================================================");
        console.log("             STELLA ANOMALY LEADERBOARD           ");
        console.log("==================================================");
        
        if (submissions.length === 0) {
            console.log("No submissions registered yet.");
            process.exit(0);
        }
        
        submissions.forEach((sub, index) => {
            const rank = index + 1;
            let badge = `[${rank}th]`;
            let reward = "Participation logged";
            
            if (rank === 1) {
                badge = "🏆 [1st]";
                reward = "1,000 Platinum Credits";
            } else if (rank === 2) {
                badge = "🥈 [2nd]";
                reward = "500 Platinum Credits";
            } else if (rank === 3) {
                badge = "🥉 [3rd]";
                reward = "250 Platinum Credits";
            }
            
            console.log(`${badge.padEnd(8)} UID: ${sub.gameUid.padEnd(15)} Date: ${sub.submittedAt} | Reward: ${reward}`);
        });
        
        console.log("==================================================");
        
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}

fetchWinners();
