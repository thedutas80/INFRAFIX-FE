import React, { useState, useEffect } from 'react';

interface NotificationFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void; // Placeholder for form submission
  initialData?: { id: string; userId: string; channel: string; title: string; body: string; sentAt: string };
}

const NotificationForm: React.FC<NotificationFormProps> = ({ onClose, onSubmit, initialData }) => {
  const [userId, setUserId] = useState(initialData?.userId || '');
  const [channel, setChannel] = useState(initialData?.channel || '');
  const [title, setTitle] = useState(initialData?.title || '');
  const [body, setBody] = useState(initialData?.body || '');
  const [sentAt, setSentAt] = useState(initialData?.sentAt || '');

  useEffect(() => {
    if (initialData) {
      setUserId(initialData.userId);
      setChannel(initialData.channel);
      setTitle(initialData.title);
      setBody(initialData.body);
      setSentAt(initialData.sentAt);
    }
  }, [initialData]);

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

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
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
    </div>
  );
};

export default NotificationForm;
