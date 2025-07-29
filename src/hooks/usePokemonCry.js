import { useState } from "react";

export const usePokemonCry = () => {
  const [playingCry, setPlayingCry] = useState(false);

  const playCry = (pokemon) => {
    if (pokemon?.cries?.latest) {
      const audio = new Audio(pokemon.cries.latest);
      audio.play();
      setPlayingCry(true);
      audio.onended = () => setPlayingCry(false);
    }
  };

  return { playingCry, playCry };
};
