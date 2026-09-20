import { useTranslation } from "react-i18next";
import translations from "./translations";

export default function useDonationTranslation() {
  const { t, i18n } = useTranslation();
  const code = (i18n.resolvedLanguage || i18n.language || "en")
    .split("-")[0]
    .toLowerCase();
  const language = ["en", "de", "fa"].includes(code) ? code : "en";
  return {
    language,
    t: (key) =>
      t(key, {
        defaultValue:
          translations[language][key] || translations.en[key] || key,
      }),
  };
}
