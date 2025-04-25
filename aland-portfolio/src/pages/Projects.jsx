import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const projects = [
  {
    title: "MosqueFinder Pro",
    description: "Find mosques near you. Available on the App Store.",
    image: "/assets/projects/mosquefinder.png", // <- place this image in /public/images/
    link: "https://apps.apple.com/dk/app/mosquefinder-pro/id6742509362", // Replace with real App Store link
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
    image: "/assets/projects/makas.jpg",
    link: "https://makas.dk",
    tags: ["Business Site", "Next.js", "Design"],
  },
];

export default function Projects() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0e0e10] text-white p-6 relative">
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 bg-white/10 border border-white/20 px-4 py-2 rounded text-sm hover:bg-white/20 transition"
      >
        🔙 Back to Home
      </button>

      <div className="pt-24 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center text-blue-400">
          🧩 My Projects & Apps
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.a
              key={i}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-white/10 transition p-4 rounded-xl shadow border border-white/10 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="rounded mb-4 w-full h-40 object-cover"
              />
              <h2 className="text-xl font-semibold mb-1">{project.title}</h2>
              <p className="text-gray-400 text-sm mb-2">{project.description}</p>
              <div className="flex flex-wrap gap-2 text-xs text-white/70 mt-auto">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-white/10 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
