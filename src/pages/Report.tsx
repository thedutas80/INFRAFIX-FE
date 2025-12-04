import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

interface ReportItem {
  id: string;
  reportNo: string;
  title: string;
  status: string;
  description: string;
  imageUrl?: string;
}

const mockReports: ReportItem[] = [
  {
    id: '1',
    reportNo: 'INFRA-001',
    title: 'Jalan Berlubang Parah',
    status: 'Pending',
    description: 'Terdapat lubang besar di Jalan Raya Utama, menyebabkan kemacetan dan bahaya bagi pengendara.',
    imageUrl: '/assets/img/jalan.jpg',
  },
  {
    id: '2',
    reportNo: 'INFRA-002',
    title: 'Lampu Jalan Mati',
    status: 'Completed',
    description: 'Lampu jalan di sepanjang Jalan Anggrek mati total, membuat area tersebut gelap gulita di malam hari.',
    imageUrl: '/assets/img/lightning.png',
  },
  {
    id: '3',
    reportNo: 'INFRA-003',
    title: 'Tumpukan Sampah Liar',
    status: 'In Progress',
    description: 'Tumpukan sampah ilegal di dekat pasar tradisional, menimbulkan bau tidak sedap dan mengganggu kebersihan.',
    imageUrl: '/assets/img/sampah.png',
  },
  {
    id: '4',
    reportNo: 'INFRA-004',
    title: 'Saluran Air Tersumbat',
    status: 'Pending',
    description: 'Saluran air di perumahan Griya Indah tersumbat, menyebabkan genangan air saat hujan deras.',
    imageUrl: '/assets/img/aman.png', // Using 'aman.png' as a placeholder for a water-related issue
  },
  {
    id: '5',
    reportNo: 'INFRA-005',
    title: 'Fasilitas Umum Rusak',
    status: 'Pending',
    description: 'Ayunan di taman kota rusak dan tidak bisa digunakan, membahayakan anak-anak.',
    imageUrl: '/assets/img/edit.png', // Using 'edit.png' as a placeholder for a broken facility
  },
];

const Report: React.FC = () => {
  const [reportData, setReportData] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef: componentRef });

  useEffect(() => {
    // Simulate fetching data
    const fetchMockReports = async () => {
      setLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        setReportData(mockReports);
      } catch (err) {
        setError("Failed to load reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchMockReports();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading reports...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Report Dashboard</h1>

      <div className="mb-4 flex justify-end">
        <button
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Export PDF
        </button>
      </div>

      <div ref={componentRef} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportData.length > 0 ? (
            reportData.map((report) => (
              <div key={report.id} className="border rounded-lg overflow-hidden shadow-md">
                {report.imageUrl && (
                  <img src={report.imageUrl} alt={report.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{report.title}</h2>
                  <p className="text-gray-600 mb-2">Report No: {report.reportNo}</p>
                  <p className={`text-sm font-medium ${
                    report.status === 'Completed' ? 'text-green-600' :
                    report.status === 'In Progress' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    Status: {report.status}
                  </p>
                  <p className="text-gray-700 mt-3">{report.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-8">
              No reports found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;
