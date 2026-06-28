import NavBar from "../../NavigationBar/NavBar";
import Footer from "../Footer/Footer";
import Leafletmap from "./Leafletmap";
import VisitingTeachers from "./VisitingTeachers";

const Aboutus = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center bg-[#F1EFEE]">
      {/* NAVBAR */}
      <div className=" w-full bg-[#186f77] ">
        <div className="mx-auto lg:w-[1200px]">
          <NavBar />
        </div>
      </div>

      <div className="w-full">
        {/* HERO */}
        <section className="py-12 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900">
              Golestan Cultural Hub
            </h1>

            <p className="mt-6 text-lg text-stone-600 leading-relaxed">
              A cultural exchange and education platform dedicated to breaking
              barriers between cultures and creating spaces for meaningful
              dialogue, creativity, and participation.
            </p>
          </div>
        </section>

        {/* FOUNDING IDEA */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-2xl font-semibold text-stone-900 mb-6">
                The founding idea of this Cultural Hub
              </h2>

              <p className="text-stone-600 leading-relaxed">
                Naghmeh Esmaeilpour founded Golestan Cultural Hub as a platform
                to promote cultural exchange and overcome barriers between
                different cultures. Her central motto is:{" "}
                <strong>"Culture is global and for all."</strong>
                The goal is to rethink integration through creative, practical
                participation instead of purely theoretical language learning.
                Refugees and migrants are encouraged to actively share their
                identity, talents, and cultural backgrounds.
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
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
            <img
              className="rounded-2xl shadow-md object-cover w-full order-2 lg:order-1"
              src="https://tse3.mm.bing.net/th/id/OIP.yAtLNdgB7ffiUrd7yUTzXgHaEJ?pid=Api&P=0&h=180"
              alt="challenge"
            />

            <div className="order-1 lg:order-2">
              <h2 className="text-2xl font-semibold text-stone-900 mb-6">
                What we want to prevent?
              </h2>

              <p className="text-stone-600 leading-relaxed">
                Despite good language skills, many refugees still face barriers
                such as fear of rejection, discrimination, and lack of genuine
                participation. This leads to withdrawal and weak social
                connection. Integration remains one-sided and superficial
                instead of becoming a shared cultural process.
              </p>
            </div>
          </div>
        </section>

        {/* GOAL SECTION */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-2xl font-semibold text-stone-900 mb-6">
                What our goal is?
              </h2>

              <p className="text-stone-600 leading-relaxed">
                KulturAtelier creates a space where people meet on equal terms.
                The focus is not on deficits or assimilation, but on cultural
                identity as a shared resource. Supported by committed migrants
                and educators, the initiative builds bridges and encourages
                mutual understanding through cultural exchange.
              </p>
            </div>

            <img
              className="rounded-2xl shadow-md object-cover w-full"
              src="https://tse4.mm.bing.net/th/id/OIP.g_3abvCxo6ztkmXZaJQ91gHaE8?pid=Api&P=0&h=180"
              alt="goal"
            />
          </div>
        </section>

        {/* VISITING TEACHERS */}
        <VisitingTeachers />

        {/* LOCATION */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6 text-center mb-10">
            <h2 className="text-3xl font-serif font-semibold text-stone-900">
              Our Location
            </h2>

            <p className="mt-4 text-stone-600">
              Visit us and take part in our cultural workshops and events.
            </p>
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
