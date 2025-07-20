import { useParams, useLocation, Link } from "react-router-dom";
import { usePokemonByName } from "../hooks/usePokemonByName";
import { TYPE_TRANSLATION, TYPE_ICONS, TYPE_STYLES } from "../constants/types";
import { useState, useEffect } from "react";
import Pokecard from "./Pokecard";
import { getPokemonByName } from "../lib/api/pokemonApi";
const PokemonDetail = () => {
  const { name } = useParams();
  const { state } = useLocation();
  const { pokemon, loading, error } = usePokemonByName(name);
  const [activeTab, setActiveTab] = useState(state?.activeTab || "description");
  const [evolutionChain, setEvolutionChain] = useState([]);

  useEffect(() => {
    const fetchCompleteEvolutionChain = async () => {
      if (!pokemon) return;

      try {
        const fetchPreEvolutions = async (currentPokemon, chain = []) => {
          if (
            currentPokemon.apiPreEvolution &&
            currentPokemon.apiPreEvolution !== "none"
          ) {
            try {
              const preEvo = await getPokemonByName(
                currentPokemon.apiPreEvolution.name
              );
              if (preEvo) {
                chain.unshift({
                  name: preEvo.name,
                  pokedexId: preEvo.pokedexId,
                  image: preEvo.image,
                  apiTypes: preEvo.apiTypes || [],
                });
                return fetchPreEvolutions(preEvo, chain);
              }
            } catch (error) {
              console.error("Failed to fetch pre-evolution:", error);
            }
          }
          return chain;
        };

        const fetchEvolutions = async (currentPokemon, chain = []) => {
          if (
            currentPokemon.apiEvolutions &&
            currentPokemon.apiEvolutions.length > 0
          ) {
            for (const evo of currentPokemon.apiEvolutions) {
              try {
                const evolution = await getPokemonByName(evo.name);
                if (evolution) {
                  chain.push({
                    name: evolution.name,
                    pokedexId: evolution.pokedexId,
                    image: evolution.image,
                    apiTypes: evolution.apiTypes || [],
                  });
                  await fetchEvolutions(evolution, chain);
                }
              } catch (error) {
                console.error("Failed to fetch evolution:", error);
              }
            }
          }
          return chain;
        };

        let chain = [
          {
            name: pokemon.name,
            pokedexId: pokemon.pokedexId,
            image: pokemon.image,
            apiTypes: pokemon.apiTypes,
          },
        ];

        const preEvolutions = await fetchPreEvolutions(pokemon);
        chain = [...preEvolutions, ...chain];

        const evolutions = await fetchEvolutions(pokemon);
        chain = [...chain, ...evolutions];

        const uniqueChain = chain.reduce((acc, current) => {
          const x = acc.find((item) => item.pokedexId === current.pokedexId);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);

        setEvolutionChain(uniqueChain);
      } catch (error) {
        console.error("Error building evolution chain:", error);
      }
    };

    fetchCompleteEvolutionChain();
  }, [pokemon]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center py-10">Error: {error}</div>;
  if (!pokemon)
    return (
      <div className="text-gray-400 text-center py-10">No Pokémon selected</div>
    );

  const pokemonTypes = pokemon.apiTypes.map((type) => {
    const typeName = type.name.toLowerCase();
    const translatedType = TYPE_TRANSLATION[typeName] || "default";
    return {
      name: type.name,
      translatedType,
      style: TYPE_STYLES[translatedType] || TYPE_STYLES.default,
      icon: TYPE_ICONS[translatedType] || TYPE_ICONS.default,
    };
  });

  const primaryType = pokemonTypes[0]?.translatedType || "default";
  const typeStyle = TYPE_STYLES[primaryType] || TYPE_STYLES.default;

  const battleInfo = {
    strengths: pokemon.apiResistances
      .filter((r) => r.damage_relation.includes("resistant"))
      .map((r) => r.name),
    weaknesses: pokemon.apiResistances
      .filter((r) => r.damage_relation === "vulnerable")
      .map((r) => r.name),
  };

  return (
    <div className="min-h-full p-4 md:p-8 relative overflow-hidden">
      {/* tab navigation */}
      <div className="absolute top-10 right-10 z-20">
        <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/10">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-4 py-2 text-sm rounded-full transition-all ${
              activeTab === "description"
                ? `${typeStyle.bg} text-white font-medium`
                : "text-white/70 hover:text-white/90"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("evolution")}
            className={`px-4 py-2 text-sm rounded-full transition-all ${
              activeTab === "evolution"
                ? `${typeStyle.bg} text-white font-medium`
                : "text-white/70 hover:text-white/90"
            }`}
          >
            Evolution
          </button>
        </div>
      </div>

      {/* name and types */}
      <div className="absolute top-10 left-10 z-20">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wider text-white/90">
          {pokemon.name.toUpperCase()}
        </h1>
        <div className="flex items-center gap-2 mt-2">
          {pokemonTypes.map((type, index) => (
            <span
              key={index}
              className={`text-xs flex items-center gap-2 px-3 py-1 rounded-full ${type.style.bg} ${type.style.text}`}
            >
              {type.icon} {type.name.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* content based on active tab */}
      {activeTab === "description" && (
        <>
          <div className="absolute inset-0 -translate-y-15 flex items-center justify-center z-10">
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`absolute w-64 h-64 md:w-80 md:h-80 rounded-full opacity-30 ${typeStyle.bg} blur-xl`}
              ></div>
              <div
                className={`absolute w-72 h-72 md:w-96 md:h-96 rounded-full border-2 ${typeStyle.border} opacity-45`}
              ></div>
            </div>

            {/* image */}
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="relative z-30 w-56 h-56 md:w-[400px] md:h-[400px] object-contain drop-shadow-lg"
            />
          </div>

          {/* bottom left */}
          <div className={`absolute bottom-35 left-3 w-96 z-20`}>
            <div className="space-y-1 flex flex-col">
              {Object.entries(pokemon.stats).map(([key, val]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className="w-96 text-white/90 px-2 py-1">
                    <div className="flex justify-end gap-3">
                      <span className="capitalize font-medium">
                        {key.replace("_", " ").toUpperCase()}:
                      </span>
                      <span>{val}</span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden">
                    <div
                      className={`h-full ${typeStyle.progress} rounded-full`}
                      style={{ width: `${Math.min(val, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* bottom right */}
          <div
            className={`absolute bottom-10 right-15 rounded-xl p-5 w-72 z-20`}
          >
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-medium text-white/90 mb-3 tracking-wider">
                  SPÉCIALITÉS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {battleInfo.strengths.length > 0 ? (
                    battleInfo.strengths.map((strength, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-white/10 text-white/90 rounded-full border border-white/5"
                      >
                        {strength}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-white/40 italic">—</span>
                  )}
                </div>
              </div>

              <div className="h-px bg-white/15"></div>

              <div>
                <h4 className="text-xs font-medium text-white/90 mb-3 tracking-wider">
                  FAIBLESSES
                </h4>
                <div className="flex flex-wrap gap-2">
                  {battleInfo.weaknesses.length > 0 ? (
                    battleInfo.weaknesses.map((weakness, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-white/10 text-white/90 rounded-full border border-white/5"
                      >
                        {weakness}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-white/40 italic">—</span>
                  )}
                </div>
              </div>

              <div className="h-px bg-white/15"></div>

              <div>
                <h4 className="text-xs font-medium text-white/90 mb-3 tracking-wider">
                  EVOLUTION
                </h4>
                <p className="text-sm text-white/90 font-light">
                  {pokemon.apiEvolutions.length > 0
                    ? `${pokemon.apiEvolutions.length} evolution(s)`
                    : "None"}
                </p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 flex gap-4">
            <button
              className={`px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium shadow-lg transition flex items-center gap-2 ${typeStyle.text}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clipRule="evenodd"
                />
              </svg>
              Add to Team
            </button>
          </div>
        </>
      )}

      {activeTab === "evolution" && (
        <div className="absolute top-30 left-1/2 transform -translate-x-1/2 z-20">
          (
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {evolutionChain.map((pokemon, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                className="w-56"
                  onClick={() => setActiveTab("description")}
                >
                  <Pokecard
                    id={pokemon.pokedexId}
                    name={pokemon.name}
                    image={pokemon.image}
                    apiTypes={pokemon.apiTypes}
                  />
                </div>
                {index < evolutionChain.length - 1 && (
                  <div className="my-4 text-white/50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 5l7 7-7 7M5 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
          )
        </div>
      )}

    
    </div>
  );
};

export default PokemonDetail;
