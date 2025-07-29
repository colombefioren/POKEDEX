export const fetchMoveDetails = async (url) => {
  if (!url) {
    return {
      name: "unknown",
      effect: "No move URL provided",
      type: "unknown",
      power: "—",
      accuracy: "—",
      pp: "—",
      damageClass: "—",
      generation: "—",
    };
  }

  try {
    const response = await fetch(url);
    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid response format");
    }

    const data = await response.json();

    const englishEntry =
      data.effect_entries?.find((entry) => entry.language.name === "en") ||
      data.flavor_text_entries?.find((entry) => entry.language.name === "en");

    return {
      name: data.name || "unknown",
      effect:
        englishEntry?.effect ||
        englishEntry?.flavor_text ||
        "No description available",
      type: data.type?.name || "unknown",
      power: data.power || "—",
      accuracy: data.accuracy || "—",
      pp: data.pp || "—",
      damageClass: data.damage_class?.name || "—",
      generation:
        data.generation?.name?.replace("generation-", "").toUpperCase() || "—",
    };
  } catch (error) {
    console.error("Error fetching move:", error);
    return {
      name: url.split("/").filter(Boolean).pop() || "unknown",
      effect: "Failed to load move details",
      type: "unknown",
      power: "—",
      accuracy: "—",
      pp: "—",
      damageClass: "—",
      generation: "—",
    };
  }
};
