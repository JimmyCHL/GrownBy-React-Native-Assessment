import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCw-dYj3NkTfafziLowNYrIASkq636aPNc',
  authDomain: 'grownby-react-native.firebaseapp.com',
  projectId: 'grownby-react-native',
  storageBucket: 'grownby-react-native.appspot.com',
  messagingSenderId: '229946373981',
  appId: '1:229946373981:web:e5348e243f3aaba237dab4',
  measurementId: 'G-YX8KWDTB26',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const firestoreDB = getFirestore(app);
export const storage = getStorage(app);
