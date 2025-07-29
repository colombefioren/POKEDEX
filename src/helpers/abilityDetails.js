export const fetchAbilityDetails = async (url) => {
  if (!url) {
    return {
      name: "unknown",
      effect: "No ability URL provided",
      shortEffect: "Invalid ability data",
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
      shortEffect: englishEntry?.short_effect || "No short description",
      generation:
        data.generation?.name?.replace("generation-", "").toUpperCase() || "—",
    };
  } catch (error) {
    console.error("Error fetching ability:", error);
    return {
      name: url.split("/").filter(Boolean).pop() || "unknown",
      effect: "Failed to load ability details",
      shortEffect: "Try again later",
      generation: "—",
    };
  }
};
