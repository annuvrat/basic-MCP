import { useState } from "react";
import axios from "axios";
import { Trash2, Check, X, AlertCircle } from 'lucide-react';

const FileDeleteComponent = ({ onStatus }) => {
  const [filename, setFilename] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!filename.trim()) return;

    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    setDeleting(true);
    try {
      const response = await axios.delete(`${baseURL}/delete`, {
        data: { filename: filename.trim() },
      });
      onStatus && onStatus('success', ` File deleted: ${response.data}`);
      setFilename('');
    } catch (err) {
      onStatus && onStatus('error', ` Delete failed: ${err.response?.data || err.message}`);
    } finally {
      setConfirmDelete(false);
      setDeleting(false);
    }
  };

  const handleCancel = () => {
    setConfirmDelete(false);
    setFilename('');
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <Trash2 className="w-5 h-5" />
        Delete File
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Filename
          </label>
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            placeholder="Enter filename to delete..."
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={confirmDelete}
          />
        </div>
        {confirmDelete && (
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-400 mb-2">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Confirm Deletion</span>
            </div>
            <p className="text-red-300 text-sm">
              Are you sure you want to delete "{filename}"? This action cannot be undone.
            </p>
          </div>
        )}
        <div className="flex gap-2">
          {confirmDelete ? (
            <>
              <button
                type="submit"
                disabled={deleting}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Confirm Delete
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={deleting}
                className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </>
          ) : (
            <button
              type="submit"
              disabled={!filename.trim()}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete File
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FileDeleteComponent;