import { useParams } from "react-router-dom";
import { usePokemonByName } from "../hooks/usePokemonByName";
import { TYPE_ICONS, TYPE_STYLES } from "../constants/types";
import { useState, useRef } from "react";
import useTeamStore from "../store/teamStore";
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
  const tabContentRef = useRef(null);


  if (loading)
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );

  if (error)
    return <div className="text-red-500 text-center py-10">Error: {error}</div>;
  if (!pokemon)
    return (
      <div className="text-gray-400 text-center py-10">Pokémon not found</div>
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
    <div className="min-h-full p-4 md:p-8 relative overflow-hidden">
      <div className="relative z-10 flex flex-col md:flex-row gap-8">
        {/* Left panel */}
     <PokemonDetailLeftPanel pokemon={pokemon} typeStyle={typeStyle} addToTeam={addToTeam} />

        {/* Right panel */}
        <div className="w-full md:w-2/3 bg-gray-800/50 rounded-2xl h-[75vh] border border-gray-700/50 backdrop-blur-sm overflow-hidden">
          {/* Animated tab navigation */}
          <div className="flex border-b border-gray-700/50 relative">
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
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.icon} {tab.name}
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

          <div ref={tabContentRef} className="h-[66vh] overflow-y-auto">
            {activeTab === "about" && (
              <AboutTab pokemon={pokemon} typeStyle={typeStyle} />
            )}
            {activeTab === "stats" && (
              <StatsTab pokemon={pokemon} isActive={true} typeStyle={typeStyle} />
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
