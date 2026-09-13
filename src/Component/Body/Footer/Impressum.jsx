import { useTranslation } from "react-i18next";
import NavBar from "../../NavigationBar/NavBar";
import DonationSection from "../Home/DonationSection";
import Footer from "./Footer";

const Paragraphs = ({ keys, t }) => (
  <div className="space-y-4">
    {keys.map((key) => (
      <p key={key}>{t(key)}</p>
    ))}
  </div>
);

const Section = ({ title, children }) => (
  <section className="border-t border-stone-200 pt-7 sm:pt-9">
    <h2 className="mb-4 text-xl font-semibold text-stone-900 sm:text-2xl">
      {title}
    </h2>
    <div className="text-base leading-7 text-stone-700">{children}</div>
  </section>
);

const Impressum = () => {
  const { i18n, t } = useTranslation();
  const isFarsi = i18n.resolvedLanguage?.toLowerCase().startsWith("fa");

  return (
    <main
      dir={isFarsi ? "rtl" : "ltr"}
      lang={isFarsi ? "fa" : i18n.resolvedLanguage || "de"}
      className="min-h-screen bg-[#F1EFEE] "
    >
      <div className="w-full bg-[#186f77] mb-5">
        <div className="mx-auto lg:w-[1200px]">
          <NavBar />
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <article className="rounded-3xl shadow-xl overflow-hidden bg-white px-4 ring-1 ring-stone-200 sm:p-8 lg:p-12">
          <header className="mb-9 sm:mb-12">
            <h1 className="text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl">
              {t("impressum_title")}
            </h1>
            <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950 sm:text-base">
              {t("impressum_language_notice")}
            </p>
          </header>

          <div className="space-y-9 sm:space-y-12">
            <Section title={t("impressum_owner_heading")}>
              <address className="not-italic">
                <p className="font-semibold text-stone-900">
                  {t("impressum_organization")}
                </p>
                <p>{t("impressum_owner_name")}</p>

                <dl className="mt-5 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-[9rem_1fr]">
                  <dt className="font-medium text-stone-900">
                    {t("impressum_address_heading")}
                  </dt>
                  <dd>{t("impressum_address")}</dd>

                  <dt className="font-medium text-stone-900">
                    {t("impressum_email_heading")}
                  </dt>
                  <dd className="min-w-0 break-words">
                    <a
                      className="text-emerald-700 underline underline-offset-4 hover:text-emerald-900"
                      href="mailto:naghmeh.es@golestanhub.de"
                    >
                      naghmeh.es@golestanhub.de
                    </a>
                  </dd>

                  <dt className="font-medium text-stone-900">
                    {t("impressum_phone_heading")}
                  </dt>
                  <dd>
                    <a
                      className="text-emerald-700 underline underline-offset-4 hover:text-emerald-900"
                      href="tel:+4915904973362"
                      dir="ltr"
                    >
                      +49 15904973362
                    </a>
                  </dd>

                  <dt className="font-medium text-stone-900">
                    {t("impressum_web_heading")}
                  </dt>
                  <dd className="flex min-w-0 flex-col gap-1">
                    <a
                      className="break-all text-emerald-700 underline underline-offset-4 hover:text-emerald-900"
                      href="https://golestanhub.de/"
                    >
                      https://golestanhub.de/
                    </a>
                    <a
                      className="break-all text-emerald-700 underline underline-offset-4 hover:text-emerald-900"
                      href="https://golestanhub.com/"
                    >
                      https://golestanhub.com/
                    </a>
                  </dd>
                </dl>
              </address>
            </Section>

            <Section title={t("impressum_vat_heading")}>
              <p className="font-semibold text-stone-900" dir="ltr">
                {t("impressum_vat_number")}
              </p>
              <p className="mt-3">{t("impressum_legal_form")}</p>
            </Section>

            <Section title={t("impressum_content_heading")}>
              <p>{t("impressum_content_text")}</p>
            </Section>

            <Section title={t("impressum_dispute_heading")}>
              <p>{t("impressum_dispute_text")}</p>
            </Section>

            <Section title={t("impressum_disclaimer_heading")}>
              <div className="space-y-8">
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-stone-900">
                    {t("impressum_content_liability_heading")}
                  </h3>
                  <Paragraphs
                    t={t}
                    keys={[
                      "impressum_content_liability_p1",
                      "impressum_content_liability_p2",
                      "impressum_content_liability_p3",
                    ]}
                  />
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold text-stone-900">
                    {t("impressum_external_links_heading")}
                  </h3>
                  <Paragraphs
                    t={t}
                    keys={[
                      "impressum_external_links_p1",
                      "impressum_external_links_p2",
                    ]}
                  />
                </div>
              </div>
            </Section>

            <Section title={t("impressum_copyright_heading")}>
              <Paragraphs
                t={t}
                keys={[
                  "impressum_copyright_p1",
                  "impressum_copyright_p2",
                  "impressum_copyright_p3",
                  "impressum_copyright_p4",
                ]}
              />
            </Section>
          </div>
        </article>
      </div>
      <DonationSection />
      <Footer />
    </main>
  );
};
export default Impressum;
