import { useState } from "react";
import axios from "axios";
import { Plus } from 'lucide-react';

const FileCreateComponent = ({ onStatus }) => {
  const [filename, setFilename] = useState('');
  const [content, setContent] = useState('');
  const [creating, setCreating] = useState(false);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!filename.trim()) return;

    setCreating(true);

    try {
      const payload = {
        filename: filename.trim(),
        content: content || ''
      };

      const response = await axios.post(`${baseURL}/create`, payload);
      onStatus && onStatus('success', ` File created: ${response.data}`);
      setFilename('');
      setContent('');
    } catch (error) {
      onStatus && onStatus('error', ` File creation failed: ${error.response?.data || error.message}`);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <Plus className="w-5 h-5" />
        Create New File
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Filename
          </label>
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            placeholder="Enter filename..."
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Content (optional)
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter file content..."
            rows={6}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={creating || !filename.trim()}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {creating ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              Creating...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Create File
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default FileCreateComponent;
