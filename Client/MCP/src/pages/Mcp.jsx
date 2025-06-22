import { useState } from "react";
import FileUploadComponent from "../components/Upload.jsx";
import FileEditComponent from "../components/Edit.jsx";
import FileCreateComponent from "../components/Create.jsx";
import StatusComponent from "../components/Notification.jsx";
import FileDeleteComponent from "../components/Delete.jsx";


const Mcp = () => {
  const [status, setStatus] = useState(null); 
  const [message, setMessage] = useState("");



  const showStatus = (type, msg) => {
    setStatus(type);
    setMessage(msg);
  };

  const clearStatus = () => {
    setStatus(null);
    setMessage("");
  };

 

  return (
<div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-pink-900 animate-gradient-x p-4">
<div className="max-w-full overflow-x-auto px-4 py-6 ">
  {message && (
    <StatusComponent status={status} message={message} onClear={clearStatus} />
  )}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-w-[1000px]">
    <div className="group relative bg-gradient-to-br from-violet-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-6 h-full min-w-[250px] border border-white/20 shadow-2xl hover:shadow-violet-500/25 transition-all duration-300 hover:scale-[1.02] hover:border-violet-400/30">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-purple-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <FileUploadComponent onStatus={showStatus} />
      </div>
    </div>
    <div className="group relative bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-teal-500/20 backdrop-blur-xl rounded-3xl p-6 h-full min-w-[250px] border border-white/20 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02] hover:border-blue-400/30">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <FileEditComponent onStatus={showStatus} />
      </div>
    </div>
    <div className="group relative bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-lime-500/20 backdrop-blur-xl rounded-3xl p-6 h-full min-w-[250px] border border-white/20 shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-[1.02] hover:border-emerald-400/30">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-green-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <FileCreateComponent onStatus={showStatus} />
      </div>
    </div>
    <div className="group relative bg-gradient-to-br from-rose-500/20 via-pink-500/20 to-red-500/20 backdrop-blur-xl rounded-3xl p-6 h-full min-w-[250px] border border-white/20 shadow-2xl hover:shadow-rose-500/25 transition-all duration-300 hover:scale-[1.02] hover:border-rose-400/30">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-600/10 to-pink-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <FileDeleteComponent onStatus={showStatus} />
      </div>
    </div>
  </div>
</div>
</div>



  );
};

export default Mcp;
