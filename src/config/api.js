export const POKE_API = {
  BASE_URL: "https://pokebuildapi.fr/api/v1",
  ENDPOINTS: {
    POKEMON: "/pokemon",
    POKEMON_LIMIT: (limit) => `/pokemon/limit/${limit}`,
  },
};