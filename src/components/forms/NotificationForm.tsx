import React, { useState, useEffect } from 'react';
import { getAllReports } from '../../api/adminApi';

interface NotificationFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void; // Placeholder for form submission
  initialData?: { id: string; userId: string; channel: string; title: string; body: string; sentAt: string };
}

interface ReportItem {
  id: string;
  title: string;
  status: string;
  description: string;
}

const NotificationForm: React.FC<NotificationFormProps> = ({ onClose, onSubmit, initialData }) => {
  const [userId, setUserId] = useState(initialData?.userId || '');
  const [channel, setChannel] = useState(initialData?.channel || '');
  const [title, setTitle] = useState(initialData?.title || '');
  const [body, setBody] = useState(initialData?.body || '');
  const [sentAt, setSentAt] = useState(initialData?.sentAt || '');
  
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loadingReports, setLoadingReports] = useState(false);

  useEffect(() => {
    if (initialData) {
      setUserId(initialData.userId);
      setChannel(initialData.channel);
      setTitle(initialData.title);
      setBody(initialData.body);
      setSentAt(initialData.sentAt);
    }
  }, [initialData]);

  useEffect(() => {
    const fetchReports = async () => {
        setLoadingReports(true);
        try {
            const response = await getAllReports();
            if (response.success && Array.isArray(response.data)) {
                // Filter only 'Pending' reports
                const pendingReports = response.data.filter((item: ReportItem) => item.status === 'Pending');
                setReports(pendingReports);
            }
        } catch (error) {
            console.error("Failed to fetch reports", error);
        } finally {
            setLoadingReports(false);
        }
    };
    fetchReports();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      userId,
      channel,
      title,
      body,
      sentAt,
    };
    onSubmit(formData);
  };

  const handleSelectReport = (report: ReportItem) => {
      // Optional: Auto-fill title/body from report
      setTitle(`Notification for Report #${report.id}: ${report.title}`);
      setBody(`Status update for report: ${report.description}. Current Status: ${report.status}`);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto py-10">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-5xl flex flex-col md:flex-row gap-6 max-h-[90vh]">
        
        {/* Form Section */}
        <div className="flex-1 overflow-y-auto p-1">
            <h2 className="text-2xl font-semibold mb-6">{initialData ? 'Edit Notification' : 'Add New Notification'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="userId" className="block text-gray-700 text-sm font-bold mb-2">
                  User ID
                </label>
                <input
                  type="text"
                  id="userId"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="User ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="channel" className="block text-gray-700 text-sm font-bold mb-2">
                  Channel
                </label>
                <input
                  type="text"
                  id="channel"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Channel"
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="body" className="block text-gray-700 text-sm font-bold mb-2">
                  Body
                </label>
                <textarea
                  id="body"
                  rows={4}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-6">
                <label htmlFor="sentAt" className="block text-gray-700 text-sm font-bold mb-2">
                  Sent At
                </label>
                <input
                  type="text"
                  id="sentAt"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Sent At"
                  value={sentAt}
                  onChange={(e) => setSentAt(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
        </div>

        {/* Reports List Section */}
        <div className="flex-1 border-t md:border-t-0 md:border-l border-gray-200 md:pl-6 overflow-hidden flex flex-col">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Available Reports</h3>
            <p className="text-xs text-gray-500 mb-2">Click on a report to auto-fill notification details.</p>
            
            <div className="flex-1 overflow-y-auto bg-gray-50 rounded-lg border border-gray-200">
                {loadingReports ? (
                     <div className="flex justify-center items-center h-full p-4">
                        <svg className="animate-spin h-8 w-8 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                     </div>
                ) : reports.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                        {reports.map((report) => (
                            <div 
                                key={report.id} 
                                className="p-3 hover:bg-teal-50 cursor-pointer transition-colors duration-150"
                                onClick={() => handleSelectReport(report)}
                            >
                                <div className="flex justify-between items-start">
                                    <span className="font-semibold text-sm text-gray-800">#{report.id}</span>
                                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                                        report.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                        report.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                        report.status === 'Reject' ? 'bg-red-100 text-red-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {report.status}
                                    </span>
                                </div>
                                <h4 className="font-medium text-sm text-gray-700 mt-1">{report.title}</h4>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{report.description}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-4 text-center text-gray-500 text-sm">No reports available.</div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default NotificationForm;
