import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCreateStore = create(
  persist(
    (set, get) => ({
      customPokemon: [],
      selectedPokemon: null,
      notification: null,
      maxRealPokemonId: null,

      getNextId: () => {
        const { customPokemon } = get();
        if (customPokemon.length === 0) return 10000;
        const maxId = Math.max(...customPokemon.map((p) => p.id));
        return maxId + 1;
      },

      setMaxRealPokemonId: (maxId) => {
        set({ maxRealPokemonId: maxId });
      },

      addCustomPokemon: (pokemon) => {
        const { customPokemon, maxRealPokemonId = 0 } = get();

        let newId = pokemon.id;

        const isIdTaken = (id) => {
          return (
            (maxRealPokemonId && id <= maxRealPokemonId) ||
            customPokemon.some((p) => p.id === id)
          );
        };

        if (!newId || isIdTaken(newId)) {
          let nextId = (maxRealPokemonId || 10000) + 1;
          while (customPokemon.some((p) => p.id === nextId)) {
            nextId++;
          }
          newId = nextId;
        }

        if (
          customPokemon.some(
            (p) => p.name.toLowerCase() === pokemon.name.toLowerCase(),
          )
        ) {
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
          id: newId,
          createdAt: new Date().toISOString(),
          isCustom: true,
          displayName: pokemon.displayName || pokemon.name,
        };

        set({
          customPokemon: [...customPokemon, newPokemon],
          notification: {
            message: `${pokemon.displayName || pokemon.name} was created successfully!`,
            type: "success",
          },
        });
        return true;
      },

      updateCustomPokemon: (id, updatedData) => {
        const { customPokemon } = get();
        set({
          customPokemon: customPokemon.map((p) =>
            p.id === id
              ? {
                  ...p,
                  ...updatedData,
                  displayName: updatedData.displayName || updatedData.name,
                }
              : p,
          ),
          notification: {
            message: `Pokémon updated successfully!`,
            type: "success",
          },
        });
      },

      deleteCustomPokemon: (id) => {
        const { customPokemon } = get();
        const pokemon = customPokemon.find((p) => p.id === id);
        set({
          customPokemon: customPokemon.filter((p) => p.id !== id),
          notification: {
            message: pokemon
              ? `${pokemon.displayName || pokemon.name} was deleted`
              : "Pokémon deleted",
            type: "success",
          },
        });
      },

      setSelectedPokemon: (pokemon) => set({ selectedPokemon: pokemon }),

      clearNotification: () => set({ notification: null }),

      getAllPokemonForSearch: (realPokemon = []) => {
        const { customPokemon } = get();
        return [
          ...realPokemon,
          ...customPokemon.map((p) => ({
            id: p.id,
            name: p.name,
            displayName: p.displayName,
            image: p.image || null,
            types: p.types,
            isCustom: true,
          })),
        ];
      },
    }),
    {
      name: "custom-pokemon-storage",
      getStorage: () => localStorage,
    },
  ),
);

export default useCreateStore;
