import { useState } from "react";
import { useNavigate } from "react-router-dom";

const easingOptions = [
  "ease",
  "ease-in",
  "ease-out",
  "ease-in-out",
  "linear",
  "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
];

const presets = {
  bounce: `
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-25%); }
    }
  `,
  spin: `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `,
  pulse: `
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.2); }
    }
  `,
  fade: `
    @keyframes fade {
      0% { opacity: 0; transform: scale(0.95); }
      100% { opacity: 1; transform: scale(1); }
    }
  `,
};

export default function CSSAnimationPlayground() {
  const navigate = useNavigate();

  const [animationName, setAnimationName] = useState("bounce");
  const [duration, setDuration] = useState(1000);
  const [delay, setDelay] = useState(0);
  const [easing, setEasing] = useState("ease-in-out");
  const [loop, setLoop] = useState(true);
  const [showTailwind, setShowTailwind] = useState(false);
  const [customKeyframes, setCustomKeyframes] = useState(presets["bounce"]);

  const animationStyle = {
    animationName,
    animationDuration: `${duration}ms`,
    animationTimingFunction: easing,
    animationDelay: `${delay}ms`,
    animationIterationCount: loop ? "infinite" : 1,
  };

  return (
    <div className="min-h-screen bg-[#0e0e10] text-white p-6 font-sans relative">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 bg-white/10 border border-white/20 px-4 py-2 rounded text-sm hover:bg-white/20 transition"
      >
        🔙 Back to Home
      </button>

      <div className="pt-20 max-w-5xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-8 text-blue-400">
          🎬 CSS Animation Playground
        </h1>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 text-left">
          <div>
            <label className="block text-sm mb-1">Animation Preset</label>
            <select
              value={animationName}
              onChange={(e) => {
                const key = e.target.value;
                setAnimationName(key);
                setCustomKeyframes(presets[key]);
              }}
              className="bg-black border border-gray-600 px-2 py-1 rounded w-full"
            >
              {Object.keys(presets).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Easing</label>
            <select
              value={easing}
              onChange={(e) => setEasing(e.target.value)}
              className="bg-black border border-gray-600 px-2 py-1 rounded w-full"
            >
              {easingOptions.map((ease) => (
                <option key={ease} value={ease}>
                  {ease}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Duration (ms)</label>
            <input
              type="range"
              min="100"
              max="5000"
              step="100"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-gray-400">{duration} ms</div>
          </div>

          <div>
            <label className="block text-sm mb-1">Delay (ms)</label>
            <input
              type="range"
              min="0"
              max="3000"
              step="100"
              value={delay}
              onChange={(e) => setDelay(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-gray-400">{delay} ms</div>
          </div>

          <div className="col-span-2 flex items-center gap-4">
            <label className="text-sm">
              <input
                type="checkbox"
                checked={loop}
                onChange={() => setLoop(!loop)}
                className="mr-2"
              />
              Loop Forever
            </label>

            <label className="text-sm">
              <input
                type="checkbox"
                checked={showTailwind}
                onChange={() => setShowTailwind(!showTailwind)}
                className="mr-2"
              />
              Show Tailwind Output
            </label>
          </div>
        </div>

        {/* Preview */}
        <div className="flex justify-center mb-10">
          <div
            key={`${animationName}-${duration}-${easing}-${delay}-${loop}`}
            style={animationStyle}
            className="w-32 h-32 bg-blue-500 rounded shadow-lg"
          ></div>
        </div>

        {/* Keyframe editor */}
        <div className="mb-8 text-left">
          <label className="block text-sm mb-2 text-blue-400 font-semibold">
            🎯 Custom Keyframes
          </label>
          <textarea
            value={customKeyframes}
            onChange={(e) => setCustomKeyframes(e.target.value)}
            rows={6}
            className="w-full bg-black border border-gray-600 p-3 rounded text-sm font-mono"
          />
        </div>

        {/* Output */}
        <div className="bg-[#1a1a1a] p-4 rounded text-sm text-left">
          <p className="mb-2 font-semibold text-blue-400">Output:</p>
          <pre>
            {showTailwind
              ? `animate-${animationName} duration-[${duration}ms] ease-[${easing}] delay-[${delay}ms] ${
                  loop ? "" : "animate-once"
                }`
              : `animation: ${animationName} ${duration}ms ${easing} ${delay}ms ${
                  loop ? "infinite" : "1"
                };`}
          </pre>
        </div>
      </div>

      {/* Inject live keyframes */}
      <style>{customKeyframes}</style>
    </div>
  );
}
