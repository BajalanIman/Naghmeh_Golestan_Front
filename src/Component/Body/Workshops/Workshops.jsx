import NavBar from "../../NavigationBar/NavBar";
import Footer from "../Footer/Footer";
import Mainworkshop from "./Mainworkshop";
import Otherworkshops from "./Otherworkshops";
const Workshops = () => {
  return (
    <div className="w-[full] lg:w-[100%] h-full flex flex-col justify-center bg-gradient-to-b from-indigo-700 via-red-500 to-purple-500">
      <div className="px-2 lg:w-[1200px]">
        <NavBar />
      </div>
      <div className="relative flex justify-center items-center h-96">
        <img
          className="w-3/4 absolute mt-40 rounded-lg shadow-lg shadow-black"
          src="https://i.etsystatic.com/44190086/r/il/003dc0/5358431678/il_fullxfull.5358431678_4d25.jpg"
        />
      </div>
      <div className="h-72 bg-slate-100 w-full"></div>
      <div className="w-full">
        <Mainworkshop />
      </div>
      <div className="w-full bg-white flex flex-col py-8 px-6 gap-4">
        <div>
          <p className="text-gray-700 font-bold text-2xl mb-5 mt-10">
            Workshops in May
          </p>
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-3 lg:gap-6">
            <Otherworkshops />
            <Otherworkshops />
            <Otherworkshops />
            <Otherworkshops />
            <Otherworkshops />
          </div>
        </div>
        <div>
          <p className="text-gray-700 font-bold text-2xl mb-5 mt-10">
            Workshops in June
          </p>
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-3 lg:gap-6">
            <Otherworkshops />
            <Otherworkshops />
          </div>
        </div>
      </div>
      <div className="w-full bg-white flex flex-col py-8 px-6 gap-4">
        <div>
          <p className="text-gray-700 font-bold text-2xl mb-5 mt-10">
            Workshops in May
          </p>
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-3 lg:gap-6">
            <Otherworkshops />
            <Otherworkshops />
            <Otherworkshops />
          </div>
        </div>
        <div>
          <p className="text-gray-700 font-bold text-2xl mb-5 mt-10">
            Workshops in July
          </p>
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
            <Otherworkshops />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Workshops;
