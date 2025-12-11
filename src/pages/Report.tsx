import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import useAuthStore from '../store/authStore';
import { createReport } from '../api/citizenApi';
import { getAllReports, updateReportStatus, deleteReport } from '../api/adminApi';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

interface ReportItem {
  id: string;
  reportNo: string;
  title: string;
  status: string;
  description: string;
  province?: string;
  city?: string;
  street?: string;
  postCode?: string;
  imageUrl?: string;
}

interface ReportModalProps {
  onClose: () => void;
  onSuccess?: (data: any) => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    province: '',
    city: '',
    street: '',
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
    setError(null);

    try {
      const response = await createReport(formData);
      Swal.fire({
        title: 'Thankyou Success Report',
        text: 'Your report has been submitted successfully!',
        icon: 'success',
        confirmButtonColor: '#3085d6',
      });
      if (onSuccess) onSuccess({ ...formData, ...response });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create report');
      Swal.fire({
          title: 'Error',
          text: err.message || 'Failed to create report',
          icon: 'error',
          confirmButtonColor: '#d33'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all hover:scale-105 border border-gray-100 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-600">
            Create Report
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded shadow-sm" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 ease-in-out"
              placeholder="Terjadi Banjir"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 ease-in-out"
              placeholder="Bogor mengalami luapan air Banjir Bandang"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <label htmlFor="province" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Province</label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 ease-in-out"
                  placeholder="West Java"
                />
             </div>
             <div>
                <label htmlFor="city" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 ease-in-out"
                  placeholder="Bogor"
                />
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="street" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Street</label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 ease-in-out"
                placeholder="Jl. KH Masmansur"
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
                placeholder="10521"
              />
            </div>
          </div>

          <div className="flex items-center justify-end mt-6 space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
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
                'Submit Report'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Report: React.FC = () => {
  const [reportData, setReportData] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Status Editing State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');

  // Decoding Token for Role
  const [userRole, setUserRole] = useState<string>('');

  const { user } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        // Assuming 'role' is the claim name. Adjust if it is 'authorities' or something else.
        // It seems the backend uses 'role'.
        setUserRole(decoded.role || ''); 
      } catch (e) {
        console.error("Failed to decode token", e);
      }
    }
  }, []);

  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef: componentRef });

  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllReports();
      if (response.success && Array.isArray(response.data)) {
          const mappedReports: ReportItem[] = response.data.map((item: any) => ({
              id: item.id.toString(),
              reportNo: `INFRA-${String(item.id).padStart(3, '0')}`,
              title: item.title,
              status: item.status,
              description: item.description,
              province: item.province,
              city: item.city,
              street: item.street,
              postCode: item.postCode,
              imageUrl: item.image || 'https://i.ibb.co.com/1tHYfRR7/jalan.jpg',
          })).sort((a: ReportItem, b: ReportItem) => Number(b.id) - Number(a.id));
          setReportData(mappedReports);
      } else {
          setReportData([]);
      }
    } catch (err) {
      console.error("Error fetching reports:", err);
      setError("Failed to load reports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleCreateSuccess = (newReport: any) => {
      const reportItem: ReportItem = {
          id: newReport.id || Date.now().toString(),
          reportNo: newReport.reportNo || `INFRA-${Math.floor(Math.random() * 1000)}`,
          title: newReport.title,
          description: newReport.description,
          status: newReport.status || 'Pending',
          province: newReport.province,
          city: newReport.city,
          street: newReport.street,
          postCode: newReport.postCode,
          imageUrl: newReport.imageUrl,
      };
      setReportData(prev => [reportItem, ...prev]);
  };

  // Actions Logic (Same as Assignments.tsx)
  const STATUS_MAPPING: { [key: string]: number } = {
    'Pending': 1,
    'In Progress': 2,
    'Completed': 3,
    'Reject': 4
  };

  const statusOptions = ['Pending', 'Completed', 'Reject', 'In Progress'];

  const handleEditClick = (report: ReportItem) => {
    setEditingId(report.id);
    setNewStatus(report.status);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewStatus('');
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


  if (loading) {
    return <div className="p-6 text-center">Loading reports...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Report Dashboard</h1>

      <div className="mb-4 flex justify-end space-x-4">
        {userRole?.toLowerCase() !== 'admin' && userRole?.toLowerCase() !== 'technician' && (
        <button
            onClick={() => setIsModalOpen(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
        >
            Add Report
        </button>
        )}

        {userRole?.toLowerCase() !== 'citizen' && (
        <button
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
        >
          Export PDF
        </button>
        )}
      </div>

      <div ref={componentRef} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportData.length > 0 ? (
            reportData.map((report) => (
              <div key={report.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white flex flex-col justify-between">
                <div>
                  {report.imageUrl && (
                    <div className="relative">
                      <img src={report.imageUrl} alt={report.title} className="w-full h-48 object-cover" />
                      <div className="absolute top-0 right-0 m-2">
                        {editingId === report.id ? (
                           <select
                              value={newStatus}
                              onChange={(e) => setNewStatus(e.target.value)}
                              className="block w-32 pl-2 pr-8 py-1 text-xs border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 rounded-full shadow-sm bg-white"
                            >
                              {statusOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                        ) : (
                          <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                            report.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            report.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                            report.status === 'Reject' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {report.status}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                       <h2 className="text-xl font-bold text-gray-800 line-clamp-1" title={report.title}>{report.title}</h2>
                    </div>
                    
                    <p className="text-xs text-gray-500 font-mono mb-2">#{report.reportNo}</p>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{report.description}</p>
                    
                    {(report.province || report.city || report.street) && (
                      <div className="border-t pt-3 mt-2 text-sm text-gray-600">
                          <div className="flex items-start">
                               <svg className="w-4 h-4 mr-1 text-teal-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                               <div>
                                   {report.street && <p className="font-medium">{report.street}</p>}
                                   <p className="text-xs text-gray-500">{report.city}{report.city && report.province ? ', ' : ''}{report.province} {report.postCode}</p>
                               </div>
                          </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions Section - Only visible if user is not citizen, assuming citizen cannot edit status/delete */}
                {userRole?.toLowerCase() !== 'citizen' && (
                  <div className="bg-gray-50 p-4 border-t flex justify-end space-x-2">
                     {editingId === report.id ? (
                        <>
                          <button
                            onClick={() => handleSaveStatus(report.id)}
                            className="text-white bg-teal-600 hover:bg-teal-700 px-3 py-1 rounded-md text-sm font-medium transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="text-gray-700 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md text-sm font-medium transition-colors"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditClick(report)}
                             className="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-200 text-teal-600 transition-colors"
                             title="Edit Status"
                          >
                             <img src="https://i.ibb.co.com/Y76N1NpV/edit.png" alt="Edit" className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteReport(report.id)}
                            className="inline-flex items-center justify-center p-2 rounded-full hover:bg-red-100 text-red-600 transition-colors"
                            title="Delete Report"
                          >
                             <img src="https://i.ibb.co.com/m5PPgt5P/sampah.png" alt="Delete" className="h-5 w-5" />
                          </button>
                        </>
                      )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-8">
              No reports found.
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <ReportModal onClose={() => setIsModalOpen(false)} onSuccess={handleCreateSuccess} />
      )}
    </div>
  );
};

export default Report;
