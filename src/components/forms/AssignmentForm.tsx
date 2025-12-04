import React from 'react';

interface AssignmentFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void; // Placeholder for form submission
}

const AssignmentForm: React.FC<AssignmentFormProps> = ({ onClose, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form data for now
    const formData = {
      assignedBy: (document.getElementById('assignedBy') as HTMLInputElement).value,
      assignedToUser: (document.getElementById('assignedToUser') as HTMLInputElement).value,
      assignedToOfficeId: (document.getElementById('assignedToOfficeId') as HTMLInputElement).value,
      note: (document.getElementById('note') as HTMLTextAreaElement).value,
    };
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">Add/Edit Assignment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="assignedBy" className="block text-gray-700 text-sm font-bold mb-2">
              Assigned By
            </label>
            <input
              type="text"
              id="assignedBy"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Assigned By"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="assignedToUser" className="block text-gray-700 text-sm font-bold mb-2">
              Assigned To User
            </label>
            <input
              type="text"
              id="assignedToUser"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Assigned To User"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="assignedToOfficeId" className="block text-gray-700 text-sm font-bold mb-2">
              Assigned To Office ID
            </label>
            <input
              type="text"
              id="assignedToOfficeId"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Assigned To Office ID"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="note" className="block text-gray-700 text-sm font-bold mb-2">
              Note
            </label>
            <textarea
              id="note"
              rows={4}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Note"
            ></textarea>
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
    </div>
  );
};

export default AssignmentForm;
