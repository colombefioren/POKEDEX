import Pokecard from "./Pokecard";

const Pokemons = ({ data }) => {
  console.log("Full API data:", data);
  if (!data) {
    return (
      <div className="col-span-full text-center py-20">
        <div className="text-white/70 text-lg font-mono">NO POKéMON DATA</div>
        <div className="mt-2 text-red-400/70 text-sm font-mono">
          CHECK CONNECTION...
        </div>
      </div>
    );
  } else if (data.length === 0) {
    return (
      <div className="col-span-full text-center py-20">
        <div className="text-white/70 text-lg font-mono">NO POKéMON FOUND</div>
        <div className="mt-2 text-red-400/70 text-sm font-mono">
          TRY DIFFERENT SEARCH
        </div>
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
