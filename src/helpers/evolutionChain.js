// Updated helper function with better error handling
const evolutionChain = (chain) => {
  const evolutions = [];

  const processChain = (chainItem) => {
    const evolutionDetails = chainItem.evolution_details[0] || {};

    const evolution = {
      name: chainItem.species.name,
      id: chainItem.species.url.split("/").slice(-2, -1)[0],
      trigger: evolutionDetails.trigger?.name || "level-up",
      min_level: evolutionDetails.min_level || null,
      item: evolutionDetails.item?.name || null,
      conditions: evolutionDetails.min_happiness
        ? "Friendship"
        : evolutionDetails.min_affection
        ? "Affection"
        : evolutionDetails.time_of_day
        ? `Time: ${evolutionDetails.time_of_day}`
        : evolutionDetails.needs_overworld_rain
        ? "Rain"
        : evolutionDetails.relative_physical_stats !== undefined &&
          evolutionDetails.relative_physical_stats !== null
        ? `Stats: ${
            evolutionDetails.relative_physical_stats > 0
              ? "Attack > Defense"
              : evolutionDetails.relative_physical_stats < 0
              ? "Defense > Attack"
              : "Attack = Defense"
          }`
        : null,
    };

    evolutions.push(evolution);

    if (chainItem.evolves_to?.length > 0) {
      chainItem.evolves_to.forEach((nextEvolution) => {
        processChain(nextEvolution);
      });
    }
  };

  if (chain?.chain) {
    processChain(chain.chain);
  }

  return evolutions;
};

export default evolutionChain;
