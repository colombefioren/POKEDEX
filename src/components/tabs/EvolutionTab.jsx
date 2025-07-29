import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import evolutionChain from "../../helpers/evolutionChain";
import { FaArrowRight, FaQuestionCircle } from "react-icons/fa";
import { GiSpinningBlades } from "react-icons/gi";
import { RiSwordFill } from "react-icons/ri";
import { useState } from "react";
import { useThemeStore } from "../../store/themeStore";

const EvolutionTab = ({ pokemon, typeStyle }) => {
  const evolutions = pokemon.species.evolution_chain
    ? evolutionChain(pokemon.species.evolution_chain)
    : [];
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useThemeStore();

  const groupEvolutions = (evolutions) => {
    if (window.innerWidth < 640) {
      return evolutions.map((evolution) => [evolution]);
    }
    if (window.innerWidth < 1024) {
      const groups = [];
      for (let i = 0; i < evolutions.length; i += 2) {
        groups.push(evolutions.slice(i, i + 2));
      }
      return groups;
    }
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 },
    },
  };

  const connectorVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "backOut" },
    },
  };

  const LoadingPlaceholder = () => (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.3 },
      }}
    >
      <motion.div
        animate={{
          rotate: 360,
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        <GiSpinningBlades
          className={`text-3xl ${typeStyle.text || "text-blue-400"} opacity-60`}
        />
      </motion.div>
    </motion.div>
  );

  const renderPokemonId = (id) => {
    const digits = id.toString().padStart(3, "0").split("");
    return (
      <motion.div
        className="flex items-center space-x-0.5"
        whileHover={{ scale: 1.1 }}
      >
        {digits.map((digit, i) => (
          <motion.span
            key={i}
            className={`inline-block px-1 py-0.5 rounded-md text-xs font-bold ${
              typeStyle.bg || "bg-blue-600"
            } text-white`}
            initial={{ y: 0 }}
            animate={{
              y: [0, -5, 0],
              transition: {
                delay: i * 0.1,
                duration: 1.5,
                repeat: Infinity,
                repeatType: "mirror",
              },
            }}
          >
            {digit}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  const renderEvolutionConnector = () => (
    <motion.div variants={connectorVariants} className="relative mx-2 md:mx-6">
      <div className="flex items-center">
        <motion.div
          className="mx-5 relative"
          animate={{
            x: [-3, 3, -3],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <FaArrowRight
            className={`text-xl ${
              typeStyle.text || "text-blue-400"
            } drop-shadow-md`}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: `0 0 10px ${typeStyle.glow || "#3B82F6"}`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.8, 0, 0.8],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              },
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );

  const renderVerticalConnector = () => (
    <motion.div variants={connectorVariants} className="relative my-4">
      <div className="flex flex-col items-center">
        <motion.div
          className="my-2 relative"
          animate={{
            y: [-3, 3, -3],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <FaArrowRight
            className={`text-xl ${
              typeStyle.text || "text-blue-400"
            } drop-shadow-md rotate-90`}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: `0 0 10px ${typeStyle.glow || "#3B82F6"}`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.8, 0, 0.8],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              },
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`relative h-full w-full flex flex-col items-center justify-center px-4 py-8 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      {evolutions.length > 0 ? (
        <div
          className={`w-full ${
            evolutions.length > 8
              ? "mb-9 overflow-y-auto"
              : evolutions.length > 3
              ? "mb-15"
              : "mb-10"
          } max-w-4xl`}
        >
          <div className="lg:hidden mt-40">
            {evolutions.map((evolution, index) => (
              <div key={evolution.name} className="flex flex-col items-center">
                <motion.div
                  variants={itemVariants}
                  whileHover="hover"
                  className="mb-4"
                >
                  <Link
                    to={`/pokemon/${evolution.name}`}
                    className="group relative flex flex-col items-center"
                  >
                    <div
                      className={`relative w-32 h-32 md:w-40 md:h-40 rounded-3xl p-1.5 ${
                        typeStyle.glow || "bg-blue-500"
                      } bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300 shadow-lg`}
                      style={{
                        background: `radial-gradient(circle at center, ${
                          typeStyle.glow || "#3B82F6"
                        } 0%, transparent 70%)`,
                      }}
                    >
                      <div
                        className={`absolute inset-0 rounded-full ${
                          isDarkMode ? "bg-gray-800/10" : "bg-white/30"
                        } backdrop-blur-md`}
                      ></div>

                      <motion.div
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                        style={{
                          background: `radial-gradient(circle at center, ${
                            typeStyle.glow || "#3B82F6"
                          } 0%, transparent 70%)`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: [0, 0.3, 0],
                          transition: { duration: 3, repeat: Infinity },
                        }}
                      />

                      <div className="relative w-full h-full flex items-center justify-center">
                        <motion.img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.id}.png`}
                          alt={evolution.name}
                          className="w-full h-full object-contain drop-shadow-xl"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: 1,
                            transition: { delay: 0.4 + index * 0.1 },
                          }}
                          whileHover={{ scale: 1.08 }}
                          onLoad={() => setLoading(false)}
                          onError={(e) => {
                            e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.id}.png`;
                            setLoading(false);
                          }}
                        />
                        {loading && <LoadingPlaceholder />}
                      </div>

                      <motion.div
                        className={`absolute -bottom-5 left-1/2 transform -translate-x-1/2 ${
                          isDarkMode
                            ? "bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700"
                            : "bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300"
                        } px-4 py-2 rounded-full border shadow-xl`}
                        style={{
                          boxShadow: `0 4px 15px ${
                            typeStyle.glow || "#3B82F6"
                          }40`,
                        }}
                      >
                        <span
                          className={`font-bold capitalize text-sm whitespace-nowrap tracking-wide ${
                            isDarkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          {evolution.name}
                        </span>
                      </motion.div>

                      <motion.div
                        className={`absolute -top-1 -right-1 ${
                          isDarkMode ? "bg-gray-900" : "bg-gray-100"
                        } ${
                          isDarkMode ? "border-gray-700" : "border-gray-300"
                        } rounded-full w-10 h-10 flex items-center justify-center shadow-lg`}
                        style={{
                          boxShadow: `0 0 10px ${typeStyle.glow || "#3B82F6"}`,
                        }}
                      >
                        {renderPokemonId(evolution.id)}
                      </motion.div>

                      {evolution.min_level && (
                        <motion.div
                          className={`absolute -top-3 -left-3 ${
                            isDarkMode ? "bg-gray-800" : "bg-gray-200"
                          } ${
                            isDarkMode ? "border-gray-600" : "border-gray-400"
                          } rounded-xl px-2 py-1 flex items-center shadow-md`}
                          whileHover={{ scale: 1.1 }}
                        >
                          <RiSwordFill className="text-yellow-400 mr-1" />
                          <span
                            className={`text-xs font-bold ${
                              isDarkMode ? "text-white" : "text-gray-800"
                            }`}
                          >
                            Lv.{evolution.min_level}
                          </span>
                        </motion.div>
                      )}
                    </div>
                  </Link>
                </motion.div>

                {index < evolutions.length - 1 && renderVerticalConnector()}
              </div>
            ))}
          </div>

          <div className="hidden lg:block">
            {evolutionGroups.map((group, groupIndex) => (
              <motion.div
                key={`group-${groupIndex}`}
                variants={rowVariants}
                className="flex justify-center mb-15 last:mb-0"
              >
                {group.map((evolution, index) => (
                  <div key={evolution.name} className="flex items-center">
                    <motion.div variants={itemVariants} whileHover="hover">
                      <Link
                        to={`/pokemon/${evolution.name}`}
                        className="group relative flex flex-col items-center"
                      >
                        <div
                          className={`relative w-32 h-32 md:w-40 md:h-40 rounded-3xl p-1.5 ${
                            typeStyle.glow || "bg-blue-500"
                          } bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300 shadow-lg`}
                          style={{
                            background: `radial-gradient(circle at center, ${
                              typeStyle.glow || "#3B82F6"
                            } 0%, transparent 70%)`,
                          }}
                        >
                          <div
                            className={`absolute inset-0 rounded-full ${
                              isDarkMode ? "bg-gray-800/10" : "bg-white/30"
                            } backdrop-blur-md`}
                          ></div>

                          <motion.div
                            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                            style={{
                              background: `radial-gradient(circle at center, ${
                                typeStyle.glow || "#3B82F6"
                              } 0%, transparent 70%)`,
                            }}
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity: [0, 0.3, 0],
                              transition: { duration: 3, repeat: Infinity },
                            }}
                          />

                          <div className="relative w-full h-full flex items-center justify-center">
                            <motion.img
                              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.id}.png`}
                              alt={evolution.name}
                              className="w-full h-full object-contain drop-shadow-xl"
                              initial={{ opacity: 0 }}
                              animate={{
                                opacity: 1,
                                transition: { delay: 0.4 + index * 0.1 },
                              }}
                              whileHover={{ scale: 1.08 }}
                              onLoad={() => setLoading(false)}
                              onError={(e) => {
                                e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.id}.png`;
                                setLoading(false);
                              }}
                            />
                            {loading && <LoadingPlaceholder />}
                          </div>

                          <motion.div
                            className={`absolute -bottom-5 left-1/2 transform -translate-x-1/2 ${
                              isDarkMode
                                ? "bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700"
                                : "bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300"
                            } px-4 py-2 rounded-full border shadow-xl`}
                            style={{
                              boxShadow: `0 4px 15px ${
                                typeStyle.glow || "#3B82F6"
                              }40`,
                            }}
                          >
                            <span
                              className={`font-bold capitalize text-sm whitespace-nowrap tracking-wide ${
                                isDarkMode ? "text-white" : "text-gray-800"
                              }`}
                            >
                              {evolution.name}
                            </span>
                          </motion.div>

                          <motion.div
                            className={`absolute -top-1 -right-1 ${
                              isDarkMode ? "bg-gray-900" : "bg-gray-100"
                            } ${
                              isDarkMode ? "border-gray-700" : "border-gray-300"
                            } rounded-full w-10 h-10 flex items-center justify-center shadow-lg`}
                            style={{
                              boxShadow: `0 0 10px ${
                                typeStyle.glow || "#3B82F6"
                              }`,
                            }}
                          >
                            {renderPokemonId(evolution.id)}
                          </motion.div>

                          {evolution.min_level && (
                            <motion.div
                              className={`absolute -top-3 -left-3 ${
                                isDarkMode ? "bg-gray-800" : "bg-gray-200"
                              } ${
                                isDarkMode
                                  ? "border-gray-600"
                                  : "border-gray-400"
                              } rounded-xl px-2 py-1 flex items-center shadow-md`}
                              whileHover={{ scale: 1.1 }}
                            >
                              <RiSwordFill className="text-yellow-400 mr-1" />
                              <span
                                className={`text-xs font-bold ${
                                  isDarkMode ? "text-white" : "text-gray-800"
                                }`}
                              >
                                Lv.{evolution.min_level}
                              </span>
                            </motion.div>
                          )}
                        </div>
                      </Link>
                    </motion.div>

                    {index < group.length - 1 && renderEvolutionConnector()}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <motion.div
          variants={itemVariants}
          className="text-center py-8"
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            className={`inline-block ${
              isDarkMode
                ? "bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-gray-700/60"
                : "bg-gradient-to-br from-gray-100/70 to-gray-200/70 border-gray-300/60"
            } rounded-3xl p-10 border-2 shadow-2xl backdrop-blur-lg`}
            style={{
              boxShadow: `0 10px 30px ${typeStyle.glow || "#3B82F6"}20`,
            }}
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                y: [0, -5, 0],
                transition: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <FaQuestionCircle
                className={`w-20 h-20 mx-auto drop-shadow-md ${
                  isDarkMode ? "text-gray-400/80" : "text-gray-600/80"
                }`}
              />
            </motion.div>
            <motion.p
              className={`mt-6 text-xl font-bold tracking-wide ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
              animate={{
                opacity: [0.9, 1, 0.9],
                textShadow: [
                  `0 0 0 ${typeStyle.glow || "#3B82F6"}`,
                  `0 0 10px ${typeStyle.glow || "#3B82F6"}`,
                  `0 0 0 ${typeStyle.glow || "#3B82F6"}`,
                ],
                transition: {
                  duration: 4,
                  repeat: Infinity,
                },
              }}
            >
              This Pokémon does not evolve
            </motion.p>
            <motion.div
              className="mt-4 h-1 w-20 mx-auto rounded-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${
                  typeStyle.glow || "#3B82F6"
                }, transparent)`,
              }}
              animate={{
                opacity: [0.5, 1, 0.5],
                transition: { duration: 3, repeat: Infinity },
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};
motion;
export default EvolutionTab;
