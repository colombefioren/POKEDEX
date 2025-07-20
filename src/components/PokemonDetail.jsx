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
    <div className="min-h-full p-4 md:p-8 relative overflow-hidden">
      <div className="absolute top-8 left-8 z-20">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wider text-white/90">
          {pokemon.name.toUpperCase()}
        </h1>
        <div className="flex items-center gap-2 mt-2">
          {pokemonTypes.map((type, index) => (
            <span
              key={index}
              className={`text-xs flex items-center gap-1 px-3 py-1 rounded-full ${type.style.bg} ${type.style.text}`}
            >
              {type.icon} {type.name.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`absolute w-64 h-64 md:w-80 md:h-80 rounded-full opacity-30 ${typeStyle.bg} blur-xl`}
          ></div>
          <div
            className={`absolute w-72 h-72 md:w-96 md:h-96 rounded-full border-2 ${typeStyle.border} opacity-45`}
          ></div>
        </div>

        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="relative z-30 w-56 h-56 md:w-[400px] md:h-[400px] object-contain drop-shadow-lg"
        />
      </div>

      <div className={`absolute bottom-25 left-2 w-96 z-20`}>
        <div className="space-y-1 flex flex-col">
          {Object.entries(pokemon.stats).map(([key, val]) => (
            <div key={key} className="flex items-center gap-2">
              <div className="w-96 text-white/90 px-2 py-1">
                <div className="flex justify-end gap-3">
                  <span className="capitalize">
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

      <div
        className={`absolute bottom-6 right-6 rounded-2xl p-6 w-80 bg-gray-900/80 backdrop-blur-sm border-l-4 ${typeStyle.border} z-20 shadow-xl`}
      >
        <h3
          className={`text-lg font-bold ${typeStyle.text} tracking-wider mb-4 flex items-center gap-2`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
              clipRule="evenodd"
            />
          </svg>
          BATTLE INFO
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-white/80 mb-1">
              Strengths
            </h4>
            <div className="flex flex-wrap gap-1">
              {battleInfo.strengths.length > 0 ? (
                battleInfo.strengths.map((strength, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 bg-green-900/30 text-green-300 rounded"
                  >
                    {strength}
                  </span>
                ))
              ) : (
                <span className="text-xs text-white/50">None</span>
              )}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-white/80 mb-1">
              Weaknesses
            </h4>
            <div className="flex flex-wrap gap-1">
              {battleInfo.weaknesses.length > 0 ? (
                battleInfo.weaknesses.map((weakness, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 bg-red-900/30 text-red-300 rounded"
                  >
                    {weakness}
                  </span>
                ))
              ) : (
                <span className="text-xs text-white/50">None</span>
              )}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-white/80 mb-1">
              Evolutions
            </h4>
            <p className="text-sm text-white/90">
              {pokemon.apiEvolutions.length > 0
                ? `${pokemon.apiEvolutions.length} available`
                : "None"}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 flex gap-4">
        {pokemon.apiEvolutions.length > 0 && (
          <button
            className={`px-6 py-3 rounded-full ${typeStyle.bg} hover:opacity-90 text-white font-medium shadow-lg transition flex items-center gap-2`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            View Evolution
          </button>
        )}
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
    </div>
  );
};

export default PokemonDetail;
