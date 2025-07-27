import { motion } from "framer-motion";
import {
  FaRuler,
  FaWeight,
  FaStar,
  FaMagic,
  FaLeaf,
  FaMountain,
  FaHeart,
  FaGamepad,
} from "react-icons/fa";

const AboutTab = ({ pokemon }) => {
  const heightInMeters = pokemon.height / 10;
  const weightInKg = pokemon.weight / 10;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 8, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const gameIndices = [...pokemon.game_indices, ...pokemon.game_indices];

  return (
    <div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3"
      >
        <motion.div
          variants={itemVariants}
          className="relative bg-gradient-to-br from-gray-900/70 to-gray-800/60 rounded-xl p-4 border border-gray-700/40 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 mb-2">
            <FaMagic className="text-blue-400 text-lg" />
            <h3 className="text-lg font-bold text-white">Pokédex</h3>
          </div>
          <p className="text-gray-300 text-sm italic leading-tight min-h-[60px]">
            {pokemon.species.flavor_text || "No description available"}
          </p>

          <div className="absolute -z-10 inset-0 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-0.5 rounded-full bg-blue-400/20"
                style={{
                  top: `${10 + Math.random() * 80}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-gray-900/70 to-gray-800/60 rounded-xl p-4 border border-gray-700/40 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 mb-2">
            <FaRuler className="text-purple-400 text-lg" />
            <h3 className="text-lg font-bold text-white">Details</h3>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              {
                icon: <FaRuler className="text-blue-400" />,
                label: "Height",
                value: `${heightInMeters}m`,
              },
              {
                icon: <FaWeight className="text-yellow-400" />,
                label: "Weight",
                value: `${weightInKg}kg`,
              },
              {
                icon: <FaStar className="text-green-400" />,
                label: "XP",
                value: pokemon.base_experience || "—",
              },
              {
                icon: <FaLeaf className="text-emerald-400" />,
                label: "Habitat",
                value: pokemon.species.habitat?.slice(0, 9) || "?",
              },
              {
                icon: <FaHeart className="text-pink-400" />,
                label: "Capture",
                value: pokemon.species.capture_rate || "—",
              },
              {
                icon: <div className="w-3 h-3 bg-gray-400 rounded-full" />,
                label: "Shape",
                value: pokemon.species.shape?.slice(0, 7) || "—",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center justify-between py-1 px-2 rounded bg-gray-800/30"
              >
                <span className="text-gray-400 flex items-center gap-1">
                  <span className="text-[0.9em]">{item.icon}</span>
                  {item.label}
                </span>
                <span className="text-white font-medium">{item.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="md:col-span-2 bg-gradient-to-br from-gray-900/70 to-gray-800/60 rounded-xl p-4 border border-gray-700/40 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 mb-2">
            <FaMountain className="text-orange-400 text-lg" />
            <h3 className="text-lg font-bold text-white">Traits</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              {
                icon: (
                  <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full" />
                ),
                label: "Growth",
                value:
                  pokemon.species.growth_rate?.charAt(0).toUpperCase() +
                    pokemon.species.growth_rate?.slice(1, 5) || "—",
                color: "from-green-500/20 to-blue-500/20",
              },
              {
                icon: <FaHeart className="text-pink-400" />,
                label: "Happy",
                value: pokemon.species.base_happiness || "—",
                color: "from-pink-500/20 to-purple-500/20",
              },
              {
                icon: <FaStar className="text-yellow-400" />,
                label: "Legend",
                value: pokemon.species.is_legendary ? "★" : "✗",
                color: "from-yellow-500/20 to-amber-500/20",
              },
              {
                icon: <FaMagic className="text-purple-400" />,
                label: "Myth",
                value: pokemon.species.is_mythical ? "✨" : "✗",
                color: "from-purple-500/20 to-indigo-500/20",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`bg-gradient-to-br ${item.color} to-gray-800/40 rounded-lg p-2 text-center border border-gray-700/30`}
              >
                <div className="flex justify-center text-lg mb-1">
                  {item.icon}
                </div>
                <div className="text-gray-400 text-[0.65rem] uppercase tracking-wider">
                  {item.label}
                </div>
                <div className="text-white font-bold text-sm">{item.value}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-gray-900/70 to-gray-800/60 rounded-xl border border-gray-700/40 backdrop-blur-sm p-4"
      >
        <div className="flex items-center gap-3 mb-3">
          <FaGamepad className="text-blue-400 text-lg flex-shrink-0" />
          <h3 className="text-lg font-bold text-white flex-shrink-0">
            Game Appearances
          </h3>

          {/* Decorative divider */}
          <div className="hidden sm:block h-px bg-gradient-to-r from-blue-400/30 to-transparent flex-1 ml-2"></div>
        </div>

        {pokemon.game_indices.length > 0 ? (
          <div className="relative overflow-hidden py-2">
            {/* Gradient overlays */}
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-gray-900/90 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-gray-900/90 to-transparent z-10 pointer-events-none"></div>

            {/* Infinite scrolling container */}
            <motion.div
              className="flex gap-3 w-max"
              animate={{
                x: [
                  "0%",
                  `-${100 * (gameIndices.length / (gameIndices.length + 5))}%`,
                ],
              }}
              transition={{
                duration: gameIndices.length * 2.5,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              {gameIndices.map((game, index) => (
                <motion.div
                  key={`${game.version.name}-${index}`}
                  whileHover={{ y: -2, scale: 1.03 }}
                  className="flex-shrink-0"
                >
                  <span
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium capitalize
                      bg-gradient-to-br from-white/10 to-white/20 text-white/90
                      border border-white/20 shadow-sm backdrop-blur-sm h-[40px]
                      whitespace-nowrap overflow-hidden"
                  >
                    {game.version.name.replace(/-/g, " ")}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ) : (
          <div className="text-center py-4">
            <span className="text-gray-400 text-sm">
              No game data available
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
};
motion;
export default AboutTab;
