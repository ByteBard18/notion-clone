import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDKvNeKSh4oINaXgN4k3uAh4LuolDCheBI",
    authDomain: "notion-clone-6e870.firebaseapp.com",
    projectId: "notion-clone-6e870",
    storageBucket: "notion-clone-6e870.firebasestorage.app",
    messagingSenderId: "760066254828",
    appId: "1:760066254828:web:c280db47963faee4ee02c9"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app);

export { app, db };