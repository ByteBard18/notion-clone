import { initializeApp, getApps, getApp, App, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Get the Firebase service account key from the environment variable
const service_key = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}');

let app: App;

app = getApps().length === 0 ? initializeApp({ credential: cert(service_key) }) : getApp();
const adminDb = getFirestore(app);

export { app as AdminApp, adminDb };
