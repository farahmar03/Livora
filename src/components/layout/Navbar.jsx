// src/components/layout/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import {
  Menu,
  X,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faHeart,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/context/AuthContext";
import logo from "@/assets/logo.png";
import { useFavorites } from "@/context/FavoritesContext";

export default function Navbar({ transparent = false }) {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [hoveredLink, setHoveredLink] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const { favorites } = useFavorites();

  const navLinks = [
    { name: "Home", target: "/#hero" },
    { name: "Offers", target: "/#offers" },
    { name: "Categories", target: "/#CategoriesSection" },
    { name: "Services", target: "/#services" },
    { name: "Features", target: "/#features" },
    { name: "Review", target: "/#reviews" },
  ];

  const userAvatar =
    user?.avatar ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100";
  const userName = user?.name || "Ruba Ibrahem";

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isDesktopClick =
        dropdownRef.current && dropdownRef.current.contains(event.target);
      const isMobileClick =
        mobileDropdownRef.current &&
        mobileDropdownRef.current.contains(event.target);

      if (!isDesktopClick && !isMobileClick) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      if (location.hash && window.scrollY >= 200) {
        const matched = navLinks.find((item) =>
          item.target.includes(location.hash),
        );
        if (matched) setActiveLink(matched.name);
      }
    } else {
      setActiveLink("");
    }
  }, [location]);

  return (
    <nav
      className={
        `sticky top-0 z-50 flex items-center justify-between px-4 md:px-6 py-3 transition-colors duration-300 ` +
        (transparent ? "bg-transparent" : "bg-[#FBDFC7]")
      }
    >
      {/* 1. اللوجو (على اليسار) */}
      <Link
        to="/"
        onClick={() => {
          setActiveLink("");
          handleCloseMenu();
        }}
      >
        <img
          src={logo}
          alt="Livora Logo"
          className="h-14 md:h-20 w-auto object-contain"
        />
      </Link>

      {/* 2. القائمة الرئيسية (في المنتصف تماماً) */}
      <ul className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
        {navLinks.map((item) => {
          const showUnderline =
            activeLink === item.name || hoveredLink === item.name;
          return (
            <li key={item.name}>
              <HashLink
                smooth
                to={item.target}
                scroll={scrollWithOffset}
                onClick={() => {
                  setActiveLink(item.name);
                  handleCloseMenu();
                }}
                onMouseEnter={() => setHoveredLink(item.name)}
                onMouseLeave={() => setHoveredLink(null)}
                className="text-base lg:text-lg font-medium text-[var(--color-teal)] pb-1 transition-colors duration-200 cursor-pointer"
                style={{
                  borderBottom: showUnderline
                    ? "2px solid var(--color-orange)"
                    : "2px solid transparent",
                }}
              >
                {item.name}
              </HashLink>
            </li>
          );
        })}
      </ul>

      {/* 3. الجزء الخاص بالمستخدم / الأيقونات (على اليمين) - الشاشات الكبيرة */}
      <div className="hidden md:flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3 mr-4">
            <Link
              to="/notifications"
              className="relative w-10 h-10 rounded-full bg-[#FCEADE] shadow-sm flex items-center justify-center text-[var(--color-teal)] hover:opacity-80 transition-all"
              title="Notifications"
            >
              <FontAwesomeIcon
                icon={faBell}
                className="text-[var(--color-teal)] text-base"
              />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </Link>

            <Link
              to="/favorites"
              className="w-10 h-10 rounded-full bg-[#FCEADE] shadow-sm flex items-center justify-center text-[var(--color-teal)] hover:opacity-80 transition-all"
              title="Favorites"
            >
              <FontAwesomeIcon
                icon={faHeart}
                className="text-[var(--color-teal)] text-base"
              />
            </Link>

            <Link
              to="/cart"
              className="w-10 h-10 rounded-full bg-[#FCEADE] shadow-sm flex items-center justify-center text-[var(--color-teal)] hover:opacity-80 transition-all"
              title="Cart"
            >
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="text-[var(--color-teal)] text-base"
              />
            </Link>

            {/* صورة البروفايل مع القائمة المنسدلة */}
            <div className="relative ml-4" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-11 h-11 rounded-full overflow-hidden border-2 border-[var(--color-teal)] shadow-sm hover:opacity-95 transition-opacity cursor-pointer focus:outline-none"
              >
                <img
                  src={userAvatar}
                  alt="User Profile"
                  className="w-full h-full object-cover"
                />
              </button>

              {/* القائمة المنسدلة */}
              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
                    onClick={() => setDropdownOpen(false)}
                  />

                  <div
                    className="absolute right-0 mt-1 w-56 bg-[var(--color-page)] rounded-[1.75rem] shadow-2xl overflow-hidden z-50 border border-[#1B6D77]/10 text-left"
                    style={{
                      animation: "slideInRight 0.3s ease-out forwards",
                    }}
                  >
                    <div className="bg-[#1B6D77] h-10 relative flex justify-center">
                      <div className="absolute -bottom-5 w-14 h-14 rounded-full border-4 border-[var(--color-page)] overflow-hidden shadow-md bg-[#1B6D77]">
                        <img
                          src={userAvatar}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="pt-6 pb-1 text-center">
                      <h4 className="font-bold text-[#1B6D77] text-sm md:text-base">
                        {userName}
                      </h4>
                    </div>

                    <div className="p-1 pb-4 space-y-0">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          navigate("/profile/edit");
                        }}
                        className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl hover:bg-[#FCEADE] text-gray-700 transition-colors cursor-pointer border-none bg-transparent"
                      >
                        <div className="flex items-center gap-2 text-[#1B6D77]">
                          <User size={17} />
                          <span className="text-sm font-semibold text-gray-800">
                            Edit Profile
                          </span>
                        </div>
                        <ChevronRight className="text-gray-400" size={17} />
                      </button>

                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          navigate("/profile/settings");
                        }}
                        className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl hover:bg-[#FCEADE] text-gray-700 transition-colors cursor-pointer border-none bg-transparent"
                      >
                        <div className="flex items-center gap-2 text-[#1B6D77]">
                          <Settings size={17} />
                          <span className="text-sm font-semibold text-gray-800">
                            Settings
                          </span>
                        </div>
                        <ChevronRight className="text-gray-400" size={17} />
                      </button>

                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          navigate("/support");
                        }}
                        className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl hover:bg-[#FCEADE] text-gray-700 transition-colors cursor-pointer border-none bg-transparent"
                      >
                        <div className="flex items-center gap-2 text-[#1B6D77]">
                          <HelpCircle size={17} />
                          <span className="text-sm font-semibold text-gray-800">
                            Help & Support
                          </span>
                        </div>
                        <ChevronRight className="text-gray-400" size={17} />
                      </button>

                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          logout();
                          navigate("/");
                        }}
                        className="w-full flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-red-50 text-red-600 transition-colors cursor-pointer border-none bg-transparent mt-2"
                      >
                        <LogOut size={17} />
                        <span className="text-sm font-bold">Log Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/signin"
              className="px-5 py-1.5 text-sm lg:text-base rounded-full font-semibold transition-colors duration-200 border-2 border-[var(--color-teal)] text-[var(--color-teal)] hover:bg-[var(--color-teal)] hover:text-white cursor-pointer"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-5 py-1.5 text-sm lg:text-base rounded-full font-semibold transition-colors duration-200 bg-[var(--color-teal)] text-white hover:opacity-90 cursor-pointer"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* زر القائمة للموبايل */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-[var(--color-teal)] p-1 focus:outline-none cursor-pointer"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* قائمة الموبايل المنسدلة */}
      <div
        className={`md:hidden fixed inset-0 top-[60px] bg-[#FBDFC7] z-50 flex flex-col items-center justify-start pt-8 pb-6 px-4 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="w-full max-w-sm flex flex-col gap-3">
          {navLinks.map((item) => (
            <div key={item.name} className="w-full">
              <HashLink
                smooth
                to={item.target}
                scroll={scrollWithOffset}
                onClick={() => {
                  setActiveLink(item.name);
                  handleCloseMenu();
                }}
                className="block w-full text-center py-3 text-lg font-medium text-[var(--color-teal)] border-b border-[var(--color-teal)]/20 cursor-pointer"
                style={{
                  borderBottom:
                    activeLink === item.name
                      ? "2px solid var(--color-orange)"
                      : "2px solid transparent",
                }}
              >
                {item.name}
              </HashLink>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 w-full max-w-sm mt-6">
          {user ? (
            <div className="flex flex-col gap-4">
              <div className="flex justify-around items-center px-2">
                <Link
                  to="/notifications"
                  onClick={handleCloseMenu}
                  className="w-10 h-10 rounded-full bg-[#FCEADE] shadow-sm flex items-center justify-center text-[var(--color-teal)]"
                >
                  <FontAwesomeIcon
                    icon={faBell}
                    className="text-[var(--color-teal)] text-base"
                  />
                </Link>
                <Link
                  to="/favorites"
                  onClick={handleCloseMenu}
                  className="w-10 h-10 rounded-full bg-[#FCEADE] shadow-sm flex items-center justify-center text-[var(--color-teal)]"
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="text-[var(--color-teal)] text-base"
                  />
                </Link>
                <Link
                  to="/cart"
                  onClick={handleCloseMenu}
                  className="w-10 h-10 rounded-full bg-[#FCEADE] shadow-sm flex items-center justify-center text-[var(--color-teal)]"
                >
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="text-[var(--color-teal)] text-base"
                  />
                </Link>

                {/* زر البروفايل الخاص بالموبايل المخول لفتح نفس القائمة */}
                <div className="relative" ref={mobileDropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-[var(--color-teal)] focus:outline-none cursor-pointer block"
                  >
                    <img
                      src={userAvatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </button>

                  {/* نفس القائمة المنسدلة في نفس المكان والنمط بدون تغير بتصميمها */}
                  {dropdownOpen && (
                    <div
                      className="absolute right-0 bottom-12 w-56 bg-[var(--color-page)] rounded-[1.75rem] shadow-2xl overflow-hidden z-50 border border-[#1B6D77]/10 text-left"
                      style={{
                        animation: "slideInRight 0.3s ease-out forwards",
                      }}
                    >
                      <div className="bg-[#1B6D77] h-10 relative flex justify-center">
                        <div className="absolute -bottom-5 w-14 h-14 rounded-full border-4 border-[var(--color-page)] overflow-hidden shadow-md bg-[#1B6D77]">
                          <img
                            src={userAvatar}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="pt-6 pb-1 text-center">
                        <h4 className="font-bold text-[#1B6D77] text-sm">
                          {userName}
                        </h4>
                      </div>

                      <div className="p-1 pb-4 space-y-0">
                        <button
                          onClick={() => {
                            handleCloseMenu();
                            navigate("/profile/edit");
                          }}
                          className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl hover:bg-[#FCEADE] text-gray-700 transition-colors cursor-pointer border-none bg-transparent"
                        >
                          <div className="flex items-center gap-2 text-[#1B6D77]">
                            <User size={17} />
                            <span className="text-sm font-semibold text-gray-800">
                              Edit Profile
                            </span>
                          </div>
                          <ChevronRight className="text-gray-400" size={17} />
                        </button>

                        <button
                          onClick={() => {
                            handleCloseMenu();
                            navigate("/profile/settings");
                          }}
                          className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl hover:bg-[#FCEADE] text-gray-700 transition-colors cursor-pointer border-none bg-transparent"
                        >
                          <div className="flex items-center gap-2 text-[#1B6D77]">
                            <Settings size={17} />
                            <span className="text-sm font-semibold text-gray-800">
                              Settings
                            </span>
                          </div>
                          <ChevronRight className="text-gray-400" size={17} />
                        </button>

                        <button
                          onClick={() => {
                            handleCloseMenu();
                            navigate("/support");
                          }}
                          className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl hover:bg-[#FCEADE] text-gray-700 transition-colors cursor-pointer border-none bg-transparent"
                        >
                          <div className="flex items-center gap-2 text-[#1B6D77]">
                            <HelpCircle size={17} />
                            <span className="text-sm font-semibold text-gray-800">
                              Help & Support
                            </span>
                          </div>
                          <ChevronRight className="text-gray-400" size={17} />
                        </button>

                        <button
                          onClick={() => {
                            handleCloseMenu();
                            logout();
                            navigate("/");
                          }}
                          className="w-full flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-red-50 text-red-600 transition-colors cursor-pointer border-none bg-transparent mt-2"
                        >
                          <LogOut size={17} />
                          <span className="text-sm font-bold">Log Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  logout();
                  handleCloseMenu();
                  navigate("/");
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-red-50 text-red-600 font-semibold border border-red-200 hover:bg-red-100 transition-colors cursor-pointer"
              >
                <LogOut size={18} />
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 w-full">
              <Link
                to="/signin"
                onClick={handleCloseMenu}
                className="w-full text-center py-3 rounded-full font-semibold border-2 border-[var(--color-teal)] text-[var(--color-teal)] text-base cursor-pointer"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={handleCloseMenu}
                className="w-full text-center py-3 rounded-full font-semibold bg-[var(--color-teal)] text-white text-base cursor-pointer"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
