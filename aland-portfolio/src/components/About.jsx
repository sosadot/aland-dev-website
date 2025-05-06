import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { useState, useEffect } from "react";
import NowPlaying from "../components/NowPlaying";

export default function About() {
  const { t } = useTranslation();
  const techStack = t("about.stack", { returnObjects: true });

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const experiences = [
    {
      title: "Full-Stack Developer",
      company: "Freelance",
      year: "2020 - Present",
      description: "Building web apps and automation tools for businesses and startups.",
    },
    {
      title: "Founder",
      company: "PrayerPro / MosqueFinder Pro",
      year: "2023 - Present",
      description: "Created a prayer time platform and mobile app used by mosques and communities.",
    },
    {
      title: "Software Intern",
      company: "Local Tech Company",
      year: "2019",
      description: "Worked on internal tooling and automation scripts.",
    }
  ];

  return (
    <section className="relative z-10 py-24 px-6 flex justify-center overflow-hidden">
      
      {/* Animated drifting background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-black-900/30 via-black-900/20 to-transparent blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
      />

      <div className="flex flex-col md:flex-row gap-12 max-w-6xl w-full relative z-10">

        {/* About Box */}
        <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} glareEnable={true} glareMaxOpacity={0.1}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 50 }}
            transition={{ duration: 1, type: "spring" }}
            style={{ willChange: "transform, opacity" }}
            className="flex-1 bg-[rgba(30,30,30,0.7)] backdrop-blur-md border border-white/20 rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 ease-in-out"
          >
            <motion.h2
              whileHover={{ scale: 1.05, textShadow: "0px 0px 8px rgba(255,255,255,0.8)" }}
              className="text-4xl font-bold mb-8 text-white transition-all duration-300"
            >
              {t("about.title")}
            </motion.h2>

            <motion.p
              whileHover={{ scale: 1.02 }}
              className="text-gray-300 text-lg mb-6 leading-relaxed transition-all duration-300"
            >
              {t("about.description")}
            </motion.p>

            <motion.p
              whileHover={{ scale: 1.02 }}
              className="text-gray-400 text-base mb-10 leading-relaxed transition-all duration-300"
            >
              I build practical tools that automate work, solve real problems, and are easy to use and maintain.
            </motion.p>

            {/* Technologies */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-4">
                {techStack.map((tech, index) => (
                  <motion.span
                    key={index}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 0 12px rgba(255,255,255,0.5)",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    style={{ willChange: "transform, opacity" }}
                    className="px-4 py-2 rounded-full text-sm text-white bg-[rgba(30,30,30,0.8)] backdrop-blur-md border border-white/20 shadow-md hover:shadow-lg transition"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mt-12"
            >
              <h3 className="text-2xl font-semibold text-white mb-3">Currently Listening</h3>
              <NowPlaying />
            </motion.div>
          </motion.div>
        </Tilt>

        {/* Experience Box */}
        <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} glareEnable={true} glareMaxOpacity={0.1}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.3, type: "spring" }}
            style={{ willChange: "transform, opacity" }}
            className="flex-1 bg-[rgba(30,30,30,0.7)] backdrop-blur-md border border-white/20 rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 ease-in-out"
          >
            <motion.h2
              whileHover={{ scale: 1.05, textShadow: "0px 0px 8px rgba(255,255,255,0.8)" }}
              className="text-4xl font-bold mb-8 text-white transition-all duration-300"
            >
              Experience
            </motion.h2>

            <div className="flex flex-col gap-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.05,
                    rotate: "1deg",
                    boxShadow: "0px 0px 12px rgba(255,255,255,0.2)"
                  }}
                  transition={{ type: "spring", stiffness: 200 }}
                  style={{ willChange: "transform, opacity" }}
                  className="bg-[rgba(50,50,50,0.7)] hover:bg-[rgba(70,70,70,0.7)] backdrop-blur-md p-5 rounded-2xl border border-white/20 shadow-md transition-all"
                >
                  <h3 className="text-xl font-semibold text-white mb-2">{exp.title}</h3>
                  <p className="text-sm text-gray-300 mb-2">{exp.company} — {exp.year}</p>
                  <p className="text-gray-400 text-sm">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Tilt>

      </div>
    </section>
  );
}
