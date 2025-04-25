// components/Testimonials.jsx
import { useTranslation } from "react-i18next";

export default function Testimonials() {
  const { t } = useTranslation();
  const quotes = t("testimonials.quotes", { returnObjects: true });

  return (
    <section className="py-20 px-6 text-center">
      <h2 className="text-3xl font-bold text-blue-400 mb-12">
        {t("testimonials.title")}
      </h2>
      <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
        {quotes.map((quote, index) => (
          <blockquote
            key={index}
            className="bg-white/5 p-6 rounded-xl italic"
          >
            “{quote}”
          </blockquote>
        ))}
      </div>
    </section>
  );
}
