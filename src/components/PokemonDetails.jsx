const PokemonDetails = ({ pokemon }) => {
  return (
    <>
      <div>{pokemon.name}</div>
      <div>{pokemon.id}</div>
    </>
  );
};
export default PokemonDetails;
