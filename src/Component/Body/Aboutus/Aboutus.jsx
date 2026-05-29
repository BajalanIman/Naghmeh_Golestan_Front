import NavBar from "../../NavigationBar/NavBar";
import Footer from "../Footer/Footer";
import Leafletmap from "./Leafletmap";

const Aboutus = () => {
  return (
    <div className=" w-[full] lg:w-[100%] h-full flex flex-col justify-center bg-gradient-to-b from-indigo-700 via-red-500 to-purple-500">
      <div className=" px-2 lg:w-[1200px] ">
        <NavBar />
      </div>
      <div className="relative flex justify-center items-center px-4 py-8 lg:px-0 lg:py-0 lg:h-96">
        <img
          className="lg:w-3/4 lg:absolute lg:mt-40 rounded-lg shadow-lg shadow-black"
          src="https://tse2.mm.bing.net/th/id/OIP.AikNPVRFDgnPM9_CWxAPsQHaEo"
        />
      </div>

      <div className="bg-white justify-center items-center w-full flex py-6">
        <div className="px-4 lg:px-0 lg:w-2/3 justify-center mt-12 lg:mt-64">
          <h1 className="font-bold text-xl mb-6 text-neutral-700">
            The founding idea of ​​KulturAtelier
          </h1>
          {/* 1*/}
          <div className="mb-8 lg:mb-12 flex flex-col lg:flex-row gap-3">
            <p className="text-lg  tex-neutral-700 mb-6 lg:mb-0">
              Naghmeh Esmaeilpour founded KulturAtelier as a platform to promote
              cultural exchange and overcome barriers between different
              cultures. Her central motto is: "Culture and cultural activities
              are GLOBAL and for ALL." The goal is to rethink the integration
              process – moving away from purely theoretical language and
              integration courses towards a practical, creative approach.
              Refugees and migrants should be able to actively contribute and
              showcase their identity, talents, and cultural backgrounds.
            </p>
            <img
              className="rounded-md shadow-lg shadow-black"
              src="https://tse3.mm.bing.net/th/id/OIP.5TtudKzE9U1plOf-kX5XTwHaEJ?pid=Api&P=0&h=180"
              alt="founding"
            />
          </div>
          <div className="w-full py-6 lg:py-12 justify-center items-center flex">
            <div className="bg-violet-900 text-lg font-bold h-1 w-1/2"></div>
          </div>
          <h1 className="font-bold text-xl mb-6 text-neutral-700">
            What we want to prevent
          </h1>
          <div className="mb-2 lg:mb-12 flex flex-col lg:flex-row gap-3">
            <img
              className="rounded-md shadow-lg shadow-slate-900"
              src="https://tse3.mm.bing.net/th/id/OIP.yAtLNdgB7ffiUrd7yUTzXgHaEJ?pid=Api&P=0&h=180"
              alt="founding"
            />
            <p className="text-lg lg:mb-4 mt-6 lg:mt-0 text-neutral-700-neutral-700">
              Through her work as a refugee advisor for the Iranian community in
              Germany, Esmaeilpour recognized a serious lack of genuine
              communication between refugees and German society. Despite good
              language skills, refugees often lack the courage to participate –
              out of fear of rejection, discrimination, or racist experiences.
              This fear leads many to withdraw and find no connection to
              society. The integration process thus remains one-sided and
              superficial.
            </p>
          </div>
          <div className="w-full py-12 justify-center items-center flex">
            <div className="bg-violet-900 text-lg font-bold h-1 w-1/2"></div>
          </div>
          <h1 className="font-bold text-xl mb-6 text-neutral-700">
            What our goal is
          </h1>

          <div className="mb-6 lg:mb-12 flex flex-col lg:flex-row gap-3">
            <p className="text-lg mb-4 text-neutral-700">
              For this reason, Naghmeh Esmaeilpour decided to create a space
              where people can meet on equal terms. The KulturAtelier aims to
              break down barriers and provide an opportunity to talk about
              cultural identity – not about deficits or assimilation. She was
              supported in its founding by courageous and committed migrants who
              actively work for change and want to shape their lives. Here,
              culture becomes the connecting element for an equal coexistence.
            </p>
            <img
              className="rounded-md shadow-lg shadow-slate-900"
              src="https://tse4.mm.bing.net/th/id/OIP.g_3abvCxo6ztkmXZaJQ91gHaE8?pid=Api&P=0&h=180"
              alt="founding"
            />
          </div>
          <div className="w-full py-12 justify-center items-center flex">
            <div className="bg-violet-900 text-lg font-bold h-1 w-1/2"></div>
          </div>
          <h1 className="font-bold text-xl mb-6 text-neutral-700">
            Our location
          </h1>
          <Leafletmap />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Aboutus;
