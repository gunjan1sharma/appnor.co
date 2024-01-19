import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNxv387BO1l63Kbrk1Vqglw0xL5mXkDfA",
  authDomain: "appnor-dd729.firebaseapp.com",
  projectId: "appnor-dd729",
  storageBucket: "appnor-dd729.appspot.com",
  messagingSenderId: "141151017117",
  appId: "1:141151017117:web:45f6b3bfc574ad4588dc74",
  measurementId: "G-88QPHSXBD3",
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export default app;
