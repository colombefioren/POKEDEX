import { POKE_API } from "../config/api";

export const getPokemonList = async (limit = null) => {
  const url = limit
    ? `${POKE_API.BASE_URL}${POKE_API.ENDPOINTS.POKEMON_LIMIT(limit)}`
    : `${POKE_API.BASE_URL}${POKE_API.ENDPOINTS.POKEMON}`;

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
    console.error("Error fetching pokemon data:", error);
    throw error;
  }
};
