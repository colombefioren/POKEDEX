import Pokecard from "./Pokecard";
import { motion, AnimatePresence } from "framer-motion";

const Pokemons = ({ data }) => {
  if (!data) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-20 px-4">
        <h3 className="text-xl font-medium text-slate-400 mb-2">
          Connection Lost
        </h3>
        <p className="text-slate-500 text-center max-w-md">
          Unable to reach the Pokémon server. Please check your connection.
        </p>
      </div>
    );
  }

  if (Array.isArray(data) && data.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-20 px-4">
        <h3 className="text-xl font-medium text-slate-400 mb-2">
          No Pokémon Found
        </h3>
        <p className="text-slate-500 text-center max-w-md">
          Your search didn't match any Pokémon. Try a different name or number.
        </p>
      </div>
    );
  }

  if (!Array.isArray(data)) {
    return (
      <div className="col-span-full text-center py-20">
        <div className="text-white/70 text-lg font-mono">
          INVALID DATA FORMAT
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {data.map((pokemon) => (
        <motion.div
          key={`${pokemon.id}-${pokemon.name}`}
          className="h-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            duration: 0.5,
          }}
          layout
        >
          <Pokecard
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            types={pokemon.types}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  );
};
motion;
export default Pokemons;
