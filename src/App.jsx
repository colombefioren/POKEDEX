import Pokemons from "./components/Pokemons";
import Search from "./components/Search";
import Navbar from "./sections/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Search />
      <div className="flex justify-center mt-8 py-10 bg-slate-100">
        <div className="grid grid-cols-6 gap-8">
          <Pokemons />
        </div>
      </div>
    </>
  );
};
export default App;
