import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const { t } = useTranslation();

  const [localUser, setLocalUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    const storedUser = localStorage.getItem("marco_user");
    if (storedUser) {
      setLocalUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("marco_user");
    setLocalUser(null);
    navigate("/login"); // Optional: redirect to login
  };

  return (
    <div className="flex invisible lg:visible py-12 px-2 lg:px-0 relative justify-between bg-black bg-opacity-0 ">
      <div className="flex justify-between gap-8">
        <Link to="/">
          <img
            width="40"
            height="30"
            src="https://kultur-atelier.de/wp-content/uploads/2024/11/cropped-KulturAtelier-300x300-removebg-preview-png.webp"
            className="cursor-pointer"
            alt=""
            srcSet="https://kultur-atelier.de/wp-content/uploads/2024/11/cropped-KulturAtelier-300x300-removebg-preview-png.webp 300w, https://kultur-atelier.de/wp-content/uploads/2024/11/cropped-KulturAtelier-300x300-removebg-preview-150x150.webp 150w, https://kultur-atelier.de/wp-content/uploads/2024/11/cropped-KulturAtelier-300x300-removebg-preview-100x100.webp 100w"
            sizes="(max-width: 300px) 100vw, 300px"
          ></img>
        </Link>
        <Link
          className="font-bold cursor-pointer from-neutral-800 pt-2 text-[#ECEAD3] hover:text-yellow-200"
          to="/workshops"
        >
          {t("workshops")}
        </Link>
        <Link
          className="font-bold cursor-pointer from-neutral-800 pt-2 text-[#ECEAD3] hover:text-yellow-200"
          to="/courses"
        >
          {t("courses")}
        </Link>
        <Link
          className="font-bold cursor-pointer from-neutral-800 max-w-32 pt-2 text-[#ECEAD3] hover:text-yellow-200"
          // to="/allevents"
        >
          {t("culturalEvents")}
        </Link>
        <Link
          className="font-bold cursor-pointer from-neutral-800 max-w-32 pt-2 text-[#ECEAD3] hover:text-yellow-200"
          // to="/allevents"
        >
          {t("ourEvents")}
        </Link>
        <h1 className="font-bold cursor-pointer from-neutral-800 pt-2 text-[#ECEAD3] hover:text-yellow-200">
          {t("news")}
        </h1>
        <Link
          className="font-bold cursor-pointer from-neutral-800 pt-2 text-[#ECEAD3] hover:text-yellow-200"
          to="/aboutus"
        >
          {t("aboutUs")}
        </Link>
        <Link to="/team">
          <h1 className="font-bold cursor-pointer from-neutral-800 pt-2 text-[#ECEAD3] hover:text-yellow-200">
            {t("teamMembers")}
          </h1>
        </Link>
      </div>
      <div className="flex gap-8">
        <div className="flex gap-2s">
          <span
            onClick={() => i18n.changeLanguage("en")}
            className="font-bold cursor-pointer from-neutral-800 pt-2 pr-1 text-[#ECEAD3] hover:text-yellow-200"
          >
            EN |
          </span>
          <span
            onClick={() => i18n.changeLanguage("de")}
            className="font-bold cursor-pointer from-neutral-800 pt-2 pr-1  text-[#ECEAD3] hover:text-yellow-200"
          >
            DE |
          </span>
          <span
            onClick={() => i18n.changeLanguage("fa")}
            className="font-bold cursor-pointer from-neutral-800 pt-2 text-[#ECEAD3] hover:text-yellow-200"
          >
            FR
          </span>
        </div>
        <div className="flex gap-5">
          {localUser && localUser.role !== "user" ? (
            <Link
              to="/setting"
              className="bg-white py-2 px-4 rounded-md hover:bg-gray-300"
            >
              Einstellung
            </Link>
          ) : (
            ""
          )}

          {!localUser ? (
            <Link
              // to="/login"
              className="bg-[#ECEAD3] w-20 h-10 pt-1 pl-4 border rounded-md text-cyan-900 hover:bg-yellow-200"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="bg-gray-200 py-2 px-4 rounded-md hover:bg-gray-300"
              >
                Hi {localUser.full_name}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
