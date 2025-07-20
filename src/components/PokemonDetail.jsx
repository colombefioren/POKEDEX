import { useParams } from "react-router-dom";
import { usePokemonByName } from "../hooks/usePokemonByName";
const PokemonDetail = () => {
  const { name } = useParams();
  const { pokemon, loading, error } = usePokemonByName(name);

  if (loading) return <div>Loading Pokémon data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pokemon) return <div>No Pokémon selected</div>;

  return (
    <div className="pokemon-detail">
      <h2 className="text-white">{pokemon.name}</h2>
      <img src={pokemon.image} alt={pokemon.name} />
    </div>
  );
};

export default PokemonDetail;
