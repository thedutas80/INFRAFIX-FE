import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllReports, deleteReport } from '../api/adminApi';
import Swal from 'sweetalert2';
// import AuditForm from '../components/forms/AuditForm'; // Commented out as we are changing the data source

interface ReportAuditItem {
  id: number;
  title: string;
  description: string;
  street: string;
  city: string;
  province: string;
  postCode: string;
  status: string;
  createdDate: string;
  createdBy: {
    id: number;
    name: string;
  };
}

const Audit: React.FC = () => {
  // const [showForm, setShowForm] = useState(false);
  // const [editingAuditEntry, setEditingAuditEntry] = useState<any | null>(null);
  const [data, setData] = useState<ReportAuditItem[]>([]);
  const [allData, setAllData] = useState<ReportAuditItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const pageSize = 3;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllReports();
      if (response.success && Array.isArray(response.data)) {
        // Sort data by ID ascending to match previous behavior logic request
        const sortedData = response.data.sort((a: any, b: any) => a.id - b.id);
        setAllData(sortedData);
      } else {
        setError('Failed to fetch data or invalid format');
      }
    } catch (err: any) {
      setError(err.message || 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
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
      try {
        await deleteReport(id);
        Swal.fire(
          'Deleted!',
          'The report has been deleted.',
          'success'
        );
        fetchData(); // Refresh data
      } catch (err: any) {
         console.error("Error deleting report:", err);
         Swal.fire('Error', err.message || 'Failed to delete report', 'error');
      }
    }
  };

  useEffect(() => {
    // Client-side pagination logic
    const start = page * pageSize;
    const end = start + pageSize;
    const paginatedItems = allData.slice(start, end);
    setData(paginatedItems);
  }, [page, allData]);

  const hasMore = (page + 1) * pageSize < allData.length;

  // const handleEditAuditEntry = (entry: any) => {
  //   setEditingAuditEntry(entry);
  //   setShowForm(true);
  // };

  // const handleCloseForm = () => {
  //   setShowForm(false);
  //   setEditingAuditEntry(null);
  // };

  // const handleSubmitForm = (formData: any) => {
  //   console.log('Form submitted with data:', formData);
  //   setShowForm(false);
  //   setEditingAuditEntry(null);
  // };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Audit Data Reports</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created By
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.title}
                  </td>
                   <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={item.description}>
                    {item.description}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {item.street}, {item.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      item.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                      item.status === 'Pending' ? 'bg-red-100 text-red-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.createdBy?.name || '-'}
                  </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.createdDate).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-left text-sm font-medium">
                    <div className="flex items-center flex-wrap">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="inline-flex items-center justify-center p-1 rounded-md hover:bg-gray-200 mr-2 my-1"
                      >
                        <img src="https://i.ibb.co.com/m5PPgt5P/sampah.png" alt="Delete" className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination - Keep as placeholder for now */}
        <nav
          className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4"
          aria-label="Pagination"
        >
          <div className="flex-1 flex justify-between sm:justify-end">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0 || loading}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white hover:bg-gray-50 focus:outline-none ${
                page === 0 || loading ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'
              }`}
            >
              Previous
            </button>
            <div className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white">
              Page {page + 1}
            </div>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!hasMore || loading} 
              className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white hover:bg-gray-50 focus:outline-none ${
                !hasMore || loading ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'
              }`}
            >
              Next
            </button>
          </div>
        </nav>
      </div>

      {/* {showForm && (
        <AuditForm
          onClose={handleCloseForm}
          onSubmit={handleSubmitForm}
          initialData={editingAuditEntry}
        />
      )} */}
    </div>
  );
};

export default Audit;

