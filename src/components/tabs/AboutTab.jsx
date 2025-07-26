import { motion } from "framer-motion";
import {
  FaRuler,
  FaWeight,
  FaStar,
  FaMagic,
  FaLeaf,
  FaMountain,
  FaHeart,
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
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
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
        <div className="flex items-center gap-2 mb-3">
          <FaMagic className="text-blue-400 text-lg" />
          <h3 className="text-lg font-bold text-white">Pokédex</h3>
        </div>
        <p className="text-gray-300 text-sm italic leading-tight min-h-[60px]">
          {pokemon.species.flavor_text || "No description available"}
        </p>

        <div className="absolute -z-10 inset-0 overflow-hidden">
          {[...Array(4)].map((_, i) => (
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
        <div className="flex items-center gap-2 mb-3">
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
        <div className="flex items-center gap-2 mb-3">
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
  );
};
motion
export default AboutTab;
