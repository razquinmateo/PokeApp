import { getAllPokemon } from '@/src/api/pokemon';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

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
  const [selectedPokemon, setSelectedPokemon] = useState<any | null>(null);

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
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={[styles.topBar, { paddingTop: (StatusBar.currentHeight || 20) + 10 }]}>
        <Image
          source={require('../../assets/images/Pokedex.png')}
          style={styles.headerImage}
          resizeMode="contain"
        />
        <View style={styles.searchContainer}>
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
            onPress={() => {
              setModalVisible(true);
              setSelectedPokemon(null);
            }}
            style={styles.filterButton}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Filtros</Text>
          </TouchableOpacity>
        </View>
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
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                setSelectedPokemon(item);
                setModalVisible(false);
              }}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.idText}>#{item.id}</Text>
              <Text style={styles.name}>{formatPokemonName(item.name)}</Text>
              <View style={styles.types}>
                {item.types.map((type: string) => {
                  const isSelected = selectedTypes.includes(type.toLowerCase());
                  return (
                    <TouchableOpacity
                      key={type}
                      onPress={() => toggleType(type.toLowerCase())}
                      style={[
                        styles.typeBadge,
                        {
                          backgroundColor: typeColors[type.toLowerCase()] || '#777',
                          opacity: isSelected ? 1 : 0.6,
                          borderWidth: isSelected ? 2 : 0,
                          borderColor: isSelected ? 'white' : 'transparent',
                          shadowColor: isSelected ? '#000' : 'transparent',
                          shadowOffset: { width: 0, height: 1 },
                          shadowOpacity: isSelected ? 0.3 : 0,
                          shadowRadius: isSelected ? 2 : 0,
                          elevation: isSelected ? 3 : 0,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.typeText,
                          {
                            textShadowColor: isSelected ? 'black' : 'transparent',
                            textShadowOffset: { width: 0.5, height: 0.5 },
                            textShadowRadius: 1,
                          },
                        ]}
                      >
                        {type.toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </TouchableOpacity>
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

      <Modal
        visible={selectedPokemon !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedPokemon(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedPokemon(null)}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>

            {selectedPokemon && (
              <ScrollView
                style={{ width: '100%' }}
                contentContainerStyle={styles.modalScrollContent}
              >
                {/* Pokémon Image and Name */}
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: selectedPokemon.image }}
                    style={styles.pokemonImage}
                  />
                </View>
                <Text style={styles.pokemonName}>
                  {formatPokemonName(selectedPokemon.name)}
                </Text>
                <Text style={styles.pokemonId}>
                  ID: #{selectedPokemon.id}
                </Text>

                {/* Types */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Tipos</Text>
                  <View style={styles.typesContainer}>
                    {selectedPokemon.types.map((type: string) => (
                      <View
                        key={type}
                        style={[
                          styles.typeBadge,
                          { backgroundColor: typeColors[type.toLowerCase()] || '#888' },
                        ]}
                      >
                        <Text style={styles.typeText}>{type.toUpperCase()}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* General Info */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Información General</Text>
                  <Text style={styles.detailText}>
                    Generación: {selectedPokemon.generation?.replace('generation-', 'Gen ').toUpperCase()}
                  </Text>
                  <Text style={styles.detailText}>
                    Altura: {selectedPokemon.height / 10} m
                  </Text>
                  <Text style={styles.detailText}>
                    Peso: {selectedPokemon.weight / 10} kg
                  </Text>
                </View>

                {/* Abilities */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Habilidades</Text>
                  {selectedPokemon.abilities.map((ab: string) => (
                    <Text key={ab} style={styles.detailText}>
                      • {ab.charAt(0).toUpperCase() + ab.slice(1)}
                    </Text>
                  ))}
                </View>

                {/* Base Stats */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Estadísticas Base</Text>
                  {selectedPokemon.stats.map((stat: any) => (
                    <View key={stat.name} style={styles.statRow}>
                      <Text style={styles.statName}>
                        {statTranslations[stat.name] || stat.name.toUpperCase()}:
                      </Text>
                      <Text style={styles.statValue}>{stat.value}</Text>
                      <View style={styles.statBar}>
                        <View
                          style={[
                            styles.statBarFill,
                            { width: `${(stat.value / 255) * 100}%` },
                          ]}
                        />
                      </View>
                    </View>
                  ))}
                </View>

                {/* Evolution Chain */}
                {selectedPokemon.evolution_chain && selectedPokemon.evolution_chain.length > 1 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Línea Evolutiva</Text>
                    <View style={styles.evolutionContainer}>
                      {selectedPokemon.evolution_chain.map((evo: any, index: number) => {
                        const evoPokemon = allPokemon.find(p => p.name === evo.name);
                        return (
                          <View key={index} style={styles.evolutionStep}>
                            {evoPokemon && (
                              <Image
                                source={{ uri: evoPokemon.image }}
                                style={styles.evolutionImage}
                              />
                            )}
                            <Text style={styles.evolutionName}>
                              {formatPokemonName(evo.name)}
                            </Text>
                            {evo.min_level && (
                              <Text style={styles.evolutionLevel}>
                                (Nivel {evo.min_level})
                              </Text>
                            )}
                            {index < selectedPokemon.evolution_chain.length - 1 && (
                              <Ionicons name="arrow-forward" size={20} color="#666" style={styles.evolutionArrow} />
                            )}
                          </View>
                        );
                      })}
                    </View>
                  </View>
                )}
              </ScrollView>
            )}
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

const statTranslations: Record<string, string> = {
  hp: 'PS',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'Ataque Especial',
  'special-defense': 'Defensa Especial',
  speed: 'Velocidad',
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'column',
    paddingHorizontal: 12,
    paddingBottom: 6,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headerImage: {
    width: width * 0.6,
    height: 60,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
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
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 20,
    maxHeight: '85%',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
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
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
    marginBottom: 8,
  },
  modalScrollContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  imageContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    padding: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pokemonImage: {
    width: 180,
    height: 180,
  },
  pokemonName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 4,
  },
  pokemonId: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  section: {
    width: '100%',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  statName: {
    flex: 2,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  statValue: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  statBar: {
    flex: 3,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  evolutionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  evolutionStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  evolutionName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  evolutionImage: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  evolutionLevel: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  evolutionArrow: {
    marginHorizontal: 8,
  },
});