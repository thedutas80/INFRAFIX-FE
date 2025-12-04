import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const chartData = {
    labels: ['DALAM PROSES', 'DITANGGAPI', 'DITOLAK'],
    datasets: [
      {
        label: 'Jumlah Laporan',
        data: [15, 30, 5], // Mock data based on the image
        backgroundColor: ['#047857', '#047857', '#dc2626'], // Teal and Red colors
        borderColor: ['#047857', '#047857', '#dc2626'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: 'GRAFIK',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-1 p-6 overflow-auto max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-teal-600 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <div className="text-5xl font-bold">15</div>
            <div className="text-lg">DALAM PROSES</div>
            <button className="mt-4 flex items-center justify-center bg-teal-700 hover:bg-teal-800 text-white py-2 px-4 rounded-md">
              More Details <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
          {/* Card 2 */}
          <div className="bg-teal-600 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <div className="text-5xl font-bold">30</div>
            <div className="text-lg">DITANGGAPI</div>
            <button className="mt-4 flex items-center justify-center bg-teal-700 hover:bg-teal-800 text-white py-2 px-4 rounded-md">
              More Details <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
          {/* Card 3 */}
          <div className="bg-teal-600 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <div className="text-5xl font-bold">50</div>
            <div className="text-lg">SELESAI</div>
            <button className="mt-4 flex items-center justify-center bg-teal-700 hover:bg-teal-800 text-white py-2 px-4 rounded-md">
              More Details <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
          {/* Card 4 */}
          <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <div className="text-5xl font-bold">5</div>
            <div className="text-lg">DITOLAK</div>
            <button className="mt-4 flex items-center justify-center bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded-md">
              More Details <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>

        {/* Grafik Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">GRAFIK</h2>
          <div className="relative h-64 md:h-80 lg:h-96"> {/* Adjusted for responsiveness */}
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
