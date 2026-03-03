// ===============================
// SECTION: Utilities
// ===============================

// Ambil elemen random dari array
const pickRandom = (items) =>
  items[Math.floor(Math.random() * items.length)];


// ===============================
// SECTION: Elemen DOM
// ===============================

const topicText = document.getElementById("topic-text");
const outputTrack = document.getElementById("output-track");
const generateButton = document.getElementById("generate-btn");


// ===============================
// SECTION: Ambil Data dari topics.js
// ===============================

// Pastikan topics.js sudah dimuat sebelum file ini
// (urutan di index.html harus topics.js dulu baru script.js)

function buildCandidateList() {
  let candidates = [];

  // GANTI kalau nanti kamu punya multi language
  const SOURCE = topicsByLang_en;

  if (!SOURCE) return candidates;

  Object.values(SOURCE).forEach((categoryArray) => {
    categoryArray.forEach((topic) => {
      candidates.push(topic); // karena ini sudah string
    });
  });

  return candidates;
}


// ===============================
// SECTION: Generator Logic
// ===============================

function generateTopic() {
  const candidates = buildCandidateList();

  if (!candidates.length) return;

  const next = pickRandom(candidates);

  if (!outputTrack || !topicText) return;

  const oldText = topicText.textContent;

  // Buat elemen baru untuk animasi vertikal
  const newP = document.createElement("p");
  newP.className = "output-text output-text--transitioning";
  newP.textContent = next;

  // Reset track dan tambahkan dua elemen untuk efek atas-bawah
  outputTrack.innerHTML = "";

  const oldP = document.createElement("p");
  oldP.className = "output-text output-text--transitioning";
  oldP.textContent = oldText;

  outputTrack.appendChild(oldP);
  outputTrack.appendChild(newP);

  // Tambahkan efek dim
  outputTrack.parentElement.classList.add("generator__output--dimmed");

  // Setelah animasi selesai, sisakan teks baru
  setTimeout(() => {
    outputTrack.parentElement.classList.remove("generator__output--dimmed");
    outputTrack.innerHTML = "";

    const finalP = document.createElement("p");
    finalP.className = "output-text";
    finalP.textContent = next;

    outputTrack.appendChild(finalP);
  }, 1000);
}


// ===============================
// SECTION: Event Listener
// ===============================

if (generateButton) {
  generateButton.addEventListener("click", generateTopic);
}
