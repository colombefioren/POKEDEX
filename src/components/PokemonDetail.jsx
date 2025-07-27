import { useParams } from "react-router-dom";
import { usePokemonByName } from "../hooks/usePokemonByName";
import { TYPE_ICONS, TYPE_STYLES } from "../constants/types";
import { useState } from "react";
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
import AboutTab from "./tabs/AboutTab";
import StatsTab from "./tabs/StatsTab";
import MovesTab from "./tabs/MovesTab";
import AbilitiesTab from "./tabs/AbilitiesTab";
import EvolutionTab from "./tabs/EvolutionTab";

const PokemonDetail = () => {
  const { name } = useParams();
  const { pokemon, loading, error } = usePokemonByName(name);
  const [activeTab, setActiveTab] = useState("about");
  const [playingCry, setPlayingCry] = useState(false);
  const { addToTeam } = useTeamStore();

  const playCry = () => {
    if (pokemon?.cries?.latest) {
      const audio = new Audio(pokemon.cries.latest);
      audio.play();
      setPlayingCry(true);
      audio.onended = () => setPlayingCry(false);
    }
  };

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
    <div className="min-h-full p-4 md:p-8 relative overflow-hidden bg-gray-950">
      <div className="absolute inset-0 opacity-20"></div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8">
        {/* left */}
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div className="relative w-full aspect-square max-w-xs bg-gray-800/50 rounded-2xl border border-gray-700/50 p-4">
            <div
              className={`absolute inset-0 rounded-2xl ${typeStyle.bg} opacity-10`}
            ></div>
            <img
              src={
                pokemon.sprites.other["official-artwork"] ||
                pokemon.sprites.front_default
              }
              alt={pokemon.name}
              className="w-full h-full object-contain drop-shadow-2xl"
            />

            {pokemon.cries?.latest && (
              <button
                onClick={playCry}
                className={`absolute bottom-4 right-4 p-3 rounded-full ${
                  typeStyle.bg
                } hover:opacity-90 transition-opacity ${
                  playingCry ? "animate-pulse" : ""
                }`}
                title="Play Pokémon cry"
              >
                <FaVolumeUp className="text-white" />
              </button>
            )}
          </div>

          <div className="mt-6 text-center">
            <h1 className="text-4xl font-bold text-white capitalize">
              {pokemon.name}
            </h1>
            <div className="text-2xl font-mono text-gray-400 mt-1">
              #{pokemon.id.toString().padStart(3, "0")}
            </div>

            <div className="flex justify-center gap-3 mt-4">
              {pokemon.types.map((type, index) => {
                const typeName = type.toLowerCase();
                const buttonStyle =
                  TYPE_STYLES[typeName] || TYPE_STYLES.default;
                const Icon = TYPE_ICONS[typeName] || TYPE_ICONS.default;

                return (
                  <span
                    key={index}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full ${buttonStyle.bg} text-white font-medium text-sm`}
                  >
                    {Icon} {type.toUpperCase()}
                  </span>
                );
              })}
            </div>

            <button
              onClick={() => addToTeam(pokemon)}
              className={`mt-6 px-6 py-3 rounded-full ${typeStyle.bg} hover:opacity-90 text-white font-medium flex items-center gap-2 transition-opacity`}
            >
              <FaPlus /> Add to Team
            </button>
          </div>
        </div>

        {/*ritht */}
        <div className="w-full md:w-2/3 bg-gray-800/30 rounded-2xl h-[75vh] border border-gray-700/50 backdrop-blur-sm overflow-hidden">
          <div className="flex border-b border-gray-700/50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 cursor-pointer flex items-center justify-center gap-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? `${typeStyle.bg} text-white`
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.icon} {tab.name}
              </button>
            ))}
          </div>

          {activeTab === "about" && (
            <div className="flex h-[66vh] items-center justify-center">
              <div className="px-4 py-1 w-full overflow-y-scroll">
                <AboutTab pokemon={pokemon} typeStyle={typeStyle} />
              </div>
            </div>
          )}
          <div className="w-full h-full">
            {activeTab === "stats" && (
              <StatsTab
                pokemon={pokemon}
                typeStyle={typeStyle}
                isActive={activeTab === "stats"}
              />
            )}
            {activeTab === "moves" && (
              <MovesTab pokemon={pokemon} typeStyle={typeStyle} />
            )}
            {activeTab === "abilities" && (
              <AbilitiesTab pokemon={pokemon} typeStyle={typeStyle} />
            )}
            <div className="w-full h-full">
              {activeTab === "evolution" && (
                <EvolutionTab pokemon={pokemon} typeStyle={typeStyle} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
