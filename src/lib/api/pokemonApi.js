import { POKE_API } from "../../config/api.js";


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
    return data;
  } catch (error) {
    console.error("Error fetching pokemon data:", error);
    throw error;
  }
};


export const getPokemonByName = async (name) => {
  const response = await fetch(`${POKE_API.BASE_URL}/pokemon/${name}`);
  if (!response.ok) {
    throw new Error(`Pokemon ${name} not found`);
  }
  return await response.json();
};
