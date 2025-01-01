import { initializeApp, getApps, getApp, App, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const service_key = require('./service_key.json')

let app: App;

app = getApps().length === 0 ? initializeApp({credential: cert(service_key)}) : getApp();
const adminDb = getFirestore(app);

export { app as AdminApp, adminDb } ;