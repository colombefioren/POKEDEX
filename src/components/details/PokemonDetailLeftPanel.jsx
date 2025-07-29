import { useState, useRef } from "react";
import { FaVolumeUp, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { TYPE_ICONS, TYPE_STYLES } from "../../constants/types";
import { getAllPokemonImages } from "../../helpers/pokemonImages";
import { getCardStyle, handleDragEnd } from "../../helpers/cardStack";
import { usePokemonCry } from "../../hooks/usePokemonCry";
import { useThemeStore } from "../../store/themeStore";

const PokemonDetailLeftPanel = ({ pokemon, typeStyle, addToTeam }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { playingCry, playCry } = usePokemonCry();
  const allImages = getAllPokemonImages(pokemon);
  const constraintsRef = useRef(null);
  const { isDarkMode } = useThemeStore();

  return (
    <div className="w-full md:w-1/3 flex flex-col items-center relative">
      <div className="absolute top-0 left-13 z-20 transform -translate-y-1/4">
        <motion.div
          onClick={() => addToTeam(pokemon)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`${typeStyle.bg} w-12 h-12 items-center justify-center cursor-pointer hover:scale-105 rounded-full shadow-lg flex`}
        >
          <FaPlus className="text-white transition-transform transform group-hover:rotate-90" />
        </motion.div>
      </div>

      <div
        className="relative w-full max-w-xs h-[45vh] flex items-center justify-center overflow-visible mt-2"
        ref={constraintsRef}
      >
        {allImages.map((image, index) => {
          const style = getCardStyle(index, activeIndex, allImages.length);
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={index}
              className={`absolute w-full h-full ${
                isActive ? "cursor-grab" : ""
              }`}
              style={{
                zIndex: style.zIndex,
                scale: style.scale,
                y: style.y,
                rotate: style.rotate,
                opacity: style.opacity,
                x: style.x,
              }}
              animate={style}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 0.5,
              }}
              drag={isActive ? "x" : false}
              dragConstraints={constraintsRef}
              onDragEnd={(e, info) =>
                handleDragEnd(
                  info,
                  activeIndex,
                  setActiveIndex,
                  allImages.length
                )
              }
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
                  <img
                    src={
                      image.url ||
                      "https://www.svgrepo.com/show/374881/fallback.svg"
                    }
                    alt={pokemon.name}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="relative mt-15 w-full max-w-md">
        <div className="flex gap-8 items-center justify-center w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-5xl font-bold capitalize text-center pb-2 bg-gradient-to-r from-transparent ${
              isDarkMode ? "via-white/30" : "via-slate-300"
            } to-transparent bg-no-repeat bg-bottom bg-[length:80%_2px] ${
              isDarkMode ? "text-white" : "text-slate-800"
            }`}
          >
            {pokemon.name.split("-").join(" ")}
          </motion.h1>
          {pokemon.cries?.latest && (
            <motion.button
              onClick={() => playCry(pokemon)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-full ${
                isDarkMode ? "bg-white/8" : "bg-white/80"
              } cursor-pointer shadow-xl backdrop-blur-sm ${
                playingCry
                  ? `animate-pulse ring-2 ${
                      isDarkMode ? "ring-white" : "ring-slate-300"
                    }`
                  : ""
              }`}
              title="Play cry"
            >
              <FaVolumeUp
                className={`${
                  isDarkMode ? "text-white" : typeStyle.text
                } text-xl`}
              />
            </motion.button>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-7">
          {pokemon.types.map((type, index) => {
            const typeName = type.toLowerCase();
            const buttonStyle = TYPE_STYLES[typeName] || TYPE_STYLES.default;
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
  );
};
motion;
export default PokemonDetailLeftPanel;
