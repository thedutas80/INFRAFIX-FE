import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../api/authApi'

const Register: React.FC = () => {
  const navigate = useNavigate()
  const [passwordShown, setPasswordShown] = useState(false)
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false)
  const [address, setAddress] = useState('')
  const [postCode, setPostCode] = useState('')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({})

  // Validation functions based on backend regex patterns
  const validateName = (name: string): string => {
    if (!name.trim()) return 'Name is Required'
    if (!/^[a-zA-Z\s]{5,50}$/.test(name)) return 'Name Only Can Only Contain Letters and Spaces With Length 5 - 50. Ex : Infrastructure Fix'
    return ''
  }

  const validateEmail = (email: string): string => {
    if (!email.trim()) return 'Email is Required'
    if (email.length > 30) return 'Email must not exceed 30 characters'
    if (!/^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) return 'Please Use a Valid Email'
    return ''
  }

  const validatePassword = (password: string): string => {
    if (!password) return 'Password is Required'
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(password)) {
      return 'Password Should Contain 8 - 20 Characters, 1 of Uppercase, Lowercase, Number, and Special Character (@$!%*?&)'
    }
    return ''
  }

  const validatePhoneNumber = (phoneNumber: string): string => {
    if (!phoneNumber.trim()) return 'Phone Number is Required'
    if (phoneNumber.length > 13) return 'Phone Number must not exceed 13 characters'
    if (!/^(\+62|62|0)8\d{7,13}$/.test(phoneNumber)) {
      return 'Use Valid Phone Number. Ex : +6281234567890 Or 6281234567890 Or 081234567890'
    }
    return ''
  }

  const validateAddress = (address: string): string => {
    if (!address.trim()) return 'Address is Required'
    if (!/^[A-Za-z0-9.,\-\/() ]{5,100}$/.test(address)) return 'Please Enter a Valid Address'
    return ''
  }

  const validatePostCode = (postCode: string): string => {
    if (!postCode.trim()) return 'Postal Code is Required'
    if (!/^\d{5}$/.test(postCode)) return 'Please Enter Valid Postal Code'
    return ''
  }

  const clearFieldError = (fieldName: string) => {
    setFieldErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[fieldName]
      return newErrors
    })
  }

  const togglePasswordVisibility = (fieldId: string) => {
    if (fieldId === 'password') {
      setPasswordShown(!passwordShown)
    }
    if (fieldId === 'confirm_password') {
      setConfirmPasswordShown(!confirmPasswordShown)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('full_name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirm_password') as string
    const phoneNumber = formData.get('phone') as string

    // Validate all fields
    const errors: { [key: string]: string } = {}
    const nameError = validateName(name)
    if (nameError) errors.full_name = nameError

    const emailError = validateEmail(email)
    if (emailError) errors.email = emailError

    const passwordError = validatePassword(password)
    if (passwordError) errors.password = passwordError

    const phoneError = validatePhoneNumber(phoneNumber)
    if (phoneError) errors.phone = phoneError

    const addressError = validateAddress(address)
    if (addressError) errors.address = addressError

    const postCodeError = validatePostCode(postCode)
    if (postCodeError) errors.postCode = postCodeError

    // Set field errors if any
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setError('')
      return
    }

    // Clear any existing field errors
    setFieldErrors({})

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const response = await register({
        name,
        password,
        email,
        phoneNumber,
        address,
        postCode,
        roleId: 1
      })
      if (response.success) {
        navigate('/login')
      } else {
        setError(response.message)
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="font-sans antialiased text-gray-800 min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: "url('/assets/img/aman.png')" }}>
      {/* Header / Branding - This will be handled by the main App.tsx header */}

      {/* Register Card */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full mx-auto my-auto">
          <h2 className="text-3xl font-bold text-primary mb-2 text-center">
            Daftar Akun Baru
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Buat akun untuk mulai melaporkan kerusakan.
          </p>

          <form onSubmit={handleSubmit}>
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
                  onChange={(e) => clearFieldError('full_name')}
                  required
                />
                {fieldErrors.full_name && <p className="text-red-500 text-sm mt-1">{fieldErrors.full_name}</p>}
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
                  onChange={(e) => clearFieldError('email')}
                  required
                />
                {fieldErrors.email && <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>}
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Alamat
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value)
                    clearFieldError('address')
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Masukkan Alamat Anda"
                  required
                />
                {fieldErrors.address && <p className="text-red-500 text-sm mt-1">{fieldErrors.address}</p>}
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
                  onChange={(e) => clearFieldError('phone')}
                  required
                />
                {fieldErrors.phone && <p className="text-red-500 text-sm mt-1">{fieldErrors.phone}</p>}
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
                    onChange={(e) => clearFieldError('password')}
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
                {fieldErrors.password && <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>}
              </div>
              <div>
                <label
                  htmlFor="postCode"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Kode Pos
                </label>
                <input
                  type="text"
                  id="postCode"
                  name="postCode"
                  value={postCode}
                  onChange={(e) => {
                    setPostCode(e.target.value)
                    clearFieldError('postCode')
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Masukkan Kode Pos"
                  required
                />
                {fieldErrors.postCode && <p className="text-red-500 text-sm mt-1">{fieldErrors.postCode}</p>}
              </div>
            </div>

            <div className="mb-6">
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
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
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
