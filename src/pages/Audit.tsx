import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuditForm from '../components/forms/AuditForm'; // Import the form component

const Audit: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingAuditEntry, setEditingAuditEntry] = useState<any | null>(null);
  const [auditData, setAuditData] = useState([
    { id: '1', entity: '-', entityId: '-', actorId: '-', newValues: '-', oldValues: '-', createAt: '-' },
    { id: '2', entity: '-', entityId: '-', actorId: '-', newValues: '-', oldValues: '-', createAt: '-' },
    { id: '3', entity: '-', entityId: '-', actorId: '-', newValues: '-', oldValues: '-', createAt: '-' },
    { id: '4', entity: '-', entityId: '-', actorId: '-', newValues: '-', oldValues: '-', createAt: '-' },
    { id: '5', entity: '-', entityId: '-', actorId: '-', newValues: '-', oldValues: '-', createAt: '-' },
  ]);

  const handleAddAuditEntry = () => {
    setEditingAuditEntry(null);
    setShowForm(true);
  };

  const handleEditAuditEntry = (entry: any) => {
    setEditingAuditEntry(entry);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingAuditEntry(null);
  };

  const handleSubmitForm = (formData: any) => {
    console.log('Form submitted with data:', formData);
    // In a real app, you'd update state or send to API
    setShowForm(false);
    setEditingAuditEntry(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Audit</h1>

      {/* <div className="mb-4 flex justify-end">
        <button
          onClick={handleAddAuditEntry}
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add New Audit Entry
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
                  Entity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entity ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actor ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  New Values
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Old Values
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
              {auditData.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.entity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.entityId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.actorId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.newValues}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.oldValues}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.createAt}
                  </td>
                  <td className="px-6 py-4 text-left text-sm font-medium">
                    <div className="flex items-center flex-wrap">
                      <button
                        onClick={() => handleEditAuditEntry(item)}
                        className="inline-flex items-center justify-center p-1 rounded-md hover:bg-gray-200 mr-2 my-1"
                      >
                        <img src="/assets/img/edit.png" alt="Edit" className="h-5 w-5" />
                      </button>
                      <button className="inline-flex items-center justify-center p-1 rounded-md hover:bg-gray-200 my-1">
                        <img src="/assets/img/sampah.png" alt="Delete" className="h-5 w-5" />
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

      {showForm && (
        <AuditForm
          onClose={handleCloseForm}
          onSubmit={handleSubmitForm}
          initialData={editingAuditEntry}
        />
      )}
    </div>
  );
};

export default Audit;
