import useTeamStore from "../store/teamStore";
import Pokecard from "./Pokecard";

const PokemonTeam = () => {
  const { team, removeFromTeam } = useTeamStore();

  const handleRemove = (e, pokedexId) => {
    e.stopPropagation();
    e.preventDefault();
    removeFromTeam(pokedexId);
  };

  if (team.length === 0) {
    return (
      <div className="col-span-full text-center py-20">
        <div className="text-white/70 text-lg font-mono">
          YOUR TEAM IS EMPTY
        </div>
        <div className="mt-2 text-red-400/70 text-sm font-mono">
          BROWSE POKEMONS AND ADD THEM TO YOUR TEAM
        </div>
      </div>
    );
  }
  return (
    <div className="flex-1 overflow-y-auto px-10 py-8 sm:px-20 sm:pb-8 h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {team.map((pokemon) => (
          <div key={pokemon.id} className="relative group">
            <Pokecard
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.other["official-artwork"]}
              types={pokemon.types}
            />
            <button
              onClick={(e) => handleRemove(e, pokemon.id)}
              className="absolute z-10 top-2 right-2 cursor-pointer bg-red-500/80 hover:bg-red-600/90 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonTeam;
