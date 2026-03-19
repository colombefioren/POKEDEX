import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useThemeStore } from "../store/themeStore";
import useCreateStore from "../store/createStore";
import useTeamStore from "../store/teamStore";
import { TYPE_ICONS, TYPE_STYLES } from "../constants/types";
import {
  FaDragon,
  FaRuler,
  FaWeight,
  FaStar,
  FaMagic,
  FaCalendar,
  FaTag,
  FaQuoteRight,
  FaPlus,
} from "react-icons/fa";

const PokemonCustomDetail = () => {
  const { name } = useParams();
  const { isDarkMode } = useThemeStore();
  const { customPokemon } = useCreateStore();
  const { addToTeam } = useTeamStore();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const constraintsRef = useRef(null);

  useEffect(() => {
    const found = customPokemon.find(
      (p) =>
        p.name.toLowerCase() === name.toLowerCase() ||
        p.displayName?.toLowerCase() === name.toLowerCase() ||
        p.id.toString() === name,
    );

    setPokemon(found);
    setLoading(false);
  }, [name, customPokemon]);

  const handleAddToTeam = () => {
    if (pokemon) {
      const teamPokemon = {
        id: pokemon.id,
        name: pokemon.name,
        displayName: pokemon.displayName,
        sprites: {
          other: {
            "official-artwork": {
              front_default: pokemon.image,
            },
          },
        },
        types: pokemon.types,
        isCustom: true,
        image: pokemon.image,
      };
      addToTeam(teamPokemon);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div
          className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
            isDarkMode
              ? "border-stone-600 border-t-stone-400"
              : "border-slate-300 border-t-slate-500"
          }`}
        />
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div
        className={`text-center py-10 ${
          isDarkMode ? "text-gray-400" : "text-slate-500"
        }`}
      >
        Pokémon not found
      </div>
    );
  }

  const primaryType = pokemon.types[0] || "default";
  const typeStyle = TYPE_STYLES[primaryType] || TYPE_STYLES.default;
  const bgClass = isDarkMode
    ? "bg-gradient-to-br from-gray-900/70 to-gray-800/60 border-gray-700/40"
    : "bg-white/90 border-slate-200/80";
  const textClass = isDarkMode ? "text-white" : "text-slate-600";
  const secondaryTextClass = isDarkMode ? "text-gray-300" : "text-slate-600";

  const renderCustomBadge = () => {
    return (
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`
          absolute -top-8 left-1/2 -translate-x-1/2 z-[9999]
          py-3 px-8 rounded-full whitespace-nowrap
          flex items-center gap-3 border-2
          ${
            isDarkMode
              ? "bg-green-900/90 border-green-400/50 text-green-100 backdrop-blur-md"
              : "bg-green-400/90 border-white/70 text-gray-900 backdrop-blur-md"
          }
          shadow-[0_15px_35px_-5px_rgba(34,197,94,0.5)]
          text-sm font-black tracking-wider
          hover:scale-110 hover:-translate-y-3
          transition-all duration-300
        `}
        style={{
          textShadow: isDarkMode
            ? "0 2px 4px rgba(0,0,0,0.3)"
            : "0 1px 2px rgba(255,255,255,0.3)",
        }}
        whileHover={{ scale: 1.1, y: -10 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaDragon
          className={`text-base ${isDarkMode ? "text-green-300" : "text-gray-900"}`}
        />
        <span className="font-black tracking-widest">CUSTOM POKÉMON</span>
      </motion.div>
    );
  };

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full overflow-y-auto"
    >
      {renderCustomBadge()}

      <div className="max-w-6xl mx-auto p-8 pt-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col md:flex-row gap-12 items-start"
        >
          <div className="w-full md:w-1/3 flex flex-col items-center relative">
            <div
              className="relative w-full max-w-xs h-[45vh] flex items-center justify-center overflow-visible mt-8"
              ref={constraintsRef}
            >
              {" "}
              <div className="absolute -top-2 -left-6 z-50 transform -translate-y-1/4">
                <motion.div
                  onClick={handleAddToTeam}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`${typeStyle.bg} w-12 h-12 items-center justify-center cursor-pointer hover:scale-105 rounded-full shadow-lg flex`}
                >
                  <FaPlus className="text-white transition-transform transform group-hover:rotate-90" />
                </motion.div>
              </div>
              <motion.div
                className="absolute w-full h-full cursor-grab"
                style={{
                  zIndex: 30,
                }}
                animate={{
                  scale: 1,
                  y: 0,
                  x: 0,
                  rotate: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 0.5,
                }}
                drag
                dragConstraints={constraintsRef}
                dragElastic={0.1}
              >
                <div
                  className={`w-full h-full ${
                    isDarkMode ? "bg-gray-900" : "bg-white"
                  } border-3 ${
                    typeStyle.border
                  } rounded-3xl overflow-hidden shadow-2xl p-1`}
                >
                  <div className="relative w-full h-full overflow-hidden rounded-2xl">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${
                        isDarkMode ? "from-white/5" : "from-white/20"
                      } to-transparent z-10`}
                    ></div>
                    {pokemon.image ? (
                      <img
                        src={pokemon.image}
                        alt={pokemon.displayName || pokemon.name}
                        className="w-full h-full object-contain p-4"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaDragon
                          className={`text-8xl ${
                            isDarkMode ? "text-gray-700" : "text-slate-300"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="relative mt-8 w-full max-w-md">
              <div className="flex gap-4 items-center justify-center w-full">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`text-4xl md:text-5xl font-bold capitalize text-center pb-2 bg-gradient-to-r from-transparent ${
                    isDarkMode ? "via-white/30" : "via-slate-300"
                  } to-transparent bg-no-repeat bg-bottom bg-[length:80%_2px] ${
                    isDarkMode ? "text-white" : "text-slate-600"
                  }`}
                >
                  {pokemon.displayName || pokemon.name.split("-").join(" ")}
                </motion.h1>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-7">
                {pokemon.types.map((type, index) => {
                  const typeName = type.toLowerCase();
                  const buttonStyle =
                    TYPE_STYLES[typeName] || TYPE_STYLES.default;
                  const Icon = TYPE_ICONS[typeName] || TYPE_ICONS.default;

                  return (
                    <motion.span
                      key={index}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-lg ${buttonStyle.bg} text-white font-medium text-[12px] shadow-lg`}
                    >
                      <span className="text-base">{Icon}</span>
                      {type.toUpperCase()}
                    </motion.span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4 px-8 w-full">
            <motion.div
              variants={itemVariants}
              className={`relative rounded-xl p-5 border ${bgClass} shadow-sm`}
            >
              <div className="flex items-center gap-2 mb-3">
                <FaQuoteRight
                  className={`${
                    isDarkMode ? "text-green-400" : "text-green-500"
                  } text-lg`}
                />
                <h3 className={`text-lg font-bold ${textClass}`}>About</h3>
                <div
                  className={`h-px flex-1 bg-gradient-to-r ${
                    isDarkMode ? "from-green-400/30" : "from-green-300/80"
                  } to-transparent ml-2`}
                ></div>
              </div>
              {pokemon.description ? (
                <p className={`text-sm leading-relaxed ${secondaryTextClass}`}>
                  "{pokemon.description}"
                </p>
              ) : (
                <p className={`text-sm italic ${secondaryTextClass}`}>
                  No description provided for this custom Pokémon.
                </p>
              )}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className={`rounded-xl p-5 border ${bgClass} shadow-sm`}
            >
              <div className="flex items-center gap-2 mb-3">
                <FaStar
                  className={`${
                    isDarkMode ? "text-yellow-400" : "text-amber-500"
                  } text-lg`}
                />
                <h3 className={`text-lg font-bold ${textClass}`}>Details</h3>
                <div
                  className={`h-px flex-1 bg-gradient-to-r ${
                    isDarkMode ? "from-yellow-400/30" : "from-amber-300/80"
                  } to-transparent ml-2`}
                ></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    icon: (
                      <FaTag
                        className={
                          isDarkMode ? "text-blue-400" : "text-blue-500"
                        }
                      />
                    ),
                    label: "Pokédex",
                    value: `#${pokemon.id.toString().padStart(4, "0")}`,
                    color: isDarkMode
                      ? "from-blue-500/20 to-blue-500/5"
                      : "from-blue-100 to-blue-50",
                  },
                  {
                    icon: (
                      <FaDragon
                        className={
                          isDarkMode ? "text-purple-400" : "text-purple-500"
                        }
                      />
                    ),
                    label: "Type",
                    value: pokemon.types
                      .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
                      .join(" / "),
                    color: isDarkMode
                      ? "from-purple-500/20 to-purple-500/5"
                      : "from-purple-100 to-purple-50",
                  },
                  {
                    icon: (
                      <FaRuler
                        className={
                          isDarkMode ? "text-green-400" : "text-emerald-500"
                        }
                      />
                    ),
                    label: "Height",
                    value: pokemon.height ? `${pokemon.height / 10}m` : "—",
                    color: isDarkMode
                      ? "from-green-500/20 to-green-500/5"
                      : "from-green-100 to-green-50",
                  },
                  {
                    icon: (
                      <FaWeight
                        className={
                          isDarkMode ? "text-orange-400" : "text-orange-500"
                        }
                      />
                    ),
                    label: "Weight",
                    value: pokemon.weight ? `${pokemon.weight / 10}kg` : "—",
                    color: isDarkMode
                      ? "from-orange-500/20 to-orange-500/5"
                      : "from-orange-100 to-orange-50",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className={`bg-gradient-to-br ${item.color} rounded-lg p-3 border ${
                      isDarkMode ? "border-gray-700/30" : "border-slate-200/80"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm">{item.icon}</span>
                      <span
                        className={`text-xs font-medium ${secondaryTextClass}`}
                      >
                        {item.label}
                      </span>
                    </div>
                    <div className={`font-bold text-sm pl-6 ${textClass}`}>
                      {item.value}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {pokemon.createdAt && (
              <motion.div
                variants={itemVariants}
                className={`rounded-xl p-5 border ${bgClass} shadow-sm`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <FaCalendar
                    className={`${
                      isDarkMode ? "text-pink-400" : "text-rose-500"
                    } text-lg`}
                  />
                  <h3 className={`text-lg font-bold ${textClass}`}>Creation</h3>
                  <div
                    className={`h-px flex-1 bg-gradient-to-r ${
                      isDarkMode ? "from-pink-400/30" : "from-rose-300/80"
                    } to-transparent ml-2`}
                  ></div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${isDarkMode ? "bg-gray-800" : "bg-slate-100"}`}
                  >
                    <FaMagic
                      className={isDarkMode ? "text-pink-400" : "text-rose-500"}
                    />
                  </div>
                  <div>
                    <div className={`text-sm font-medium ${textClass}`}>
                      {new Date(pokemon.createdAt).toLocaleDateString(
                        undefined,
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </div>
                    <div className={`text-xs ${secondaryTextClass}`}>
                      at {new Date(pokemon.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PokemonCustomDetail;
