import { useState, useEffect } from "react";
import { getPokemonList } from "../lib/api/pokemonApi";

export const usePokemonData = (limit = 20, offset = 0) => {
  const [pokeData, setPokeData] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]); 
  const [allPokeCount, setAllPokeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { results, count } = await getPokemonList(limit, offset);
        setPokeData(results);
        setAllPokeCount(count);

        if (allPokemon.length === 0) {
          const allResults = await getPokemonList(count, 0);
          setAllPokemon(allResults.results);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [allPokemon.length, limit, offset]);

  return {
    pokeData,
    allPokemon, 
    allPokeCount,
    loading,
    error,
    hasMore: pokeData.length < allPokeCount,
  };
};
