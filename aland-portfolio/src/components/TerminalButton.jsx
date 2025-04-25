// components/TerminalButton.jsx
import { Link } from "react-router-dom";
import { BsTerminalFill } from "react-icons/bs";

export default function TerminalButton({ className = "" }) {
  return (
    <Link to="/terminal">
      <button
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 text-white font-medium shadow hover:shadow-lg transition-all duration-300 ${className}`}
      >
        <BsTerminalFill className="text-base" />
        Terminal
      </button>
    </Link>
  );
}
