import { useState, useEffect, useRef } from "react";

export default function Terminal() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [prevCommands, setPrevCommands] = useState([]);
  const [commandIndex, setCommandIndex] = useState(-1);
  const [memory, setMemory] = useState({});
  const terminalRef = useRef(null);

  const banner = `
   █████╗ ██╗  ██╗██╗
  ██╔══██╗╚██╗██╔╝██║
  ███████║ ╚███╔╝ ██║
  ██╔══██║ ██╔██╗ ██║
  ██║  ██║██╔╝ ██╗██║
  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝
  `;

  const commandList = [
    "help",
    "about",
    "projects",
    "clear",
    "open github",
    "open twitter",
    "open resume",
    "theme hacker",
    "theme light",
    "whoami",
    "remember name",
    "exit"
  ];

  const commands = {
    exit: () => {
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
      return "Exiting terminal... 👋";
    },
    help: () =>
      `Available commands:\n- ${commandList.join("\n- ")}`,
    about: () =>
      "I'm Aland Aki — full-stack dev building tools that automate, analyze, and empower.",
    projects: () =>
      "My tools live at /#tools — try: open projects",
    clear: () => {
      setHistory([]);
      return null;
    },
    "open github": () => {
      window.open("https://github.com/alandaki", "_blank");
      return "Opening GitHub...";
    },
    "open twitter": () => {
      window.open("https://twitter.com/alandaki", "_blank");
      return "Opening Twitter...";
    },
    "open resume": () => {
      window.open("/resume.pdf", "_blank");
      return "Opening resume...";
    },
    "open projects": () => {
      window.location.href = "/#tools";
      return "Opening projects...";
    },
    "theme hacker": () => "Theme set to 'hacker' (matrix green).",
    "theme light": () => "Theme set to 'light mode'. Sunglasses on 😎",
    whoami: () => memory.name ? `You are ${memory.name}` : "I don't know you yet. Try: remember name Aland",
  };

  const handleCommand = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    const lower = trimmed.toLowerCase();

    setHistory(prev => [...prev, `$ ${trimmed}`]);
    setPrevCommands(prev => [...prev, trimmed]);
    setCommandIndex(-1);

    // Handle memory
    if (lower.startsWith("remember name")) {
      const name = trimmed.split(" ").slice(2).join(" ");
      setMemory((prev) => ({ ...prev, name }));
      setHistory((prev) => [...prev, `I'll remember that, ${name}.`]);
      setInput("");
      return;
    }

    const commandFn = commands[lower];
    if (commandFn) {
      const result = commandFn();
      if (result) {
        setTimeout(() => {
          setHistory(prev => [...prev, result]);
        }, 200);
      }
    } else {
      setTimeout(() => {
        setHistory(prev => [...prev, `command not found: ${trimmed} (type 'help')`]);
      }, 200);
    }

    setInput("");
  };

  // Scroll to bottom on new output
  useEffect(() => {
    terminalRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Arrow key navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (prevCommands.length === 0) return;
      const newIndex = Math.max(0, commandIndex - 1);
      setCommandIndex(newIndex);
      setInput(prevCommands[newIndex] || "");
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (prevCommands.length === 0) return;
      const newIndex = Math.min(prevCommands.length - 1, commandIndex + 1);
      setCommandIndex(newIndex);
      setInput(prevCommands[newIndex] || "");
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const match = commandList.find((cmd) => cmd.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  // Initial banner load
  useEffect(() => {
    setHistory([banner.trim()]);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono px-6 py-8">
      <h1 className="text-xl mb-6">~/aki-terminal</h1>

      <div className="space-y-2 max-h-[70vh] overflow-y-auto mb-6 pr-2">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">{line}</div>
        ))}
        <div ref={terminalRef} />
      </div>

      <form onSubmit={handleCommand} className="flex gap-2 items-center">
        <span className="text-green-500">$</span>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-black border-none focus:outline-none text-green-400 w-full"
          placeholder="Type a command..."
        />
      </form>
    </div>
  );
}
