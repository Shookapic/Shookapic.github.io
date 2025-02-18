import { initializeApp } from 'firebase/app';
import { getDatabase, ref, runTransaction } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const incrementVisitorCount = async () => {
  try {
    const visitorCountRef = ref(database, 'visitorCount');
    
    await runTransaction(visitorCountRef, (currentCount) => {
      return (currentCount || 0) + 1;
    });
  } catch (error) {
    console.error("Error incrementing visitor count:", error);
  }
};

export const getVisitorCount = async () => {
  try {
    const visitorCountRef = ref(database, 'visitorCount');
    
    // You would typically implement this with onValue or get method
    // This is a placeholder for actual implementation
    return 0;
  } catch (error) {
    console.error("Error getting visitor count:", error);
    return 0;
  }
};
