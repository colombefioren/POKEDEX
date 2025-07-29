import { motion } from "framer-motion";
import { useThemeStore } from "../store/themeStore";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <motion.button
      onClick={toggleTheme}
      className="absolute top-4 right-8 sm:right-15 z-30"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative w-20 h-8 rounded-full px-1 cursor-pointer">
        <div
          className={`absolute inset-0 rounded-full transition-colors duration-300 ${
            isDarkMode
              ? "bg-gray-800 border border-gray-700"
              : "bg-red-100 border border-red-200"
          }`}
        />

        <motion.div
          className={`absolute top-1 w-6 h-6 rounded-full shadow-md flex items-center justify-center ${
            isDarkMode ? "bg-gray-700" : "bg-white"
          }`}
          initial={false}
          animate={{
            x: isDarkMode ? 0 : 47,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {isDarkMode ? (
            <FaMoon className="text-yellow-300 text-xs" />
          ) : (
            <FaSun className="text-red-500 text-xs" />
          )}
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
          <FaMoon
            className={`text-xs transition-opacity duration-300 ${
              isDarkMode
                ? "opacity-20 text-gray-400"
                : "opacity-100 text-red-500"
            }`}
          />
          <FaSun
            className={`text-xs transition-opacity duration-300 ${
              isDarkMode
                ? "opacity-100 text-yellow-300"
                : "opacity-20 text-gray-400"
            }`}
          />
        </div>
      </div>
    </motion.button>
  );
};
motion;
export default ThemeToggle;
