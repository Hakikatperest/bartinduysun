import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDL5f3Hv_H1fXLM25W8z-OW_AclIJEW7Ho",
  authDomain: "bartin-duysun.firebaseapp.com",
  projectId: "bartin-duysun",
  storageBucket: "bartin-duysun.firebasestorage.app",
  messagingSenderId: "620094068960",
  appId: "1:620094068960:web:ce0f12625eccc9de019885",
  measurementId: "G-FT8JFGF9KT"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
