import { useState, useEffect } from "react";
import { getPokemonList } from "../lib/api/pokemonApi";
import useCreateStore from "../store/createStore";

export const usePokemonData = (initialLimit = 15) => {
  const [pokeData, setPokeData] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const { customPokemon, getAllPokemonForSearch, setMaxRealPokemonId } =
    useCreateStore();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);

        const { results, count } = await getPokemonList(initialLimit, 0);

        setMaxRealPokemonId(count);

        setPokeData(results);
        setTotalCount(count);
        setOffset(initialLimit);
        setHasMore(initialLimit < count);

        const allResults = await getPokemonList(count, 0);
        setAllPokemon(allResults.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [initialLimit, setMaxRealPokemonId]);

  const getAllPokemonWithCustom = () => {
    return getAllPokemonForSearch(allPokemon);
  };

  const getPokemonByIdentifier = (identifier) => {
    if (typeof identifier === "number" || !isNaN(identifier)) {
      const id = parseInt(identifier);
      const custom = customPokemon.find((p) => p.id === id);
      if (custom) return custom;
    } else {
      const name = identifier.toLowerCase();
      const custom = customPokemon.find(
        (p) =>
          p.name.toLowerCase() === name ||
          p.displayName?.toLowerCase() === name,
      );
      if (custom) return custom;
    }
    return null;
  };

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);

      const { results } = await getPokemonList(20, offset);

      setPokeData((prev) => [...prev, ...results]);
      setOffset((prev) => prev + 20);
      setHasMore(offset + 20 < totalCount);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingMore(false);
    }
  };

  return {
    pokeData,
    allPokemon: getAllPokemonWithCustom(),
    customPokemon, 
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    getPokemonByIdentifier, 
  };
};