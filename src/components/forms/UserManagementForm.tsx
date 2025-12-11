import React, { useState } from 'react';
import { createTechnician } from '../../api/adminApi';
import Swal from 'sweetalert2';

interface UserManagementFormProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

const UserManagementForm: React.FC<UserManagementFormProps> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    postCode: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoading(true);
    setError(null);

    try {
      await createTechnician(formData);
      Swal.fire({
        title: 'Success Add',
        text: 'Technician created successfully!',
        icon: 'success',
        confirmButtonColor: '#3085d6',
      });
      if (onSuccess) onSuccess();
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        postCode: '',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to create technician');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all hover:scale-105 border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
           <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-600">
            Create Technician
          </h2>
          {onClose && (
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
       
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded shadow-sm" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}




        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 ease-in-out"
              placeholder="Tech Bersama"
            />
          </div>

          <div>
             <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 ease-in-out"
               placeholder="tech@example.com"
            />
          </div>

          <div>
             <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 ease-in-out"
               placeholder="********"
            />
          </div>

          <div>
             <label htmlFor="phoneNumber" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 ease-in-out"
               placeholder="081..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
               <label htmlFor="address" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 ease-in-out"
                 placeholder="Street..."
              />
            </div>
            <div>
               <label htmlFor="postCode" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Post Code</label>
              <input
                type="text"
                id="postCode"
                name="postCode"
                value={formData.postCode}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 ease-in-out"
                 placeholder="12345"
              />
            </div>
          </div>

          <div className="flex items-center justify-end mt-6 space-x-3">
             {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-lg text-white font-bold bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-lg transform hover:-translate-y-0.5 transition-all ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Create Technician'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserManagementForm;
