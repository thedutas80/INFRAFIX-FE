import React, { useState, useEffect } from 'react';
import { getAllReports, updateReportStatus, deleteReport } from '../api/adminApi';
import Swal from 'sweetalert2';

interface ReportData {
  id: string;
  title: string;
  description: string;
  status: string;
  province: string;
  city: string;
  street: string;
  postCode: string;
}

const Assignments: React.FC = () => {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await getAllReports();
      if (response.success && Array.isArray(response.data)) {
        const mappedReports: ReportData[] = response.data.map((item: any) => ({
          id: item.id.toString(),
          title: item.title,
          description: item.description,
          status: item.status,
          province: item.province,
          city: item.city,
          street: item.street,
          postCode: item.postCode,
        }));
        setReports(mappedReports);
      } else {
        setReports([]);
      }
    } catch (err) {
      console.error("Error fetching reports:", err);
      Swal.fire('Error', 'Failed to load reports', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (report: ReportData) => {
    setEditingId(report.id);
    setNewStatus(report.status);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewStatus('');
  };

  const STATUS_MAPPING: { [key: string]: number } = {
    'Pending': 1,
    'In Progress': 2,
    'Completed': 3,
    'Reject': 4
  };

  const handleSaveStatus = async (id: string) => {
    const statusId = STATUS_MAPPING[newStatus];
    if (!statusId) {
        Swal.fire('Error', 'Invalid status selected', 'error');
        return;
    }
    
    try {
      await updateReportStatus(id, statusId);
      Swal.fire('Success', 'Status updated successfully', 'success');
      setEditingId(null);
      fetchReports(); // Refresh data
    } catch (err: any) {
      console.error("Error updating status:", err);
      Swal.fire('Error', err.message || 'Failed to update status', 'error');
    }
  };

  const handleDeleteReport = async (id: string) => {
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
          'Your file has been deleted.',
          'success'
        );
        fetchReports(); // Refresh data
      } catch (err: any) {
         console.error("Error deleting report:", err);
         Swal.fire('Error', err.message || 'Failed to delete report', 'error');
      }
    }
  };

  const statusOptions = ['Pending', 'Completed', 'Reject', 'In Progress'];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Report Assignments & Status</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={report.description}>{report.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.city}, {report.province}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {editingId === report.id ? (
                        <select
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value)}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                        >
                          {statusOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${report.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                            report.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 
                            report.status === 'Reject' ? 'bg-red-100 text-red-800' : 
                            'bg-gray-100 text-gray-800'}`}>
                          {report.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editingId === report.id ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleSaveStatus(report.id)}
                            className="text-teal-600 hover:text-teal-900"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditClick(report)}
                            className="inline-flex items-center justify-center p-1 rounded-md hover:bg-gray-200"
                            title="Edit Status"
                          >
                            <img src="https://i.ibb.co.com/Y76N1NpV/edit.png" alt="Edit" className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteReport(report.id)}
                            className="inline-flex items-center justify-center p-1 rounded-md hover:bg-gray-200"
                            title="Remove"
                          >
                            <img src="https://i.ibb.co.com/m5PPgt5P/sampah.png" alt="Remove" className="h-5 w-5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assignments;
