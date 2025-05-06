import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { useState, useEffect } from "react";

const projects = [
  {
    title: "MosqueFinder Pro",
    description: "Find mosques near you. Available on the App Store.",
    image: "/assets/projects/mosquefinder.png",
    link: "https://apps.apple.com/dk/app/mosquefinder-pro/id6742509362",
    tags: ["iOS App", "Utility", "Islamic"],
  },
  {
    title: "MosqueFinder Web",
    description: "Web version of MosqueFinder Pro for browser users.",
    image: "/assets/projects/mosquefinder-web.png",
    link: "https://mosquefinder.prayerpro.io",
    tags: ["Web App", "React", "Location"],
  },
  {
    title: "Makas.dk",
    description: "Modern website for Makas Barbershop in Denmark.",
    image: "/assets/projects/makas.png",
    link: "https://makas.dk",
    tags: ["Business Site", "Next.js", "Design"],
  },
  {
    title: "Zen - Demo UI",
    description: "A website for complete relaxation.",
    image: "/assets/projects/zen.png",
    link: "https://zen.alandaki.com",
    tags: ["Zen", "Next.js", "Design"],
  },
  {
    title: "Marios-Pizzaria.dk",
    description: "Modern website for a Pizzaria in Denmark.",
    image: "/assets/projects/pizzaria.png",
    link: "https://pizzaria.alandaki.com",
    tags: ["Business Site", "Next.js", "Design"],
  },
  {
    title: "The Journey of a Pixel",
    description: "Animation created with code - by Aland.",
    image: "/assets/projects/pixel.png",
    link: "https://pixeljourney.alandaki.com",
    tags: ["Animation", "Code", "Design"],
  },
  {
    title: "VaultDrop",
    description: "File sharing project",
    image: "/assets/projects/vaultdrop.png",
    link: "https://vaultdrop.alandaki.com",
    tags: ["Filesharing", "Media", "Files"],
  },
  {
    title: "AKI Media",
    description: "Website & Software Development",
    image: "/assets/projects/akimedia.png",
    link: "https://akimedia.alandaki.com",
    tags: ["Development", "Website", "Software"],
  },
];

export default function Projects() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-b from-[#0e0e10] to-[#111113] text-white px-6 pb-20 relative overflow-hidden"
    >
      {/* Background Blobs */}
      <motion.div
        className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-purple-500 opacity-20 blur-3xl rounded-full"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-200px] right-[-150px] w-[500px] h-[500px] bg-blue-500 opacity-20 blur-3xl rounded-full"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 35, ease: "easeInOut" }}
      />

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 bg-white/10 border border-white/20 px-4 py-2 rounded text-sm hover:bg-white/20 transition z-50"
      >
        🔙 Back
      </button>

      {/* Title */}
      <div className="pt-24 max-w-7xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-bold mb-16"
        >
          🧩 My Projects & Apps
        </motion.h1>
      </div>

      {/* Featured Project */}
      <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} glareEnable={true} glareMaxOpacity={0.15}>
        <motion.a
          href={projects[0].link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.5 }}
          className="block bg-[rgba(30,30,30,0.7)] backdrop-blur-md rounded-3xl border border-white/10 p-8 mb-20 max-w-4xl mx-auto relative overflow-hidden shadow-lg hover:shadow-2xl"
        >
          <img
            src={projects[0].image}
            alt={projects[0].title}
            className="rounded-2xl w-full h-72 object-cover mb-6"
          />
          <h2 className="text-3xl font-bold mb-2">{projects[0].title}</h2>
          <p className="text-gray-400 text-sm mb-4">{projects[0].description}</p>
          <div className="flex flex-wrap gap-2">
            {projects[0].tags.map((tag, idx) => (
              <motion.span
                key={idx}
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1 text-xs bg-[rgba(40,40,40,0.8)] backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-blue-500/20 hover:text-white transition-all shadow-md"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.a>
      </Tilt>

      {/* Projects List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {projects.slice(1).map((project, i) => (
          <Tilt
            key={i}
            glareEnable={true}
            glareMaxOpacity={0.1}
            tiltMaxAngleX={6}
            tiltMaxAngleY={6}
          >
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 30 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="w-[90vw] sm:w-[350px] bg-[rgba(30,30,30,0.7)] backdrop-blur-md rounded-3xl border border-white/10 p-6 flex flex-col hover:shadow-xl transition-all duration-500 relative overflow-hidden"
            >
              <div className="relative z-10">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-40 object-cover rounded-2xl mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.08 }}
                      className="px-3 py-1 text-xs bg-[rgba(40,40,40,0.8)] backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-blue-500/20 hover:text-white transition-all shadow-md"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.a>
          </Tilt>
        ))}
      </div>
    </motion.div>
  );
}
