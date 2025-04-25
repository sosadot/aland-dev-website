// src/App.jsx
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TypingTestPage from './tools/TypingTestPage';
import McCheckerPage from './tools/McCheckerPage';
import Terminal from './pages/Terminal';
import ResponsiveViewerPage from './pages/ResponsiveViewerPage';
import BcryptTool from "./tools/BcryptTool";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="transition-colors duration-500 bg-white dark:bg-[#0e0e10] text-black dark:text-white min-h-screen">
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/tools/typing-test" element={<TypingTestPage />} />
        <Route path="/tools/mc-checker" element={<McCheckerPage />} />
        <Route path="/tools/responsive-viewer" element={<ResponsiveViewerPage />} />
        <Route path="/tools/bcrypt" element={<BcryptTool />} />
        <Route path="/terminal" element={<Terminal />} />
      </Routes>
    </div>
  );
}
