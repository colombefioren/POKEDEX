import { useEffect, useState } from "react";
import {
  Leaf, // Grass
  Flame, // Fire
  Droplets, // Water
  Zap, // Electric
  Bug, // Bug
  Skull, // Poison
  Mountain, // Rock/Ground
  Bird, // Flying
  Brain, // Psychic
  Ghost, // Ghost
  Sword, // Fighting
  Moon, // Dark
  Snowflake, // Ice
  Gem, // Fairy
  Shield, // Steel
  CircleDot, // Normal
  Sparkles, // Dragon
} from "lucide-react";

const TYPE_TRANSLATION = {
  plante: "grass",
  poison: "poison",
  feu: "fire",
  eau: "water",
  vol: "flying",
  insecte: "bug",
  normal: "normal",
  electrik: "electric",
  électrik: "electric",
  sol: "ground",
  fée: "fairy",
  fee: "fairy",
  combat: "fighting",
  psy: "psychic",
  roche: "rock",
  acier: "steel",
  glace: "ice",
  spectre: "ghost",
  dragon: "dragon",
  ténèbres: "dark",
  tenebres: "dark",
  ombre: "dark",
};

const TYPE_ICONS = {
  normal: <CircleDot className="w-3 h-3" />,
  fire: <Flame className="w-3 h-3" />,
  water: <Droplets className="w-3 h-3" />,
  electric: <Zap className="w-3 h-3" />,
  grass: <Leaf className="w-3 h-3" />,
  ice: <Snowflake className="w-3 h-3" />,
  fighting: <Sword className="w-3 h-3" />,
  poison: <Skull className="w-3 h-3" />,
  ground: <Mountain className="w-3 h-3" />,
  flying: <Bird className="w-3 h-3" />,
  psychic: <Brain className="w-3 h-3" />,
  bug: <Bug className="w-3 h-3" />,
  rock: <Mountain className="w-3 h-3" />,
  ghost: <Ghost className="w-3 h-3" />,
  dragon: <Sparkles className="w-3 h-3" />,
  dark: <Moon className="w-3 h-3" />,
  steel: <Shield className="w-3 h-3" />,
  fairy: <Gem className="w-3 h-3" />,
  default: <CircleDot className="w-3 h-3" />,
};

const TYPE_STYLES = {
  normal: {
    bg: "bg-gray-500",
    glow: "from-gray-500 to-gray-600",
    text: "text-gray-500",
  },
  fire: {
    bg: "bg-orange-500",
    glow: "from-orange-500 to-orange-600",
    text: "text-orange-500",
  },
  water: {
    bg: "bg-blue-500",
    glow: "from-blue-500 to-blue-600",
    text: "text-blue-500",
  },
  electric: {
    bg: "bg-yellow-400",
    glow: "from-yellow-400 to-yellow-500",
    text: "text-yellow-400",
  },
  grass: {
    bg: "bg-green-500",
    glow: "from-green-500 to-green-600",
    text: "text-green-500",
  },
  ice: {
    bg: "bg-cyan-300",
    glow: "from-cyan-300 to-blue-300",
    text: "text-cyan-300",
  },
  fighting: {
    bg: "bg-red-600",
    glow: "from-red-600 to-red-700",
    text: "text-red-600",
  },
  poison: {
    bg: "bg-purple-600",
    glow: "from-purple-600 to-purple-700",
    text: "text-purple-600",
  },
  ground: {
    bg: "bg-amber-600",
    glow: "from-amber-600 to-amber-700",
    text: "text-amber-600",
  },
  flying: {
    bg: "bg-indigo-400",
    glow: "from-indigo-400 to-indigo-500",
    text: "text-indigo-400",
  },
  psychic: {
    bg: "bg-pink-500",
    glow: "from-pink-500 to-pink-600",
    text: "text-pink-500",
  },
  bug: {
    bg: "bg-lime-500",
    glow: "from-lime-500 to-lime-600",
    text: "text-lime-500",
  },
  rock: {
    bg: "bg-stone-500",
    glow: "from-stone-500 to-stone-600",
    text: "text-stone-500",
  },
  ghost: {
    bg: "bg-violet-600",
    glow: "from-violet-600 to-violet-700",
    text: "text-violet-600",
  },
  dragon: {
    bg: "bg-gradient-to-r from-purple-600 to-amber-500",
    glow: "from-purple-600 to-amber-500",
    text: "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-amber-500",
  },
  dark: {
    bg: "bg-gray-800",
    glow: "from-gray-800 to-gray-900",
    text: "text-gray-800",
  },
  steel: {
    bg: "bg-gray-400",
    glow: "from-gray-400 to-gray-500",
    text: "text-gray-400",
  },
  fairy: {
    bg: "bg-pink-300",
    glow: "from-pink-300 to-pink-400",
    text: "text-pink-300",
  },
  default: {
    bg: "bg-gray-700",
    glow: "from-gray-700 to-gray-800",
    text: "text-gray-700",
  },
};

