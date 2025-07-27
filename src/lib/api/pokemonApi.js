import { POKE_API } from "../../config/api.js";

const fetchApiData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const getCompletePokemonData = async (identifier) => {
  try {
    const pokemonData = await fetchApiData(
      `${POKE_API.BASE_URL}/pokemon/${identifier}`
    );

    const speciesIdentifier = pokemonData.species.name;

    const speciesData = await fetchApiData(
      `${POKE_API.BASE_URL}/pokemon-species/${speciesIdentifier}`
    );

    let evolutionChainData = null;
    if (speciesData.evolution_chain) {
      evolutionChainData = await fetchApiData(speciesData.evolution_chain.url);
    }

    const moveDetails = await Promise.all(
      pokemonData.moves.map(async (move) => {
        const moveData = await fetchApiData(move.move.url);
        return {
          name: move.move.name,
          url: move.move.url,
          level_learned_at: move.version_group_details[0].level_learned_at,
          learn_method: move.version_group_details[0].move_learn_method.name,
          accuracy: moveData.accuracy,
          power: moveData.power,
          pp: moveData.pp,
          type: moveData.type.name,
          damage_class: moveData.damage_class.name,
          effect_entries: moveData.effect_entries,
        };
      })
    );

    const flavorTextEntries = speciesData.flavor_text_entries.filter(
      (entry) => entry.language.name === "en"
    );
    const latestFlavorText =
      flavorTextEntries.length > 0
        ? flavorTextEntries[flavorTextEntries.length - 1].flavor_text
        : "No description available";

    return {
      id: pokemonData.id,
      name: pokemonData.name,
      height: pokemonData.height,
      weight: pokemonData.weight,
      base_experience: pokemonData.base_experience,
      sprites: {
        home: {
          home: pokemonData.sprites.other["home"]?.front_default,
        },
        other: {
          "official-artwork":
            pokemonData.sprites.other["official-artwork"]?.front_default,
        },
        dream: {
          dream: pokemonData.sprites.other["dream_world"]?.front_default,
        },
      },
      stats: pokemonData.stats.map((stat) => ({
        name: stat.stat.name,
        base_stat: stat.base_stat,
        effort: stat.effort,
      })),
      types: pokemonData.types.map((type) => type.type.name),
      abilities: pokemonData.abilities.map((ability) => ({
        name: ability.ability.name,
        is_hidden: ability.is_hidden,
        url: ability.ability.url,
      })),
      moves: moveDetails,
      species: {
        name: speciesData.name,
        genus:
          speciesData.genera.find((g) => g.language.name === "en")?.genus ||
          "Unknown",
        flavor_text: latestFlavorText,
        habitat: speciesData.habitat?.name || "Unknown",
        growth_rate: speciesData.growth_rate?.name || "Unknown",
        capture_rate: speciesData.capture_rate,
        base_happiness: speciesData.base_happiness,
        is_legendary: speciesData.is_legendary,
        is_mythical: speciesData.is_mythical,
        evolution_chain: evolutionChainData,
      },
      cries: {
        latest: pokemonData.cries?.latest || null,
        legacy: pokemonData.cries?.legacy || null,
      },
      game_indices: pokemonData.game_indices,
      held_items: pokemonData.held_items,
    };
  } catch (error) {
    console.error("Error fetching complete pokemon data:", error);
    throw error;
  }
};

export const getPokemonList = async (limit = 20, offset = 0) => {
  try {
    const data = await fetchApiData(
      `${POKE_API.BASE_URL}${POKE_API.ENDPOINTS.POKEMON_LIMIT(limit, offset)}`
    );

    const pokemonWithDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const pokemonData = await fetchApiData(pokemon.url);
        return {
          id: pokemonData.id,
          name: pokemonData.name,
          image: pokemonData.sprites.other["official-artwork"].front_default,
          types: pokemonData.types.map((type) => type.type.name),
        };
      })
    );

    return {
      count: data.count,
      results: pokemonWithDetails,
    };
  } catch (error) {
    console.error("Error fetching pokemon list:", error);
    throw error;
  }
};
