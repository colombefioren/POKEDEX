import { create } from "zustand";

const useTeamStore = create((set) => ({
  team: [],
  addToTeam: (pokemon) =>
    set((state) => {
      // check if pokemon is already in team
      if (state.team.some((p) => p.pokedexId === pokemon.pokedexId)) {
        return state; 
      }
    
      if (state.team.length >= 6) {
        alert("Your team is full (max 6 Pokémon)");
        return state;
      }
      return { team: [...state.team, pokemon] };
    }),
  removeFromTeam: (pokedexId) =>
    set((state) => ({
      team: state.team.filter((p) => p.pokedexId !== pokedexId),
    })),
  clearTeam: () => set({ team: [] }),
}));

export default useTeamStore;
