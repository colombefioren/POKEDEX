import { create } from "zustand";

const useTeamStore = create((set) => ({
  team: [],
  notification: null,
  addToTeam: (pokemon) =>
    set((state) => {
      // Check if pokemon is already in team
      if (state.team.some((p) => p.id === pokemon.id)) {
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
  removeFromTeam: (id) =>
    set((state) => ({
      team: state.team.filter((p) => p.id !== id),
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
