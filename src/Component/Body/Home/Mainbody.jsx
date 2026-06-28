import React from "react";
import NavBar from "../../NavigationBar/NavBar";
import { useTranslation } from "react-i18next";

function Mainbody() {
  const { t } = useTranslation();
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://www.deutschlandmuseum.de/wp-content/uploads/2024/09/deutschlandmuseum.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Navbar */}
      <div className="relative z-20 px-2 lg:w-[1200px] mx-auto">
        <NavBar />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col gap-5 items-center justify-center h-full">
        <h1 className="text-2xl lg:text-5xl font-bold">{t("welcome")}</h1>
        <h1 className="text-2xl lg:text-5xl font-bold">{t("sampleText")}</h1>
        <h1 className="text-2xl lg:text-5xl font-bold">{t("changeText")}</h1>
      </div>
    </div>
  );
}

export default Mainbody;
