import React, { useState, useEffect } from 'react';

interface RatingFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void; // Placeholder for form submission
  initialData?: { id: string; reportId: string; score: string; comment: string; createAt: string };
}

const RatingForm: React.FC<RatingFormProps> = ({ onClose, onSubmit, initialData }) => {
  const [reportId, setReportId] = useState(initialData?.reportId || '');
  const [score, setScore] = useState(initialData?.score || '');
  const [comment, setComment] = useState(initialData?.comment || '');

  useEffect(() => {
    if (initialData) {
      setReportId(initialData.reportId);
      setScore(initialData.score);
      setComment(initialData.comment);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      reportId,
      score,
      comment,
    };
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">{initialData ? 'Edit Rating' : 'Add New Rating'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="reportId" className="block text-gray-700 text-sm font-bold mb-2">
              Report ID
            </label>
            <input
              type="text"
              id="reportId"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Report ID"
              value={reportId}
              onChange={(e) => setReportId(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="score" className="block text-gray-700 text-sm font-bold mb-2">
              Score
            </label>
            <input
              type="text"
              id="score"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Score"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="comment" className="block text-gray-700 text-sm font-bold mb-2">
              Comment
            </label>
            <textarea
              id="comment"
              rows={4}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
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

export default RatingForm;
