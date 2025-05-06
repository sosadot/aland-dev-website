import { BsSun, BsMoonStars } from "react-icons/bs";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // <- added motion
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
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
      className={`fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-all duration-300 ${
        scrolled ? "bg-black/70 backdrop-blur-md shadow-xl border-b border-white/10" : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <motion.h1
        whileHover={{ scale: 1.05 }}
        className="font-bold text-xl text-white cursor-pointer"
      >
        Aland Aki
      </motion.h1>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Language Selector */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="transition-all"
        >
          <LanguageSelector selectedLang={selectedLang} setSelectedLang={setSelectedLang} />
        </motion.div>

        {/* Nav Links */}
        <motion.div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} className="transition">
            <Link
              to="/projects"
              className="text-sm px-4 py-2 rounded-full hover:bg-white/10 transition border border-white/10 text-white"
            >
              🚀 Projects
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="transition">
            <Link
              to="/notepad"
              className="text-sm px-4 py-2 rounded-full hover:bg-white/10 transition border border-white/10 text-white"
            >
              📝 Notepad
            </Link>
          </motion.div>

          {/* TerminalButton with hover pop */}
          <motion.div whileHover={{ scale: 1.1 }} className="transition">
            <TerminalButton />
          </motion.div>

          {/* Dark Mode Toggle */}
          <motion.button
            onClick={() => setDarkMode(!darkMode)}
            whileHover={{ rotate: 20 }}
            className="text-2xl text-white transition-transform"
          >
            {darkMode ? <BsSun /> : <BsMoonStars />}
          </motion.button>
        </motion.div>
      </div>
    </motion.nav>
  );
}
