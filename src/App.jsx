import { useEffect, useState, useMemo } from "react";
import Pokemons from "./components/Pokemons";
import Search from "./components/Search";
import Navbar from "./sections/Navbar";
import { fetchPokemonData } from "./lib/api/pokemonApi";

const POKE_API = {
  initial: "https://pokebuildapi.fr/api/v1/pokemon/limit/54",
  all: "https://pokebuildapi.fr/api/v1/pokemon",
};

const App = () => {
  const [pokeData, setPokeData] = useState([]);
  const [allPokeData, setAllPokeData] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [initialData, allData] = await Promise.all([
          fetchPokemonData(POKE_API.initial),
          fetchPokemonData(POKE_API.all),
        ]);

        setPokeData(initialData);
        setAllPokeData(allData);
      } catch (error) {
        console.error("Failed to fetch pokemon data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredPokemon = useMemo(() => {
    if (!input) return pokeData;

    return allPokeData.filter((poke) =>
      poke.name.toLowerCase().startsWith(input.toLowerCase())
    );
  }, [input, pokeData, allPokeData]);

  const handleInput = (e) => setInput(e.target.value);

  return (
    <>
      <Navbar />
      <Search handleInput={handleInput} value={input} />
      <div className="flex justify-center mt-8 py-10 bg-slate-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          <Pokemons data={filteredPokemon} />
        </div>
      </div>
    </>
  );
};

export default App;
