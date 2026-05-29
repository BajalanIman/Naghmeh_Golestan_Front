import React from "react";
import NavBar from "../../NavigationBar/NavBar";

function Mainbody() {
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
      <div className="relative z-10 flex flex-col gap-5 items-center justify-center h-full text-white">
        <h1 className="text-5xl font-bold">Hello Naghmeh</h1>
        <h1 className="text-5xl font-bold">This is a sample text</h1>
        <h1 className="text-5xl font-bold">We can simply change it!</h1>
      </div>
    </div>
  );
}

export default Mainbody;
