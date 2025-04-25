// tools/BcryptTool.jsx
import { useState } from "react";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";

export default function BcryptTool() {
  const [password, setPassword] = useState("");
  const [hash, setHash] = useState("");
  const [verifyInput, setVerifyInput] = useState("");
  const [match, setMatch] = useState(null);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const generateHash = () => {
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(password, salt);
    setHash(hashed);
    setMatch(null);
  };

  const verify = () => {
    const result = bcrypt.compareSync(verifyInput, hash);
    setMatch(result);
  };

  const copyHash = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-[#0e0e10] text-white p-8 font-sans relative">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 bg-white/10 border border-white/20 px-4 py-2 rounded text-sm text-white hover:bg-white/20 transition"
      >
        🔙 Back to Home
      </button>

      <div className="max-w-xl mx-auto pt-12">
        <h1 className="text-3xl font-bold mb-6">🔐 Bcrypt Tool</h1>

        <div className="space-y-6">
          <div>
            <label className="block mb-1 text-sm">Password to hash:</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-black border border-gray-700"
            />
            <button
              onClick={generateHash}
              className="mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
            >
              Generate Hash
            </button>
          </div>

          {hash && (
            <div className="bg-white/5 p-4 rounded border border-gray-700">
              <div className="text-sm break-all">{hash}</div>
              <button
                onClick={copyHash}
                className="mt-2 text-blue-400 text-sm hover:underline"
              >
                {copied ? "Copied!" : "Copy hash"}
              </button>
            </div>
          )}

          {hash && (
            <div>
              <label className="block mb-1 text-sm">
                Password to verify against hash:
              </label>
              <input
                type="text"
                value={verifyInput}
                onChange={(e) => setVerifyInput(e.target.value)}
                className="w-full px-4 py-2 rounded bg-black border border-gray-700"
              />
              <button
                onClick={verify}
                className="mt-3 px-4 py-2 bg-green-500 hover:bg-green-600 rounded"
              >
                Verify Match
              </button>

              {match !== null && (
                <p className={`mt-2 font-semibold ${match ? "text-green-400" : "text-red-400"}`}>
                  {match ? "✅ Passwords match!" : "❌ No match"}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
