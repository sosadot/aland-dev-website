import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function ToolCard({ title, description, link }) {
  const { t } = useTranslation();

  return (
    <motion.a
      href={link}
      whileHover={{
        scale: 1.05,
        rotate: "0.5deg",
        boxShadow: "0px 0px 12px rgba(59,130,246,0.5)",
      }}
      transition={{ type: "spring", stiffness: 200 }}
      className="block bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden"
    >
      <motion.h4
        whileHover={{ scale: 1.05 }}
        className="text-xl font-semibold mb-2 text-white"
      >
        {title}
      </motion.h4>

      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
        {description}
      </p>

      <motion.span
        whileHover={{ x: 5 }}
        className="inline-block text-sm text-blue-400 hover:text-blue-300 transition"
      >
        {t("tools.open")} →
      </motion.span>
    </motion.a>
  );
}
