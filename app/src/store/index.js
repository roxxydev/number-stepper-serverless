import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import Dotenv from 'dotenv';

Dotenv.config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.PROJECT_ID
};

initializeApp(firebaseConfig);
const Db = getFirestore();

export default Db;
