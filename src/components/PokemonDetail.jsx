import { useParams } from "react-router-dom";
import { usePokemonByName } from "../hooks/usePokemonByName";
import { TYPE_TRANSLATION, TYPE_ICONS, TYPE_STYLES } from "../constants/types";

const PokemonDetail = () => {
  const { name } = useParams();
  const { pokemon, loading, error } = usePokemonByName(name);

  if (loading)
    return (
      <div className="flex items-center justify-center h-full">
        className=
        {`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
          pokemon
            ? TYPE_STYLES[
                TYPE_TRANSLATION[pokemon.apiTypes[0]?.name?.toLowerCase()]
              ]?.border || "border-orange-500"
            : "border-orange-500"
        }`}
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center py-10">Erreur: {error}</div>
    );
  if (!pokemon)
    return (
      <div className="text-gray-400 text-center py-10">
        Aucun Pokémon sélectionné
      </div>
    );

  const primaryType = pokemon.apiTypes[0]?.name?.toLowerCase();
  const translatedType = TYPE_TRANSLATION[primaryType] || "default";
  const typeStyle = TYPE_STYLES[translatedType] || TYPE_STYLES.default;

  const resistances = pokemon.apiResistances.filter((r) =>
    r.damage_relation.includes("resistant")
  );
  const faiblesses = pokemon.apiResistances.filter(
    (r) => r.damage_relation === "vulnerable"
  );

  return (
    <div className="h-full p-6 bg-[#0d0d14] text-white font-sans overflow-y-auto">
      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
        {/* LEFT SIDE - STATS */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className={`border-l-4 ${typeStyle.border} pl-4`}>
            <h1 className="text-4xl font-bold tracking-wide">{pokemon.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              {pokemon.apiTypes.map((type, index) => {
                const typeKey =
                  TYPE_TRANSLATION[type.name.toLowerCase()] || "default";
                const icon = TYPE_ICONS[typeKey];
                return (
                  <span
                    key={index}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${TYPE_STYLES[typeKey]?.bg} bg-opacity-20`}
                  >
                    {icon}
                    <span className="ml-1">{type.name}</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* STATS */}
          <div className="space-y-3">
            <h3 className={`text-lg font-semibold ${typeStyle.text}`}>
              Statistiques
            </h3>
            {Object.entries(pokemon.stats).map(([key, val]) => (
              <div key={key} className="grid grid-cols-12 gap-2 items-center">
                <span className="col-span-4 text-sm capitalize text-gray-300">
                  {key.replace("_", " ")}
                </span>
                <div className="col-span-6 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${typeStyle.bg}`}
                    style={{ width: `${val <= 100 ? val : 100}%` }}
                  ></div>
                </div>
                <span className="col-span-2 text-right text-sm font-mono">
                  {val}
                </span>
              </div>
            ))}
          </div>

          {/* EVOLUTION */}
          {pokemon.apiEvolutions.length > 0 && (
            <div>
              <h3 className={`text-lg font-semibold ${typeStyle.text} mb-2`}>
                Évolution
              </h3>
              <div className="flex items-center gap-2">
                {pokemon.apiEvolutions.map((evo, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                      <span className="text-xs text-gray-400">
                        #{evo.pokedexId}
                      </span>
                    </div>
                    <span className="text-sm mt-1">{evo.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CENTER - POKEMON IMAGE */}
        <div className="relative flex-shrink-0 w-64 h-64 lg:w-96 lg:h-96">
          <div className="absolute inset-0 rounded-full border-2 border-white/10 animate-pulse"></div>
          <div className="absolute inset-4 rounded-full border border-white/5"></div>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="relative z-10 w-full h-full object-contain animate-float"
          />
        </div>

        {/* RIGHT SIDE - BATTLE INFO */}
        <div className="w-full lg:w-1/3 space-y-6">
          {/* RESISTANCES */}
          <div>
            <h3 className={`text-lg font-semibold ${typeStyle.text} mb-2`}>
              Résistances
            </h3>
            <div className="flex flex-wrap gap-2">
              {resistances.map((res, index) => {
                const typeKey =
                  TYPE_TRANSLATION[res.name.toLowerCase()] || "default";
                return (
                  <span
                    key={index}
                    className={`inline-flex items-center px-2 py-1 rounded text-xs ${TYPE_STYLES[typeKey]?.text} bg-gray-800 bg-opacity-50`}
                  >
                    {TYPE_ICONS[typeKey]}
                    <span className="ml-1">
                      {res.name} ({res.damage_multiplier}x)
                    </span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* FAIBLESSES */}
          <div>
            <h3 className={`text-lg font-semibold ${typeStyle.text} mb-2`}>
              Faiblesses
            </h3>
            <div className="flex flex-wrap gap-2">
              {faiblesses.map((weak, index) => {
                const typeKey =
                  TYPE_TRANSLATION[weak.name.toLowerCase()] || "default";
                return (
                  <span
                    key={index}
                    className={`inline-flex items-center px-2 py-1 rounded text-xs ${TYPE_STYLES[typeKey]?.text} bg-gray-800 bg-opacity-50`}
                  >
                    {TYPE_ICONS[typeKey]}
                    <span className="ml-1">
                      {weak.name} ({weak.damage_multiplier}x)
                    </span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* TALENTS */}
          {pokemon.apiResistancesWithAbilities?.length > 0 && (
            <div>
              <h3 className={`text-lg font-semibold ${typeStyle.text} mb-2`}>
                Talents
              </h3>
              <div className="flex flex-wrap gap-2">
                {pokemon.apiResistancesWithAbilities.map((ability, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 rounded text-xs bg-gray-800 bg-opacity-50 text-gray-300"
                  >
                    {ability}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
