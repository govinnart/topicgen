// SECTION: Utils
// Fungsi untuk mengambil elemen acak dari sebuah array
const pickRandom = (items) => items[Math.floor(Math.random() * items.length)];

// SECTION: Elemen DOM
const topicText = document.getElementById("topic-text");
const outputTrack = document.getElementById("output-track");
const generateButton = document.getElementById("generate-btn");

// SECTION: Sumber data topik dari topic.js
// Menggabungkan semua topik dari topicsByLang.en (semua kategori/level)
function buildCandidateList() {
  const candidates = [];

  if (!window.topicsByLang || !window.topicsByLang.en) {
    console.warn("topicsByLang.en tidak ditemukan. Pastikan topic.js sudah dimuat.");
    return candidates;
  }

  const enTopics = window.topicsByLang.en;

  // enTopics bisa berupa { easy: [...], medium: [...], hard: [...] }
  Object.values(enTopics).forEach((list) => {
    list.forEach((topic) => {
      // Jika item berupa objek { text: "..." }
      if (typeof topic === "object" && topic !== null && "text" in topic) {
        candidates.push(topic.text);
      } else if (typeof topic === "string") {
        // Atau langsung string
        candidates.push(topic);
      }
    });
  });

  return candidates;
}

// SECTION: Logika generator topik
function generateTopic() {
  const candidates = buildCandidateList();
  if (!candidates.length) {
    if (topicText) {
      topicText.textContent = "Data topik belum tersedia. Cek kembali file topic.js.";
    }
    return;
  }

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

  // Tambahkan kelas dim untuk efek halus
  outputTrack.parentElement.classList.add("generator__output--dimmed");

  // Setelah animasi selesai, sisakan hanya teks baru
  setTimeout(() => {
    outputTrack.parentElement.classList.remove("generator__output--dimmed");
    outputTrack.innerHTML = "";
    const finalP = document.createElement("p");
    finalP.className = "output-text";
    finalP.textContent = next;
    outputTrack.appendChild(finalP);
  }, 1000);
}

// SECTION: Event Handlers
if (generateButton) {
  generateButton.addEventListener("click", generateTopic);
}
