import {
  Leaf,
  Flame,
  Droplets,
  Zap,
  Bug,
  Skull,
  Mountain,
  Bird,
  Brain,
  Ghost,
  Sword,
  Moon,
  Snowflake,
  Gem,
  Shield,
  CircleDot,
  Sparkles,
} from "lucide-react";

export const TYPE_ICONS = {
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

export const TYPE_STYLES = {
  normal: {
    bg: "bg-stone-600/40",
    glow: "from-gray-500 to-gray-600",
    text: "text-stone-400",
    border: "border-stone-600/40",
    progress: "bg-stone-500/80",
  },
  fire: {
    bg: "bg-orange-600/30",
    glow: "from-orange-500 to-orange-600",
    text: "text-orange-400",
    border: "border-orange-600/30",
    progress: "bg-orange-500/70",
  },
  water: {
    bg: "bg-blue-600/50",
    glow: "from-blue-500 to-blue-600",
    text: "text-blue-400",
    border: "border-blue-600/50",
    progress: "bg-blue-500/80",
  },
  electric: {
    bg: "bg-amber-500/30",
    glow: "from-yellow-400 to-yellow-500",
    text: "text-amber-400",
    border: "border-amber-500/30",
    progress: "bg-amber-400/70",
  },
  grass: {
    bg: "bg-green-600/40",
    glow: "from-green-500 to-green-600",
    text: "text-green-400",
    border: "border-green-600/40",
    progress: "bg-green-500/80",
  },
  ice: {
    bg: "bg-cyan-500/50",
    glow: "from-cyan-300 to-blue-300",
    text: "text-cyan-300",
    border: "border-cyan-500/50",
    progress: "bg-cyan-400/80",
  },
  fighting: {
    bg: "bg-rose-700/30",
    glow: "from-red-600 to-red-700",
    text: "text-rose-500",
    border: "border-rose-700/30",
    progress: "bg-rose-600/70",
  },
  poison: {
    bg: "bg-purple-700/50",
    glow: "from-purple-600 to-purple-700",
    text: "text-purple-500",
    border: "border-purple-700/50",
    progress: "bg-purple-600/80",
  },
  ground: {
    bg: "bg-amber-700/30",
    glow: "from-amber-600 to-amber-700",
    text: "text-amber-500",
    border: "border-amber-700/30",
    progress: "bg-amber-600/70",
  },
  flying: {
    bg: "bg-indigo-500/50",
    glow: "from-indigo-400 to-indigo-500",
    text: "text-indigo-300",
    border: "border-indigo-500/50",
    progress: "bg-indigo-400/80",
  },
  psychic: {
    bg: "bg-pink-600/30",
    glow: "from-pink-500 to-pink-600",
    text: "text-pink-400",
    border: "border-pink-600/30",
    progress: "bg-pink-500/70",
  },
  bug: {
    bg: "bg-lime-600/40",
    glow: "from-lime-500 to-lime-600",
    text: "text-lime-400",
    border: "border-lime-600/40",
    progress: "bg-lime-500/80",
  },
  rock: {
    bg: "bg-stone-600/40",
    glow: "from-stone-500 to-stone-600",
    text: "text-stone-400",
    border: "border-stone-600/40",
    progress: "bg-stone-500/80",
  },
  ghost: {
    bg: "bg-violet-700/50",
    glow: "from-violet-600 to-violet-700",
    text: "text-violet-500",
    border: "border-violet-700/50",
    progress: "bg-violet-600/80",
  },
  dragon: {
    bg: "bg-gradient-to-r from-purple-700/50 to-amber-600/30",
    glow: "from-purple-600 to-amber-500",
    text: "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-amber-400",
    border: "border-purple-700/50",
    progress: "bg-gradient-to-r from-purple-500/80 to-amber-400/70",
  },
  dark: {
    bg: "bg-gray-800/50",
    glow: "from-gray-800 to-gray-900",
    text: "text-gray-600",
    border: "border-gray-800/50",
    progress: "bg-gray-700/80",
  },
  steel: {
    bg: "bg-gray-500/50",
    glow: "from-gray-400 to-gray-500",
    text: "text-gray-300",
    border: "border-gray-500/50",
    progress: "bg-gray-400/80",
  },
  fairy: {
    bg: "bg-pink-400/30",
    glow: "from-pink-300 to-pink-400",
    text: "text-pink-300",
    border: "border-pink-400/30",
    progress: "bg-pink-300/70",
  },
  default: {
    bg: "bg-gray-700/50",
    glow: "from-gray-700 to-gray-800",
    text: "text-gray-500",
    border: "border-gray-700/50",
    progress: "bg-gray-600/80",
  },
};
