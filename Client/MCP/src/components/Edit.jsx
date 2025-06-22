import { useState } from "react";
import axios from "axios";
import { Edit } from 'lucide-react';

const FileEditComponent = ({ onStatus }) => {
  const [filename, setFilename] = useState('');
  const [command, setCommand] = useState('');
  const [content, setContent] = useState('');
  const [editing, setEditing] = useState(false);

  const baseURL = import.meta.env.VITE_API_BASE_URL ;

  const handleSubmit = async (e) => {
      console.log("Edit button clicked");
    if (e) e.preventDefault();
    if (!filename.trim() || !command.trim()) return;

    setEditing(true);
    try {
      let payload = { filename: filename.trim(), command: command.trim() };

      if (command.trim() === 'replace') {
        const parts = content.split('=>');
        if (parts.length !== 2) throw new Error('Use "old => new" format for replace');
        payload.content = {
          from: parts[0].trim(),
          to: parts[1].trim()
        };
      } else {
        payload.content = content;
      }

      const response = await axios.post(`${baseURL}/edit`, payload);
      onStatus && onStatus('success', `✏️ Edit successful: ${response.data}`);
      setFilename('');
      setCommand('');
      setContent('');
    } catch (error) {
      onStatus && onStatus('error', `❌ Edit failed: ${error.response?.data || error.message}`);
    } finally {
      setEditing(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <Edit className="w-5 h-5" />
        Edit File
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
            placeholder="Enter filename to edit..."
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Command
          </label>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="replace, append, prepend..."
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            New Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter new content..."
            rows={6}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
          />
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={false}
          className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {editing ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              Editing...
            </>
          ) : (
            <>
              <Edit className="w-4 h-4" />
              Edit File
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default FileEditComponent;
