import { useState, useEffect } from "react";
import { getPokemonList } from "../lib/api/pokemonApi";

export const usePokemonData = (initialLimit = 15) => {
  const [pokeData, setPokeData] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        const { results, count } = await getPokemonList(initialLimit, 0);
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
  }, [initialLimit]);


  const loadMore = async () => {
    if (loadingMore || !hasMore) return;
    
    try {
      setLoadingMore(true);

      const { results } = await getPokemonList(20, offset);
      
      setPokeData(prev => [...prev, ...results]);
      setOffset(prev => prev + 20);
      setHasMore(offset + 20 < totalCount);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingMore(false);
    }
  };

  return {
    pokeData,        
    allPokemon,      
    loading,       
    loadingMore,     
    error,
    hasMore,         
    loadMore         
  };
};