const Pokecard = ({ id, name, image, apiTypes = [] }) => {
  const [primaryType, setPrimaryType] = useState("default");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (apiTypes.length > 0) {
      const firstType = apiTypes[0]?.name?.toLowerCase();
      const translatedType = TYPE_TRANSLATION[firstType] || "default";
      setPrimaryType(translatedType);
    }
  }, [apiTypes]);

  const typeStyle = TYPE_STYLES[primaryType] || TYPE_STYLES.default;

  return (
    <div className="relative h-full bg-gray-900 rounded-xl border-2 border-gray-800 overflow-hidden group hover:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:shadow-[rgba(0,0,0,0.3)]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-9 -left-9 w-32 h-32 rounded-full bg-white opacity-4 group-hover:opacity-5 transition-opacity duration-500"></div>
        <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full bg-white opacity-4 group-hover:opacity-5 transition-opacity duration-700"></div>
      </div>
      <div
        className={`absolute inset-0 bg-gradient-to-br ${typeStyle.glow} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      ></div>

      <div className="px-4 pb-8 pt-5 flex flex-col h-full relative z-10">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-bold text-gray-400">
            #{id?.toString().padStart(3, "0") || "???"}
          </span>
        </div>
        <div className="relative mb-2">
          <h3
            className={`text-center opacity-85 text-xl font-bold text-white mb-1 capitalize tracking-wide 
                         transform group-hover:scale-105 transition-transform duration-300`}
          >
            {name.toUpperCase() || "Unknown"}
          </h3>
        </div>
        <div className="relative flex-1 flex items-center justify-center my-1">
          <div
            className={`absolute inset-2 left-1/2 -translate-x-1/2 w-[55%] bg-gradient-to-b ${typeStyle.glow} opacity-20 blur-3xl 
                       group-hover:opacity-30 group-hover:blur-2xl transition-all duration-500`}
          ></div>
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <img
              src={image}
              alt={name}
              className={`w-full h-full object-contain transition-all duration-500 ${
                isLoaded ? "opacity-100" : "opacity-0"
              } group-hover:scale-110`}
              onLoad={() => setIsLoaded(true)}
            />
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-gray-600 border-t-gray-400"></div>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center gap-3 mt-3">
          {apiTypes.map((type) => {
            const typeName = type?.name?.toLowerCase();
            const translatedType = TYPE_TRANSLATION[typeName] || "default";
            const buttonStyle =
              TYPE_STYLES[translatedType] || TYPE_STYLES.default;
            const Icon = TYPE_ICONS[translatedType] || TYPE_ICONS.default;

            return (
              <span
                key={typeName}
                className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md ${buttonStyle.bg} text-white 
                            shadow-md hover:shadow-lg duration-200
                            transform hover:scale-105 transition-all`}
              >
                {Icon}
                {type?.name || "???"}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Pokecard;
