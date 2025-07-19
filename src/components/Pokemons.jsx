import Pokecard from "./Pokecard";

const Pokemons = ({ data }) => {
  console.log("Full API data:", data);
  if (!data) {
    return (
      <div className="col-span-full text-center py-20">
        <div className="text-white/70 text-lg">No Pokémon to display yet</div>
        <div className="mt-2 text-white/40 text-sm">
          Waiting for Pokédex data...
        </div>
      </div>
    );
  } else if (data.length === 0) {
    return (
      <div className="col-span-full text-center py-20">
        <div className="text-white/70 text-lg">No Pokémon found</div>
        <div className="mt-2 text-white/40 text-sm">Try a different search</div>
      </div>
    );
  } else {
    return (
      <>
        {data.map((pokemon) => (
          <div key={pokemon.id} className="h-full">
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

export default Pokemons;
