import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

export default function Hero() {
  const { t } = useTranslation();

  const [currentHeadline, setCurrentHeadline] = useState(0);
  const headlines = [
    t("hero.headline"),
    t("hero.headline2"),
    t("hero.headline3"),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [headlines.length]);

  // Split paragraph text into words for hover effect
  const paragraphWords = t("hero.subtext").split(" ");

  return (
    <section className="relative z-10 text-center py-44 px-6 overflow-hidden bg-gradient-to-b from-[#0e0e10] via-[#111113] to-[#0e0e10]">

      {/* Hero Title */}
      <motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{
    opacity: 1, // Only once at initial load
    y: [0, -10, 0], // Only breathing movement after that
  }}
  transition={{
    opacity: { duration: 1 },
    y: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 6,
      ease: "easeInOut",
    },
  }}
  whileHover={{
    scale: 1.05,
    textShadow: "0px 0px 30px rgba(255,255,255,0.7)",
  }}
  className="text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight cursor-pointer"
  style={{
    textShadow: "0px 0px 20px rgba(255,255,255,0.4)",
  }}
>
  {headlines[currentHeadline]}
</motion.h1>


      {/* Animated Subtext */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg md:text-xl mt-6 flex flex-wrap justify-center gap-2"
      >
        {paragraphWords.map((word, index) => (
          <motion.span
            key={index}
            whileHover={{
              color: "#ffffff",
              scale: 1.1,
            }}
            transition={{ type: "spring", stiffness: 300 }}
            className="cursor-pointer"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>

    </section>
  );
}
