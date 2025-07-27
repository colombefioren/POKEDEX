import { motion } from "framer-motion";
import { useThemeStore } from "../store/themeStore";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <motion.button
      onClick={toggleTheme}
      className="absolute top-4 right-4 z-30"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative w-16 h-8 rounded-full p-1 cursor-pointer">
        <div
          className={`absolute inset-0 rounded-full transition-all duration-300 ${
            isDarkMode
              ? "bg-gradient-to-r from-gray-800 to-gray-900"
              : "bg-gradient-to-r from-red-400 to-red-500"
          }`}
        />

        <motion.div
          className={`absolute top-1 w-6 h-6 rounded-full flex items-center justify-center ${
            isDarkMode ? "bg-yellow-300 left-1" : "bg-white left-9"
          }`}
          initial={false}
          animate={{
            x: isDarkMode ? 0 : 32,
            rotate: isDarkMode ? 0 : 360,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {isDarkMode ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-4 h-4 text-gray-800"
            >
              <path
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-4 h-4 text-yellow-500"
            >
              <path
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </motion.div>

        {isDarkMode && (
          <>
            <motion.div
              className="absolute top-2 left-6 w-1 h-1 rounded-full bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
            <motion.div
              className="absolute top-5 left-10 w-1 h-1 rounded-full bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            />
            <motion.div
              className="absolute top-3 left-12 w-1 h-1 rounded-full bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            />
          </>
        )}
      </div>
    </motion.button>
  );
};
motion;
export default ThemeToggle;
