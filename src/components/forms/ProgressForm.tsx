import React, { useState, useEffect } from 'react';

interface ProgressFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void; // Placeholder for form submission
  initialData?: { id: string; reportId: string; actorId: string; statusForm: string; statusTo: string; note: string; attachment: string; createAt: string };
}

const ProgressForm: React.FC<ProgressFormProps> = ({ onClose, onSubmit, initialData }) => {
  const [statusFrom, setStatusFrom] = useState(initialData?.statusForm || '');
  const [statusTo, setStatusTo] = useState(initialData?.statusTo || '');
  const [note, setNote] = useState(initialData?.note || '');
  const [attachment, setAttachment] = useState(initialData?.attachment || '');

  useEffect(() => {
    if (initialData) {
      setStatusFrom(initialData.statusForm);
      setStatusTo(initialData.statusTo);
      setNote(initialData.note);
      setAttachment(initialData.attachment);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      statusFrom,
      statusTo,
      note,
      attachment,
    };
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">{initialData ? 'Edit Progress Entry' : 'Add New Progress Entry'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="statusFrom" className="block text-gray-700 text-sm font-bold mb-2">
              Status From
            </label>
            <input
              type="text"
              id="statusFrom"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Status From"
              value={statusFrom}
              onChange={(e) => setStatusFrom(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="statusTo" className="block text-gray-700 text-sm font-bold mb-2">
              Status To
            </label>
            <input
              type="text"
              id="statusTo"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Status To"
              value={statusTo}
              onChange={(e) => setStatusTo(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="note" className="block text-gray-700 text-sm font-bold mb-2">
              Note
            </label>
            <input
              type="text"
              id="note"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="attachment" className="block text-gray-700 text-sm font-bold mb-2">
              Attachment URL
            </label>
            <input
              type="text"
              id="attachment"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Attachment URL"
              value={attachment}
              onChange={(e) => setAttachment(e.target.value)}
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

export default ProgressForm;
