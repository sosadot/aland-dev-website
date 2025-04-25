import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SHEETS_API =
  "https://script.google.com/macros/s/AKfycbzo2iyadZF8q-KpFenV8Ek_g1y38R_OUQxZtfPopdQDCAF33UENBu8vJcZ3vol84d8h/exec";

const pairs = [
  ["Coffee ☕", "Tea 🍵"],
  ["Mountains 🏔️", "Ocean 🌊"],
  ["Night Owl 🌙", "Early Bird 🌞"],
  ["Books 📚", "Podcasts 🎧"],
  ["Cats 🐱", "Dogs 🐶"],
  ["Pizza 🍕", "Burgers 🍔"],
  ["Netflix 📺", "YouTube ▶️"],
  ["Texting 💬", "Calling 📞"],
  ["Summer ☀️", "Winter ❄️"],
  ["City 🌆", "Nature 🌿"],
];

export default function ThisOrThat() {
  const navigate = useNavigate();
  const [currentPair, setCurrentPair] = useState(["", ""]);
  const [selected, setSelected] = useState(null);
  const [votes, setVotes] = useState({});
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);

  const promptKey = `${currentPair[0]} vs ${currentPair[1]}`;

  const fetchVotes = async () => {
    try {
      const res = await fetch(SHEETS_API);
      const data = await res.json();
      setVotes(data);
    } catch (err) {
      console.error("Failed to fetch votes", err);
    } finally {
      setLoading(false);
    }
  };

  const postVote = async (choice) => {
    await fetch(SHEETS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: promptKey, choice }),
    });
  };

  const handleVote = async (choice) => {
    setSelected(choice);
    setShowResults(true);
    await postVote(choice);
    await fetchVotes();

    setTimeout(() => {
      getNewPair();
    }, 2500);
  };

  const getNewPair = () => {
    const newPair = pairs[Math.floor(Math.random() * pairs.length)];
    setCurrentPair(newPair);
    setSelected(null);
    setShowResults(false);
  };

  useEffect(() => {
    getNewPair();
    fetchVotes();
  }, []);

  const getPercent = (option) => {
    const entry = votes[promptKey];
    if (!entry) return 0;
    const total = Object.values(entry).reduce((a, b) => a + b, 0);
    if (!total) return 0;
    const count = entry[option] || 0;
    return Math.round((count / total) * 100);
  };

  return (
    <div className="min-h-screen bg-[#0e0e10] text-white p-6 font-sans relative">
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 bg-white/10 border border-white/20 px-4 py-2 rounded text-sm hover:bg-white/20 transition"
      >
        🔙 Back to Home
      </button>

      <div className="pt-24 max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">🤔 This or That</h1>
        <p className="text-gray-400 mb-10">Pick one. See what others think.</p>

        {loading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : (
          <AnimatePresence mode="wait">
            {!showResults && (
              <motion.div
                key={currentPair[0]}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                {currentPair.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleVote(option)}
                    className="bg-white/10 hover:bg-white/20 transition px-6 py-4 rounded-xl text-lg font-medium"
                  >
                    {option}
                  </button>
                ))}
              </motion.div>
            )}

            {showResults && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-2xl font-bold text-green-400 mb-6">
                  You picked: {selected}
                </p>

                <div className="space-y-4">
                  {currentPair.map((option) => {
                    const percent = getPercent(option);
                    return (
                      <div key={option} className="text-sm text-gray-300">
                        <div className="flex justify-between">
                          <span>{option}</span>
                          <span>{percent}%</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded mt-1">
                          <div
                            className="h-2 bg-green-500 rounded"
                            style={{
                              width: `${percent}%`,
                              transition: "width 0.4s ease",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
