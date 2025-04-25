// components/About.jsx
import { useTranslation } from "react-i18next";
import NowPlaying from "../components/NowPlaying";

export default function About() {
  const { t } = useTranslation();
  const techStack = t("about.stack", { returnObjects: true });

  return (
    <section className="py-20 px-6 text-center max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-blue-400">{t("about.title")}</h2>
      <p className="text-gray-400 text-lg">{t("about.description")}</p>

      <div className="flex justify-center gap-4 mt-6 flex-wrap">
        {techStack.map((tech, index) => (
          <span key={index} className="bg-white/10 px-4 py-2 rounded-xl">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <NowPlaying />
      </div>
    </section>
  );
}
