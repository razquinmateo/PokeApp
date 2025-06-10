import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const MAX_POKEMON = 151;

// ... importaciones
export default function AdivinarScreen() {
  const [gameStarted, setGameStarted] = useState(false);
  const [pokemonOptions, setPokemonOptions] = useState([]);
  const [correctPokemon, setCorrectPokemon] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
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

    const incorrects = [];
    while (incorrects.length < 3) {
      const randomId = Math.floor(Math.random() * MAX_POKEMON) + 1;
      if (randomId !== correctId && !incorrects.includes(randomId)) {
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

  const fetchPokemon = async (id) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return {
      name: res.data.name,
      image: res.data.sprites.front_default,
      silhouette: res.data.sprites.front_default,
    };
  };

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const handleAnswer = (name) => {
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

  return (
    <View style={styles.container}>
      {!gameStarted ? (
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../../assets/images/quien-es-ese-pokemon.png')}
            style={{ width: 300, height: 80, marginBottom: 24 }}
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.startButton} onPress={startGame}>
            <Text style={styles.startButtonText}>¡Empezar juego!</Text>
          </TouchableOpacity>
        </View>
      ) : showResults ? (
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.feedback}>Juego terminado 🎮</Text>
          <Text style={styles.feedback}>Puntaje final: {score} / 5</Text>

          <TouchableOpacity style={styles.startButton} onPress={startGame}>
            <Text style={styles.startButtonText}>Volver a jugar</Text>
          </TouchableOpacity>

          <View style={{ marginTop: 12 }}>
            <Button title="Finalizar juego" onPress={endGame} color="red" />
          </View>
        </View>
      ) : (
        <>
          <Text style={styles.feedback}>Ronda {round} de 5</Text>

          <Image
            source={require('../../assets/images/quien-es-ese-pokemon.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Image
            source={{ uri: correctPokemon?.silhouette }}
            style={[styles.image, { tintColor: 'black' }]}
            resizeMode="contain"
          />

          <View style={styles.optionsContainer}>
            {pokemonOptions.map((option) => (
              <TouchableOpacity
                key={option.name}
                style={[
                  styles.optionButton,
                  selectedAnswer && option.name === correctPokemon.name && { backgroundColor: 'green' },
                  selectedAnswer && option.name === selectedAnswer && option.name !== correctPokemon.name && { backgroundColor: '#cc3300' },
                  selectedAnswer && option.name !== correctPokemon.name && option.name !== selectedAnswer && { backgroundColor: '#aaa' },
                ]}
                onPress={() => handleAnswer(option.name)}
                disabled={!!selectedAnswer}
              >
                <Text style={styles.optionText}>{option.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {feedback !== "" && <Text style={styles.feedback}>{feedback}</Text>}

          {selectedAnswer && (
            <Button title={round >= 5 ? "Ver resultados" : "Siguiente ronda"} onPress={handleNext} color="#4CAF50" />
          )}

          <View style={{ marginTop: 16 }}>
            <Button title="Finalizar juego" onPress={endGame} color="red" />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFA500',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 24,
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#4169E1',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginTop: 12,
    elevation: 3,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#4169E1',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
  },
  optionText: {
    color: 'white',
    textAlign: 'center',
    textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: 'bold',
  },
  feedback: {
    fontSize: 18,
    color: '#222',
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  logo: {
    width: 300,
    height: 80,
    marginBottom: 16,
  },
});
