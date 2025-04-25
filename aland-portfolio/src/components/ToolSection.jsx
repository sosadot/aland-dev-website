// components/ToolSection.jsx
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ToolCard from "./ToolCard";

export default function ToolSection() {
  const { t } = useTranslation();

  const tools = [
    {
      title: t("tools.mcChecker.title"),
      description: t("tools.mcChecker.description"),
      link: "/tools/mc-checker",
    },
    {
      title: t("tools.typingTest.title"),
      description: t("tools.typingTest.description"),
      link: "/tools/typing-test",
    },
    {
      title: t("tools.responsiveViewer.title"),
      description: t("tools.responsiveViewer.description"),
      link: "/tools/responsive-viewer",
    },
    {
      title: t("tools.bcrypt.title"),
      description: t("tools.bcrypt.description"),
      link: "/tools/bcrypt",
    },
    {
      title: t("tools.jwt.title"),
      description: t("tools.jwt.description"),
      link: "/tools/jwt-decoder"
    },
    {
      title: t("tools.packagejson.title"),
      description: t("tools.packagejson.description"),
      link: "/tools/package-visualizer"
    },
    {
      title: t("tools.cssanimation.title"),
      description: t("tools.cssanimation.description"),
      link: "/tools/css-animation"
    },
    {
      title: t("tools.thisorthat.title"),
      description: t("tools.thisorthat.description"),
      link: "/tools/this-or-that"
    }     
  ];  

  return (
    <section id="tools" className="px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-16 text-center text-blue-400"
      >
        {t("tools.title")}
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {tools.map((tool, index) => (
          <motion.div
            key={index}
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4 }}
          >
            <ToolCard {...tool} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
