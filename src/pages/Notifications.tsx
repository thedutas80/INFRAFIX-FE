import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllReports, deleteReport } from '../api/adminApi';
import Swal from 'sweetalert2';

const Notifications: React.FC = () => {
  const [notificationsData, setNotificationsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const pageSize = 5;

  useEffect(() => {
    fetchPendingReports();
  }, []);

  useEffect(() => {
    fetchPendingReports();
  }, []);

  // Pagination Logic
  const paginatedData = notificationsData.slice(page * pageSize, (page + 1) * pageSize);
  const hasMore = (page + 1) * pageSize < notificationsData.length;

  const fetchPendingReports = async () => {
    setLoading(true);
    try {
      const response = await getAllReports();
      if (response.success && Array.isArray(response.data)) {
        const pendingReports = response.data
          .filter((item: any) => item.status === 'Pending')
          .map((item: any) => ({
            id: item.id.toString(),
            channel: 'System', 
            title: item.title,
            body: item.description,
            sentAt: item.createdDate ? new Date(item.createdDate).toLocaleDateString() : '-'
          }));
        setNotificationsData(pendingReports);
      }
    } catch (error) {
      console.error("Failed to fetch Notification", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNotification = async (id: string) => {
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
          'Your notification has been deleted.',
          'success'
        );
        fetchPendingReports(); // Refresh data
      } catch (err: any) {
         console.error("Error deleting notification:", err);
         Swal.fire('Error', err.message || 'Failed to delete notification', 'error');
      }
    }
  };

  if (loading) return <div className="p-6">Loading notifications...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Notifications</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Channel
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Body
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sent At
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.channel}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.body}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.sentAt}
                  </td>
                  <td className="px-6 py-4 text-left text-sm font-medium">
                    <div className="flex items-center flex-wrap">
                      <button 
                        onClick={() => handleDeleteNotification(item.id)}
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


    </div>
  );
};

export default Notifications;
