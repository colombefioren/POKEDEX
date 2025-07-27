import { useState, useRef } from "react";
import { FaVolumeUp, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { TYPE_ICONS, TYPE_STYLES } from "../../constants/types";
import { getAllPokemonImages } from "../../helpers/pokemonImages";
import { getCardStyle, handleDragEnd } from "../../helpers/cardStack";
import { usePokemonCry } from "../../hooks/usePokemonCry";

const PokemonDetailLeftPanel = ({ pokemon, typeStyle, addToTeam }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { playingCry, playCry } = usePokemonCry();
  const allImages = getAllPokemonImages(pokemon);
  const constraintsRef = useRef(null);

  return (
    <div className="w-full md:w-1/3 flex flex-col items-center relative">
      <div className="absolute -top-6 -left-6 z-20">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`relative ${typeStyle.bg} w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm"></div>
          <span className="text-3xl font-bold text-white drop-shadow-lg">
            {pokemon.id.toString().padStart(3, "0")}
          </span>
        </motion.div>
      </div>

      <div
        className="relative w-full max-w-xs h-[45vh] flex items-center justify-center overflow-visible"
        ref={constraintsRef}
      >
        {allImages.map((image, index) => {
          const style = getCardStyle(index, activeIndex, allImages.length);
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={index}
              className={`absolute w-full h-full ${
                isActive ? "cursor-grab active:" : ""
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
                className={`w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 border-2 ${typeStyle.border} p-1 rounded-3xl overflow-hidden shadow-xl`}
              >
                <div className="relative w-full h-full overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-10"></div>
                  <img
                    src={image.url}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}

        {pokemon.cries?.latest && (
          <motion.button
            onClick={() => playCry(pokemon)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`absolute -bottom-4 right-4 z-30 p-4 rounded-full ${
              typeStyle.bg
            } shadow-xl hover:shadow-2xl transition-all ${
              playingCry ? "animate-pulse" : ""
            }`}
            title="Play cry"
          >
            <FaVolumeUp className="text-white text-xl" />
          </motion.button>
        )}
      </div>

      <div className="relative mt-12 text-center w-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-bold text-white capitalize relative inline-block"
        >
          {pokemon.name}
          <span className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full bg-gradient-to-r from-transparent via-white to-transparent"></span>
        </motion.h1>

        <div className="flex justify-center gap-3 mt-6 relative z-10">
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
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${buttonStyle.bg} text-white font-medium text-sm shadow-lg hover:shadow-xl`}
              >
                {Icon} {type.toUpperCase()}
              </motion.span>
            );
          })}
        </div>

        <motion.button
          onClick={() => addToTeam(pokemon)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative mt-8 px-8 py-3 rounded-full ${typeStyle.bg} text-white font-bold flex items-center gap-2 transition-all shadow-xl`}
        >
          <span className="relative z-10 flex items-center gap-2">
            <FaPlus /> Add to Team
          </span>
          <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 hover:opacity-100 transition-opacity"></span>
        </motion.button>
      </div>
    </div>
  );
};
motion;
export default PokemonDetailLeftPanel;
