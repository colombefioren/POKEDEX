import { useParams, Link } from "react-router-dom";
import { usePokemonByName } from "../hooks/usePokemonByName";
import { TYPE_ICONS, TYPE_STYLES } from "../constants/types";
import { useState } from "react";
import useTeamStore from "../store/teamStore";
import { FaVolumeUp, FaPlus, FaChartBar, FaInfoCircle, FaLeaf, FaRunning, FaShieldAlt } from "react-icons/fa";

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

  if (loading) return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
    </div>
  );

  if (error) return <div className="text-red-500 text-center py-10">Error: {error}</div>;
  if (!pokemon) return <div className="text-gray-400 text-center py-10">Pokémon not found</div>;

  const primaryType = pokemon.types[0]?.toLowerCase() || "default";
  const typeStyle = TYPE_STYLES[primaryType] || TYPE_STYLES.default;

  // Format height and weight
  const heightInMeters = pokemon.height / 10;
  const weightInKg = pokemon.weight / 10;


  // Tabs configuration
  const tabs = [
    { id: "about", name: "About", icon: <FaInfoCircle /> },
    { id: "stats", name: "Stats", icon: <FaChartBar /> },
    { id: "moves", name: "Moves", icon: <FaRunning /> },
    { id: "abilities", name: "Abilities", icon: <FaShieldAlt /> },
    { id: "evolution", name: "Evolution", icon: <FaLeaf /> },
  ];

  return (
    <div className="min-h-full p-4 md:p-8 relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-white blur-3xl"></div>
      </div>

      {/* Header section */}
      <div className="relative z-10 flex flex-col md:flex-row gap-8">
        {/* Left column - Image and basic info */}
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div className="relative w-full aspect-square max-w-xs bg-gray-800/50 rounded-2xl border border-gray-700/50 p-4">
            <div className={`absolute inset-0 rounded-2xl ${typeStyle.bg} opacity-10`}></div>
            <img
              src={pokemon.sprites.other["official-artwork"] || pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-full h-full object-contain drop-shadow-2xl"
            />
            
            {/* Play cry button */}
            {pokemon.cries?.latest && (
              <button 
                onClick={playCry}
                className={`absolute bottom-4 right-4 p-3 rounded-full ${typeStyle.bg} hover:opacity-90 transition-opacity ${playingCry ? 'animate-pulse' : ''}`}
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
              #{pokemon.id.toString().padStart(3, '0')}
            </div>

            <div className="flex justify-center gap-3 mt-4">
              {pokemon.types.map((type, index) => {
                const typeName = type.toLowerCase();
                const buttonStyle = TYPE_STYLES[typeName] || TYPE_STYLES.default;
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

        {/* Right column - Detailed info */}
        <div className="w-full md:w-2/3 bg-gray-800/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm overflow-hidden">
          {/* Tab navigation */}
          <div className="flex border-b border-gray-700/50">
            {tabs.map(tab => (
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

          {/* Tab content */}
          <div className="p-6">
            {/* About tab */}
            {activeTab === "about" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Pokédex Entry</h3>
                  <p className="text-gray-300 italic">
                    {pokemon.species.flavor_text || "No description available"}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Details</h3>
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
                      <span className="text-white">{pokemon.base_experience || '—'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Habitat</span>
                      <span className="text-white capitalize">{pokemon.species.habitat || 'Unknown'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Capture Rate</span>
                      <span className="text-white">{pokemon.species.capture_rate || '—'}</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-white mb-4">Characteristics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                      <div className="text-gray-400 text-sm">Growth Rate</div>
                      <div className="text-white font-medium capitalize mt-1">
                        {pokemon.species.growth_rate?.replace('-', ' ') || '—'}
                      </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                      <div className="text-gray-400 text-sm">Base Happiness</div>
                      <div className="text-white font-medium">{pokemon.species.base_happiness || '—'}</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                      <div className="text-gray-400 text-sm">Legendary</div>
                      <div className="text-white font-medium">
                        {pokemon.species.is_legendary ? 'Yes' : 'No'}
                      </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                      <div className="text-gray-400 text-sm">Mythical</div>
                      <div className="text-white font-medium">
                        {pokemon.species.is_mythical ? 'Yes' : 'No'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stats tab */}
            {activeTab === "stats" && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Base Stats</h3>
                <div className="space-y-3">
                  {pokemon.stats.map(stat => (
                    <div key={stat.name} className="flex items-center">
                      <div className="w-32 text-gray-400 capitalize text-sm">
                        {stat.name.replace('-', ' ')}
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
                  <h3 className="text-lg font-semibold text-white mb-4">Stat Total</h3>
                  <div className="text-3xl font-bold text-white">
                    {pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
                  </div>
                </div>
              </div>
            )}

            {/* Moves tab */}
            {activeTab === "moves" && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Moves ({pokemon.moves.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                  {pokemon.moves.map(move => (
                    <div key={move.name} className="bg-gray-800/50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-white font-medium capitalize">{move.name.replace('-', ' ')}</h4>
                          <div className="text-xs text-gray-400 mt-1">
                            Lv. {move.level_learned_at} • {move.learn_method.replace('-', ' ')}
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          TYPE_STYLES[move.type.toLowerCase()]?.bg || 'bg-gray-600'
                        } text-white`}>
                          {move.type}
                        </span>
                      </div>
                      <div className="mt-2 flex justify-between text-xs text-gray-400">
                        <span>Power: {move.power || '—'}</span>
                        <span>Accuracy: {move.accuracy || '—'}</span>
                        <span>PP: {move.pp || '—'}</span>
                      </div>
                      {move.effect_entries?.length > 0 && (
                        <p className="text-xs text-gray-300 mt-2">
                          {move.effect_entries[0].effect}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Abilities tab */}
            {activeTab === "abilities" && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Abilities</h3>
                <div className="space-y-4">
                  {pokemon.abilities.map(ability => (
                    <div key={ability.name} className="bg-gray-800/50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-white font-medium capitalize">
                          {ability.name.replace('-', ' ')}
                        </h4>
                        {ability.is_hidden && (
                          <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                            Hidden Ability
                          </span>
                        )}
                      </div>
                      <p className="text-gray-300 text-sm mt-2">
                        {/* In a real app, you'd fetch ability details here */}
                        Ability description would appear here...
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Evolution tab */}
            {activeTab === "evolution" && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Evolution Chain</h3>
                {pokemon.species.evolution_chain ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400">Evolution chain data would be displayed here</p>
                    <p className="text-sm text-gray-500 mt-2">
                      (Implementation would require additional API calls to fetch evolution details)
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-400">This Pokémon does not evolve.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Game appearances */}
      <div className="relative z-10 mt-8 bg-gray-800/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Game Appearances</h3>
        <div className="flex flex-wrap gap-2">
          {pokemon.game_indices.length > 0 ? (
            pokemon.game_indices.map(game => (
              <span 
                key={game.version.name}
                className="px-3 py-1 bg-gray-700/50 text-white rounded-full text-sm capitalize"
              >
                {game.version.name.replace('-', ' ')}
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