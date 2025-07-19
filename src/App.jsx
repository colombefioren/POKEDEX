import { useState, useMemo } from "react";
import Pokemons from "./components/Pokemons";
import Search from "./components/Search";
import Navbar from "./sections/Navbar";
import { usePokemonData } from "./hooks/usePokemonData";
import LoadingSpinner from "./components/LoadingSpinner";

const App = () => {
  const [input, setInput] = useState("");
  const { pokeData, allPokeData, loading, error } = usePokemonData();

  const filteredPokemon = useMemo(() => {
    if (!input) return pokeData;
    return allPokeData.filter((poke) =>
      poke.name.toLowerCase().startsWith(input.toLowerCase())
    );
  }, [input, pokeData, allPokeData]);

  const handleInput = (e) => setInput(e.target.value);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      <Search handleInput={handleInput} value={input} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <Pokemons data={filteredPokemon} />
        </div>
      </div>
    </div>
  );
};

export default App;
