import React, { useEffect, useState } from 'react';
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
import { Outlet, useLocation } from 'react-router-dom'; // Import Outlet and useLocation for nested routes
import { getAllReports } from '../api/adminApi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const location = useLocation(); // Initialize useLocation hook
  const [stats, setStats] = useState({
    pending: 0,
    inProgress: 0,
    completed: 0,
    rejected: 0,
  });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getAllReports();
        if (response && response.data) {
          const reports = response.data;
          const newStats = {
            pending: reports.filter((r: any) => r.status === 'Pending').length,
            inProgress: reports.filter((r: any) => r.status === 'In Progress').length,
            completed: reports.filter((r: any) => r.status === 'Completed').length,
            rejected: reports.filter((r: any) => r.status === 'Rejected').length,
          };
          setStats(newStats);
        }
      } catch (error) {
        console.error('Failed to fetch reports:', error);
      }
    };

    fetchReports();
  }, []);

  const chartData = {
    labels: ['PENDING', 'IN PROGRESS', 'COMPLETED', 'REJECTED'],
    datasets: [
      {
        label: 'Total Reports',
        data: [stats.pending, stats.inProgress, stats.completed, stats.rejected],
        backgroundColor: ['#fbbf24', '#3b82f6', '#047857', '#dc2626'], // Yellow, Blue, Teal, Red
        borderColor: ['#fbbf24', '#3b82f6', '#047857', '#dc2626'],
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
        text: 'REPORT STATUS CHART',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="p-6 overflow-auto">
      <Outlet /> {/* This will render nested routes like Assignments, Categories, etc. */}
      {/* Only show dashboard specific content if no nested route is matched */}
      {(location.pathname === '/dashboard' || location.pathname === '/dashboard/') && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Card 1 - Pending */}
            <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
              <div className="text-5xl font-bold">{stats.pending}</div>
              <div className="text-lg">PENDING</div>
              <button className="mt-4 flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-md">
                More Details <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
            {/* Card 2 - In Progress */}
            <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
              <div className="text-5xl font-bold">{stats.inProgress}</div>
              <div className="text-lg">IN PROGRESS</div>
              <button className="mt-4 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                More Details <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
            {/* Card 3 - Completed */}
            <div className="bg-teal-600 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
              <div className="text-5xl font-bold">{stats.completed}</div>
              <div className="text-lg">COMPLETED</div>
              <button className="mt-4 flex items-center justify-center bg-teal-700 hover:bg-teal-800 text-white py-2 px-4 rounded-md">
                More Details <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
            {/* Card 4 - Rejected */}
            <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
              <div className="text-5xl font-bold">{stats.rejected}</div>
              <div className="text-lg">REJECTED</div>
              <button className="mt-4 flex items-center justify-center bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded-md">
                More Details <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>

          {/* Grafik Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">REPORTS CHART</h2>
            <div className="relative h-64 md:h-80 lg:h-96"> {/* Adjusted for responsiveness */}
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
