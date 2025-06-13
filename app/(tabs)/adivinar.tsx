import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import {
  Button,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, ViewStyle
} from 'react-native';

const MAX_POKEMON = 151;
const { width, height } = Dimensions.get('window');

const isLargeScreen = width >= 768;

const backgroundColor = '#FFA500';
const optionLayout: ViewStyle = isLargeScreen
  ? { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }
  : {};

// Límites para escalado
const MAX_FONT_SIZE = 18;
const MAX_PADDING_VERTICAL = 12;
const MAX_PADDING_HORIZONTAL = 20;
const MAX_IMAGE_SIZE = 250;
const MAX_LOGO_WIDTH = 300;
const MAX_LOGO_HEIGHT = 50;

interface Pokemon {
  name: string;
  image: string | null;
  silhouette: string | null;
}

export default function AdivinarScreen() {
  const [gameStarted, setGameStarted] = useState(false);
  const [pokemonOptions, setPokemonOptions] = useState<Pokemon[]>([]);
  const [correctPokemon, setCorrectPokemon] = useState<Pokemon | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [showResults, setShowResults] = useState(false);

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (gameStarted) {
          endGame();
        }
      };
    }, [gameStarted])
  );

  const startGame = async () => {
    setScore(0);
    setRound(1);
    setShowResults(false);
    await loadNewRound();
    setGameStarted(true);
  };

  const loadNewRound = async () => {
    const correctId = Math.floor(Math.random() * MAX_POKEMON) + 1;
    const correct = await fetchPokemon(correctId);

    const incorrects: Pokemon[] = [];
    while (incorrects.length < 3) {
      const randomId = Math.floor(Math.random() * MAX_POKEMON) + 1;
      if (randomId !== correctId && !incorrects.find(p => p.name === `pokemon${randomId}`)) {
        const pokemon = await fetchPokemon(randomId);
        incorrects.push(pokemon);
      }
    }

    const options = shuffleArray([correct, ...incorrects]);
    setCorrectPokemon(correct);
    setPokemonOptions(options);
    setSelectedAnswer(null);
    setFeedback("");
  };

  const endGame = () => {
    setGameStarted(false);
    setPokemonOptions([]);
    setCorrectPokemon(null);
    setSelectedAnswer(null);
    setFeedback("");
    setRound(1);
    setScore(0);
    setShowResults(false);
  };

  const fetchPokemon = async (id: number): Promise<Pokemon> => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return {
      name: res.data.name,
      image: res.data.sprites.front_default,
      silhouette: res.data.sprites.front_default,
    };
  };

  const shuffleArray = <T,>(array: T[]): T[] => array.sort(() => Math.random() - 0.5);

  const handleAnswer = (name: string) => {
    if (!correctPokemon) return;

    setSelectedAnswer(name);

    if (name === correctPokemon.name) {
      setFeedback("¡Correcto! 🎉");
      setScore((prev) => prev + 1);
    } else {
      setFeedback(`Incorrecto 😢 Era ${correctPokemon.name}`);
      setScore((prev) => (prev > 0 ? prev - 1 : 0));
    }
  };

  const handleNext = async () => {
    if (round >= 5) {
      setShowResults(true);
    } else {
      setRound((prev) => prev + 1);
      await loadNewRound();
    }
  };

  // Tamaños limitados
  const fontSize = Math.min(width * 0.045, MAX_FONT_SIZE);
  const paddingVertical = Math.min(height * 0.018, MAX_PADDING_VERTICAL);
  const paddingHorizontal = Math.min(width * 0.04, MAX_PADDING_HORIZONTAL);
  const imageSize = Math.min(width * 0.5, MAX_IMAGE_SIZE);
  const logoWidth = Math.min(width * 0.8, MAX_LOGO_WIDTH);
  const logoHeight = Math.min(height * 0.1, MAX_LOGO_HEIGHT);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!gameStarted ? (
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../../assets/images/quien-es-ese-pokemon.png')}
            style={[styles.logo, { width: logoWidth, height: logoHeight }]}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={[styles.startButton, { paddingVertical, paddingHorizontal }]}
            onPress={startGame}
          >
            <Text style={[styles.startButtonText, { fontSize }]}>¡Empezar juego!</Text>
          </TouchableOpacity>
        </View>
      ) : showResults ? (
        <View style={{ alignItems: 'center' }}>
          <Text style={[styles.feedback, { fontSize }]}>Juego terminado 🎮</Text>
          <Text style={[styles.feedback, { fontSize }]}>Puntaje final: {score} / 5</Text>
          <TouchableOpacity
            style={[styles.startButton, { paddingVertical, paddingHorizontal }]}
            onPress={startGame}
          >
            <Text style={[styles.startButtonText, { fontSize }]}>Volver a jugar</Text>
          </TouchableOpacity>
          <View style={{ marginTop: height * 0.015 }}>
            <Button title="Finalizar juego" onPress={endGame} color="red" />
          </View>
        </View>
      ) : (
        <>
          <Text style={[styles.feedback, { fontSize }]}>Ronda {round} de 5</Text>

          <Image
            source={require('../../assets/images/quien-es-ese-pokemon.png')}
            style={[styles.logo, { width: logoWidth, height: logoHeight }]}
            resizeMode="contain"
          />

          {correctPokemon && (
            <Image
              source={{ uri: correctPokemon.silhouette ?? '' }}
              style={[styles.image, { width: imageSize, height: imageSize, tintColor: 'black' }]}
              resizeMode="contain"
            />
          )}

          <View style={[styles.optionsContainer, optionLayout]}>
            {pokemonOptions.map((option) => (
              <TouchableOpacity
                key={option.name}
                style={[
                  styles.optionButton,
                  { paddingVertical, paddingHorizontal, width: isLargeScreen ? '45%' : '100%' },
                  selectedAnswer && option.name === correctPokemon?.name && { backgroundColor: 'green' },
                  selectedAnswer && option.name === selectedAnswer && option.name !== correctPokemon?.name && { backgroundColor: '#cc3300' },
                  selectedAnswer && option.name !== correctPokemon?.name && option.name !== selectedAnswer && { backgroundColor: '#aaa' },
                ]}
                onPress={() => handleAnswer(option.name)}
                disabled={!!selectedAnswer}
              >
                <Text style={[styles.optionText, { fontSize }]}>{option.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {feedback !== "" && <Text style={[styles.feedback, { fontSize }]}>{feedback}</Text>}

          {selectedAnswer && (
            <Button title={round >= 5 ? "Ver resultados" : "Siguiente ronda"} onPress={handleNext} color="#4CAF50" />
          )}

          <View style={{ marginTop: height * 0.02 }}>
            <Button title="Finalizar juego" onPress={endGame} color="red" />
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: width * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFA500',
  },
  logo: {
    marginBottom: height * 0.02,
  },
  image: {
    marginBottom: height * 0.03,
  },
  optionsContainer: {
    width: '100%',
    marginBottom: height * 0.02,
  },
  optionButton: {
    backgroundColor: '#4169E1',
    marginVertical: height * 0.008,
    borderRadius: 10,
  },
  optionText: {
    color: 'white',
    textAlign: 'center',
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#4169E1',
    borderRadius: 30,
    marginTop: height * 0.015,
    elevation: 3,
  },
  startButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  feedback: {
    color: '#222',
    marginBottom: height * 0.02,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
