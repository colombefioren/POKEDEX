import { TYPE_STYLES } from "../constants/types";
import { motion } from "framer-motion";
import { useThemeStore } from "../store/themeStore";

const MoveCard = ({ move = {}, onClick = () => {}, searchQuery = "" }) => {
  const { isDarkMode } = useThemeStore();
  const safeMove = {
    name: move.name || "unknown",
    type: move.type || "unknown",
    url: move.url || "",
  };

  const moveTypeStyle =
    TYPE_STYLES[safeMove.type.toLowerCase()] || TYPE_STYLES.default;
  const isHighlighted =
    searchQuery && safeMove.name.includes(searchQuery.toLowerCase());

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={`
        relative cursor-pointer rounded-xl p-4 transition-all duration-300
        ${
          isDarkMode ? "bg-white/5" : "bg-gray-800/5"
        } backdrop-blur-sm border ${
        isDarkMode ? "border-white/10" : "border-gray-400/20"
      } 
        hover:border-${moveTypeStyle.text}/30
        ${isHighlighted ? `ring-1 ring-${moveTypeStyle.text}` : ""}
      `}
      aria-label={`View ${safeMove.name} details`}
    >
      <div className="flex items-center justify-between">
        <h4
          className={`text-sm font-medium ${
            isDarkMode ? "text-white/90" : "text-gray-800"
          } tracking-tight capitalize`}
        >
          {safeMove.name.replace(/-/g, " ")}
        </h4>

        <span
          className={`px-2 py-0.5 rounded-full text-[0.65rem] font-medium ${
            moveTypeStyle.bg
          } ${isDarkMode ? "text-white/90" : "text-white"}`}
        >
          {safeMove.type}
        </span>
      </div>
    </motion.div>
  );
};
motion;
export default MoveCard;
