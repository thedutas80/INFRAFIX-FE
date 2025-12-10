# INFRAFIX-FE

INFRAFIX-FE adalah aplikasi frontend untuk platform INFRAFIX, yang dirancang untuk memfasilitasi manajemen infrastruktur, pelaporan, dan pelacakan pemeliharaan. Aplikasi ini menyediakan antarmuka yang lengkap bagi pengguna untuk melaporkan masalah, melacak kemajuan perbaikan, mengelola penugasan, dan melihat audit.

## 🚀 Fitur

- **Otentikasi**: Login dan Registrasi yang aman untuk pengguna.
- **Dashboard**: Tinjauan status infrastruktur dan aktivitas terkini.
- **Manajemen Citizen**: Pengelolaan dan pemantauan aktivitas warga.
- **Manajemen Teknisi**: Pengelolaan data teknisi dan penugasan lapangan.
- **Manajemen Admin**: Kontrol administratif penuh terhadap sistem.
- **Manajemen Pengelola**: Koordinasi dan pengawasan operasional infrastruktur.
- **Sistem Pelaporan**: Mengajukan laporan untuk masalah infrastruktur (`Report`).
- **Manajemen Penugasan**: Melacak dan mengelola penugasan tugas (`Assignments`).
- **Pelacakan Kemajuan**: Memantau status perbaikan atau tugas yang sedang berlangsung (`Progress`).
- **Log Audit**: Melihat aktivitas sistem dan audit (`Audit`).
- **Kategori**: Mengelola kategori infrastruktur (`Categories`).
- **Penilaian & Umpan Balik**: Sistem untuk memberikan penilaian pada tugas yang telah selesai (`Ratings`).
- **Notifikasi**: Pemberitahuan dan peringatan waktu nyata (`Notifications`).
- **Manajemen Profil**: Pengaturan pengguna dan pembaruan profil (`SettingProfile`).

## 🛠️ Teknologi yang Digunakan

Proyek ini dibangun menggunakan teknologi web modern:

- **Framework**: [React](https://reactjs.org/) dengan [Vite](https://vitejs.dev/)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Manajemen State**: [Zustand](https://github.com/pmndrs/zustand)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) dengan validasi [Zod](https://github.com/colinhacks/zod)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Ikon**: [React Icons](https://react-icons.github.io/react-icons/) & [Heroicons](https://heroicons.com/)

## 📦 Memulai

### Prasyarat

Pastikan Anda telah menginstal:
- [Node.js](https://nodejs.org/) (Versi LTS terbaru direkomendasikan)
- [npm](https://www.npmjs.com/) atau [yarn](https://yarnpkg.com/)

### Instalasi

1. Kloning repositori:
   ```bash
   git clone https://github.com/thedutas80/INFRAFIX-FE.git
   ```

2. Masuk ke direktori proyek:
   ```bash
   cd INFRAFIX-FE
   ```

3. Instal dependensi:
   ```bash
   npm install
   # atau
   yarn install
   ```

### Menjalankan Aplikasi

Untuk memulai server pengembangan:

```bash
npm run dev
# atau
yarn dev
```

Aplikasi akan tersedia di `http://localhost:5173` (atau port yang ditampilkan di terminal Anda).

### Build untuk Produksi

Untuk membuat build produksi:

```bash
npm run build
# atau
yarn build
```

Untuk meninjau build produksi secara lokal:

```bash
npm run serve
# atau
yarn serve
```

## 📂 Struktur Proyek

```
INFRAFIX-FE/
├── public/              # Aset statis
├── src/
│   ├── api/             # Konfigurasi API dan panggilan servis
│   ├── components/      # Komponen UI yang dapat digunakan kembali
│   ├── pages/           # Halaman aplikasi (views)
│   ├── store/           # Manajemen state global (Zustand)
│   ├── types/           # Definisi tipe TypeScript
│   ├── App.tsx          # Komponen utama aplikasi
│   └── main.tsx         # Titik masuk (Entry point)
├── .eslintrc.js         # Konfigurasi ESLint
├── tailwind.config.js   # Konfigurasi Tailwind CSS
├── tsconfig.json        # Konfigurasi TypeScript
└── vite.config.ts       # Konfigurasi Vite
```

## 🤝 Kontribusi

Kontribusi sangat kami harapkan! Silakan ikuti langkah-langkah berikut:

1. Fork repositori ini.
2. Buat branch baru (`git checkout -b fitur/FiturAnda`).
3. Commit perubahan Anda (`git commit -m 'Menambahkan fitur baru'`).
4. Push ke branch tersebut (`git push origin fitur/FiturAnda`).
5. Buat Pull Request.

## 📄 Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file [LICENSE](LICENSE) untuk detailnya.
