import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "../store/themeStore";
import useCreateStore from "../store/createStore";
import PokemonCreateForm from "./PokemonCreateForm";
import CustomPokemonCard from "./CustomPokemonCard";
import Notification from "./Notification";
import { FaPlus } from "react-icons/fa";

const PokemonCreate = () => {
  const { isDarkMode } = useThemeStore();
  const {
    customPokemon,
    addCustomPokemon,
    deleteCustomPokemon,
    updateCustomPokemon,
    setSelectedPokemon,
    notification,
    clearNotification,
  } = useCreateStore();
  const [showForm, setShowForm] = useState(false);
  const [editingPokemon, setEditingPokemon] = useState(null);

  const handleCreatePokemon = (pokemonData) => {
    const success = addCustomPokemon(pokemonData);
    if (success) {
      setShowForm(false);
    }
  };

  const handleEditPokemon = (pokemon) => {
    setEditingPokemon(pokemon);
    setShowForm(true);
  };

  const handleUpdatePokemon = (updatedData) => {
    updateCustomPokemon(editingPokemon.id, updatedData);
    setShowForm(false);
    setEditingPokemon(null);
  };

  const handleDeletePokemon = (id) => {
    deleteCustomPokemon(id);
  };

  return (
    <div className="h-full flex flex-col">
      <Notification
        notification={notification}
        clearNotification={clearNotification}
      />

      <div className="px-8 sm:px-12 md:px-16 py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex flex-row-reverse items-center gap-16 justify-center">
            <motion.button
              onClick={() => {
                setEditingPokemon(null);
                setShowForm(true);
              }}
              whileTap={{ scale: 0.98 }}
              className={`
              px-6 py-3 rounded-full text-sm font-medium cursor-pointer flex items-center gap-2
              ${
                isDarkMode
                  ? "bg-green-900/50 border border-green-700/50 text-green-100 hover:bg-green-900/70"
                  : "bg-green-100 border border-green-300 text-green-700 hover:bg-green-200"
              }
              transition-all duration-200 shadow-sm
            `}
              style={{
                boxShadow: isDarkMode
                  ? "0 4px 10px rgba(34, 197, 94, 0.2)"
                  : "0 4px 10px rgba(34, 197, 94, 0.15)",
              }}
            >
              <FaPlus className="text-sm" />
              New Creation
            </motion.button>
            <div>
              <h1
                className={`text-2xl font-bold ${
                  isDarkMode ? "text-white" : "text-slate-800"
                }`}
              >
                Custom Pokémons
              </h1>
              <p
                className={`text-sm mt-1 ${
                  isDarkMode ? "text-gray-400" : "text-slate-500"
                }`}
              >
                Design and bring your own Pokémon to life
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 sm:px-12 md:px-16 pb-8 pt-10">
        <AnimatePresence mode="wait">
          {showForm ? (
            <PokemonCreateForm
              key="form"
              onSubmit={
                editingPokemon ? handleUpdatePokemon : handleCreatePokemon
              }
              onCancel={() => {
                setShowForm(false);
                setEditingPokemon(null);
              }}
              initialData={editingPokemon}
            />
          ) : customPokemon.length === 0 ? (
            <div className="h-full flex items-center pb-40 justify-center py-20 px-4">
              <div className="relative w-full max-w-md mx-auto">
                <div className="relative flex flex-col gap-4 items-center justify-center text-center">
                  <h3
                    className={`text-xl font-semibold ${
                      isDarkMode ? "text-white" : "text-slate-800"
                    }`}
                  >
                    No Custom Pokemon Yet
                  </h3>
                  <p
                    className={`text-sm max-w-xs ${
                      isDarkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Start creating your own pokemon!
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
            >
              {customPokemon.map((pokemon) => (
                <CustomPokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  onEdit={handleEditPokemon}
                  onDelete={handleDeletePokemon}
                  onClick={() => setSelectedPokemon(pokemon)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PokemonCreate;
