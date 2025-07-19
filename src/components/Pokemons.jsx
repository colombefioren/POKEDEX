import Pokecard from "./Pokecard";

const Pokemons = ({ data }) => {
    if(!data){
        return <div>No pokemon to display yet</div>
    }
 else if (data.length === 0) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <>
        {data.map((pokemon, index) => (
          <div key={index}>
            <Pokecard
              id={pokemon.id}
              image={pokemon.image}
              Pokename={pokemon.name}
            />
          </div>
        ))}
      </>
    );
  }
};
export default Pokemons;
