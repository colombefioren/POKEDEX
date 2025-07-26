import { FaExternalLinkAlt, FaShieldAlt } from "react-icons/fa";

const AbilityCard = ({ ability = {}, typeStyle = {}, onClick = () => {} }) => {
  const safeAbility = {
    name: ability.name || "unknown",
    url: ability.url || "",
    is_hidden: ability.is_hidden || false,
    slot: ability.slot || 0,
  };

  return (
    <div
      onClick={onClick}
      className={`relative group cursor-pointer rounded-xl p-3 border-2 border-gray-700/50 hover:border-${
        typeStyle.text || "blue-400"
      } transition-all duration-300 hover:shadow-lg hover:shadow-${
        typeStyle.text || "blue-500"
      }/20 bg-gray-800/50 overflow-hidden`}
      aria-label={`View ${safeAbility.name} details`}
    >
      {safeAbility.is_hidden && (
        <div className="absolute top-3 left-3 bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-md text-xs font-semibold flex items-center backdrop-blur-sm">
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
          <h4 className="text-lg font-bold text-white/90 text-center group-hover:text-white transition-colors capitalize tracking-wide">
            {safeAbility.name.replace(/-/g, " ")}
          </h4>
        </div>

        <div className="absolute right-3 bottom-3">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-700/50 group-hover:bg-gray-600 transition-colors">
            <FaExternalLinkAlt className="text-gray-400 text-xs group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbilityCard;
