// components/NewsletterSignup.jsx
import { useTranslation } from "react-i18next";

export default function NewsletterSignup() {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-6 text-center bg-[#1c1c1f]">
      <h2 className="text-3xl font-bold mb-4">{t("newsletter.title")}</h2>
      <p className="text-gray-400 mb-6">{t("newsletter.description")}</p>
      <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto">
        <input
          type="email"
          placeholder={t("newsletter.placeholder")}
          className="px-4 py-2 rounded-md bg-black/30 text-white border border-white/10 w-full"
        />
        <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md font-semibold transition">
          {t("newsletter.button")}
        </button>
      </form>
    </section>
  );
}
