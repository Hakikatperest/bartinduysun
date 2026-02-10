import { db } from "./firebase-config.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

window.addNews = async function() {

  const title = document.getElementById("title").value;
  const excerpt = document.getElementById("excerpt").value;
  const content = document.getElementById("content").value;
  const image = document.getElementById("image").value;
  const category = document.getElementById("category").value;
  const isBreaking = document.getElementById("isBreaking").checked;

  await addDoc(collection(db, "haberler"), {
    title,
    excerpt,
    content,
    image,
    category,
    isBreaking,
    createdAt: serverTimestamp(),
    views: 0
  });

  alert("Haber başarıyla eklendi 🚀");
};

