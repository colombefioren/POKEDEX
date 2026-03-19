import { useState, useEffect } from "react";
import { getCompletePokemonData } from "../lib/api/pokemonApi.js";
import useCreateStore from "../store/createStore";

export const usePokemonByName = (name) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { customPokemon } = useCreateStore();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        setError(null);

        const custom = customPokemon.find(
          (p) =>
            p.name.toLowerCase() === name.toLowerCase() ||
            p.displayName?.toLowerCase() === name.toLowerCase() ||
            p.id.toString() === name,
        );

        if (custom) {
          setPokemon({ ...custom, isCustom: true });
          setLoading(false);
          return;
        }

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
  }, [name, customPokemon]);

  return { pokemon, loading, error };
};
