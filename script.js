// SECTION: Data
// Kumpulan ide topik pidato dalam beberapa kategori.
const TOPIC_BANK = {
  personal: [
    {
      text: "Satu keputusan kecil yang diam-diam mengubah arah hidupmu.",
    },
    {
      text: "Tradisi masa kecil di keluargamu dan pelajaran yang kamu ambil darinya.",
    },
    {
      text: "Pengalaman gagal yang justru kamu syukuri dan alasannya.",
    },
    {
      text: "Percakapan paling berkesan yang kamu alami dalam setahun terakhir.",
    },
    {
      text: "Satu kebiasaan kecil yang membuat harimu lebih baik dan bagaimana kamu membangunnya.",
    },
  ],
  persuasive: [
    {
      text: "Mengapa sekolah atau tempat kerja sebaiknya punya satu jam tanpa gawai setiap minggu.",
    },
    {
      text: "Haruskah nilai siswa lebih menekankan usaha atau hasil? Jelaskan pendapatmu.",
    },
    {
      text: "Bujuk pendengarmu untuk mencoba satu tantangan yang mendorong mereka keluar dari zona nyaman bulan ini.",
    },
    {
      text: "Mengapa belajar public speaking seharusnya diperlakukan seperti belajar olahraga.",
    },
  ],
  informative: [
    {
      text: "Jelaskan teknologi atau aplikasi yang sering dipakai orang, tapi jarang benar-benar dipikirkan cara kerjanya.",
    },
    {
      text: "Jelaskan sistem sederhana yang kamu pakai agar tetap teratur saat hidup sedang sibuk.",
    },
    {
      text: "Ajarkan satu konsep yang menurutmu seharusnya dijelaskan lebih baik di sekolah.",
    },
    {
      text: "Jelaskan bagaimana satu benda sehari-hari favoritmu dirancang dan dibuat.",
    },
  ],
  fun: [
    {
      text: "Kalau hewan peliharaanmu bisa mengirim pesan, kira-kira apa pesan yang paling sering mereka kirim dan kenapa?",
    },
    {
      text: "Buat satu peraturan sekolah atau kantor yang terdengar konyol tapi sebenarnya bermanfaat.",
    },
    {
      text: "Ceritakan versi hari sempurna ala kamu jika harus mengulang hari itu selama sebulan.",
    },
    {
      text: "Pilih satu tokoh fiksi yang kamu rasa mirip dengan dirimu dan jelaskan kenapa kalian akan jadi tim yang hebat.",
    },
  ],
};

// Fungsi untuk mengambil elemen acak dari sebuah array
const pickRandom = (items) => items[Math.floor(Math.random() * items.length)];

// SECTION: Elemen DOM
const topicText = document.getElementById("topic-text");
const outputTrack = document.getElementById("output-track");
const generateButton = document.getElementById("generate-btn");

// SECTION: Logika generator topik
function buildCandidateList() {
  let candidates = [];

  Object.values(TOPIC_BANK).forEach((list) => {
    list.forEach((topic) => candidates.push(topic.text));
  });

  return candidates;
}

function generateTopic() {
  const candidates = buildCandidateList();
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
