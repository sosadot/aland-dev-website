// components/Footer.jsx
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="py-12 text-center text-gray-500 text-sm">
      &copy; {new Date().getFullYear()} Aland Aki. {t("footer.text")}
    </footer>
  );
}
