import { FaTimes, FaExternalLinkAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { TYPE_STYLES } from "../constants/types";
import { useThemeStore } from "../store/themeStore";

const MoveModal = ({
  moveDetails = {},
  isLoading = false,
  onClose = () => {},
}) => {
  const { isDarkMode } = useThemeStore();
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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className={`relative ${
            isDarkMode
              ? "bg-gradient-to-br from-gray-900/95 to-gray-800/90"
              : "bg-gradient-to-br from-gray-100/95 to-gray-50/90"
          } rounded-2xl border ${
            isDarkMode ? "border-gray-700/30" : "border-gray-300/30"
          } shadow-2xl w-full max-w-md h-[50vh] overflow-hidden flex flex-col`}
          style={{
            boxShadow: `0 0 25px ${
              moveTypeStyle.glow || "rgba(100, 200, 255, 0.3)"
            }`,
          }}
        >
          <div
            className={`h-1 w-full bg-gradient-to-r from-transparent via-${moveTypeStyle.text} to-transparent`}
          />

          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            className={`absolute top-3 right-3 z-10 p-2 rounded-full ${
              isDarkMode ? "bg-black/30" : "bg-white/30"
            } backdrop-blur-sm ${
              isDarkMode ? "text-gray-300" : "text-gray-500"
            } hover:text-${isDarkMode ? "white" : "gray-700"} transition-all`}
            aria-label="Close modal"
          >
            <FaTimes className="w-5 h-5" />
          </motion.button>

          <div
            className={`overflow-y-auto ${
              isLoading && "flex justify-center items-center"
            } ${
              isDarkMode
                ? "scrollbar-thumb-gray-600/80 scrollbar-track-transparent"
                : "scrollbar-thumb-gray-400/80 scrollbar-track-transparent"
            } scrollbar-thin scrollbar-thumb-rounded-full flex-1`}
          >
            <div className="p-6">
              {isLoading ? (
                <div className="flex justify-center items-center h-full py-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
                  />
                </div>
              ) : (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-between items-start mb-4"
                  >
                    <h3
                      className={`text-3xl font-extrabold ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      } capitalize tracking-tight`}
                    >
                      {safeMove.name.replace(/-/g, " ")}
                    </h3>
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className={`px-3 py-1 rounded-full text-sm font-bold ${moveTypeStyle.bg} text-white shadow-md`}
                    >
                      {safeMove.type.toUpperCase()}
                    </motion.span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.1 } }}
                    className="flex flex-wrap gap-2 mb-6"
                  >
                    <span
                      className={`inline-block ${
                        isDarkMode ? "bg-gray-800/70" : "bg-gray-200/70"
                      } text-blue-400 text-xs font-bold px-3 py-1 rounded-full border ${
                        isDarkMode ? "border-blue-400/20" : "border-blue-400/30"
                      }`}
                    >
                      GEN {safeMove.generation}
                    </span>
                    <span
                      className={`inline-block ${
                        isDarkMode ? "bg-gray-800/70" : "bg-gray-200/70"
                      } text-purple-400 text-xs font-bold px-3 py-1 rounded-full border ${
                        isDarkMode
                          ? "border-purple-400/20"
                          : "border-purple-400/30"
                      }`}
                    >
                      {safeMove.damageClass.replace("-", " ").toUpperCase()}
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.2 } }}
                    className="grid grid-cols-3 gap-3 mb-8"
                  >
                    {[
                      { label: "POWER", value: safeMove.power },
                      { label: "ACCURACY", value: safeMove.accuracy },
                      { label: "PP", value: safeMove.pp },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -3 }}
                        className={`${
                          isDarkMode ? "bg-gray-800/40" : "bg-gray-100/70"
                        } rounded-xl p-3 text-center border ${
                          isDarkMode
                            ? "border-gray-700/50"
                            : "border-gray-300/50"
                        } hover:border-${
                          isDarkMode ? "gray-600/50" : "gray-400/50"
                        } transition-all`}
                      >
                        <div
                          className={`text-xs ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          } mb-1`}
                        >
                          {stat.label}
                        </div>
                        <div
                          className={`${
                            isDarkMode ? "text-white" : "text-gray-800"
                          } font-bold text-2xl`}
                        >
                          {stat.value}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.3 } }}
                    className="mb-6"
                  >
                    <h4
                      className={`text-sm font-semibold ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      } mb-2 tracking-wider`}
                    >
                      MOVE EFFECT
                    </h4>
                    <p
                      className={`${
                        isDarkMode ? "text-white/90" : "text-gray-700"
                      } leading-relaxed ${
                        isDarkMode ? "bg-gray-800/30" : "bg-gray-100/70"
                      } p-4 rounded-xl border ${
                        isDarkMode ? "border-gray-700/50" : "border-gray-300/50"
                      }`}
                    >
                      {safeMove.effect}
                    </p>
                  </motion.div>

                  {safeMove.name !== "unknown" && (
                    <motion.a
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { delay: 0.4 } }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={`https://pokemondb.net/move/${safeMove.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center px-5 py-3 rounded-xl ${moveTypeStyle.bg} text-white font-bold hover:shadow-lg transition-all`}
                      style={{
                        boxShadow: `0 0 15px ${
                          moveTypeStyle.glow || "rgba(100, 150, 255, 0.5)"
                        }`,
                      }}
                    >
                      <FaExternalLinkAlt className="mr-2" />
                      View on Pokémon DB
                    </motion.a>
                  )}
                </>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
motion;
export default MoveModal;
