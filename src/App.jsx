import { useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import Pokemons from "./components/Pokemons";
import Search from "./components/Search";
import { usePokemonData } from "./hooks/usePokemonData";
import PokedexShell from "./components/PokedexShell";
import PokemonTeam from "./components/PokemonTeam";
import Notification from "./components/Notification";
import PokemonDetail from "./components/PokemonDetail";
import { FaRandom, FaChevronDown, FaSpinner } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "./store/themeStore";
import PokemonCreate from "./components/PokemonCreate";
import PokemonCustomDetail from "./components/PokemonCustomDetail";

const App = () => {
  const [input, setInput] = useState("");
  const [displayCount, setDisplayCount] = useState(15);
  const [shuffledData, setShuffledData] = useState([]);
  const [isShuffled, setIsShuffled] = useState(false);

  const {
    pokeData,
    allPokemon,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
  } = usePokemonData(15);

  const { isDarkMode } = useThemeStore();
  const filteredPokemon = useMemo(() => {
    if (!input) {
      return isShuffled ? shuffledData : pokeData;
    }
    return allPokemon.filter(
      (poke) =>
        poke.name.toLowerCase().includes(input.toLowerCase()) ||
        (poke.displayName &&
          poke.displayName.toLowerCase().includes(input.toLowerCase())),
    );
  }, [input, pokeData, allPokemon, shuffledData, isShuffled]);

  const displayedPokemon = useMemo(() => {
    if (shuffledData.length > 0 && !input && isShuffled) {
      return shuffledData.slice(0, displayCount);
    }
    return filteredPokemon;
  }, [filteredPokemon, displayCount, shuffledData, input, isShuffled]);

  const shufflePokemon = () => {
    if (allPokemon.length === 0) return;

    const shuffled = [...allPokemon];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setShuffledData(shuffled.slice(0, 30));
    setIsShuffled(true);
    setInput("");
    setDisplayCount(15);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    setIsShuffled(false);
    setShuffledData([]);
    setDisplayCount(15);
  };

  const handleLoadMore = () => {
    if (!input && !isShuffled) {
      loadMore();
    } else if (isShuffled && shuffledData.length > displayCount) {
      setDisplayCount((prev) => prev + 15);
    }
  };

  const showLoadMore = useMemo(() => {
    if (input) return false;

    if (isShuffled) {
      return displayCount < shuffledData.length;
    }

    return hasMore;
  }, [input, isShuffled, hasMore, displayCount, shuffledData.length]);

  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <>
      <Notification />
      <Routes>
        <Route
          path="/"
          element={
            <PokedexShell active="search" loading={loading}>
              <div className="h-full flex flex-col">
                <div className="pt-16 sm:pt-6 pb-8 flex justify-center gap-3 items-center">
                  <Search handleInput={handleInput} value={input} />

                  <motion.button
                    onClick={shufflePokemon}
                    whileHover={{
                      y: -2,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{
                      scale: 0.98,
                      transition: { duration: 0.1 },
                    }}
                    className={`py-3 px-5 rounded-full cursor-pointer flex items-center gap-2 border ${
                      isDarkMode
                        ? "bg-red-900/20 border-red-800 hover:bg-red-900/30 text-red-100"
                        : "bg-red-50 border-red-200 hover:bg-red-100 text-red-800"
                    } transition-colors duration-200 shadow-sm`}
                  >
                    <FaRandom className="text-xl" />
                  </motion.button>
                </div>

                <div className="flex-1 px-10 pb-8 sm:px-20 sm:pb-8 overflow-hidden">
                  <div className="h-full overflow-y-auto pr-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 pt-4">
                      <Pokemons data={displayedPokemon} />
                    </div>

                    <AnimatePresence>
                      {showLoadMore && (
                        <div className="text-center mt-8">
                          <motion.button
                            onClick={handleLoadMore}
                            disabled={loadingMore}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            whileHover={{
                              y: -2,
                              backgroundColor: isDarkMode
                                ? "rgba(185, 28, 28, 0.3)"
                                : "rgba(254, 226, 226, 1)",
                              transition: { duration: 0.2 },
                            }}
                            whileTap={{
                              scale: 0.98,
                              transition: { duration: 0.1 },
                            }}
                            className={`px-6 py-3 rounded-3xl cursor-pointer border flex items-center gap-2 mx-auto ${
                              isDarkMode
                                ? "bg-red-900/20 border-red-800 text-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                : "bg-red-50 border-red-200 text-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            } transition-colors duration-200 shadow-sm text-sm font-medium`}
                          >
                            {loadingMore ? (
                              <>
                                <FaSpinner className="text-xs animate-spin" />
                                Loading...
                              </>
                            ) : (
                              <>
                                <FaChevronDown className="text-xs" />
                                Load More
                              </>
                            )}
                          </motion.button>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </PokedexShell>
          }
        />
        <Route
          path="/pokemon/:name"
          element={
            <PokedexShell active="pokemon" loading={false}>
              <PokemonDetail />
            </PokedexShell>
          }
        />
        <Route
          path="/team"
          element={
            <PokedexShell active="team" loading={false}>
              <PokemonTeam />
            </PokedexShell>
          }
        />
        <Route
          path="/create-pokemon"
          element={
            <PokedexShell active="add" loading={false}>
              <PokemonCreate />
            </PokedexShell>
          }
        />
        <Route
          path="/pokemon/custom/:name"
          element={
            <PokedexShell active="pokemon" loading={false}>
              <PokemonCustomDetail />
            </PokedexShell>
          }
        />
      </Routes>
    </>
  );
};

export default App;
