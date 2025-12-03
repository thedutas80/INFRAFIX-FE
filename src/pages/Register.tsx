import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register: React.FC = () => {
  const [passwordShown, setPasswordShown] = useState(false)
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false)

  const togglePasswordVisibility = (fieldId: string) => {
    if (fieldId === 'password') {
      setPasswordShown(!passwordShown)
    }
    if (fieldId === 'confirm_password') {
      setConfirmPasswordShown(!confirmPasswordShown)
    }
  }

  return (
    <div className="font-sans antialiased text-gray-800 bg-light min-h-screen flex flex-col">
      {/* Header / Branding - This will be handled by the main App.tsx header */}

      {/* Register Card */}
      <main className="flex-grow flex items-center justify-center py-10 px-4">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full mx-auto my-auto">
          <h2 className="text-3xl font-bold text-primary mb-2 text-center">
            Daftar Akun Baru
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Buat akun untuk mulai melaporkan kerusakan.
          </p>

          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label
                  htmlFor="full_name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Masukkan Nama Lengkap Anda"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Masukkan Email Anda"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Buat Username"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  No. Telepon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="0812xxxxxx"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={passwordShown ? 'text' : 'password'}
                    id="password"
                    name="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Buat Password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
                    onClick={() => togglePasswordVisibility('password')}
                  >
                    <img
                      src="https://img.icons8.com/material-outlined/24/096B68/visible--v1.png"
                      alt="Toggle visibility"
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirm_password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <input
                    type={confirmPasswordShown ? 'text' : 'password'}
                    id="confirm_password"
                    name="confirm_password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Konfirmasi Password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
                    onClick={() => togglePasswordVisibility('confirm_password')}
                  >
                    <img
                      src="https://img.icons8.com/material-outlined/24/096B68/visible--v1.png"
                      alt="Toggle visibility"
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Checkbox & Persetujuan */}
            <div className="mb-6 space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="form-checkbox h-4 w-4 text-primary transition duration-150 ease-in-out"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-gray-700">
                  Saya menyetujui
                  <a href="#" className="text-primary hover:underline">
                    Syarat & Ketentuan
                  </a>
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="data_consent"
                  name="data_consent"
                  className="form-checkbox h-4 w-4 text-primary transition duration-150 ease-in-out"
                  required
                />
                <label
                  htmlFor="data_consent"
                  className="ml-2 block text-gray-700"
                >
                  Saya bersedia data saya digunakan untuk keperluan verifikasi
                  laporan
                </label>
              </div>
            </div>

            {/* Tombol Aksi */}
            <button
              type="submit"
              className="bg-primary hover:bg-secondary text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 w-full text-lg"
            >
              Daftar Sekarang
            </button>
            <p className="text-center text-gray-500 text-sm mt-4">
              Sudah punya akun?
              <Link
                to="/login"
                className="text-primary hover:text-secondary font-semibold"
              >
                Masuk di sini
              </Link>
              .
            </p>

            {/* Info Keamanan */}
            <div className="text-center mt-8 text-gray-500 flex items-center justify-center">
              <img
                src="https://img.icons8.com/ios-filled/24/9CA3AF/lock.png"
                alt="Lock icon"
                className="w-5 h-5 mr-2"
              />
              <p className="text-sm">Data Anda dienkripsi dan aman</p>
            </div>
          </form>
        </div>
      </main>

      {/* Footer - This will be handled by the main App.tsx footer */}
    </div>
  )
}

export default Register
