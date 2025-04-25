// components/Hero.jsx
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  const headlines = [
    t("hero.headline"),
    t("hero.headline2"),
    t("hero.headline3"),
  ];

  return (
    <section className="relative z-10 text-center py-40 px-6">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
      >
        <Typewriter
          words={headlines}
          loop={true}
          cursor
          cursorStyle="_"
          typeSpeed={60}
          deleteSpeed={40}
          delaySpeed={2000}
        />
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl"
      >
        {t("hero.subtext")}
      </motion.p>
    </section>
  );
}
