import { useState, useEffect } from "react";
import { getCompletePokemonData } from "../lib/api/pokemonApi.js";

export const usePokemonByName = (name) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCompletePokemonData(name.toLowerCase());
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchPokemon();
    }
  }, [name]);

  return { pokemon, loading, error };
};
