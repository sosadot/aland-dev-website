// tools/ResponsiveViewer.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const devices = [
  { name: "Mobile", width: 375 },
  { name: "Tablet", width: 768 },
  { name: "Desktop", width: 1440 },
];

export default function ResponsiveViewer() {
  const [url, setUrl] = useState("https://google.com");
  const [submittedUrl, setSubmittedUrl] = useState(url);
  const navigate = useNavigate();

  const cleanUrl = (url) => {
    if (!url.startsWith("http")) return `https://${url}`;
    return url.replace(/\/$/, ""); // remove trailing slash
  };

  const getScreenshotUrl = (deviceWidth) => {
    const cleanedUrl = url.trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
    return `https://image.thum.io/get/width/${deviceWidth}/crop/800/https://${cleanedUrl}`;
  };  

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedUrl(url);
  };

  return (
    <div className="min-h-screen bg-[#0e0e10] text-white font-sans px-4 py-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 bg-white/10 border border-white/20 px-4 py-2 rounded text-sm text-white hover:bg-white/20 transition"
      >
        🔙 Back to Home
      </button>

      <div className="max-w-7xl mx-auto pt-10">
        <h1 className="text-3xl font-bold mb-6">
          📸 Responsive Screenshot Viewer
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mb-8 flex flex-col sm:flex-row gap-4"
        >
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-4 py-2 rounded bg-black text-white border border-gray-700"
            placeholder="Enter a website URL..."
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded font-semibold transition"
          >
            Preview
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {devices.map((device) => (
            <div
              key={device.name}
              className="bg-white/5 p-4 rounded-lg shadow-lg text-center"
            >
              <h2 className="text-lg font-semibold text-blue-400 mb-4">
                {device.name}
              </h2>
              <div className="rounded overflow-hidden border border-gray-600 bg-black">
                <img
                  src={getScreenshotUrl(device.width)}
                  alt={`${device.name} screenshot`}
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/fallback.png"; // optional fallback
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
