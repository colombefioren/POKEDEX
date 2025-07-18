import { useEffect, useState } from "react";
import Pokemons from "./components/Pokemons";
import Search from "./components/Search";
import Navbar from "./sections/Navbar";
import FetchData from "./lib/FetchData.js";

const App = () => {
  const Poke100 = "https://pokebuildapi.fr/api/v1/pokemon/limit/54";
  const AllPoke = "https://pokebuildapi.fr/api/v1/pokemon";
  const [PokeData, setPokeData] = useState([]);
  const [AllPokeData, setAllPokeData] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchPokeData = async () => {
      const data = await FetchData(Poke100);
      setPokeData(data);
    };
    const fetchAllPokeData = async () => {
      const data = await FetchData(AllPoke);
      setAllPokeData(data);
    };

    fetchPokeData();
    fetchAllPokeData();
  }, []);

  function FilteredPokemon(AllPokeData, PokeData) {
    let FilteredPoke = PokeData;
    if (input) {
      FilteredPoke = AllPokeData.filter((poke) =>
        poke.Pokename.toLowerCase().startsWith(input.toLocaleLowerCase())
      );
    }
    return FilteredPoke;
  }

  const handleInput = (e) => setInput(e.target.value);

  let result = FilteredPokemon(AllPokeData, PokeData);
  return (
    <>
      <Navbar />
      <Search handleInput={handleInput} value={input} />
      <div className="flex justify-center mt-8 py-10 bg-slate-100">
        <div className="grid grid-cols-6 gap-8">
          <Pokemons data={result} />
        </div>
      </div>
    </>
  );
};
export default App;
