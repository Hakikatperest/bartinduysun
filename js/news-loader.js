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
      <a href="haber.html?slug=${data.slug}">
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
const galleryContainer = document.getElementById("gallerySlider");
const galleryNavigation = document.getElementById("galleryNavigation");
  const snapshot = await getDocs(q);

  snapshot.forEach(doc => {
    const data = doc.data();

    breakingContainer.innerHTML = `
<a href="haber.html?slug=${data.slug}">
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
item.href = `haber.html?slug=${data.slug}`;

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
async function loadSliderNews() {

  const q = query(
    collection(db, "haberler"),
    where("isSlider", "==", true),
    orderBy("createdAt", "desc"),
    limit(5)
  );

  const snapshot = await getDocs(q);

  galleryContainer.innerHTML = "";
  galleryNavigation.innerHTML = "";

  let index = 0;

  snapshot.forEach(doc => {
    const data = doc.data();

    const slide = document.createElement("div");
    slide.className = "gallery-slide" + (index === 0 ? " active" : "");

    slide.innerHTML = `
      <a href="haber.html?slug=${data.slug}">
        <img src="${data.image}" class="slide-image" alt="${data.title}">
        <div class="slide-overlay">
          <div class="slide-content">
            <h2 class="slide-title">${data.title}</h2>
            <p class="slide-excerpt">${data.excerpt || ""}</p>
          </div>
        </div>
      </a>
    `;

    galleryContainer.appendChild(slide);

    // Navigation kutuları
    const nav = document.createElement("div");
    nav.className = "nav-number" + (index === 0 ? " active" : "");
    nav.innerText = index + 1;
    galleryNavigation.appendChild(nav);

    index++;
  });
}
loadSliderNews();
loadAllNews();
loadBreakingNews();
loadMostRead();
