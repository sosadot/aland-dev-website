import { useEffect, useState, useRef } from "react";

const FALLBACK = {
  en: [
    "The quick brown fox jumps over the lazy dog.",
    "Failure is the key to success.",
    "Typing fast is a useful skill."
  ],
  sv: [
    "Kodning är som att lösa pussel.",
    "Skriv alltid kod som någon ska läsa.",
    "En snabb brun räv hoppar över en lat hund."
  ],
  fr: [
    "Coder, c'est penser clairement.",
    "Chaque bug est une opportunité.",
    "La programmation est un art logique."
  ]
};

export default function TypingTest() {
  const [language, setLanguage] = useState("en");
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [stats, setStats] = useState({ wpm: 0, accuracy: 100, correct: 0, incorrect: 0 });
  const [bestWPM, setBestWPM] = useState(() => localStorage.getItem("bestWPM") || 0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef();

  const getLocalSentence = () => {
    const set = FALLBACK[language] || FALLBACK.en;
    return set[Math.floor(Math.random() * set.length)];
  };

  const fetchSentence = async () => {
    setLoading(true);
    try {
      if (language === "en") {
        const res = await fetch("https://api.quotable.io/random");
        const data = await res.json();
        if (!data.content) throw new Error("Invalid response");
        setText(data.content);
      } else {
        setText(getLocalSentence());
      }
    } catch (err) {
      setText(getLocalSentence()); // fallback on error
    } finally {
      resetState();
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSentence();
  }, [language]);

  useEffect(() => {
    if (!startTime && input.length === 1) {
      setStartTime(Date.now());
    }

    if (input === text && text.length > 0) {
      const timeTaken = (Date.now() - startTime) / 60000;
      const words = text.trim().split(" ").length;
      const wpm = Math.round(words / timeTaken);
      const correct = [...text].filter((c, i) => input[i] === c).length;
      const incorrect = text.length - correct;
      const accuracy = Math.round((correct / text.length) * 100);
      setStats({ wpm, accuracy, correct, incorrect });

      if (wpm > bestWPM) {
        setBestWPM(wpm);
        localStorage.setItem("bestWPM", wpm);
      }
      setFinished(true);
    }
  }, [input]);

  const resetState = () => {
    setInput("");
    setStartTime(null);
    setStats({ wpm: 0, accuracy: 100, correct: 0, incorrect: 0 });
    setFinished(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const getCharClass = (char, i) => {
    if (!input[i]) return "text-gray-500";
    if (input[i] === char) return "text-green-400";
    return "text-red-400 bg-red-900";
  };

  return (
    <div>
      {/* Language */}
      <div className="mb-4">
        <label className="text-sm text-gray-400 mr-2">Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-800 text-white border border-gray-700 px-3 py-1 rounded"
        >
          <option value="en">English</option>
          <option value="sv">Swedish</option>
          <option value="fr">French</option>
        </select>
      </div>

      {/* Sentence */}
      {loading ? (
        <div className="text-gray-400">Loading sentence...</div>
      ) : (
        <>
          <div className="text-lg font-mono bg-gray-800 p-4 rounded mb-4 leading-relaxed min-h-[100px]">
            {text.split("").map((char, i) => (
              <span key={i} className={getCharClass(char, i)}>
                {char}
              </span>
            ))}
          </div>

          {/* Input */}
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-gray-800 text-white p-3 rounded focus:outline-none"
            placeholder="Start typing here..."
            disabled={finished}
            rows={3}
          />

          {/* Stats */}
          {finished && (
            <div className="mt-6 text-sm text-gray-300 space-y-2">
              <div>✅ Correct: <span className="text-green-400 font-bold">{stats.correct}</span></div>
              <div>❌ Incorrect: <span className="text-red-400 font-bold">{stats.incorrect}</span></div>
              <div>🎯 Accuracy: <span className="text-yellow-400 font-bold">{stats.accuracy}%</span></div>
              <div>🚀 WPM: <span className="text-blue-400 font-bold">{stats.wpm}</span></div>
              <div>🏆 Best WPM: <span className="text-purple-400 font-bold">{bestWPM}</span></div>
              <button
                onClick={fetchSentence}
                className="mt-4 bg-blue-600 px-4 py-2 text-sm rounded hover:bg-blue-700"
              >
                ↻ New Sentence
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
