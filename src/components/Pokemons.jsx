import Pokecard from "./Pokecard";

const Pokemons = ({ data }) => {
  if (!data) {
    return (
      <div className="col-span-full text-center py-20">
        <div className="text-white/70 text-lg font-mono">NO POKéMON DATA</div>
        <div className="mt-2 text-red-400/70 text-sm font-mono">
          CHECK CONNECTION...
        </div>
      </div>
    );
  }

  if (Array.isArray(data) && data.length === 0) {
    return (
      <div className="col-span-full text-center py-20">
        <div className="text-white/70 text-lg font-mono">NO POKéMON FOUND</div>
        <div className="mt-2 text-red-400/70 text-sm font-mono">
          TRY DIFFERENT SEARCH
        </div>
      </div>
    );
  }

  if (!Array.isArray(data)) {
    return (
      <div className="col-span-full text-center py-20">
        <div className="text-white/70 text-lg font-mono">
          INVALID DATA FORMAT
        </div>
      </div>
    );
  }
  return (
    <>
      {data.map((pokemon) => (
        <div key={`${pokemon.id}-${pokemon.name}`} className="h-full">
          <Pokecard
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            types={pokemon.types}
          />
        </div>
      ))}
    </>
  );
};

export default Pokemons;
