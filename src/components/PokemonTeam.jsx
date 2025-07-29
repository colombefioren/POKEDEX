import useTeamStore from "../store/teamStore";
import { useThemeStore } from "../store/themeStore";
import Pokecard from "./Pokecard";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

const PokemonTeam = () => {
  const { team, removeFromTeam } = useTeamStore();
  const navigate = useNavigate();
  const { isDarkMode } = useThemeStore(); 

  const handleRemove = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    removeFromTeam(id);
  };

  const handleBrowseClick = (e) => {
    e.preventDefault();
    navigate("/");
  };

  if (team.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-20 px-4">
        <div className="relative w-full">
          <div className="relative flex flex-col gap-2 items-center justify-center">
            <h3 className="text-xl font-medium text-slate-400">
         Your Team is empty
        </h3>
        <p className="text-slate-500 text-center mb-5">
          Build your dream pokemon team by adding pokemons.
        </p>
            <motion.button
              onClick={handleBrowseClick} 
              whileHover={{
                y: -2,
                transition: { duration: 0.2 },
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.1 },
              }}
              className={`py-3 px-5 cursor-pointer rounded-full flex items-center gap-2 border mx-auto ${
                isDarkMode
                  ? "bg-red-900/20 border-red-800 hover:bg-red-900/30 text-red-100"
                  : "bg-red-50 border-red-200 hover:bg-red-100 text-red-800"
              } transition-colors duration-200 shadow-sm text-sm font-medium`}
            >
              <FaSearch className="text-sm" />
              Browse Pokémon
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-10 h-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
        {team.map((pokemon) => (
          <div key={pokemon.id} className="relative group">
            <Pokecard
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.other["official-artwork"]}
              types={pokemon.types}
            />
            <button
              onClick={(e) => handleRemove(e, pokemon.id)}
              className="absolute top-2 right-2 z-10 bg-gradient-to-r from-red-500 to-red-800 hover:scale-105 cursor-pointer transition-all text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
motion;
export default PokemonTeam;
