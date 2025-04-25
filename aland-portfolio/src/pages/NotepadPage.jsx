// pages/NotepadPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NotepadPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ideas");
  const [selectedTag, setSelectedTag] = useState(null);

  const tabs = [
    { id: "ideas", label: "ideas.txt" },
    { id: "future", label: "future.txt" },
    { id: "scraps", label: "IMPORTANT.txt" },
  ];

  const entries = {
    ideas: [
      { text: "Some kinda machine learning data-set training", tags: ["fun", "ai", "dataset"] },
      { text: "Create browser-based game", tags: ["fun", "game"] },
      { text: "Add more commands to terminal", tags: ["fun", "terminal"] },
      { text: "Dev karma meter based on GitHub stats (i never use github..)", tags: ["api", "github", "stats"] },
    ],
    future: [
      { text: "Tool builder that generates React components", tags: ["meta", "generator"] },
      { text: "Use GPT API for something..", tags: ["fun", "ai"] },
      { text: "Fix current auto-typer tool", tags: ["auto-typer", "tool"] },
      { text: "Do my homework", tags: ["university", "homework", "sad"] },
    ],
    scraps: [
      { text: "Fix my app", tags: ["app", "dev"] },
      { text: "Fix light mode theme", tags: ["visual", "fun"] },
      { text: "Create backend for website", tags: ["backend", "dev"] },
    ],
  };

  const activeNotes = entries[activeTab].filter((entry) =>
    selectedTag ? entry.tags.includes(selectedTag) : true
  );

  return (
    <div className="min-h-screen bg-[#0e0e10] text-white font-mono px-4 py-6 relative">
      {/* 🔙 Back to Home */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 bg-white/10 border border-white/20 px-4 py-2 rounded text-sm text-white hover:bg-white/20 transition"
      >
        🔙 Back to Home
      </button>

      {/* Notepad Wrapper */}
      <div className="max-w-5xl mx-auto mt-12 bg-[#1a1a1a] border border-gray-700 rounded shadow-lg overflow-hidden">
        {/* Title Bar */}
        <div className="bg-[#2a2a2a] text-gray-300 px-4 py-2 text-sm border-b border-gray-700 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-4 font-semibold text-white">notepad.txt</span>
        </div>

        {/* Tabs */}
        <div className="bg-[#1f1f1f] border-b border-gray-800 flex text-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedTag(null);
              }}
              className={`px-4 py-2 border-r border-gray-800 ${
                activeTab === tab.id
                  ? "bg-[#111] text-blue-400 font-bold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 whitespace-pre-wrap text-sm leading-relaxed text-gray-100">
          {activeNotes.map((entry, i) => (
            <div key={i} className="mb-4">
              <p className="mb-1">• {entry.text}</p>
              <div className="flex gap-2 flex-wrap text-xs text-blue-300">
                {entry.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() =>
                      setSelectedTag(tag === selectedTag ? null : tag)
                    }
                    className={`px-2 py-0.5 rounded border border-blue-500 hover:bg-blue-600/20 transition ${
                      selectedTag === tag
                        ? "bg-blue-600/30 font-bold text-white"
                        : ""
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {activeNotes.length === 0 && (
            <p className="text-gray-500 italic">
              No notes with that tag yet. Try another tab or tag.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
