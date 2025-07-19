export const fetchPokemonData = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.map(({ pokedexId, name, image }) => ({
      id: pokedexId,
      name,
      image,
    }));
  } catch (error) {
    console.error(`Error fetching pokemon data from ${url}:`, error);
    throw error;
  }
};
