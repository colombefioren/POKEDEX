export default async function FetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("An error occurred");
    }
    const data = await response.json();
    const Poke = data.map((element) => ({
      id: element.pokedexId,
      Pokename: element.name,
      image: element.image,
    }));
    return Poke;
  } catch (err) {
    console.log(err.message);
    return [];
  }
}
