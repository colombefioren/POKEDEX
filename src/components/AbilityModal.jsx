import { FaTimes, FaExternalLinkAlt, FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const AbilityModal = ({
  abilityDetails = {},
  isLoading = false,
  onClose = () => {},
  typeStyle = {},
  isHidden = false,
}) => {
  const safeAbility = {
    name: abilityDetails?.name || "Unknown Ability",
    effect: abilityDetails?.effect || "No description available",
    shortEffect: abilityDetails?.shortEffect || "No short description",
    generation: abilityDetails?.generation || "—",
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`relative bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 rounded-2xl border border-gray-700/50 shadow-2xl w-full max-w-md h-[55vh] overflow-hidden flex flex-col`}
          style={{
            boxShadow: `0 0 30px ${
              typeStyle.glow || "rgba(100, 200, 255, 0.3)"
            }`,
          }}
        >
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            className="absolute top-4 right-4 z-10 text-gray-300 hover:text-white transition-all p-2 rounded-full bg-black/30 backdrop-blur-sm"
            aria-label="Close modal"
          >
            <FaTimes className="w-5 h-5" />
          </motion.button>

          <div
            className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${
              typeStyle.text || "blue-400"
            } to-transparent`}
          ></div>

          <div
            className={`overflow-y-auto h-full ${
              isLoading && "flex justify-center items-center"
            } scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800/50 scrollbar-thumb-rounded-full flex-1`}
          >
            <div className="p-6">
              {isLoading ? (
                <div className="flex  justify-center items-center">
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
                  <div className="relative mb-4">
                    <motion.h3
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-3xl font-extrabold text-white capitalize mb-2 tracking-tight"
                    >
                      {safeAbility.name.replace(/-/g, " ")}
                      {isHidden && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-2 inline-block text-yellow-400"
                        >
                          <FaStar className="inline-block" />
                        </motion.span>
                      )}
                    </motion.h3>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { delay: 0.2 } }}
                      className="flex flex-wrap gap-2 mb-4"
                    >
                      <span className="inline-block bg-gray-800/80 text-blue-400 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/20">
                        GEN {safeAbility.generation}
                      </span>

                      {isHidden && (
                        <span className="inline-block bg-yellow-500/20 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full border border-yellow-400/20">
                          HIDDEN ABILITY
                        </span>
                      )}
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.3 } }}
                    className="space-y-6"
                  >
                    <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700/50">
                      <h4 className="text-sm font-semibold text-gray-300 mb-2 tracking-wider">
                        ABILITY EFFECT
                      </h4>
                      <p className="text-white/90 leading-relaxed">
                        {safeAbility.effect}
                      </p>
                    </div>

                    <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700/50">
                      <h4 className="text-sm font-semibold text-gray-300 mb-2 tracking-wider">
                        IN BATTLE
                      </h4>
                      <p className="text-white/90 leading-relaxed">
                        {safeAbility.shortEffect}
                      </p>
                    </div>
                  </motion.div>

                  {safeAbility.name !== "unknown" && (
                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      href={`https://pokemondb.net/ability/${safeAbility.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-6 inline-flex items-center px-5 py-3 rounded-xl ${
                        typeStyle.bg || "bg-blue-600"
                      } text-white font-medium hover:shadow-lg transition-all`}
                      style={{
                        boxShadow: `0 0 15px ${
                          typeStyle.glow || "rgba(100, 150, 255, 0.5)"
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
export default AbilityModal;
