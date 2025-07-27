import { TYPE_STYLES } from "../constants/types";
import { motion } from "framer-motion";

const MoveCard = ({ move = {}, onClick = () => {}, searchQuery = "" }) => {
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
        bg-white/5 backdrop-blur-sm border border-white/10 
        hover:border-${moveTypeStyle.text}/30
        ${isHighlighted ? `ring-1 ring-${moveTypeStyle.text}` : ""}
      `}
      aria-label={`View ${safeMove.name} details`}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-white/90 tracking-tight capitalize">
          {safeMove.name.replace(/-/g, " ")}
        </h4>

        <span
          className={`px-2 py-0.5 rounded-full text-[0.65rem] font-medium ${moveTypeStyle.bg} text-white/90`}
        >
          {safeMove.type}
        </span>
      </div>
    </motion.div>
  );
};
motion;
export default MoveCard;
