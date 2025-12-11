import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProgressForm from '../components/forms/ProgressForm'; // Import the form component
import { getAllReports } from '../api/adminApi';

const Progress: React.FC = () => {
    // const [showForm, setShowForm] = useState(false);
    // const [editingProgressEntry, setEditingProgressEntry] = useState<any | null>(null);
    const [progressData, setProgressData] = useState<any[]>([]);
    const [paginatedData, setPaginatedData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const pageSize = 5;

    useEffect(() => {
        const fetchProgressReports = async () => {
            try {
                const response = await getAllReports();
                if (response.success && Array.isArray(response.data)) {
                    const inProgressReports = response.data
                        .filter((item: any) => item.status === 'In Progress')
                        .map((item: any) => ({
                            id: item.id.toString(),
                            reportId: item.id.toString(),
                            actorId: `User-${item.userId}`,
                            statusForm: 'Pending', // Assumed previous status
                            statusTo: item.status,
                            note: item.description,
                            attachment: item.image ? 'Yes' : '-',
                            createAt: item.createdDate ? new Date(item.createdDate).toLocaleDateString() : '-'
                        }));
                    setProgressData(inProgressReports);
                }
            } catch (error) {
                console.error("Failed to fetch progress reports", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProgressReports();
    }, []);

    useEffect(() => {
        const start = page * pageSize;
        const end = start + pageSize;
        setPaginatedData(progressData.slice(start, end));
    }, [page, progressData]);

    const hasMore = (page + 1) * pageSize < progressData.length;

/*
    const handleAddProgressEntry = () => {
        setEditingProgressEntry(null);
        setShowForm(true);
    };

    const handleEditProgressEntry = (entry: any) => {
        setEditingProgressEntry(entry);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingProgressEntry(null);
    };

    const handleSubmitForm = (formData: any) => {
        console.log('Form submitted with data:', formData);
        // In a real app, you'd update state or send to API
        setShowForm(false);
        setEditingProgressEntry(null);
    };
*/

  if (loading) return <div className="p-6">Loading progress...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Progress</h1>

      {/* <div className="mb-4 flex justify-end">
        <button
          onClick={handleAddProgressEntry}
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add New Progress Entry
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
                  Actor ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status Form
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status To
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Note
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attachment
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
              {paginatedData.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.reportId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.actorId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.statusForm}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.statusTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.note}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.attachment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.createAt}
                  </td>
                  <td className="px-6 py-4 text-left text-sm font-medium">
                    <div className="flex items-center flex-wrap">

                      <button className="inline-flex items-center justify-center p-1 rounded-md hover:bg-gray-200 my-1">
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

{/*
      {showForm && (
        <ProgressForm
          onClose={handleCloseForm}
          onSubmit={handleSubmitForm}
          initialData={editingProgressEntry}
        />
      )}
*/}
    </div>
  );
};

export default Progress;
