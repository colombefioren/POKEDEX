import { FaTimes, FaExternalLinkAlt } from "react-icons/fa";
import { TYPE_STYLES } from "../constants/types";

const MoveModal = ({
  moveDetails = {},
  isLoading = false,
  onClose = () => {},
}) => {

  const safeMove = {
    name: moveDetails?.name || "Unknown Move",
    effect: moveDetails?.effect || "No description available",
    type: moveDetails?.type || "unknown",
    power: moveDetails?.power || "—",
    accuracy: moveDetails?.accuracy || "—",
    pp: moveDetails?.pp || "—",
    damageClass: moveDetails?.damageClass || "—",
    generation: moveDetails?.generation || "—",
  };

  const moveTypeStyle =
    TYPE_STYLES[safeMove.type.toLowerCase()] || TYPE_STYLES.default;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="relative bg-gray-900 rounded-xl border border-gray-700 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-bold text-white capitalize mb-2">
                  {safeMove.name.replace(/-/g, " ")}
                </h3>
                <span
                  className={`px-3 py-1 rounded text-sm font-medium ${moveTypeStyle.bg} text-white`}
                >
                  {safeMove.type.toUpperCase()}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-block bg-gray-800 text-blue-400 text-xs font-bold px-2 py-1 rounded">
                  GEN {safeMove.generation}
                </span>
                <span className="inline-block bg-gray-800 text-purple-400 text-xs font-bold px-2 py-1 rounded">
                  {safeMove.damageClass.replace("-", " ").toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-400">POWER</div>
                  <div className="text-white font-bold text-xl">
                    {safeMove.power}
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-400">ACCURACY</div>
                  <div className="text-white font-bold text-xl">
                    {safeMove.accuracy}
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-400">PP</div>
                  <div className="text-white font-bold text-xl">
                    {safeMove.pp}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-400 mb-1">
                  EFFECT
                </h4>
                <p className="text-white">{safeMove.effect}</p>
              </div>

              {safeMove.name !== "unknown" && (
                <a
                  href={`https://pokemondb.net/move/${safeMove.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 inline-flex items-center px-4 py-2 rounded-lg ${
                    moveTypeStyle.bg || "bg-blue-500"
                  } text-white hover:opacity-90 transition-opacity`}
                >
                  <FaExternalLinkAlt className="mr-2" />
                  View full details on Pokémon DB
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoveModal;
