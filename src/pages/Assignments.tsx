import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AssignmentForm from '../components/forms/AssignmentForm'; // Import the form component

const Assignments: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [assignmentsData, setAssignmentsData] = useState([
    { id: 'L-001', reportId: 'R-001', assignedBy: 'Hansi', assignedToUser: 'Usman', assignedToOfficeId: 'O-1', note: 'Jalan Rusak', createAt: '19/10/2025' },
    { id: 'L-002', reportId: 'R-002', assignedBy: 'Marcus', assignedToUser: 'Leo', assignedToOfficeId: 'O-1', note: 'Lampu Mati', createAt: '19/10/2025' },
    { id: 'L-003', reportId: 'R-003', assignedBy: 'Dani', assignedToUser: 'Eric', assignedToOfficeId: 'O-1', note: 'Pohon Tumbang', createAt: '21/10/2025' },
    { id: 'L-004', reportId: 'R-004', assignedBy: 'Rafa', assignedToUser: 'Ferry', assignedToOfficeId: 'O-1', note: 'Jalan Berlubang', createAt: '22/10/2025' },
    { id: 'L-005', reportId: 'R-005', assignedBy: 'Pedro', assignedToUser: 'Roy', assignedToOfficeId: 'O-1', note: 'Trotoar Rusak', createAt: '25/10/2025' },
  ]);

  const handleAddAssignment = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSubmitForm = (formData: any) => {
    // For now, just log the data and close the form.
    // In a real application, you would update the assignmentsData state or send to an API.
    console.log('Form submitted with data:', formData);
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Assignments</h1>

      {/* <div className="mb-4 flex justify-end">
        <button
          onClick={handleAddAssignment}
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add New Assignment
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
                  Assigned By
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To Office ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Note
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
              {assignmentsData.map((assignment) => (
                <tr key={assignment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {assignment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {assignment.reportId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {assignment.assignedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {assignment.assignedToUser}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {assignment.assignedToOfficeId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {assignment.note}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {assignment.createAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={handleAddAssignment} // Use handleAddAssignment to open the form
                      className="inline-flex items-center justify-center p-1 rounded-md hover:bg-gray-200 mr-2"
                    >
                      <img src="/assets/img/edit.png" alt="Edit" className="h-5 w-5" />
                    </button>
                    <button className="inline-flex items-center justify-center p-1 rounded-md hover:bg-gray-200">
                      <img src="/assets/img/sampah.png" alt="Delete" className="h-5 w-5" />
                    </button>
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

      {showForm && <AssignmentForm onClose={handleCloseForm} onSubmit={handleSubmitForm} />}
    </div>
  );
};

export default Assignments;
