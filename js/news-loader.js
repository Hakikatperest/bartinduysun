import { db } from "./firebase-config.js";
import { collection, getDocs, query, orderBy, where, limit } 
from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const newsContainer = document.getElementById("allNewsContainer");
const breakingContainer = document.getElementById("breakingNewsContent");
const mostReadContainer = document.getElementById("mostReadSidebar");

async function loadAllNews() {
  const q = query(
    collection(db, "haberler"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  newsContainer.innerHTML = "";

  snapshot.forEach(doc => {
    const data = doc.data();

    const card = document.createElement("article");
    card.className = "news-card";

    card.innerHTML = `
      <a href="haber.html?id=${doc.id}">
        <div class="news-image">
          <img src="${data.image}" alt="${data.title}">
        </div>
        <div class="news-content">
          <h3 class="news-title">${data.title}</h3>
          <p class="news-excerpt">${data.excerpt}</p>
          <span class="read-more">Detayları Oku →</span>
        </div>
      </a>
    `;

    newsContainer.appendChild(card);
  });
}

async function loadBreakingNews() {
  const q = query(
    collection(db, "haberler"),
    where("isBreaking", "==", true),
    orderBy("createdAt", "desc"),
    limit(1)
  );

  const snapshot = await getDocs(q);

  snapshot.forEach(doc => {
    const data = doc.data();

    breakingContainer.innerHTML = `
      <a href="haber.html?id=${doc.id}">
        ${data.title}
      </a>
    `;
  });
}

async function loadMostRead() {
  const q = query(
    collection(db, "haberler"),
    orderBy("views", "desc"),
    limit(5)
  );

  const snapshot = await getDocs(q);

  mostReadContainer.innerHTML = "";

  snapshot.forEach(doc => {
    const data = doc.data();

    const item = document.createElement("a");
    item.className = "sidebar-news-item";
    item.href = `haber.html?id=${doc.id}`;

    item.innerHTML = `
      <div class="sidebar-news-img">
        <img src="${data.image}" alt="${data.title}">
      </div>
      <div class="sidebar-news-content">
        <h4 class="sidebar-news-title-text">${data.title}</h4>
      </div>
    `;

    mostReadContainer.appendChild(item);
  });
}

loadAllNews();
loadBreakingNews();
loadMostRead();
