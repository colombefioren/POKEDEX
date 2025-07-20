import { useParams } from "react-router-dom";
import { usePokemonByName } from "../hooks/usePokemonByName";
import { TYPE_TRANSLATION, TYPE_ICONS, TYPE_STYLES } from "../constants/types";

const PokemonDetail = () => {
  const { name } = useParams();
  const { pokemon, loading, error } = usePokemonByName(name);

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
    <div className="min-h-full text-white p-4 md:p-8 relative overflow-hidden">
      {/* name */}
      <div className="absolute top-6 left-6 z-20">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wider flex items-center gap-3">
          {pokemon.name.toUpperCase()}
          <div className="flex items-center gap-2">
            {pokemonTypes.map((type, index) => (
              <span key={index} className="text-sm flex items-center gap-1">
                <span className={`${type.style.text}`}>{type.icon}</span>
                {type.name.toUpperCase()}
              </span>
            ))}
          </div>
        </h1>
      </div>

      {/* image*/}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div
          className={`absolute w-64 h-64 md:w-80 md:h-80 rounded-full ${typeStyle.bg} opacity-20 blur-xl`}
        ></div>
        <div
          className={`absolute w-64 h-64 md:w-80 md:h-80 rounded-full border-4 ${typeStyle.bg} border-opacity-30`}
        ></div>
        <div className="absolute w-72 h-72 md:w-88 md:h-88 rounded-full border-2 border-white border-opacity-10"></div>
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="relative z-30 w-56 h-56 md:w-72 md:h-72 object-contain"
        />
      </div>

      {/* info */}
      <div
        className={`absolute bottom-6 right-6 bg-[#1a1a23] rounded-xl p-6 w-full max-w-md border-l-4 ${typeStyle.bg} z-20`}
      >
        <div className="grid grid-cols-2 gap-4">
          {/* stat */}
          <div className="space-y-3">
            <h3
              className={`text-sm font-semibold ${typeStyle.text} tracking-wider`}
            >
              STATS
            </h3>
            {Object.entries(pokemon.stats).map(([key, val]) => (
              <div key={key} className="flex items-center gap-2">
                <span className="w-20 text-xs capitalize text-white/70">
                  {key.replace("_", " ")}
                </span>
                <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${typeStyle.bg}`}
                    style={{ width: `${Math.min(val, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* battle info */}
          <div className="space-y-3">
            <h3
              className={`text-sm font-semibold ${typeStyle.text} tracking-wider`}
            >
              BATTLE
            </h3>
            <div className="space-y-2">
              <div>
                <h4 className="text-xs text-white/70">Strengths</h4>
                <p className="text-xs text-white/90">
                  {battleInfo.strengths.join(", ") || "None"}
                </p>
              </div>
              <div>
                <h4 className="text-xs text-white/70">Weaknesses</h4>
                <p className="text-xs text-white/90">
                  {battleInfo.weaknesses.join(", ") || "None"}
                </p>
              </div>
              <div>
                <h4 className="text-xs text-white/70">Evolutions</h4>
                <p className="text-xs text-white/90">
                  {pokemon.apiEvolutions.length > 0
                    ? `${pokemon.apiEvolutions.length} available`
                    : "None"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-6">
          {pokemon.apiEvolutions.length > 0 && (
            <button
              className={`flex-1 ${typeStyle.bg} hover:opacity-90 text-white px-4 py-2 rounded-lg text-sm transition`}
            >
              View Evolution
            </button>
          )}
          <button
            className={`flex-1 bg-white/10 hover:bg-white/20 border ${typeStyle.text} border-white/10 px-4 py-2 rounded-lg text-sm transition`}
          >
            Add to Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
