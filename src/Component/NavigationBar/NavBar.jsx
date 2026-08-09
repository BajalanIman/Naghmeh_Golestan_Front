import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GolestanLogo from "../Logo/GolestanLogo";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const { t } = useTranslation();
  const navStyle =
    "font-bold cursor-pointer from-neutral-800 pt-2 text-[#ECEAD3] hover:text-yellow-200";

  const [localUser, setLocalUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

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
    <div className="">
      <div className="hidden lg:flex py-12 px-2 lg:px-0 relative justify-between bg-black bg-opacity-0">
        <div className="flex justify-between gap-8">
          <Link to="/">
            <GolestanLogo
              width={50}
              height={50}
              colorOne={"#ECEAD3"}
              colorTwo={"#186f77"}
            />
          </Link>
          <Link className={navStyle} to="/workshops">
            {t("workshops")}
          </Link>
          <Link className={navStyle} to="/courses">
            {t("courses")}
          </Link>
          {/* <Link className={navStyle}>{t("culturalEvents")}</Link> */}
          <Link className={navStyle} to="/ourEvents">
            {t("ourEvents")}
          </Link>
          {/* <h1 className={navStyle}>{t("news")}</h1> */}
          <Link className={navStyle} to="/aboutus">
            {t("aboutUs")}
          </Link>
          <Link to="/team">
            <h1 className={navStyle}>{t("teamMembers")}</h1>
          </Link>
          <Link to="/joinUs" onClick={closeMenu}>
            <h1 className={navStyle}>{t("joinus_title")}</h1>
          </Link>
        </div>
        <div className="flex gap-8">
          <div className="flex gap-2s">
            <span
              onClick={() => i18n.changeLanguage("en")}
              className={navStyle}
            >
              EN |
            </span>
            <span
              onClick={() => i18n.changeLanguage("de")}
              className={navStyle}
            >
              DE |
            </span>
            <span
              onClick={() => i18n.changeLanguage("fa")}
              className={navStyle}
            >
              FR
            </span>
          </div>
          <div className="flex gap-5">
            {!localUser ? (
              <Link
                to="/login"
                className="bg-[#ECEAD3] px-3 h-8 text-center border rounded-md text-cyan-900 hover:bg-yellow-200"
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
                      className="block w-full text-start px-4 py-2 hover:bg-gray-100"
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
      <div className="lg:hidden">
        {/* Top Navbar */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#1B6269] backdrop-blur-md flex justify-between items-center px-5 py-4">
          <Link to="/" onClick={closeMenu}>
            <GolestanLogo
              width={45}
              height={45}
              colorOne="#ECEAD3"
              colorTwo="#186f77"
            />
          </Link>

          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X className="text-[#ECEAD3]" size={32} />
            ) : (
              <Menu className="text-[#ECEAD3]" size={32} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="fixed inset-0 z-40 bg-[#276a70] pt-24 text-[#ECEAD3]">
            <div className="flex flex-col items-center gap-7 text-xl font-semibold">
              <Link to="/workshops" onClick={closeMenu}>
                {t("workshops")}
              </Link>

              <Link to="/courses" onClick={closeMenu}>
                {t("courses")}
              </Link>

              {/* <Link onClick={closeMenu}>{t("culturalEvents")}</Link> */}

              <Link to="/ourEvents" onClick={closeMenu}>
                {t("ourEvents")}
              </Link>

              <Link to="/aboutus" onClick={closeMenu}>
                {t("aboutUs")}
              </Link>

              <Link to="/team" onClick={closeMenu}>
                {t("teamMembers")}
              </Link>
              <Link to="/joinUs" onClick={closeMenu}>
                Join Us
              </Link>
              {/* <span>{t("news")}</span> */}

              {/* Languages */}
              <div className="flex gap-5 mt-6">
                <button onClick={() => i18n.changeLanguage("en")}>EN</button>
                <button onClick={() => i18n.changeLanguage("de")}>DE</button>
                <button onClick={() => i18n.changeLanguage("fa")}>FA</button>
              </div>

              {/* Login/User */}
              {!localUser ? (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="bg-[#ECEAD3] text-cyan-900 px-6 py-2 rounded-md mt-5"
                >
                  Login
                </Link>
              ) : (
                <>
                  <p className="mt-5">Hi {localUser.full_name}</p>

                  {localUser.role !== "user" && (
                    <Link
                      to="/setting"
                      onClick={closeMenu}
                      className="bg-white text-black px-6 py-2 rounded-md"
                    >
                      Einstellung
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="bg-red-500 px-6 py-2 rounded-md"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
