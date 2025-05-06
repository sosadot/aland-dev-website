import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import ToolCard from "./ToolCard";

export default function ToolSection() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("All");

  const tools = [
    { title: t("tools.mcChecker.title"), description: t("tools.mcChecker.description"), link: "/tools/mc-checker", category: "Developer" },
    { title: t("tools.typingTest.title"), description: t("tools.typingTest.description"), link: "/tools/typing-test", category: "Fun" },
    { title: t("tools.responsiveViewer.title"), description: t("tools.responsiveViewer.description"), link: "/tools/responsive-viewer", category: "Developer" },
    { title: t("tools.bcrypt.title"), description: t("tools.bcrypt.description"), link: "/tools/bcrypt", category: "Developer" },
    { title: t("tools.jwt.title"), description: t("tools.jwt.description"), link: "/tools/jwt-decoder", category: "Developer" },
    { title: t("tools.packagejson.title"), description: t("tools.packagejson.description"), link: "/tools/package-visualizer", category: "Developer" },
    { title: t("tools.cssanimation.title"), description: t("tools.cssanimation.description"), link: "/tools/css-animation", category: "Developer" },
    { title: t("tools.thisorthat.title"), description: t("tools.thisorthat.description"), link: "/tools/this-or-that", category: "Fun" },
  ];

  const filteredTools = activeTab === "All" ? tools : tools.filter(tool => tool.category === activeTab);

  return (
    <section id="tools" className="relative z-10 px-6 py-24 flex flex-col items-center overflow-hidden">
      
      {/* Section background drift */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br blur-2xl"
        animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }}
      />

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-12 text-center text-white relative z-10"
      >
        {t("tools.title")}
      </motion.h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-12 flex-wrap justify-center relative z-10">
        {["All", "Developer", "Fun"].map(tab => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={activeTab === tab ? { backgroundColor: "#3b82f6", color: "#ffffff" } : { backgroundColor: "rgba(255,255,255,0.1)" }}
            transition={{ duration: 0.3 }}
            className="px-4 py-2 rounded-full text-sm font-semibold transition"
          >
            {tab}
          </motion.button>
        ))}
      </div>

      {/* Tools */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full relative z-10"
      >
        <AnimatePresence>
          {filteredTools.map((tool, index) => (
            <motion.div
              key={tool.link}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ToolCard {...tool} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
