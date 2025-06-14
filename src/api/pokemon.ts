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

      // Obtener la cadena evolutiva
      const evolutionChainRes = await fetch(species.evolution_chain.url);
      const evolutionChain = await evolutionChainRes.json();

      // Procesar la línea evolutiva
      const getEvolutionChain = (chain: any) => {
        const evolutions = [];
        let current = chain;

        while (current) {
          const evolution = {
            name: current.species.name,
            min_level: current.evolution_details[0]?.min_level || null, // Nivel mínimo para evolucionar (si existe)
          };
          evolutions.push(evolution);
          current = current.evolves_to[0]; // Avanza al siguiente en la cadena
        }

        return evolutions;
      };

      const evolutionLine = getEvolutionChain(evolutionChain.chain);

      return {
        id: details.id,
        name: details.name,
        image: details.sprites.other['official-artwork'].front_default,
        types: details.types.map((t: any) => t.type.name),
        generation: species.generation.name,
        abilities: details.abilities.map((a: any) => a.ability.name),
        stats: details.stats.map((s: any) => ({
          name: s.stat.name,
          value: s.base_stat,
        })),
        height: details.height, // Altura en decímetros
        weight: details.weight, // Peso en hectogramos
        evolution_chain: evolutionLine, // Nueva propiedad con la línea evolutiva
      };
    })
  );

  return results;
}