/* ============================================================
   SCRIPT.JS
   BAGIAN 1: DATA PRIBADI  -> edit di sini saja, halaman ikut berubah.
   BAGIAN 2: INTERAKSI     -> tidak perlu diubah.
============================================================ */

/* ---------- BAGIAN 1: DATA PRIBADI (data contoh, silakan ganti) ---------- */
const DATA = {
  name: "Aulan Sakila",
  birthPlace: "",                   // isi tempat lahir jika mau, contoh: "Jakarta". Kosongkan jika tidak ingin ditampilkan.
  birthDate: "2009-12-11",          // format: TAHUN-BULAN-TANGGAL. Umur dihitung otomatis.
  gender: "Perempuan",
  religion: "Islam",
  address: "Jl. Kp. Janis RT 004 RW 009, Kelurahan Pekojan 3, Kecamatan Tambora, Jakarta Barat",
  education: "SMA Jurusan IPS",
  hobbiesShort: "Culinary explorer",
  dream: "Pramugari",

  // Daftar hobi: icon = emoji, title = nama, desc = deskripsi singkat (tambah hobi baru dengan menyalin satu baris)
  hobbies: [
    { icon: "🍜", title: "Culinary Explorer", desc: "I enjoy exploring different kinds of food, discovering new flavors, and trying various cuisines, from local dishes to international specialties." }
  ],

  // Kartu favorit. "color" -> bulatan warna, "link" -> teks menjadi tautan yang bisa diklik
  favorites: [
    { icon: "🥟", label: "Makanan favorit", value: "Dimsum" },
    { icon: "🍋", label: "Minuman favorit", value: "Lemon tea" },
    { icon: "🎵", label: "Musik favorit",   value: "Panasea - Rumah Sakit", link: "https://open.spotify.com/track/2v0vKdardqBzAPhObJyAvd" },
    { icon: "🤍", label: "Warna favorit",   value: "Putih", color: "#ffffff" }
  ],
  likes: "I enjoy exploring new foods and discovering different flavors, taking care of myself through beauty and self-care routines, and spending quality time with my friends. I love trying new things, creating beautiful memories, and enjoying the little moments in life.",

  // Foto "Hal-hal yang saya sukai": taruh file di folder images/ dengan nama sesuai "src", atau klik ikon kamera di website.
  likePhotos: [
    { src: "images/suka-1.jpg", caption: "Kuliner" },
    { src: "images/suka-2.jpg", caption: "Self-care" },
    { src: "images/suka-3.jpg", caption: "Bersama teman" }
  ],

  // Kontak
  instagramName: "a.syql",
  instagramUrl: "https://www.instagram.com/a.syql",
  whatsapp: "6287867380176",        // format wa.me: kode negara 62, tanpa 0 di depan
  whatsappDisplay: "0878-6738-0176",
  spotify: "https://open.spotify.com/track/2v0vKdardqBzAPhObJyAvd",
  spotifyLabel: "Panasea - Rumah Sakit",
  waMessage: "Halo, saya melihat website kamu!"
};

/* Foto bawaan (siluet sederhana) sebelum kamu memilih foto sendiri */
const DEFAULT_PHOTO = "data:image/svg+xml;utf8," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400"><rect width="300" height="400" fill="#fff0f4"/>' +
  '<circle cx="150" cy="150" r="58" fill="#f7c6d4"/><path d="M40 400c0-90 50-140 110-140s110 50 110 140z" fill="#f7c6d4"/></svg>');

/* ---------- BAGIAN 2: INTERAKSI ---------- */
const $ = (id) => document.getElementById(id);

/* Hitung umur dari tanggal lahir */
function hitungUmur(tgl) {
  const lahir = new Date(tgl), now = new Date();
  let umur = now.getFullYear() - lahir.getFullYear();
  const belumUlangTahun = now.getMonth() < lahir.getMonth() ||
    (now.getMonth() === lahir.getMonth() && now.getDate() < lahir.getDate());
  return belumUlangTahun ? umur - 1 : umur;
}

