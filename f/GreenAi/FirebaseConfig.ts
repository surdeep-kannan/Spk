// firebaseConfig.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  initializeAuth, 
  getAuth, 
  Auth, 
  inMemoryPersistence
} from "firebase/auth"; 

// Using your logistic-15f9d project details
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

try {
  // FIX: Using inMemoryPersistence to bypass the module not found error.
  auth = initializeAuth(app, {
    persistence: inMemoryPersistence, 
  });
} catch (e) {
  auth = getAuth(app);
}

export { app, auth };