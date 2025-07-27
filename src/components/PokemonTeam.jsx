import useTeamStore from "../store/teamStore";
import Pokecard from "./Pokecard";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PokemonTeam = () => {
  const { team, removeFromTeam } = useTeamStore();
  const navigate = useNavigate();

  const handleRemove = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    removeFromTeam(id);
  };

  if (team.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="col-span-full flex flex-col items-center justify-center py-20 px-4"
      >
        <div className="relative max-w-md w-full">
          <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-red-500/10 blur-xl" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-blue-500/10 blur-xl" />
          <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white/90 mb-2">
              Your Team is Empty
            </h3>
            <p className="text-gray-400 mb-6">
              Build your dream Pokémon team by adding your favorites
            </p>
            <motion.button
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r cursor-pointer from-red-500 to-orange-500 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-red-500/20 transition-all"
            >
              Browse Pokémon Now
            </motion.button>
          </div>
        </div>
      </motion.div>
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
              className="absolute top-2 right-2 z-10 bg-red-500/80 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
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
