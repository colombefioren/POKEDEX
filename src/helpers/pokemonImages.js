export const getAllPokemonImages = (pokemon) => {
  if (!pokemon.sprites) return [];
  const images = [];

  if (pokemon.sprites.other?.["official-artwork"]) {
    images.push({
      url: pokemon.sprites.other["official-artwork"],
      label: "Official Artwork",
    });
  }
  if (pokemon.sprites.dream) {
    images.push({ url: pokemon.sprites.dream.dream, label: "Dream World" });
  }
  if (pokemon.sprites.home) {
    images.push({ url: pokemon.sprites.home.home, label: "Home Back" });
  }

  return images;
};
