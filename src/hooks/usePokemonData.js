import { useEffect, useState } from "react";
import { fetchPokemonData } from "../lib/api/pokemonApi";
import { POKE_API } from "../config/api";

export const usePokemonData = () => {
  const [pokeData, setPokeData] = useState([]);
  const [allPokeData, setAllPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [initialData, allData] = await Promise.all([
          fetchPokemonData(
            `${POKE_API.BASE_URL}${POKE_API.ENDPOINTS.POKEMON_LIMIT(54)}`
          ),
          fetchPokemonData(
            `${POKE_API.BASE_URL}${POKE_API.ENDPOINTS.POKEMON}`
          ),
        ]);

        setPokeData(initialData);
        setAllPokeData(allData);
      } catch (err) {
        setError(err);
        console.error("Failed to fetch pokemon data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { pokeData, allPokeData, loading, error };
};