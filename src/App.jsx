import { useState, useMemo } from "react";
import Pokemons from "./components/Pokemons";
import Search from "./components/Search";
import { usePokemonData } from "./hooks/usePokemonData";
import PokedexShell from "./components/PokedexShell";

const App = () => {
  const [input, setInput] = useState("");
  const { pokeData, allPokeData, loading, error } = usePokemonData();

  const filteredPokemon = useMemo(() => {
    if (!input) return pokeData;
    return allPokeData.filter((poke) =>
      poke.name.toLowerCase().includes(input.toLowerCase())
    );
  }, [input, pokeData, allPokeData]);

  const handleInput = (e) => setInput(e.target.value);

  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <PokedexShell loading={loading}>
      <div className="h-full flex flex-col">
        <div className="px-4 py-2">
          <Search handleInput={handleInput} value={input} />
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <Pokemons data={filteredPokemon} />
          </div>
        </div>
      </div>
    </PokedexShell>
  );
};

export default App;