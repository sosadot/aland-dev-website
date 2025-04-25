import { useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const languages = {
  en: "English",
  da: "Dansk",
};

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  const handleSelect = (code) => {
    i18n.changeLanguage(code);
    setSelectedLang(code);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-md text-sm hover:bg-white/20 transition"
      >
        <FaGlobe />
        <span>{languages[selectedLang]}</span>
      </button>

      {open && (
        <ul className="absolute mt-2 bg-black border border-white/10 rounded-md shadow-lg w-full text-sm z-50">
          {Object.entries(languages).map(([code, label]) => (
            <li
              key={code}
              className={`px-4 py-2 hover:bg-white/10 cursor-pointer ${
                selectedLang === code ? "bg-white/5 font-semibold" : ""
              }`}
              onClick={() => handleSelect(code)}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
