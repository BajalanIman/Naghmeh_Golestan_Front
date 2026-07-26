import NavBar from "../../NavigationBar/NavBar";
import Footer from "../Footer/Footer";
import Leafletmap from "./Leafletmap";
import { useTranslation } from "react-i18next";

const Aboutus = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col justify-center bg-[#F1EFEE]">
      {/* NAVBAR */}
      <div className=" w-full bg-[#186f77] ">
        <div className="mx-auto lg:w-[1200px]">
          <NavBar />
        </div>
      </div>

      <div className="w-full pt-12">
        {/* HERO */}
        <section className="py-12 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900">
              {t("aboutus_cultural_hub_title")}
            </h1>

            <p className="mt-6 text-lg text-stone-600 leading-relaxed">
              {t("aboutus_cultural_hub_description")}
            </p>
          </div>
        </section>

        {/* FOUNDING IDEA */}
        <section className="lg:py-24 py-8">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-2xl font-semibold text-stone-900 mb-6">
                {t("aboutus_founding_idea_title")}
              </h2>

              <p className="text-stone-600 leading-relaxed">
                {t("aboutus_founding_idea_description")}
              </p>
            </div>

            <img
              className="rounded-2xl shadow-md object-cover w-full"
              src="https://tse3.mm.bing.net/th/id/OIP.5TtudKzE9U1plOf-kX5XTwHaEJ?pid=Api&P=0&h=180"
              alt="founding"
            />
          </div>
        </section>

        {/* DIVIDER */}
        <div className="flex justify-center">
          <div className="w-24 h-[2px] bg-amber-700" />
        </div>

        {/* PROBLEM SECTION */}
        <section className="lg:py-24 py-8">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
            <img
              className="rounded-2xl shadow-md object-cover w-full order-2 lg:order-1"
              src="https://tse3.mm.bing.net/th/id/OIP.yAtLNdgB7ffiUrd7yUTzXgHaEJ?pid=Api&P=0&h=180"
              alt="challenge"
            />

            <div className="order-1 lg:order-2">
              <h2 className="text-2xl font-semibold text-stone-900 mb-6">
                {t("aboutus_challenge_title")}
              </h2>

              <p className="text-stone-600 leading-relaxed">
                {t("aboutus_challenge_description")}
              </p>
            </div>
          </div>
        </section>

        {/* GOAL SECTION */}
        <section className="lg:py-24 py-8">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-2xl font-semibold text-stone-900 mb-6">
                {t("aboutus_goal_title")}
              </h2>

              <p className="text-stone-600 leading-relaxed">
                {t("aboutus_goal_description")}
              </p>
            </div>

            <img
              className="rounded-2xl shadow-md object-cover w-full"
              src="https://tse4.mm.bing.net/th/id/OIP.g_3abvCxo6ztkmXZaJQ91gHaE8?pid=Api&P=0&h=180"
              alt="goal"
            />
          </div>
        </section>

        {/* LOCATION */}
        <section className="lg:py-24 py-8">
          <div className="max-w-6xl mx-auto px-6 text-center mb-10">
            <h2 className="text-3xl font-serif font-semibold text-stone-900">
              {t("aboutus_location")}
            </h2>

            <p className="mt-4 text-stone-600">{t("aboutus_visit_us")}</p>
          </div>

          <div className="max-w-5xl mx-auto px-6">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Leafletmap />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};
export default Aboutus;
