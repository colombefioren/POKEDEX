import { TYPE_STYLES } from "../constants/types";

const MoveCard = ({ move = {}, onClick = () => {} }) => {
  const safeMove = {
    name: move.name || "unknown",
    type: move.type || "unknown",
    url: move.url || "",
    level_learned_at: move.level_learned_at || 0,
    learn_method: move.learn_method || "unknown",
  };

  const moveTypeStyle =
    TYPE_STYLES[safeMove.type.toLowerCase()] || TYPE_STYLES.default;

  return (
    <div
      onClick={onClick}
      className={`relative group cursor-pointer rounded-xl p-4 border-2 border-gray-700/50 hover:border-${
        moveTypeStyle.text || "blue-400"
      } transition-all duration-300 hover:shadow-lg bg-gray-800/50`}
      aria-label={`View ${safeMove.name} details`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-bold text-white capitalize group-hover:text-blue-300 transition-colors">
            {safeMove.name.replace(/-/g, " ")}
          </h4>
          <div className="text-xs text-gray-400 mt-1">
            Lv. {safeMove.level_learned_at} •{" "}
            {safeMove.learn_method.replace("-", " ")}
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${moveTypeStyle.bg} text-white`}
        >
          {safeMove.type.toUpperCase()}
        </span>
      </div>

      <div
        className={`absolute inset-0 rounded-xl ${
          moveTypeStyle.glow || "bg-blue-500"
        } opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`}
      ></div>
    </div>
  );
};

export default MoveCard;
