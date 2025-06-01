import { getAllPokemon } from '@/src/api/pokemon';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const TOTAL_POKEMON = 1118;
const LOAD_BATCH = 20;

const allTypes = [
  'bug', 'dark', 'dragon', 'electric', 'fairy', 'fighting', 'fire', 'flying',
  'ghost', 'grass', 'ground', 'ice', 'normal', 'poison', 'psychic', 'rock', 'steel', 'water'
];

const allGenerations = [
  'generation-i', 'generation-ii', 'generation-iii', 'generation-iv',
  'generation-v', 'generation-vi', 'generation-vii', 'generation-viii', 'generation-ix'
];

export default function Pokedex() {
  const [allPokemon, setAllPokemon] = useState<any[]>([]);
  const [displayCount, setDisplayCount] = useState(LOAD_BATCH);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedGeneration, setSelectedGeneration] = useState<string | null>(null);
  const [filteredList, setFilteredList] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const loadAllPokemon = async () => {
    setLoading(true);
    try {
      const data = await getAllPokemon(0, TOTAL_POKEMON);
      setAllPokemon(data);
    } catch (error) {
      console.error('Error loading Pokémon:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllPokemon();
  }, []);

  useEffect(() => {
    let filtered = allPokemon;

    if (searchText.trim() !== '') {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedTypes.length > 0) {
      filtered = filtered.filter(p =>
        selectedTypes.every(type => p.types.includes(type.toLowerCase()))
      );
    }

    if (selectedGeneration) {
      filtered = filtered.filter(p => p.generation === selectedGeneration);
    }

    setFilteredList(filtered);
    setDisplayCount(LOAD_BATCH);
  }, [searchText, selectedTypes, selectedGeneration, allPokemon]);

  function formatPokemonName(name: string): string {
    if (!name.includes('-')) return name.toUpperCase();

    const parts = name.split('-');
    const prefixes = ['mega', 'gmax', 'gigantamax'];

    if (parts.length >= 2 && prefixes.includes(parts[1].toLowerCase())) {
      const prefix = parts[1].toUpperCase();
      const base = parts[0].toUpperCase();

      if (parts.length > 2) {
        const suffix = parts.slice(2).map(s => s.toUpperCase()).join(' ');
        return `${prefix} ${base} ${suffix}`;
      }
      return `${prefix} ${base}`;
    }

    const base = parts[0].toUpperCase();
    const suffix = parts.slice(1).map(s => s.toUpperCase()).join(' ');
    return `${base} (${suffix})`;
  }

  const loadMore = () => {
    if (searchText.trim() !== '' || selectedTypes.length > 0 || selectedGeneration) return;
    if (displayCount >= allPokemon.length) return;

    setDisplayCount(prev => Math.min(prev + LOAD_BATCH, allPokemon.length));
  };

  const dataToShow =
    searchText.trim() === '' && selectedTypes.length === 0 && !selectedGeneration
      ? allPokemon.slice(0, displayCount)
      : filteredList;

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const toggleGeneration = (gen: string) => {
    if (selectedGeneration === gen) {
      setSelectedGeneration(null);
    } else {
      setSelectedGeneration(gen);
    }
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedGeneration(null);
    setSearchText('');
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topBar}>
        <TextInput
          style={[styles.searchInput, { flex: 1 }]}
          placeholder="Buscar Pokémon..."
          value={searchText}
          onChangeText={setSearchText}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.filterButton}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Filtros</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} size="large" />
      ) : (
        <FlatList
          data={dataToShow}
          keyExtractor={item => item.name}
          numColumns={2}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.idText}>#{item.id}</Text>
              <Text style={styles.name}>{formatPokemonName(item.name)}</Text>
              <View style={styles.types}>
                {item.types.map((type: string) => (
                  <View
                    key={type}
                    style={[
                      styles.typeBadge,
                      { backgroundColor: typeColors[type.toLowerCase()] || '#777' },
                    ]}
                  >
                    <Text style={styles.typeText}>{type.toUpperCase()}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            !loading && displayCount < allPokemon.length && !searchText && selectedTypes.length === 0 && !selectedGeneration ? (
              <ActivityIndicator style={{ marginVertical: 20 }} />
            ) : null
          }
        />
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtros</Text>

            <Text style={styles.filterSectionTitle}>Tipos</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {allTypes.map(type => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeFilterButton,
                    selectedTypes.includes(type) && { backgroundColor: typeColors[type] },
                  ]}
                  onPress={() => toggleType(type)}
                >
                  <Text
                    style={[
                      styles.typeFilterText,
                      selectedTypes.includes(type) && { color: 'white' },
                    ]}
                  >
                    {type.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.filterSectionTitle}>Generación</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {allGenerations.map(gen => (
                <TouchableOpacity
                  key={gen}
                  style={[
                    styles.genFilterButton,
                    selectedGeneration === gen && { backgroundColor: genColors[gen] || '#4a90e2' },
                  ]}
                  onPress={() => toggleGeneration(gen)}
                >
                  <Text
                    style={[
                      styles.genFilterText,
                      selectedGeneration === gen && { color: 'white' },
                    ]}
                  >
                    {gen.replace('generation-', 'Gen ').toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#999' }]}
                onPress={clearFilters}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Limpiar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#4a90e2' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const typeColors: Record<string, string> = {
  bug: '#A8B820',
  dark: '#705848',
  dragon: '#7038F8',
  electric: '#F8D030',
  fairy: '#EE99AC',
  fighting: '#C03028',
  fire: '#F08030',
  flying: '#A890F0',
  ghost: '#705898',
  grass: '#78C850',
  ground: '#E0C068',
  ice: '#98D8D8',
  normal: '#A8A878',
  poison: '#A040A0',
  psychic: '#F85888',
  rock: '#B8A038',
  steel: '#B8B8D0',
  water: '#6890F0',
};

const genColors: Record<string, string> = {
  'generation-i': '#FF4D4D', // Rojo
  'generation-ii': '#FFD700', // Dorado
  'generation-iii': '#00A896', // Verde azulado
  'generation-iv': '#6A0572', // Púrpura oscuro
  'generation-v': '#F48C06', // Naranja
  'generation-vi': '#00B7EB', // Azul claro
  'generation-vii': '#FF70A6', // Rosa
  'generation-viii': '#2A9D8F', // Verde turquesa
  'generation-ix': '#9D4EDD', // Violeta
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 6,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  filterButton: {
    marginLeft: 12,
    backgroundColor: '#4a90e2',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  list: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 110,
    height: 110,
  },
  idText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  types: {
    flexDirection: 'row',
    marginTop: 6,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginHorizontal: 4,
    marginVertical: 2,
  },
  typeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  filterScroll: {
    maxHeight: 40,
  },
  typeFilterButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: '#f5f5f5',
  },
  typeFilterText: {
    fontWeight: 'bold',
    color: '#555',
  },
  genFilterButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: '#f5f5f5',
  },
  genFilterText: {
    fontWeight: 'bold',
    color: '#555',
  },
  modalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
});