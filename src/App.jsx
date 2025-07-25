import { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pokemons from "./components/Pokemons";
import Search from "./components/Search";
import { usePokemonData } from "./hooks/usePokemonData";
import PokedexShell from "./components/PokedexShell";
import PokemonTeam from "./components/PokemonTeam";
import Notification from "./components/Notification";

const App = () => {
  const [input, setInput] = useState("");
  const { pokeData, allPokemon, loading, error } = usePokemonData();

  const filteredPokemon = useMemo(() => {
    if (!input) return pokeData;
    return allPokemon.filter((poke) =>
      poke.name.toLowerCase().includes(input.toLowerCase())
    );
  }, [input, pokeData, allPokemon]);

  const handleInput = (e) => setInput(e.target.value);

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
                <div className="px-4 py-5">
                  <Search handleInput={handleInput} value={input} />
                </div>
                <div className="flex-1 overflow-y-auto px-10 pb-8 sm:px-20 sm:pb-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    <Pokemons data={filteredPokemon} />
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
              {/* <PokemonDetail /> */}
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

export default App;
