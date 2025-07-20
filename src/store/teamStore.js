import { create } from "zustand";

const useTeamStore = create((set) => ({
  team: [],
  notification: null,
  addToTeam: (pokemon) =>
    set((state) => {
      // Check if pokemon is already in team
      if (state.team.some((p) => p.pokedexId === pokemon.pokedexId)) {
        return {
          notification: {
            message: `${pokemon.name} is already in your team!`,
            type: "error",
          },
        };
      }
      // Limit team size to 6
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
  removeFromTeam: (pokedexId) =>
    set((state) => ({
      team: state.team.filter((p) => p.pokedexId !== pokedexId),
      notification: {
        message: "Pokémon removed from team",
        type: "success",
      },
    })),
clearNotification: () => {
  setTimeout(() => set({ notification: null }), 100);
},
  clearTeam: () => set({ team: [] }),
}));

export default useTeamStore;
