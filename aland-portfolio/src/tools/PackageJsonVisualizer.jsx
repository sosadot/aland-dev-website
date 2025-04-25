// src/tools/PackageJsonVisualizer.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PackageJsonVisualizer() {
  const [raw, setRaw] = useState('');
  const [parsed, setParsed] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const parseJson = () => {
    try {
      const data = JSON.parse(raw);
      setParsed(data);
      setError('');
    } catch (err) {
      setParsed(null);
      setError('Invalid JSON');
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e10] text-white p-6 font-mono relative">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 bg-white/10 border border-white/20 px-4 py-2 rounded text-sm hover:bg-white/20 transition"
      >
        🔙 Back to Home
      </button>

      <div className="pt-20">
        <h1 className="text-2xl font-bold mb-4">📦 package.json Visualizer</h1>

        <textarea
          placeholder="Paste your package.json here..."
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          className="w-full bg-black border border-gray-700 p-4 rounded resize-none text-sm mb-4"
          rows={10}
        />
        <button
          onClick={parseJson}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded mb-4"
        >
          Parse
        </button>

        {error && <p className="text-red-400">{error}</p>}

        {parsed && (
          <div className="space-y-6 mt-6">
            {['scripts', 'dependencies', 'devDependencies'].map((section) =>
              parsed[section] ? (
                <div key={section}>
                  <h2 className="text-blue-400 font-semibold mb-2">{section}</h2>
                  <ul className="bg-[#1a1a1a] p-4 rounded text-sm space-y-1">
                    {Object.entries(parsed[section]).map(([key, value]) => (
                      <li key={key} className="flex justify-between">
                        <span className="text-white">{key}</span>
                        <span className="text-gray-400">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
}
