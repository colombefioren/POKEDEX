import { useParams } from "react-router-dom";
import { usePokemonByName } from "../hooks/usePokemonByName";
import { TYPE_ICONS, TYPE_STYLES } from "../constants/types";
import { useState, useRef } from "react";
import useTeamStore from "../store/teamStore";
import { useThemeStore } from "../store/themeStore";
import {
  FaVolumeUp,
  FaPlus,
  FaChartBar,
  FaInfoCircle,
  FaLeaf,
  FaRunning,
  FaShieldAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AboutTab from "./tabs/AboutTab";
import StatsTab from "./tabs/StatsTab";
import MovesTab from "./tabs/MovesTab";
import AbilitiesTab from "./tabs/AbilitiesTab";
import EvolutionTab from "./tabs/EvolutionTab";
import PokemonDetailLeftPanel from "./details/PokemonDetailLeftPanel";

const PokemonDetail = () => {
  const { name } = useParams();
  const { pokemon, loading, error } = usePokemonByName(name);
  const [activeTab, setActiveTab] = useState("about");
  const { addToTeam } = useTeamStore();
  const { isDarkMode } = useThemeStore();
  const tabContentRef = useRef(null);

  if (loading)
    return (
      <div className={`flex justify-center items-center h-full`}>
        <div
          className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2`}
        ></div>
      </div>
    );

  if (error)
    return (
      <div
        className={`text-center py-10 ${
          isDarkMode ? "text-red-500" : "text-rose-600"
        }`}
      >
        Error: {error}
      </div>
    );
  if (!pokemon)
    return (
      <div
        className={`text-center py-10 ${
          isDarkMode ? "text-gray-400" : "text-slate-500"
        }`}
      >
        Pokémon not found
      </div>
    );

  const primaryType = pokemon.types[0]?.toLowerCase() || "default";
  const typeStyle = TYPE_STYLES[primaryType] || TYPE_STYLES.default;

  const tabs = [
    { id: "about", name: "About", icon: <FaInfoCircle /> },
    { id: "stats", name: "Stats", icon: <FaChartBar /> },
    { id: "moves", name: "Moves", icon: <FaRunning /> },
    { id: "abilities", name: "Abilities", icon: <FaShieldAlt /> },
    { id: "evolution", name: "Evolution", icon: <FaLeaf /> },
  ];

  return (
    <div className={`min-h-full px-4 pb-10 md:p-8 relative overflow-hidden`}>
      <div className="relative sm:mt-6 mt-10 z-10 flex flex-col md:flex-row gap-8">
        {/* Left panel */}
        <PokemonDetailLeftPanel
          pokemon={pokemon}
          typeStyle={typeStyle}
          addToTeam={addToTeam}
        />

        {/* Right panel */}
        <div
          className={`w-full md:w-2/3 ${
            isDarkMode
              ? "bg-gray-800/50 border-gray-700/50"
              : "bg-white/90 border-slate-200/70"
          } rounded-2xl h-[75vh] border backdrop-blur-sm overflow-hidden shadow-lg`}
        >
          {/* Animated tab navigation */}
          <div
            className={`flex ${
              isDarkMode
                ? "border-b border-gray-700/50"
                : "border-b border-slate-200/70"
            } relative`}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tabContentRef.current) {
                    tabContentRef.current.scrollTop = 0;
                  }
                }}
                className={`flex-1 py-3 cursor-pointer flex items-center justify-center gap-2 font-medium transition-colors relative z-10 ${
                  activeTab === tab.id
                    ? isDarkMode
                      ? "text-white"
                      : "text-slate-600"
                    : isDarkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.name}</span>
              </button>
            ))}
            <motion.div
              layoutId="activeTabIndicator"
              className={`absolute bottom-0 h-1 ${typeStyle.bg}`}
              style={{
                width: `${100 / tabs.length}%`,
                left: `${
                  tabs.findIndex((tab) => tab.id === activeTab) *
                  (100 / tabs.length)
                }%`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>

          {activeTab === "about" && (
            <div ref={tabContentRef} className="h-[66vh] overflow-y-auto my-auto flex items-center">
              <AboutTab pokemon={pokemon} typeStyle={typeStyle} />
            </div>
          )}
          <div ref={tabContentRef} className="h-[66vh] overflow-y-auto">
            {activeTab === "stats" && (
              <StatsTab
                pokemon={pokemon}
                isActive={true}
                typeStyle={typeStyle}
              />
            )}
            {activeTab === "moves" && (
              <MovesTab pokemon={pokemon} typeStyle={typeStyle} />
            )}
            {activeTab === "abilities" && (
              <AbilitiesTab pokemon={pokemon} typeStyle={typeStyle} />
            )}
            {activeTab === "evolution" && (
              <EvolutionTab pokemon={pokemon} typeStyle={typeStyle} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
motion;
export default PokemonDetail;
