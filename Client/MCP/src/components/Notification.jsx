import { Upload, Edit, Trash2, Plus, File, Check, X, AlertCircle } from 'lucide-react';
const StatusComponent = ({ status, message, onClear }) => {
  if (!message) return null;

  const statusStyles = {
    success: 'bg-green-900/50 border-green-700 text-green-300',
    error: 'bg-red-900/50 border-red-700 text-red-300',
    info: 'bg-blue-900/50 border-blue-700 text-blue-300'
  };

  return (
    <div className={`border rounded-lg p-4 flex items-center justify-between ${statusStyles[status]}`}>
      <div className="flex items-center gap-2">
        {status === 'success' && <Check className="w-5 h-5" />}
        {status === 'error' && <AlertCircle className="w-5 h-5" />}
        {status === 'info' && <File className="w-5 h-5" />}
        <span>{message}</span>
      </div>
      <button
        onClick={onClear}
        className="text-gray-400 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default StatusComponent