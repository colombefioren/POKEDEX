import { FaExternalLinkAlt, FaShieldAlt } from "react-icons/fa";
import { useThemeStore } from "../store/themeStore";

const AbilityCard = ({ ability = {}, typeStyle = {}, onClick = () => {} }) => {
  const { isDarkMode } = useThemeStore();
  const safeAbility = {
    name: ability.name || "unknown",
    url: ability.url || "",
    is_hidden: ability.is_hidden || false,
    slot: ability.slot || 0,
  };

  return (
    <div
      onClick={onClick}
      className={`relative group cursor-pointer rounded-xl p-3 border-2 ${
        isDarkMode ? "border-gray-700/50" : "border-gray-300/50"
      } hover:border-${
        typeStyle.text || "blue-400"
      } transition-all duration-300 hover:shadow-lg hover:shadow-${
        typeStyle.text || "blue-500"
      }/20 ${isDarkMode ? "bg-gray-800/50" : "bg-white/80"} overflow-hidden`}
      aria-label={`View ${safeAbility.name} details`}
    >
      {safeAbility.is_hidden && (
        <div
          className={`absolute top-3 left-3 ${
            isDarkMode
              ? "bg-yellow-500/20 text-yellow-300"
              : "bg-yellow-500/30 text-yellow-700"
          } px-2 py-1 rounded-md text-xs font-semibold flex items-center backdrop-blur-sm`}
        >
          <FaShieldAlt className="mr-1.5" size={10} /> HIDDEN
        </div>
      )}

      <div
        className={`absolute inset-0 rounded-xl ${
          typeStyle.glow || "bg-blue-500"
        } opacity-0 group-hover:opacity-15 transition-opacity duration-300 -z-10`}
      ></div>

      <div className="h-full flex flex-col justify-between">
        <div className="flex-grow flex items-center justify-center">
          <h4
            className={`text-lg font-bold ${
              isDarkMode ? "text-white/90" : "text-gray-600"
            } text-center group-hover:text-${
              isDarkMode ? "white" : "gray-900"
            } transition-colors capitalize tracking-wide`}
          >
            {safeAbility.name.replace(/-/g, " ")}
          </h4>
        </div>

        <div className="absolute right-3 bottom-3">
          <div
            className={`flex items-center justify-center w-6 h-6 rounded-full ${
              isDarkMode ? "bg-gray-700/50" : "bg-gray-300/50"
            } group-hover:bg-${
              isDarkMode ? "gray-600" : "gray-400"
            } transition-colors`}
          >
            <FaExternalLinkAlt
              className={`${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              } text-xs group-hover:text-${
                isDarkMode ? "white" : "gray-700"
              } transition-colors`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbilityCard;
