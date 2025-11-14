// firebaseConfig.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getAuth, Auth, inMemoryPersistence } from "firebase/auth"; 
// Firestore: Import necessary functions
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhe012RaDiImbr98_7TxhVdLuMggkEuRI",
  authDomain: "logistic-15f9d.firebaseapp.com",
  projectId: "logistic-15f9d",
  storageBucket: "logistic-15f9d.firebasestorage.app",
  messagingSenderId: "770143528296",
  appId: "1:770143528296:web:af4709abfd81270976a2dd"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
let auth: Auth; 
let db: Firestore;

try {
  // Initialize Auth using inMemoryPersistence for dev stability
  auth = initializeAuth(app, { persistence: inMemoryPersistence });
  // Initialize Firestore
  db = getFirestore(app);
} catch (e) {
  auth = getAuth(app);
  db = getFirestore(app);
}

export { app, auth, db };