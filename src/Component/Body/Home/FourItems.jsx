import { useTranslation } from "react-i18next";

const FourItems = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full px-6 py-10">
      <p className="mb-8 text-3xl font-bold">{t("Connect_diverse_culture")}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="relative overflow-hidden flex justify-center items-center rounded-lg h-[350px] group cursor-pointer bg-[#276a70]">
          <img
            src="https://res.cloudinary.com/r4pnipqe/image/upload/v1785710267/Litearture_u55l9r.png"
            alt="Literature"
            className=" w-full h-[380px] absolute object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#1B6269]/10" />

          {/* Bottom-left text */}
          <div className="absolute bottom-6 left-6">
            <h2 className="text-xl font-bold text-[#ECEAD3]">
              {t("Homepage_Literature")}
            </h2>
          </div>
        </div>

        <div className="relative overflow-hidden flex justify-center items-center rounded-lg h-[350px] group cursor-pointer bg-[#276a70]">
          <img
            src="https://res.cloudinary.com/r4pnipqe/image/upload/v1785711018/music2_exyzd5.png"
            alt="Music"
            className=" w-full h-[380px] absolute object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#1B6269]/20" />

          {/* Bottom-left text */}
          <div className="absolute bottom-6 left-6">
            <h2 className="text-xl font-bold text-[#ECEAD3]">
              {t("Homepage_Music")}
            </h2>
          </div>
        </div>
        <div className="relative overflow-hidden flex justify-center items-center rounded-lg h-[350px] group cursor-pointer bg-[#276a70]">
          <img
            src="https://res.cloudinary.com/r4pnipqe/image/upload/v1785710633/Film2_qd4e2v.png"
            alt="Film"
            className="w-full h-[380px] absolute object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#1B6269]/20" />

          {/* Bottom-left text */}
          <div className="absolute bottom-6 left-6">
            <h2 className="text-xl font-bold text-[#ECEAD3]">
              {t("Homepage_Film")}
            </h2>
          </div>
        </div>
        <div className="relative overflow-hidden flex justify-center items-center rounded-lg h-[350px] group cursor-pointer bg-[#276a70]">
          <img
            src="https://res.cloudinary.com/r4pnipqe/image/upload/v1785711158/art_n8bvzw.png"
            alt="Art"
            className="w-full h-[380px] absolute object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#1B6269]/20" />

          {/* Bottom-left text */}
          <div className="absolute bottom-6 left-6">
            <h2 className="text-xl font-bold text-[#ECEAD3]">
              {t("Homepage_Kunst")}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FourItems;
