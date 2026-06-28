const categories = [
  { title: "Literature" },
  { title: "Film" },
  { title: "Music" },
  { title: "Kunst" },
];

import Literature from "../../../../public/Literature.png";
import Music from "../../../../public/Music.png";
import Film from "../../../../public/Film.png";
import Kunst from "../../../../public/Kunst.png";

const FourItems = () => {
  return (
    <div className="w-full px-6 py-10">
      <p className="mb-8 text-3xl font-bold">
        Connect with our diverse culture!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="relative overflow-hidden flex justify-center items-center rounded-lg h-[380px] group cursor-pointer">
          <img
            src={Literature}
            alt={Literature}
            className="w-48 h-48 object-contain transition-transform duration-300 group-hover:scale-105"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#1B6269]/20" />

          {/* Bottom-left text */}
          <div className="absolute bottom-6 left-6">
            <h2 className="text-xl font-bold text-[#1B6269]">Literature</h2>
          </div>
        </div>

        <div className="relative overflow-hidden flex justify-center items-center rounded-lg h-[380px] group cursor-pointer">
          <img
            src={Music}
            alt={Music}
            className="w-48 h-48 object-contain transition-transform duration-300 group-hover:scale-105"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#1B6269]/20" />

          {/* Bottom-left text */}
          <div className="absolute bottom-6 left-6">
            <h2 className="text-xl font-bold text-[#1B6269]">Music</h2>
          </div>
        </div>
        <div className="relative overflow-hidden flex justify-center items-center rounded-lg h-[380px] group cursor-pointer">
          <img
            src={Film}
            alt={Film}
            className="w-48 h-48 object-contain transition-transform duration-300 group-hover:scale-105"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#1B6269]/20" />

          {/* Bottom-left text */}
          <div className="absolute bottom-6 left-6">
            <h2 className="text-xl font-bold text-[#1B6269]">Film</h2>
          </div>
        </div>
        <div className="relative overflow-hidden flex justify-center items-center rounded-lg h-[380px] group cursor-pointer">
          <img
            src={Kunst}
            alt={Kunst}
            className="w-48 h-48 object-contain transition-transform duration-300 group-hover:scale-105"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#1B6269]/20" />

          {/* Bottom-left text */}
          <div className="absolute bottom-6 left-6">
            <h2 className="text-xl font-bold text-[#1B6269]">Kunst</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FourItems;
