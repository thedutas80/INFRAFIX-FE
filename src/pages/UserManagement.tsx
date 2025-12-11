import React, { useState, useEffect } from 'react';
import UserManagementForm from '../components/forms/UserManagementForm';
import { getAllUsers, deleteUser } from '../api/adminApi';
import { toast } from 'react-toastify';
import { FaTrash, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  phoneNumber?: string;
  address?: string;
  postCode?: string;
}

const UserManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllUsers();
      // Inspect the response structure to find the user list
      if (response?.data && Array.isArray(response.data)) {
        setUsers(response.data);
      } else if (response?.data?.content && Array.isArray(response.data.content)) {
        setUsers(response.data.content);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(id);
          Swal.fire(
            'Deleted!',
            'User has been deleted.',
            'success'
          );
          fetchUsers();
        } catch (error: any) {
          Swal.fire(
            'Error!',
             error.message || "Failed to remove user",
            'error'
          );
        }
      }
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">User Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-200 flex items-center transform hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Technician
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {loading ? (
             <div className="flex justify-center items-center p-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
        ) : users.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
                No users found. Start by adding a technician.
            </div>
        ) : (
             <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Contact</th>
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                         <div className="flex-shrink-0 h-10 w-10 text-gray-400 bg-gray-100 rounded-full flex items-center justify-center">
                                            <FaUser className="h-5 w-5" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 dark:text-white flex items-center gap-2">
                                         <FaPhone className="text-gray-400" size={12}/> {user.phoneNumber || '-'}
                                    </div>
                                     <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
                                        <FaMapMarkerAlt className="text-gray-400" size={12}/> {user.address || '-'}
                                     </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role?.toUpperCase() === 'ADMIN' ? 'bg-purple-100 text-purple-800' : user.role?.toUpperCase() === 'TECHNICIAN' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                        {user.role || 'User'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button 
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-600 hover:text-red-900 dark:hover:text-red-400 bg-red-100 dark:bg-red-900/20 p-2 rounded-full hover:bg-red-200 dark:hover:bg-red-900/40 transition duration-200"
                                        title="Remove User"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
      </div>

      {isModalOpen && (
        <UserManagementForm
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            fetchUsers();
          }}
        />
      )}
    </div>
  );
};

export default UserManagement;
