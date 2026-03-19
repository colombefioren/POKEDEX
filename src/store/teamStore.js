import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTeamStore = create(
  persist(
    (set) => ({
      team: [],
      notification: null,
      addToTeam: (pokemon) =>
        set((state) => {
          if (state.team.some((p) => p.id === pokemon.id)) {
            return {
              notification: {
                message: `${pokemon.name} is already in your team!`,
                type: "error",
              },
            };
          }
          if (state.team.length >= 6) {
            return {
              notification: {
                message: "Your team is full (max 6 Pokémon)",
                type: "error",
              },
            };
          }
          return {
            team: [...state.team, pokemon],
            notification: {
              message: `${pokemon.name} added to team!`,
              type: "success",
            },
          };
        }),
      removeFromTeam: (id) =>
        set((state) => {
          const pokemon = state.team.find((p) => p.id === id);
          return {
            team: state.team.filter((p) => p.id !== id),
            notification: {
              message: pokemon
                ? `${pokemon.name} removed from team`
                : "Pokémon removed from team",
              type: "success",
            },
          };
        }),
      clearNotification: () => set({ notification: null }),
      clearTeam: () => set({ team: [] }),
    }),
    {
      name: "pokemon-team-storage",
      getStorage: () => localStorage,
    },
  ),
);

export default useTeamStore;
