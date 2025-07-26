import { useParams, Link } from "react-router-dom";
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
import evolutionChain from "../helpers/evolutionChain";
import { fetchAbilityDetails } from "../helpers/abilityDetails";
import AbilityCard from "./AbilityCard";
import AbilityModal from "./AbilityModal";
import MoveCard from "../components/MoveCard";
import MoveModal from "../components/MoveModal";
import { fetchMoveDetails } from "../helpers/moveDetails";
const PokemonDetail = () => {
  const { name } = useParams();
  const { pokemon, loading, error } = usePokemonByName(name);
  const [activeTab, setActiveTab] = useState("about");
  const [playingCry, setPlayingCry] = useState(false);
  const { addToTeam } = useTeamStore();
  const [abilityModal, setAbilityModal] = useState({
    isOpen: false,
    ability: null,
    details: null,
    isLoading: false,
    isHidden: false,
  });
  const [moveModal, setMoveModal] = useState({
    isOpen: false,
    move: null,
    details: null,
    isLoading: false,
  });

  const handleOpenMoveModal = async (move) => {
    setMoveModal({
      isOpen: true,
      move: move.name || "unknown",
      details: null,
      isLoading: true,
    });

    try {
      const details = await fetchMoveDetails(move.url);
      setMoveModal((prev) => ({
        ...prev,
        details,
        isLoading: false,
      }));
    } catch (error) {
      console.error(error);
      setMoveModal((prev) => ({
        ...prev,
        details: {
          name: move.name || "unknown",
          effect: "Error loading details",
          type: move.type || "unknown",
          power: "—",
          accuracy: "—",
          pp: "—",
          damageClass: "—",
          generation: "—",
        },
        isLoading: false,
      }));
    }
  };

  const handleCloseMoveModal = () => {
    setMoveModal({
      isOpen: false,
      move: null,
      details: null,
      isLoading: false,
    });
  };

  const handleOpenAbilityModal = async (ability) => {
    setAbilityModal({
      isOpen: true,
      ability: ability.name || "unknown",
      details: null,
      isLoading: true,
      isHidden: ability.is_hidden || false,
    });
    try {
      const details = await fetchAbilityDetails(ability.url);
      setAbilityModal((prev) => ({
        ...prev,
        details,
        isLoading: false,
      }));
    } catch (error) {
      console.error(error);
      setAbilityModal((prev) => ({
        ...prev,
        details: {
          name: ability.name || "unknown",
          effect: "Error loading details",
          shortEffect: "Try again later",
          generation: "—",
        },
        isLoading: false,
      }));
    }
  };

  const handleCloseAbilityModal = () => {
    setAbilityModal({
      isOpen: false,
      ability: null,
      details: null,
      isLoading: false,
      isHidden: false,
    });
  };
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

  const heightInMeters = pokemon.height / 10;
  const weightInKg = pokemon.weight / 10;

  const tabs = [
    { id: "about", name: "About", icon: <FaInfoCircle /> },
    { id: "stats", name: "Stats", icon: <FaChartBar /> },
    { id: "moves", name: "Moves", icon: <FaRunning /> },
    { id: "abilities", name: "Abilities", icon: <FaShieldAlt /> },
    { id: "evolution", name: "Evolution", icon: <FaLeaf /> },
  ];

  return (
    <div className="min-h-full p-4 md:p-8 relative overflow-hidden bg-gray-950">
      <div className="absolute inset-0 opacity-20">
        {/* <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white blur-3xl"></div> */}
        {/* <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-white blur-3xl"></div> */}
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8">
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

        <div className="w-full md:w-2/3 bg-gray-800/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm overflow-hidden">
          <div className="flex border-b border-gray-700/50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 flex items-center justify-center gap-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? `${typeStyle.bg} text-white`
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.icon} {tab.name}
              </button>
            ))}
          </div>

          <div className="p-6 h-full">
            {/* About tab */}
            {activeTab === "about" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Pokédex Entry
                  </h3>
                  <p className="text-gray-300 italic">
                    {pokemon.species.flavor_text || "No description available"}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Height</span>
                      <span className="text-white">{heightInMeters} m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Weight</span>
                      <span className="text-white">{weightInKg} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Base Experience</span>
                      <span className="text-white">
                        {pokemon.base_experience || "—"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Habitat</span>
                      <span className="text-white capitalize">
                        {pokemon.species.habitat || "Unknown"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Capture Rate</span>
                      <span className="text-white">
                        {pokemon.species.capture_rate || "—"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Characteristics
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                      <div className="text-gray-400 text-sm">Growth Rate</div>
                      <div className="text-white font-medium capitalize mt-1">
                        {pokemon.species.growth_rate?.replace("-", " ") || "—"}
                      </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                      <div className="text-gray-400 text-sm">
                        Base Happiness
                      </div>
                      <div className="text-white font-medium">
                        {pokemon.species.base_happiness || "—"}
                      </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                      <div className="text-gray-400 text-sm">Legendary</div>
                      <div className="text-white font-medium">
                        {pokemon.species.is_legendary ? "Yes" : "No"}
                      </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                      <div className="text-gray-400 text-sm">Mythical</div>
                      <div className="text-white font-medium">
                        {pokemon.species.is_mythical ? "Yes" : "No"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stats tab */}
            {activeTab === "stats" && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Base Stats
                </h3>
                <div className="space-y-3">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.name} className="flex items-center">
                      <div className="w-32 text-gray-400 capitalize text-sm">
                        {stat.name.replace("-", " ")}
                      </div>
                      <div className="w-12 text-white text-right mr-2">
                        {stat.base_stat}
                      </div>
                      <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${typeStyle.bg} rounded-full`}
                          style={{ width: `${Math.min(stat.base_stat, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Stat Total
                  </h3>
                  <div className="text-3xl font-bold text-white">
                    {pokemon.stats.reduce(
                      (sum, stat) => sum + stat.base_stat,
                      0
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Moves tab */}
            {activeTab === "moves" && (
              <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-6 text-center bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Pokémon Moves
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto p-2">
                  {pokemon.moves.map((move, index) => (
                    <MoveCard
                      key={`${move.name}-${index}`}
                      move={move}
                      typeStyle={typeStyle}
                      onClick={() => handleOpenMoveModal(move)}
                    />
                  ))}
                </div>

                {moveModal.isOpen && (
                  <MoveModal
                    moveDetails={moveModal.details}
                    isLoading={moveModal.isLoading}
                    onClose={handleCloseMoveModal}
                    typeStyle={typeStyle}
                  />
                )}
              </div>
            )}

            {/* Ability tab */}

            {activeTab === "abilities" && (
              <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-6 text-center bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Pokémon Abilities
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pokemon.abilities.map((ability, index) => (
                    <AbilityCard
                      key={`${ability.name}-${index}`}
                      ability={ability}
                      typeStyle={typeStyle}
                      onClick={() => handleOpenAbilityModal(ability)}
                    />
                  ))}
                </div>

                {abilityModal.isOpen && (
                  <AbilityModal
                    abilityDetails={abilityModal.details}
                    isLoading={abilityModal.isLoading}
                    onClose={handleCloseAbilityModal}
                    typeStyle={typeStyle}
                    isHidden={abilityModal.isHidden}
                  />
                )}
              </div>
            )}

            {/* Evolution tab */}
            {activeTab === "evolution" && (
              <div className="relative flex justify-center items-center h-full">
                {pokemon.species.evolution_chain ? (
                  <div className="flex justify-center items-center mb-25">
                    <div className="flex items-center justify-center">
                      {evolutionChain(pokemon.species.evolution_chain).map(
                        (evolution, index, array) => (
                          <div
                            key={evolution.name}
                            className="flex items-center"
                          >
                            <Link
                              to={`/pokemon/${evolution.name}`}
                              className="group relative flex flex-col items-center transition-all duration-300 hover:scale-105 hover:z-10"
                            >
                              <div
                                className={`relative w-28 h-28 md:w-36 md:h-36 rounded-full p-1 ${typeStyle.glow} bg-opacity-20 group-hover:bg-opacity-40 transition-all`}
                              >
                                <div className="absolute inset-0 rounded-full bg-gray-900/80 backdrop-blur-sm"></div>
                                <div className="relative w-full h-full flex items-center justify-center">
                                  <img
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.id}.png`}
                                    alt={evolution.name}
                                    className="w-full h-full object-contain drop-shadow-xl"
                                    onError={(e) => {
                                      e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.id}.png`;
                                    }}
                                  />
                                </div>
                                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900/90 px-3 py-1 rounded-full border border-gray-700">
                                  <span className="text-white font-medium capitalize text-sm">
                                    {evolution.name}
                                  </span>
                                </div>
                                <div className="absolute -top-0 -right-0 bg-gray-900 border border-gray-700 rounded-full w-8 h-8 flex items-center justify-center">
                                  <span className="text-xs text-gray-300">
                                    #{evolution.id.toString().padStart(3, "0")}
                                  </span>
                                </div>
                              </div>
                            </Link>

                            {index < array.length - 1 && (
                              <div className="relative mx-2 md:mx-5">
                                <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="inline-block bg-gray-800/50 rounded-full p-6 border border-gray-700/50">
                      <svg
                        className="w-12 h-12 mx-auto text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="mt-2 text-gray-400">
                        This Pokémon does not evolve
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-8 bg-gray-800/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Game Appearances
        </h3>
        <div className="flex flex-wrap gap-2">
          {pokemon.game_indices.length > 0 ? (
            pokemon.game_indices.map((game) => (
              <span
                key={game.version.name}
                className="px-3 py-1 bg-gray-700/50 text-white rounded-full text-sm capitalize"
              >
                {game.version.name.replace("-", " ")}
              </span>
            ))
          ) : (
            <p className="text-gray-400">No game data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
