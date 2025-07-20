import Pokecard from "./Pokecard";

const PokemonTeam = ({ pokemonList }) => {
  if (pokemonList.length === 0) {
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
  } else {
    return (
      <>
        {pokemonList.map((pokemon) => (
          <div key={pokemon.name} className="h-full">
            <Pokecard
              id={pokemon.pokedexId}
              name={pokemon.name}
              image={pokemon.image}
              apiTypes={pokemon.apiTypes}
              stats={pokemon.stats}
              apiResistances={pokemon.apiResistances}
              apiEvolutions={pokemon.apiEvolutions}
            />
          </div>
        ))}
      </>
    );
  }
};

export default PokemonTeam;
