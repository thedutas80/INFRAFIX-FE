import React from 'react'
import { Link } from 'react-router-dom'

const MainContent: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1
              className="text-5xl font-bold leading-tight mb-4"
              id="main-title"
            >
              Lapor Infrastruktur Rusak di Daerah Anda
            </h1>
            <p className="text-xl mb-8">
              Bantu kami mempercepat perbaikan fasilitas umum.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8 justify-center md:justify-start">
              <Link
                to="/register"
                className="bg-secondary hover:bg-opacity-80 text-white font-bold py-3 px-6 rounded-full transition duration-300 text-center"
              >
                Laporkan Sekarang
              </Link>
              <Link
                to="/"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-primary text-white font-bold py-3 px-6 rounded-full transition duration-300 text-center"
              >
                Cek Status Laporan
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            {/* Placeholder for Illustration/Icons */}
            <img
              src="/assets/img/jalan.jpg"
              alt="Lapor Infrastruktur Rusak"
              className="max-w-full h-auto object-cover rounded-lg shadow-xl"
              style={{ maxWidth: '80%', height: 'auto' }}
            />
          </div>
        </div>
      </section>

      {/* Penjelasan Singkat (About / Why Section) */}
      <section className="bg-light py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-12">
            Kenapa Pelaporan Infrastruktur Penting?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-lg shadow-lg bg-white">
              <img
                src="https://img.icons8.com/ios-filled/60/096B68/speed.png"
                alt="Ikon Cepat"
                className="mx-auto mb-4 w-16 h-16"
              />
              <h3 className="text-xl font-semibold mb-2 text-secondary">
                Mempercepat perbaikan
              </h3>
              <p>Laporan Anda langsung kami teruskan ke pihak terkait.</p>
            </div>
            <div className="p-6 rounded-lg shadow-lg bg-white">
              <img
                src="https://img.icons8.com/ios-filled/60/096B68/safe.png"
                alt="Ikon Aman"
                className="mx-auto mb-4 w-16 h-16"
              />
              <h3 className="text-xl font-semibold mb-2 text-secondary">
                Meminimalisir kecelakaan
              </h3>
              <p>
                Infrastruktur yang cepat diperbaiki mengurangi risiko bahaya.
              </p>
            </div>
            <div className="p-6 rounded-lg shadow-lg bg-white">
              <img
                src="https://img.icons8.com/ios-filled/60/096B68/database.png"
                alt="Ikon Data"
                className="mx-auto mb-4 w-16 h-16"
              />
              <h3 className="text-xl font-semibold mb-2 text-secondary">
                Data laporan lebih akurat
              </h3>
              <p>Dengan detail lokasi dan foto langsung dari lapangan.</p>
            </div>
            <div className="p-6 rounded-lg shadow-lg bg-white">
              <img
                src="https://img.icons8.com/ios-filled/60/096B68/visible.png"
                alt="Ikon Transparan"
                className="mx-auto mb-4 w-16 h-16"
              />
              <h3 className="text-xl font-semibold mb-2 text-secondary">
                Transparansi pemerintah/pengelola
              </h3>
              <p>Melihat langsung dampak laporan Anda terhadap perbaikan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cara Kerja (How It Works) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-12">
            Bagaimana Cara Kerjanya?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <img
                src="https://img.icons8.com/ios-filled/80/096B68/camera--v1.png"
                alt="Ikon Ambil Foto"
                className="mb-4 w-20 h-20"
              />
              <h3 className="text-2xl font-semibold text-secondary mb-2">
                1. Ambil Foto
              </h3>
              <p className="text-center">
                Ambil foto kerusakan (jalan berlubang, lampu padam, dsb).
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://img.icons8.com/ios-filled/80/096B68/form.png"
                alt="Ikon Lengkapi Formulir"
                className="mb-4 w-20 h-20"
              />
              <h3 className="text-2xl font-semibold text-secondary mb-2">
                2. Lengkapi Formulir
              </h3>
              <p className="text-center">Isi lokasi dan detail kerusakan.</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://img.icons8.com/ios-filled/80/096B68/paper-plane.png"
                alt="Ikon Kirim Laporan"
                className="mb-4 w-20 h-20"
              />
              <h3 className="text-2xl font-semibold text-secondary mb-2">
                3. Kirim Laporan
              </h3>
              <p className="text-center">Laporkan kerusakan dengan mudah.</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://img.icons8.com/ios-filled/80/096B68/monitor.png"
                alt="Ikon Pantau Status"
                className="mb-4 w-20 h-20"
              />
              <h3 className="text-2xl font-semibold text-secondary mb-2">
                4. Pantau Status
              </h3>
              <p className="text-center">
                Dapatkan informasi perkembangan perbaikan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistik / Bukti Transparansi */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-12">
            Statistik Laporan Infrastruktur
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <p className="text-5xl font-bold text-secondary mb-2">12345</p>
              <p className="text-xl text-gray-600">Total Laporan Masuk</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <p className="text-5xl font-bold text-secondary mb-2">9876</p>
              <p className="text-xl text-gray-600">Infrastruktur Diperbaiki</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <p className="text-5xl font-bold text-secondary mb-2">3 Hari</p>
              <p className="text-xl text-gray-600">
                Waktu Rata-rata Penanganan
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <p className="text-5xl font-bold text-secondary mb-2">50+</p>
              <p className="text-xl text-gray-600">Wilayah Tercover</p>
            </div>
          </div>
        </div>
      </section>

      {/* Jenis Infrastruktur yang Bisa Dilaporkan */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-12">
            Jenis Infrastruktur yang Bisa Dilaporkan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg shadow-lg bg-accent text-white">
              <img
                src="https://img.icons8.com/ios-filled/80/FFFFFF/road--v1.png"
                alt="Ikon Jalan Rusak"
                className="mx-auto mb-4 w-20 h-20"
              />
              <h3 className="text-2xl font-semibold mb-2">Jalan Rusak</h3>
              <p>Lubang, retakan, atau kerusakan lain pada permukaan jalan.</p>
            </div>
            <div className="p-6 rounded-lg shadow-lg bg-accent text-white">
              <img
                src="https://img.icons8.com/ios-filled/80/FFFFFF/light-on.png"
                alt="Ikon Lampu Jalan Mati"
                className="mx-auto mb-4 w-20 h-20"
              />
              <h3 className="text-2xl font-semibold mb-2">Lampu Jalan Mati</h3>
              <p>Penerangan jalan yang tidak berfungsi atau rusak.</p>
            </div>
            <div className="p-6 rounded-lg shadow-lg bg-accent text-white">
              <img
                src="https://img.icons8.com/ios-filled/80/FFFFFF/water.png"
                alt="Ikon Drainase Tersumbat / Selokan Air"
                className="mx-auto mb-4 w-20 h-20"
              />
              <h3 className="text-2xl font-semibold mb-2">
                Drainase Tersumbat
              </h3>
              <p>Saluran air yang mampet menyebabkan genangan.</p>
            </div>
            <div className="p-6 rounded-lg shadow-lg bg-accent text-white">
              <img
                src="https://img.icons8.com/ios-filled/80/FFFFFF/traffic-light.png"
                alt="Ikon Rambu Lalu Lintas Rusak"
                className="mx-auto mb-4 w-20 h-20"
              />
              <h3 className="text-2xl font-semibold mb-2">
                Rambu Lalu Lintas Rusak
              </h3>
              <p>Rambu yang hilang, bengkok, atau tidak terbaca.</p>
            </div>
            <div className="p-6 rounded-lg shadow-lg bg-accent text-white">
              <img
                src="https://img.icons8.com/ios-filled/80/FFFFFF/building.png"
                alt="Ikon Gedung Fasilitas Umum"
                className="mx-auto mb-4 w-20 h-20"
              />
              <h3 className="text-2xl font-semibold mb-2">
                Gedung Fasilitas Umum
              </h3>
              <p>
                Kerusakan pada bangunan publik seperti sekolah atau puskesmas.
              </p>
            </div>
            <div className="p-6 rounded-lg shadow-lg bg-accent text-white">
              <img
                src="https://img.icons8.com/ios-filled/80/FFFFFF/bridge.png"
                alt="Ikon Jembatan / Trotoar"
                className="mx-auto mb-4 w-20 h-20"
              />
              <h3 className="text-2xl font-semibold mb-2">
                Jembatan / Trotoar
              </h3>
              <p>
                Kerusakan struktural pada jembatan atau trotoar yang
                membahayakan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimoni / Ulasan Warga */}
      <section className="bg-light py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-12">
            Apa Kata Mereka?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg italic">
              <p className="text-lg mb-4">
                "Laporan saya ditindak dalam 3 hari, mantap! Prosesnya cepat dan
                transparan."
              </p>
              <p className="font-bold text-secondary">
                - Budi Santoso, Warga Jakarta
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg italic">
              <p className="text-lg mb-4">
                "Aplikasi ini sangat mudah digunakan, saya bisa lapor kapan saja
                dan dari mana saja."
              </p>
              <p className="font-bold text-secondary">
                - Siti Aminah, Warga Bandung
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg italic">
              <p className="text-lg mb-4">
                "Saya senang melihat laporan saya langsung diproses. Terima
                kasih telah peduli!"
              </p>
              <p className="font-bold text-secondary">
                - Joko Susilo, Warga Surabaya
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Kedua (CTA) */}
      <section className="bg-primary text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">
            Laporkan Infrastruktur Rusak Sekarang
          </h2>
          <p className="text-xl mb-8">Setiap laporan Anda berdampak besar.</p>
          <Link
            to="/register"
            className="bg-secondary hover:bg-opacity-80 text-white font-bold py-4 px-8 rounded-full text-2xl transition duration-300"
          >
            Laporkan Sekarang
          </Link>
        </div>
      </section>
    </>
  )
}

export default MainContent
