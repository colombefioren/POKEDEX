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
import { useThemeStore } from "../../store/themeStore";

const AboutTab = ({ pokemon }) => {
  const { isDarkMode } = useThemeStore();
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

  const gameIndices = [
    ...pokemon.game_indices,
    ...pokemon.game_indices,
    ...pokemon.game_indices,
  ];

  const bgClass = isDarkMode
    ? "bg-gradient-to-br from-gray-900/70 to-gray-800/60 border-gray-700/40"
    : "bg-white/90 border-slate-200/80";
  const textClass = isDarkMode ? "text-white" : "text-slate-600";
  const secondaryTextClass = isDarkMode ? "text-gray-300" : "text-slate-600";

  return (
    <div className="px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3"
      >
        <motion.div
          variants={itemVariants}
          className={`relative rounded-xl p-4 border ${bgClass} shadow-sm`}
        >
          <div className="flex items-center gap-2 mb-2">
            <FaMagic
              className={`${
                isDarkMode ? "text-blue-400" : "text-blue-500"
              } text-lg`}
            />
            <h3 className={`text-lg font-bold ${textClass}`}>Pokédex</h3>
          </div>
          <p
            className={`text-sm italic leading-tight min-h-[60px] ${secondaryTextClass}`}
          >
            {pokemon.species.flavor_text || "No description available"}
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={`rounded-xl p-4 border ${bgClass} shadow-sm`}
        >
          <div className="flex items-center gap-2 mb-2">
            <FaRuler
              className={`${
                isDarkMode ? "text-purple-400" : "text-purple-500"
              } text-lg`}
            />
            <h3 className={`text-lg font-bold ${textClass}`}>Details</h3>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              {
                icon: (
                  <FaRuler
                    className={isDarkMode ? "text-blue-400" : "text-blue-500"}
                  />
                ),
                label: "Height",
                value: `${heightInMeters}m`,
              },
              {
                icon: (
                  <FaWeight
                    className={
                      isDarkMode ? "text-yellow-400" : "text-amber-500"
                    }
                  />
                ),
                label: "Weight",
                value: `${weightInKg}kg`,
              },
              {
                icon: (
                  <FaStar
                    className={
                      isDarkMode ? "text-green-400" : "text-emerald-500"
                    }
                  />
                ),
                label: "XP",
                value: pokemon.base_experience || "—",
              },
              {
                icon: (
                  <FaLeaf
                    className={
                      isDarkMode ? "text-emerald-400" : "text-green-500"
                    }
                  />
                ),
                label: "Habitat",
                value: pokemon.species.habitat?.slice(0, 9) || "?",
              },
              {
                icon: (
                  <FaHeart
                    className={isDarkMode ? "text-pink-400" : "text-rose-500"}
                  />
                ),
                label: "Capture",
                value: pokemon.species.capture_rate || "—",
              },
              {
                icon: (
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isDarkMode ? "bg-gray-400" : "bg-slate-400"
                    }`}
                  />
                ),
                label: "Shape",
                value: pokemon.species.shape?.slice(0, 7) || "—",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`flex items-center justify-between py-1 px-2 rounded ${
                  isDarkMode ? "bg-gray-800/30" : "bg-slate-100/50"
                }`}
              >
                <span
                  className={`flex items-center gap-1 ${secondaryTextClass}`}
                >
                  <span className="text-[0.9em]">{item.icon}</span>
                  {item.label}
                </span>
                <span className={`font-medium ${textClass}`}>{item.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={`md:col-span-2 rounded-xl p-4 border ${bgClass} shadow-sm`}
        >
          <div className="flex items-center gap-2 mb-2">
            <FaMountain
              className={`${
                isDarkMode ? "text-orange-400" : "text-orange-500"
              } text-lg`}
            />
            <h3 className={`text-lg font-bold ${textClass}`}>Traits</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              {
                icon: (
                  <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full" />
                ),
                label: "Growth",
                value:
                  pokemon.species.growth_rate
                    ?.split("-")[0]
                    .charAt(0)
                    .toUpperCase() + pokemon.species.growth_rate?.slice(1) ||
                  "—",
                color: isDarkMode
                  ? "from-green-500/20 to-blue-500/20"
                  : "from-green-100 to-blue-100",
              },
              {
                icon: (
                  <FaHeart
                    className={isDarkMode ? "text-pink-400" : "text-rose-500"}
                  />
                ),
                label: "Happy",
                value: pokemon.species.base_happiness || "—",
                color: isDarkMode
                  ? "from-pink-500/20 to-purple-500/20"
                  : "from-rose-100 to-purple-100",
              },
              {
                icon: (
                  <FaStar
                    className={
                      isDarkMode ? "text-yellow-400" : "text-amber-400"
                    }
                  />
                ),
                label: "Legend",
                value: pokemon.species.is_legendary ? "★" : "✗",
                color: isDarkMode
                  ? "from-yellow-500/20 to-amber-500/20"
                  : "from-amber-100 to-yellow-100",
              },
              {
                icon: (
                  <FaMagic
                    className={
                      isDarkMode ? "text-purple-400" : "text-purple-500"
                    }
                  />
                ),
                label: "Myth",
                value: pokemon.species.is_mythical ? "✨" : "✗",
                color: isDarkMode
                  ? "from-purple-500/20 to-indigo-500/20"
                  : "from-purple-100 to-indigo-100",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`bg-gradient-to-br ${
                  item.color
                } rounded-lg p-2 text-center border ${
                  isDarkMode ? "border-gray-700/30" : "border-slate-200/80"
                }`}
              >
                <div className="flex justify-center text-lg mb-1">
                  {item.icon}
                </div>
                <div
                  className={`text-[0.65rem] uppercase tracking-wider ${secondaryTextClass}`}
                >
                  {item.label}
                </div>
                <div className={`font-bold text-sm ${textClass}`}>
                  {item.value}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className={`rounded-xl border p-3 mt-4 ${bgClass} shadow-sm`}
      >
        <div className="flex items-center gap-3 mb-3">
          <FaGamepad
            className={`${
              isDarkMode ? "text-blue-400" : "text-blue-500"
            } text-lg flex-shrink-0`}
          />
          <h3 className={`text-lg font-bold flex-shrink-0 ${textClass}`}>
            Game Appearances
          </h3>

          <div
            className={`hidden sm:block h-px bg-gradient-to-r ${
              isDarkMode ? "from-blue-400/30" : "from-slate-300/80"
            } to-transparent flex-1 ml-2`}
          ></div>
        </div>

        {pokemon.game_indices.length > 0 ? (
          <div className="relative overflow-hidden py-2">
            <div
              className={`absolute inset-y-0 left-0 w-12 bg-gradient-to-r ${
                isDarkMode ? "from-gray-900/90" : "from-white"
              } to-transparent z-10 pointer-events-none`}
            ></div>
            <div
              className={`absolute inset-y-0 right-0 w-12 bg-gradient-to-l ${
                isDarkMode ? "from-gray-900/90" : "from-white"
              } to-transparent z-10 pointer-events-none`}
            ></div>

            <motion.div
              className="flex gap-5 w-max"
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
                    className={`inline-flex items-center justify-center px-4 py-1 rounded-xl text-sm font-medium capitalize whitespace-nowrap overflow-hidden h-[40px] ${
                      isDarkMode
                        ? "bg-gradient-to-br from-white/10 to-white/20 text-white/90 border border-white/20"
                        : "bg-white text-slate-700 border border-slate-200"
                    } shadow-sm`}
                  >
                    {game.version.name.replace(/-/g, " ")}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ) : (
          <div className="text-center py-4">
            <span className={`text-sm ${secondaryTextClass}`}>
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
