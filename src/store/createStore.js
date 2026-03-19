import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCreateStore = create(
  persist(
    (set, get) => ({
      customPokemon: [],
      selectedPokemon: null,
      notification: null,

      addCustomPokemon: (pokemon) => {
        const { customPokemon } = get();
        
        if (customPokemon.some(p => p.id === pokemon.id)) {
          set({
            notification: {
              message: `Pokémon ID ${pokemon.id} already exists!`,
              type: "error",
            },
          });
          return false;
        }

        if (customPokemon.some(p => p.name.toLowerCase() === pokemon.name.toLowerCase())) {
          set({
            notification: {
              message: `Pokémon "${pokemon.name}" already exists!`,
              type: "error",
            },
          });
          return false;
        }

        const newPokemon = {
          ...pokemon,
          createdAt: new Date().toISOString(),
          isCustom: true,
        };

        set({
          customPokemon: [...customPokemon, newPokemon],
          notification: {
            message: `${pokemon.name} was created successfully!`,
            type: "success",
          },
        });
        return true;
      },

      updateCustomPokemon: (id, updatedData) => {
        const { customPokemon } = get();
        set({
          customPokemon: customPokemon.map(p => 
            p.id === id ? { ...p, ...updatedData } : p
          ),
          notification: {
            message: `Pokémon updated successfully!`,
            type: "success",
          },
        });
      },

      deleteCustomPokemon: (id) => {
        const { customPokemon } = get();
        const pokemon = customPokemon.find(p => p.id === id);
        set({
          customPokemon: customPokemon.filter(p => p.id !== id),
          notification: {
            message: pokemon ? `${pokemon.name} was deleted` : "Pokémon deleted",
            type: "success",
          },
        });
      },

      setSelectedPokemon: (pokemon) => set({ selectedPokemon: pokemon }),
      
      clearNotification: () => {
        setTimeout(() => set({ notification: null }), 100);
      },
    }),
    {
      name: 'custom-pokemon-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useCreateStore;