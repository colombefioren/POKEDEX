export const POKE_API = {
  BASE_URL: "https://pokeapi.co/api/v2",
  ENDPOINTS: {
    POKEMON: "/pokemon",
    POKEMON_SPECIES: "/pokemon-species",
    POKEMON_LIMIT: (limit, offset) =>
      `/pokemon?limit=${limit}&offset=${offset}`,
    POKEMON_BY_NAME: (name) => `/pokemon/${name}`,
    POKEMON_SPECIES_BY_NAME: (name) => `/pokemon-species/${name}`,
  },
};
