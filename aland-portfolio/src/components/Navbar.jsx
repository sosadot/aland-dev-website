// File: src/components/Navbar.jsx
import { BsSun, BsMoonStars } from "react-icons/bs";
import { useState, useEffect } from "react";
import TerminalButton from "./TerminalButton";
import LanguageSelector from "./LanguageSelector";

export default function Navbar({ darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-all duration-300 ${
        scrolled ? "bg-black/70 backdrop-blur shadow-lg" : "bg-transparent"
      }`}
    >
      <h1 className="font-bold text-xl">Aland Aki</h1>
      <div className="flex items-center gap-4">
        <LanguageSelector selectedLang={selectedLang} setSelectedLang={setSelectedLang} />
        <TerminalButton />
        <button onClick={() => setDarkMode(!darkMode)} className="text-xl">
          {darkMode ? <BsSun /> : <BsMoonStars />}
        </button>
      </div>
    </nav>
  );
}
