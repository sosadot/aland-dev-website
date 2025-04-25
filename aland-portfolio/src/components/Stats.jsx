// components/Stats.jsx
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";

export default function Stats() {
  const { t } = useTranslation();

  return (
    <section className="py-20 text-center bg-[#111113]">
      <h2 className="text-3xl font-bold text-blue-400 mb-12">{t("stats.title")}</h2>
      <div className="flex flex-wrap justify-center gap-12 text-2xl font-semibold text-white">
        <div>
          <CountUp end={30} duration={10} />+ {t("stats.tools")}
        </div>
        <div>
          <CountUp end={50} duration={10} />+ {t("stats.sites")}
        </div>
        <div>
          <CountUp end={500} duration={10} />+ {t("stats.coffee")} ☕
        </div>
      </div>
    </section>
  );
}
