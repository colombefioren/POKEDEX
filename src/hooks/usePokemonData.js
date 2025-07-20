import { useState, useEffect } from "react";
import { getPokemonList } from "../lib/api/pokemonApi";

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
          getPokemonList(15),
          getPokemonList(),
        ]);
        setPokeData(initialData);
        setAllPokeData(allData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { pokeData, allPokeData, loading, error };
};
