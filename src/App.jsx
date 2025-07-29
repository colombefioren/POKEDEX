import { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pokemons from "./components/Pokemons";
import Search from "./components/Search";
import { usePokemonData } from "./hooks/usePokemonData";
import PokedexShell from "./components/PokedexShell";
import PokemonTeam from "./components/PokemonTeam";
import Notification from "./components/Notification";
import PokemonDetail from "./components/PokemonDetail";
import { FaRandom, FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";
import { useThemeStore } from "./store/themeStore";

const App = () => {
  const [input, setInput] = useState("");
  const [displayCount, setDisplayCount] = useState(15);
  const [shuffledData, setShuffledData] = useState([]);
  const { pokeData, allPokemon, loading, error } = usePokemonData();
  const { isDarkMode } = useThemeStore();
  const filteredPokemon = useMemo(() => {
    if (!input) return pokeData;
    return allPokemon.filter((poke) =>
      poke.name.toLowerCase().includes(input.toLowerCase())
    );
  }, [input, pokeData, allPokemon]);

  const displayedPokemon = useMemo(() => {
    if (shuffledData.length > 0 && !input) {
      return shuffledData.slice(0, displayCount);
    }
    return filteredPokemon.slice(0, displayCount);
  }, [filteredPokemon, displayCount, shuffledData, input]);

  const shufflePokemon = () => {
    if (allPokemon.length === 0) return;

    const shuffled = [...allPokemon];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setShuffledData(shuffled);
    setInput("");
    setDisplayCount(10);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    setDisplayCount(10);
    setShuffledData([]);
  };

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

                <div className="flex-1 overflow-y-auto px-10 pb-8 sm:px-20 sm:pb-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    <Pokemons data={displayedPokemon} />
                  </div>

                  {filteredPokemon.length > displayCount && (
                    <div className="text-center mt-8">
                      <motion.button
                        onClick={() => setDisplayCount((prev) => prev + 10)}
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
                            ? "bg-red-900/20 border-red-800 text-red-100"
                            : "bg-red-50 border-red-200 text-red-800"
                        } transition-colors duration-200 shadow-sm text-sm font-medium`}
                      >
                        <FaChevronDown className="text-xs" />
                        Load More
                      </motion.button>
                    </div>
                  )}
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
      </Routes>
    </>
  );
};
motion;
export default App;
