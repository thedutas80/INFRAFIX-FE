import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RatingForm from '../components/forms/RatingForm'; // Import the form component
import Swal from 'sweetalert2';

const Ratings: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingRating, setEditingRating] = useState<any | null>(null);
  const [ratingsData, setRatingsData] = useState([
    { id: '1', reportId: 'INFRA-001', score: 5, comment: 'Sangat cepat tanggap, terima kasih!', createAt: '10/12/2025' },
    { id: '2', reportId: 'INFRA-003', score: 4, comment: 'Pengerjaan rapi, tapi agak telat sedikit.', createAt: '11/12/2025' },
    { id: '3', reportId: 'INFRA-005', score: 5, comment: 'Luar biasa, jalanan kembali mulus.', createAt: '12/12/2025' },
    { id: '4', reportId: 'INFRA-007', score: 3, comment: 'Masih ada sisa material berserakan.', createAt: '12/12/2025' },
    { id: '5', reportId: 'INFRA-010', score: 5, comment: 'Pelayanan ramah dan profesional.', createAt: '13/12/2025' },
  ]);

  const handleAddRating = () => {
    setEditingRating(null);
    setShowForm(true);
  };

  const handleEditRating = (rating: any) => {
    setEditingRating(rating);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingRating(null);
  };

  const handleSubmitForm = (formData: any) => {
    console.log('Form submitted with data:', formData);
    // In a real app, you'd update state or send to API
    setShowForm(false);
    setEditingRating(null);
  };

  const handleDeleteRating = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      // Simulate API call and state update
      setRatingsData(prev => prev.filter(r => r.id !== id));
      Swal.fire(
        'Deleted!',
        'The rating has been deleted.',
        'success'
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Ratings</h1>

      {/* <div className="mb-4 flex justify-end">
        <button
          onClick={handleAddRating}
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add New Rating
        </button>
      </div> */}

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Comment
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Create At
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ratingsData.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.reportId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.score}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.comment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.createAt}
                  </td>
                  <td className="px-6 py-4 text-left text-sm font-medium">
                    <div className="flex items-center flex-wrap">
                      <button
                        onClick={() => handleEditRating(item)}
                        className="inline-flex items-center justify-center p-1 rounded-md hover:bg-gray-200 mr-2 my-1"
                      >
                        <img src="https://i.ibb.co.com/Y76N1NpV/edit.png" alt="Edit" className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteRating(item.id)}
                        className="inline-flex items-center justify-center p-1 rounded-md hover:bg-gray-200 my-1">
                        <img src="https://i.ibb.co.com/m5PPgt5P/sampah.png" alt="Delete" className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <nav
          className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
          aria-label="Pagination"
        >
          <div className="flex-1 flex justify-between sm:justify-end">
            <Link
              to="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </Link>
            <div className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              1
            </div>
            <Link
              to="#"
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              2
            </Link>
            <Link
              to="#"
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              3
            </Link>
            <span className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white">
              ...
            </span>
            <Link
              to="#"
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              8
            </Link>
            <Link
              to="#"
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              9
            </Link>
            <Link
              to="#"
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </Link>
          </div>
        </nav>
      </div>

      {showForm && (
        <RatingForm
          onClose={handleCloseForm}
          onSubmit={handleSubmitForm}
          initialData={editingRating}
        />
      )}
    </div>
  );
};

export default Ratings;
