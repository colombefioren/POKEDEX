import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import evolutionChain from "../../helpers/evolutionChain";
import { FaArrowRight, FaQuestionCircle } from "react-icons/fa";

const EvolutionTab = ({ pokemon, typeStyle }) => {
  const evolutions = pokemon.species.evolution_chain
    ? evolutionChain(pokemon.species.evolution_chain)
    : [];

  const groupEvolutions = (evolutions) => {
    const groups = [];
    for (let i = 0; i < evolutions.length; i += 3) {
      groups.push(evolutions.slice(i, i + 3));
    }
    return groups;
  };

  const evolutionGroups = groupEvolutions(evolutions);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  const connectorVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "circOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative h-full w-full flex flex-col items-center justify-center px-4 py-8"
    >
      {evolutions.length > 0 ? (
        <div
          className={`w-full ${
            evolutions.length > 8
              ? "mb-15 overflow-y-auto"
              : evolutions.length > 3
              ? "mb-15"
              : "mb-30"
          } max-w-4xl`}
        >
          {evolutionGroups.map((group, groupIndex) => (
            <motion.div
              key={`group-${groupIndex}`}
              variants={rowVariants}
              className="flex justify-center mb-15 last:mb-0"
            >
              {group.map((evolution, index) => (
                <div key={evolution.name} className="flex items-center">
                  <motion.div variants={itemVariants}>
                    <Link
                      to={`/pokemon/${evolution.name}`}
                      className="group relative flex flex-col items-center"
                    >
                      <div
                        className={`relative w-28 h-28 md:w-36 md:h-36 rounded-full p-1 ${
                          typeStyle.glow || "bg-blue-500"
                        } bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300`}
                      >
                        <div className="absolute inset-0 rounded-full bg-gray-800/50 backdrop-blur-lg"></div>

                        <div className="relative w-full h-full flex items-center justify-center">
                          <motion.img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.id}.png`}
                            alt={evolution.name}
                            className="w-full h-full object-contain drop-shadow-2xl"
                            whileHover={{ scale: 1.05 }}
                            onError={(e) => {
                              e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.id}.png`;
                            }}
                          />
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-1.5 rounded-full border border-gray-700 shadow-lg"
                        >
                          <span className="text-white font-medium capitalize text-sm whitespace-nowrap">
                            {evolution.name}
                          </span>
                        </motion.div>

                        <motion.div
                          whileHover={{ rotate: 15 }}
                          className="absolute -top-2 -right-2 bg-gray-900 border border-gray-700 rounded-full w-8 h-8 flex items-center justify-center shadow-md"
                        >
                          <span className="text-xs text-gray-300 font-mono">
                            #{evolution.id.toString().padStart(3, "0")}
                          </span>
                        </motion.div>
                      </div>
                    </Link>
                  </motion.div>

                  {index < group.length - 1 && (
                    <motion.div
                      variants={connectorVariants}
                      className="relative mx-2 md:mx-4"
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-12 md:w-16 h-1 bg-gradient-to-r ${
                            typeStyle.glow || "from-blue-400 to-blue-500"
                          } rounded-full`}
                        ></div>
                        <motion.div
                          animate={{
                            x: [-5, 5, -5],
                            transition: {
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            },
                          }}
                        >
                          <FaArrowRight
                            className={`ml-1 text-lg ${
                              typeStyle.text || "text-blue-400"
                            }`}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div variants={itemVariants} className="text-center py-8">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="inline-block bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700/50 shadow-lg backdrop-blur-sm"
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                transition: { duration: 4, repeat: Infinity },
              }}
            >
              <FaQuestionCircle className="w-16 h-16 mx-auto text-gray-500/70" />
            </motion.div>
            <motion.p
              className="mt-4 text-gray-400 text-lg font-medium"
              animate={{
                opacity: [0.8, 1, 0.8],
                transition: { duration: 3, repeat: Infinity },
              }}
            >
              This Pokémon does not evolve
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};
motion;
export default EvolutionTab;
