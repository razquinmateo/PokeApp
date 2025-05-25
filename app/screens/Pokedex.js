import axios from "axios";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const POKEMON_LIMIT = 20;
const MAX_POKEMON = 151;

export default function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [search, setSearch] = useState("");

  const loadPokemon = async () => {
    if (loading || allLoaded) return;

    setLoading(true);
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_LIMIT}&offset=${offset}`
      );

      const promises = res.data.results.map(async (pokemon) => {
        const details = await axios.get(pokemon.url);
        return {
          name: pokemon.name,
          image: details.data.sprites.front_default,
          types: details.data.types.map((t) => t.type.name),
        };
      });

      const newPokemon = await Promise.all(promises);
      const totalFetched = offset + POKEMON_LIMIT;

      if (totalFetched >= MAX_POKEMON) {
        const remaining = MAX_POKEMON - offset;
        setPokemonList((prev) => [...prev, ...newPokemon.slice(0, remaining)]);
        setAllLoaded(true);
      } else {
        setPokemonList((prev) => [...prev, ...newPokemon]);
        setOffset((prev) => prev + POKEMON_LIMIT);
      }
    } catch (error) {
      console.error("Error al cargar Pokémon:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPokemon();
  }, []);

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const getColumnWrapperStyle = (rowItemsLength) => ({
    justifyContent: rowItemsLength < 4 ? "flex-start" : "space-between",
    marginBottom: 16,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokédex</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar Pokémon..."
        placeholderTextColor="#aaa"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        style={styles.list}
        data={filteredPokemon}
        keyExtractor={(item) => item.name}
        numColumns={4}
        columnWrapperStyle={{
          justifyContent: filteredPokemon.length % 4 === 0 ? "space-between" : "center",
          marginBottom: 16,
        }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.typesContainer}>
              {item.types.map((type) => (
                <Text key={type} style={styles.type}>
                  {type}
                </Text>
              ))}
            </View>
          </View>
        )}
        onEndReached={loadPokemon}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="small" /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  list: {
    marginTop: 16,
    marginBottom: 24, // nuevo
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#1f1f1f",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 4,
    alignItems: "center",
    width: "23%",
    minHeight: 120,
  },
  image: {
    width: 50,
    height: 50,
  },
  name: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 6,
    textTransform: "capitalize",
    textAlign: "center",
  },
  typesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 4,
    marginTop: 4,
  },
  type: {
    fontSize: 10,
    backgroundColor: "#333",
    color: "#fff",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    margin: 1,
    textTransform: "capitalize",
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  searchInput: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    color: "#000",
  },
});
