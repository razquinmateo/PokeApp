export async function getAllPokemon(offset = 0, limit = 20) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  const data = await res.json();

  const results = await Promise.all(
    data.results.map(async (pokemon: any) => {
      // Obtener detalles del Pokémon
      const detailsRes = await fetch(pokemon.url);
      const details = await detailsRes.json();

      // Obtener información de la especie para la generación
      const speciesRes = await fetch(details.species.url);
      const species = await speciesRes.json();

      return {
        id: details.id,
        name: details.name,
        image: details.sprites.other['official-artwork'].front_default,
        types: details.types.map((t: any) => t.type.name),
        generation: species.generation.name, // Ejemplo: "generation-i"
      };
    })
  );

  return results;
}