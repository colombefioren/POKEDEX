import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useThemeStore } from "../store/themeStore";
import ThemeToggle from "./ThemeToggle";

const PokedexShell = ({ children, loading, active }) => {
  const [animationState, setAnimationState] = useState({
    showContent: false,
    bezelsOpen: false,
  });

  const { isDarkMode } = useThemeStore();
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const [activeTab, setActiveTab] = useState("search");

  useEffect(() => {
    setActiveTab(active);
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [active]);

  useEffect(() => {
    if (loading) {
      setAnimationState({
        showContent: false,
        bezelsOpen: false,
      });
    } else {
      setAnimationState((prev) => ({ ...prev, bezelsOpen: false }));

      setTimeout(() => {
        setAnimationState((prev) => ({ ...prev, bezelsOpen: true }));
      }, 1500);

      setTimeout(() => {
        setAnimationState((prev) => ({ ...prev, showContent: true }));
      }, 2500);
    }
  }, [loading]);

  const getBezelWidth = (isOpen) => {
    if (isOpen) {
      return windowSize.width < 1000 && windowSize.width > 640
        ? "5%"
        : windowSize.width < 640
        ? "9%"
        : "3%";
    }
    return "50%";
  };

  return (
    <div
      className={`relative w-full h-screen ${
        isDarkMode ? "bg-black" : "bg-stone-100"
      } overflow-hidden`}
    >
      <ThemeToggle />

        

      {/* top */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="relative w-full" style={{ height: "80px" }}>
           
          {/*short left rec */}
          <div
            className={`absolute top-0 left-0 border-b-2 ${
              isDarkMode
                ? "border-gray-700 bg-gray-900"
                : "border-red-800 bg-red-700"
            }`}
            style={{
              width: "80%",
              height: "30px",
            }}
          />

          {/* diagonal slope*/}
          <div
            className={`absolute bottom-3 ${
              isDarkMode ? "bg-gray-900" : "bg-red-700"
            }`}
            style={{
              left: "33%",
              width: "50%",
              height: "500px",
              clipPath: "polygon(0 0%, 100% 0, 100% 100%, 80% 100%)",
            }}
          >
          </div>

          {/* taller right rec */}
          <div
            className={`absolute top-0 border-b-2 ${
              isDarkMode
                ? "border-gray-700 bg-gray-900"
                : "border-red-800 bg-red-700"
            }`}
            style={{
              left: "73%",
              width: "35%",
              height: "70px",
            }}
          />
        </div>
      </div>

      {/* nav */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-20 h-14 ${
          isDarkMode
            ? "bg-gray-900 border-gray-700"
            : "bg-red-700 border-red-800"
        } border-t-2`}
      >
        <div className="flex justify-center gap-10 items-center h-full px-4">
          {/* search tab */}
          <Link to="/">
            <button
              className={`flex flex-col items-center justify-center h-full px-4 cursor-pointer transition-colors ${
                activeTab === "search"
                  ? isDarkMode
                    ? "text-yellow-400"
                    : "text-yellow-500"
                  : isDarkMode
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-white hover:text-yellow-500"
              }`}
              onClick={() => setActiveTab("search")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="text-xs mt-1">Search</span>
            </button>
          </Link>

          {/* pokemon tab */}
          <Link to="/pokemon/bulbasaur">
            <button
              className={`flex flex-col items-center justify-center h-full px-4 cursor-pointer transition-colors ${
                activeTab === "pokemon"
                  ? isDarkMode
                    ? "text-yellow-400"
                    : "text-yellow-500"
                  : isDarkMode
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-white hover:text-yellow-500"
              }`}
              onClick={() => setActiveTab("pokemon")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span className="text-xs mt-1">Pokemon</span>
            </button>
          </Link>

          {/* team tab */}
          <Link to="/team">
            <button
              className={`flex flex-col items-center justify-center h-full px-4 cursor-pointer transition-colors ${
                activeTab === "team"
                  ? isDarkMode
                    ? "text-yellow-400"
                    : "text-yellow-500"
                  : isDarkMode
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-white hover:text-yellow-500"
              }`}
              onClick={() => setActiveTab("team")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="text-xs mt-1">Team</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Content Area */}
      <div className="absolute inset-0 z-0 pt-8 pb-14 flex flex-col">
        <AnimatePresence>
          {animationState.showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 overflow-y-auto px-12"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* side */}
      <AnimatePresence>
        <motion.div
          key="left-bezel"
          initial={{ width: "50%" }}
          animate={{
            width: getBezelWidth(animationState.bezelsOpen),
          }}
          exit={{ width: "50%" }}
          transition={{
            duration: 1.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`absolute left-0 ${
            isDarkMode
              ? "bg-gray-900 border-gray-700"
              : "bg-red-700 border-red-800"
          } top-7 bottom-14 border-r-2`}
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          }}
        >
          <div
            className={`absolute right-4 top-1/2 -translate-y-1/2 w-1 h-32 ${
              isDarkMode ? "bg-gray-700" : "bg-stone-300"
            } rounded-full`}
          ></div>
        </motion.div>

        <motion.div
          key="right-bezel"
          initial={{ width: "50%" }}
          animate={{
            width: getBezelWidth(animationState.bezelsOpen),
          }}
          exit={{ width: "50%" }}
          transition={{
            duration: 1.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`absolute right-0 ${
            isDarkMode
              ? "bg-gray-900 border-gray-700"
              : "bg-red-700 border-red-800"
          } top-7 bottom-14 border-l-2`}
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          }}
        >
          <div
            className={`absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full ${
              isDarkMode ? "bg-gray-700" : "bg-stone-300"
            }`}
          ></div>
        </motion.div>
      </AnimatePresence>

      {/* loading */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 z-30 flex items-center justify-center ${
              isDarkMode ? "bg-gray-900" : "bg-stone-100"
            }`}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="relative w-52 h-52"
            >
              <img
                src="/assets/images/pokeballimage.png"
                alt="Loading Pokéball"
                className="object-contain w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
motion;
export default PokedexShell;
