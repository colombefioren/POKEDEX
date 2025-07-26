export const fetchAbilityDetails = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch ability");
    const data = await response.json();

    const englishEntry = data.effect_entries?.find(
      (entry) => entry.language.name === "en"
    );

    return {
      name: data.name,
      effect: englishEntry?.effect || "No description available",
      shortEffect: englishEntry?.short_effect || "No short description",
      generation:
        data.generation?.name.replace("generation-", "").toUpperCase() || "—",
    };
  } catch (error) {
    console.error("Error fetching ability:", error);
    return {
      name: url.split("/").slice(-2, -1)[0],
      effect: "Failed to load ability details",
      shortEffect: "Failed to load details",
      generation: "—",
    };
  }
};