/* Ubah "2005-05-17" menjadi "17 Mei 2005" */
function formatTanggal(tgl) {
  return new Date(tgl).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

/* Membuat kartu HTML (dipakai Hobi, Favorit, dan Kontak) */
function kartu(icon, judul, isi) {
  return `<article class="card reveal"><div class="icon">${icon}</div><h4>${judul}</h4><p>${isi}</p></article>`;
}

/* Isi semua konten dari DATA */
function isiKonten() {
  $("fullName").textContent = DATA.name;
  document.title = DATA.name + " | Personal Website";

  // About Me
  const baris = [
    ["Nama lengkap", DATA.name],
    ["Tempat, tanggal lahir", (DATA.birthPlace ? DATA.birthPlace + ", " : "") + formatTanggal(DATA.birthDate)],
    ["Umur", hitungUmur(DATA.birthDate) + " tahun"],
    ["Alamat", DATA.address],
    ["Jenis kelamin", DATA.gender],
    ["Agama", DATA.religion],
    ["Pendidikan", DATA.education],
    ["Hobi", DATA.hobbiesShort],
    ["Cita-cita", DATA.dream]
  ];
  $("aboutList").innerHTML = baris.map(([k, v]) => `<div class="about-row"><dt>${k}</dt><dd>${v}</dd></div>`).join("");

  // Hobi
  $("hobbyGrid").innerHTML = DATA.hobbies.map(h => kartu(h.icon, h.title, h.desc)).join("");
  $("hobbyGrid").classList.toggle("single", DATA.hobbies.length === 1); // 1 hobi: lebar kartu dibatasi

  // Favorit (dengan bulatan warna bila ada)
  $("favGrid").innerHTML = DATA.favorites.map(f => {
    const swatch = f.color ? `<span class="swatch" style="background:${f.color}"></span>` : "";
    const isi = f.link ? `<a class="text-link" href="${f.link}" target="_blank" rel="noopener">${f.value} ↗</a>` : f.value;
    return kartu(f.icon, f.label, swatch + isi);
  }).join("");
  $("likesText").textContent = DATA.likes;

  // Kontak
  const waLink = `https://wa.me/${DATA.whatsapp}?text=${encodeURIComponent(DATA.waMessage)}`;
  $("contactGrid").innerHTML =
    kartu("📸", "Instagram", "@" + DATA.instagramName) +
    kartu("💬", "WhatsApp", DATA.whatsappDisplay) +
    kartu("🎧", "Spotify", DATA.spotifyLabel);
  $("btnInstagram").href = DATA.instagramUrl;
  $("btnWhatsapp").href = waLink;
  $("btnSpotify").href = DATA.spotify;

  galeriSuka();

  // Footer
  $("copyright").textContent = `© ${new Date().getFullYear()} ${DATA.name}. All rights reserved.`;
}

/* Gambar pengganti jika file foto belum ada */
const PLACEHOLDER = "data:image/svg+xml;utf8," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><rect width="400" height="500" fill="#fff0f4"/>' +
  '<text x="200" y="250" font-size="64" text-anchor="middle">🌸</text>' +
  '<text x="200" y="310" font-size="20" fill="#8d7a84" text-anchor="middle" font-family="sans-serif">Klik kamera untuk tambah foto</text></svg>');

/* Perkecil foto agar muat di penyimpanan browser */
function kecilkan(file, max, selesai) {
  const reader = new FileReader();
  reader.onload = () => {
    const im = new Image();
    im.onload = () => {
      const skala = Math.min(1, max / Math.max(im.width, im.height));
      const c = document.createElement("canvas");
      c.width = im.width * skala; c.height = im.height * skala;
      c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
      selesai(c.toDataURL("image/jpeg", 0.85));
    };
    im.src = reader.result;
  };
  reader.readAsDataURL(file);
}

/* Galeri "Hal-hal yang saya sukai": tiap foto bisa diganti lewat ikon kamera */
function galeriSuka() {
  const box = $("likesGallery");
  box.innerHTML = DATA.likePhotos.map((f, i) =>
    `<figure class="shot reveal" data-i="${i}"><img alt="${f.caption}" loading="lazy">
     <figcaption>${f.caption}</figcaption>
     <button type="button" class="shot-btn" aria-label="Ganti foto ${f.caption}">📷</button>
     <input type="file" accept="image/*" hidden></figure>`).join("");
  box.querySelectorAll(".shot").forEach((fig) => {
    const i = Number(fig.dataset.i);
    const img = fig.querySelector("img"), input = fig.querySelector("input");
    let tersimpan = null;
    try { tersimpan = localStorage.getItem("fotoSuka" + i); } catch (e) {}
    img.onerror = () => { img.onerror = null; img.src = PLACEHOLDER; }; // file belum ada -> pakai gambar pengganti
    img.src = tersimpan || DATA.likePhotos[i].src;
    fig.querySelector("button").addEventListener("click", () => input.click());
    input.addEventListener("change", () => {
      if (!input.files[0]) return;
      kecilkan(input.files[0], 900, (url) => {
        img.src = url;
        try { localStorage.setItem("fotoSuka" + i, url); } catch (e) {}
      });
    });
  });
}

/* Foto profil: tampilkan foto tersimpan (jika ada), dan simpan foto baru */
function aturFoto() {
  const img = $("profilePhoto");
  let tersimpan = null;
  try { tersimpan = localStorage.getItem("fotoProfil"); } catch (e) {}
  img.src = tersimpan || DEFAULT_PHOTO;

  $("photoInput").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      img.src = reader.result;
      // Simpan di browser agar tidak hilang saat halaman dimuat ulang
      try { localStorage.setItem("fotoProfil", reader.result); } catch (err) {}
    };
    reader.readAsDataURL(file);
  });
}

/* Menu HP: buka/tutup, dan tutup otomatis saat menu dipilih */
function aturMenu() {
  const btn = $("menuBtn"), links = $("navLinks");
  btn.addEventListener("click", () => {
    const buka = links.classList.toggle("open");
    btn.setAttribute("aria-expanded", buka);
  });
  links.addEventListener("click", () => links.classList.remove("open"));
}

/* Animasi saat scroll: tambahkan kelas "show" ketika elemen terlihat */
function aturAnimasiScroll() {
  const io = new IntersectionObserver((items) => {
    items.forEach(it => { if (it.isIntersecting) { it.target.classList.add("show"); io.unobserve(it.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
}

/* Tandai menu yang sedang aktif sesuai bagian yang sedang dilihat */
function aturMenuAktif() {
  const links = document.querySelectorAll(".nav-links a");
  const io = new IntersectionObserver((items) => {
    items.forEach(it => {
      if (it.isIntersecting) {
        links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + it.target.id));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section").forEach(s => io.observe(s));
}

/* Jalankan semuanya */
isiKonten();
aturFoto();
aturMenu();
aturAnimasiScroll();
aturMenuAktif();
