// src/tools/JWTDecoder.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function JWTDecoder() {
  const [token, setToken] = useState('');
  const [decoded, setDecoded] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const decodeJWT = () => {
    try {
      const [header, payload, signature] = token.split('.');
      if (!header || !payload || !signature) throw new Error('Invalid JWT format');

      const decode = (str) =>
        JSON.parse(atob(str.replace(/-/g, '+').replace(/_/g, '/')));

      setDecoded({
        header: decode(header),
        payload: decode(payload),
        signature,
      });
      setError('');
    } catch (e) {
      setDecoded(null);
      setError('Invalid JWT token');
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
        <h1 className="text-2xl font-bold mb-4">🔐 JWT Decoder</h1>

        <textarea
          placeholder="Paste JWT here..."
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-full bg-black border border-gray-700 p-4 rounded resize-none text-sm mb-4"
          rows={4}
        />
        <button
          onClick={decodeJWT}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded mb-4"
        >
          Decode
        </button>

        {error && <p className="text-red-400">{error}</p>}

        {decoded && (
          <div className="space-y-4 mt-4">
            <div>
              <h2 className="font-semibold text-blue-400 mb-1">Header</h2>
              <pre className="bg-[#1a1a1a] p-4 rounded text-sm">
                {JSON.stringify(decoded.header, null, 2)}
              </pre>
            </div>
            <div>
              <h2 className="font-semibold text-blue-400 mb-1">Payload</h2>
              <pre className="bg-[#1a1a1a] p-4 rounded text-sm">
                {JSON.stringify(decoded.payload, null, 2)}
              </pre>
            </div>
            <div>
              <h2 className="font-semibold text-blue-400 mb-1">Signature</h2>
              <div className="break-all text-sm text-gray-400 bg-[#1a1a1a] p-4 rounded">
                {decoded.signature}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
