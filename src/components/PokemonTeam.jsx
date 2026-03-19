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
      <div className="h-full flex items-center pb-40 justify-center py-20 px-4">
        <div className="relative w-full max-w-md mx-auto">
          <div className="relative flex flex-col gap-4 items-center justify-center text-center">
            <h3
              className={`text-xl font-semibold ${
                isDarkMode ? "text-white" : "text-slate-800"
              }`}
            >
              Your Team is empty
            </h3>
            <p
              className={`text-sm max-w-xs ${
                isDarkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Build your dream Pokémon team by adding Pokémon from the Pokédex.
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
              className={`mt-2 py-3 px-6 cursor-pointer rounded-full flex items-center gap-2 border mx-auto ${
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
    <div className="flex-1 overflow-y-auto h-full">
      <div className="px- sm:px-12 md:px-16 py-6 md:py-8">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div
            className={`text-sm px-3 py-1 rounded-full ${
              isDarkMode
                ? "bg-slate-800 text-slate-300"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {team.length === 6 ? "Team Full" : `${6 - team.length} slots left`}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {team.map((pokemon) => (
            <motion.div
              key={pokemon.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative group"
            >
              <div className="relative">
                <Pokecard
                  id={pokemon.id}
                  name={pokemon.name}
                  image={
                    pokemon.image || pokemon.sprites.other["official-artwork"] 
                  }
                  types={pokemon.types}
                  isCustom={pokemon.isCustom}
                />

                <motion.button
                  onClick={(e) => handleRemove(e, pokemon.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`absolute -top-2 -right-2 z-20 rounded-full p-1.5 md:p-2 cursor-pointer flex items-center justify-center border shadow-lg
                    ${
                      isDarkMode
                        ? "bg-red-900/90 border-red-700 hover:bg-red-800 text-red-100"
                        : "bg-red-500 border-red-400 hover:bg-red-600 text-white"
                    } transition-all duration-200 opacity-0 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100`}
                  aria-label="Remove from team"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 md:h-3.5 md:w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>

                <button
                  onClick={(e) => handleRemove(e, pokemon.id)}
                  className={`absolute -top-2 -right-2 z-20 rounded-full p-1.5 flex items-center justify-center border shadow-lg md:hidden
                    ${
                      isDarkMode
                        ? "bg-red-900/90 border-red-700 text-red-100"
                        : "bg-red-500 border-red-400 text-white"
                    }`}
                  aria-label="Remove from team"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {team.length < 6 && (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {[...Array(6 - team.length)].map((_, index) => (
              <div
                key={`empty-${index}`}
                className={`rounded-2xl border-2 border-dashed p-4 flex flex-col items-center justify-center aspect-square ${
                  isDarkMode
                    ? "border-slate-700 bg-slate-800/30"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <div
                  className={`text-3xl mb-2 ${
                    isDarkMode ? "text-slate-600" : "text-slate-300"
                  }`}
                >
                  ?
                </div>
                <div
                  className={`text-xs text-center ${
                    isDarkMode ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  Empty Slot
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonTeam;
