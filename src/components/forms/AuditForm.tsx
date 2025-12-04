import React, { useState, useEffect } from 'react';

interface AuditFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void; // Placeholder for form submission
  initialData?: { id: string; entity: string; actorId: string; newValues: string; oldValues: string; createAt: string };
}

const AuditForm: React.FC<AuditFormProps> = ({ onClose, onSubmit, initialData }) => {
  const [entity, setEntity] = useState(initialData?.entity || '');
  const [action, setAction] = useState(''); // Assuming 'Action' is a new field for the form
  const [oldValues, setOldValues] = useState(initialData?.oldValues || '');
  const [newValues, setNewValues] = useState(initialData?.newValues || '');

  useEffect(() => {
    if (initialData) {
      setEntity(initialData.entity);
      // Assuming 'Action' field is derived or new for the form, not directly from initialData
      setOldValues(initialData.oldValues);
      setNewValues(initialData.newValues);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      entity,
      action,
      oldValues,
      newValues,
    };
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">{initialData ? 'Edit Audit Entry' : 'Add New Audit Entry'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="entity" className="block text-gray-700 text-sm font-bold mb-2">
              Entity
            </label>
            <input
              type="text"
              id="entity"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Entity"
              value={entity}
              onChange={(e) => setEntity(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="action" className="block text-gray-700 text-sm font-bold mb-2">
              Action
            </label>
            <input
              type="text"
              id="action"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Action"
              value={action}
              onChange={(e) => setAction(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="oldValues" className="block text-gray-700 text-sm font-bold mb-2">
              Old Values
            </label>
            <input
              type="text"
              id="oldValues"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Old Values"
              value={oldValues}
              onChange={(e) => setOldValues(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="newValues" className="block text-gray-700 text-sm font-bold mb-2">
              New Values
            </label>
            <input
              type="text"
              id="newValues"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="New Values"
              value={newValues}
              onChange={(e) => setNewValues(e.target.value)}
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
    </div>
  );
};

export default AuditForm;
