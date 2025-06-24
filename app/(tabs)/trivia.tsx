import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';

// Banco de 30 preguntas
const bancoPreguntas = [
    {
        pregunta: '¿Cuál de estos Pokémon es de tipo Fuego?',
        opciones: ['Bulbasaur', 'Squirtle', 'Charmander', 'Pikachu'],
        respuestaCorrecta: 'Charmander',
    },
    {
        pregunta: '¿Qué tipo es Pikachu?',
        opciones: ['Fuego', 'Eléctrico', 'Agua', 'Planta'],
        respuestaCorrecta: 'Eléctrico',
    },
    {
        pregunta: '¿Cuál es la evolución final de Bulbasaur?',
        opciones: ['Venusaur', 'Ivysaur', 'Charizard', 'Blastoise'],
        respuestaCorrecta: 'Venusaur',
    },
    {
        pregunta: '¿Qué Pokémon es conocido por dormir mucho?',
        opciones: ['Snorlax', 'Psyduck', 'Jigglypuff', 'Slowpoke'],
        respuestaCorrecta: 'Snorlax',
    },
    {
        pregunta: '¿Cuál de estos Pokémon es legendario?',
        opciones: ['Zapdos', 'Pidgeot', 'Machamp', 'Golem'],
        respuestaCorrecta: 'Zapdos',
    },
    {
        pregunta: '¿Quién es el Pokémon número 1 en la Pokédex Nacional?',
        opciones: ['Pikachu', 'Bulbasaur', 'Charmander', 'Squirtle'],
        respuestaCorrecta: 'Bulbasaur',
    },
    {
        pregunta: '¿Cuál es el tipo de Gyarados?',
        opciones: ['Agua/Volador', 'Agua/Dragón', 'Agua', 'Agua/Fuego'],
        respuestaCorrecta: 'Agua/Volador',
    },
    {
        pregunta: '¿Qué objeto permite evolucionar a Eevee en Vaporeon?',
        opciones: ['Piedra Agua', 'Piedra Trueno', 'Piedra Fuego', 'Piedra Hoja'],
        respuestaCorrecta: 'Piedra Agua',
    },
    {
        pregunta: '¿De qué tipo es el ataque "Lanzallamas"?',
        opciones: ['Fuego', 'Eléctrico', 'Roca', 'Normal'],
        respuestaCorrecta: 'Fuego',
    },
    {
        pregunta: '¿Quién es el rival principal de Ash en la primera temporada?',
        opciones: ['Gary', 'Brock', 'James', 'Tracey'],
        respuestaCorrecta: 'Gary',
    },
    {
        pregunta: '¿Qué Pokémon tiene una concha en su espalda?',
        opciones: ['Squirtle', 'Caterpie', 'Rattata', 'Zubat'],
        respuestaCorrecta: 'Squirtle',
    },
    {
        pregunta: '¿Cuál es la evolución de Magikarp?',
        opciones: ['Gyarados', 'Seadra', 'Goldeen', 'Tentacool'],
        respuestaCorrecta: 'Gyarados',
    },
    {
        pregunta: '¿Cuál de estos ataques es de tipo Agua?',
        opciones: ['Hidrobomba', 'Puño Fuego', 'Impactrueno', 'Rayo Solar'],
        respuestaCorrecta: 'Hidrobomba',
    },
    {
        pregunta: '¿Cuál es el tipo de Onix?',
        opciones: ['Roca/Tierra', 'Roca/Agua', 'Acero', 'Tierra/Agua'],
        respuestaCorrecta: 'Roca/Tierra',
    },
    {
        pregunta: '¿Qué Pokémon es conocido por decir su nombre constantemente?',
        opciones: ['Pikachu', 'Ditto', 'Abra', 'Ekans'],
        respuestaCorrecta: 'Pikachu',
    },
    {
        pregunta: '¿Quién es el líder del gimnasio de Ciudad Plateada?',
        opciones: ['Brock', 'Misty', 'Lt. Surge', 'Erika'],
        respuestaCorrecta: 'Brock',
    },
    {
        pregunta: '¿Cuál de estos Pokémon es una evolución de Eevee?',
        opciones: ['Jolteon', 'Pikachu', 'Raichu', 'Mew'],
        respuestaCorrecta: 'Jolteon',
    },
    {
        pregunta: '¿Qué Pokémon tiene como habilidad principal "Levitación"?',
        opciones: ['Gengar', 'Koffing', 'Weezing', 'Gastly'],
        respuestaCorrecta: 'Weezing',
    },
    {
        pregunta: '¿Qué tipo es super efectivo contra el tipo Agua?',
        opciones: ['Eléctrico', 'Fuego', 'Normal', 'Bicho'],
        respuestaCorrecta: 'Eléctrico',
    },
    {
        pregunta: '¿Cuál es el tipo de Mewtwo?',
        opciones: ['Psíquico', 'Fantasma', 'Hielo', 'Normal'],
        respuestaCorrecta: 'Psíquico',
    },
    {
        pregunta: '¿Qué Pokémon se esconde en una Pokébola con cara?',
        opciones: ['Voltorb', 'Electrode', 'Pokébot', 'Ballmon'],
        respuestaCorrecta: 'Voltorb',
    },
    {
        pregunta: '¿Cuál es la evolución de Pichu?',
        opciones: ['Pikachu', 'Raichu', 'Electrode', 'Jolteon'],
        respuestaCorrecta: 'Pikachu',
    },
    {
        pregunta: '¿Quién es el Pokémon fósil con forma de caparazón?',
        opciones: ['Omanyte', 'Kabuto', 'Aerodactyl', 'Anorith'],
        respuestaCorrecta: 'Omanyte',
    },
    {
        pregunta: '¿Qué tipo es supereficaz contra el tipo Fantasma?',
        opciones: ['Fantasma', 'Normal', 'Hada', 'Planta'],
        respuestaCorrecta: 'Fantasma',
    },
    {
        pregunta: '¿Cuál es la evolución de Machop?',
        opciones: ['Machoke', 'Machamp', 'Hitmonlee', 'Makuhita'],
        respuestaCorrecta: 'Machoke',
    },
    {
        pregunta: '¿Qué Pokémon tiene múltiples evoluciones posibles?',
        opciones: ['Eevee', 'Pikachu', 'Slowpoke', 'Tyrogue'],
        respuestaCorrecta: 'Eevee',
    },
    {
        pregunta: '¿Qué tipo de Pokémon es Dratini?',
        opciones: ['Dragón', 'Agua', 'Viento', 'Psíquico'],
        respuestaCorrecta: 'Dragón',
    },
    {
        pregunta: '¿Qué Pokémon se comunica usando telepatía?',
        opciones: ['Mewtwo', 'Alakazam', 'Mr. Mime', 'Abra'],
        respuestaCorrecta: 'Mewtwo',
    },
    {
        pregunta: '¿Quién es el Pokémon número 150 en la Pokédex?',
        opciones: ['Mewtwo', 'Mew', 'Articuno', 'Zapdos'],
        respuestaCorrecta: 'Mewtwo',
    },
    {
        pregunta: '¿Qué Pokémon es de tipo Planta/Veneno?',
        opciones: ['Bulbasaur', 'Oddish', 'Gloom', 'Todos los anteriores'],
        respuestaCorrecta: 'Todos los anteriores',
    },
];

const obtenerPreguntasAleatorias = () => {
    const preguntasAleatorias = [...bancoPreguntas]
        .sort(() => 0.5 - Math.random())
        .slice(0, 10)
        .map((pregunta) => ({
            ...pregunta,
            opciones: [...pregunta.opciones].sort(() => 0.5 - Math.random()),
        }));

    return preguntasAleatorias;
};

const { width, height } = Dimensions.get('window');

const isLargeScreen = width >= 768;

const optionLayout: ViewStyle = isLargeScreen
    ? { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }
    : {};

const MAX_FONT_SIZE = 18;
const MAX_PADDING_VERTICAL = 12;
const MAX_PADDING_HORIZONTAL = 20;
const MAX_LOGO_WIDTH = 300;
const MAX_LOGO_HEIGHT = 50;

export default function TriviaScreen() {
    const [mostrarInicio, setMostrarInicio] = useState(true);

    const [preguntas, setPreguntas] = useState(obtenerPreguntasAleatorias());
    const [indiceActual, setIndiceActual] = useState(0);
    const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<string | null>(null);
    const [esCorrecta, setEsCorrecta] = useState<boolean | null>(null);
    const [puntaje, setPuntaje] = useState(0);
    const [finalizado, setFinalizado] = useState(false);
    const [tiempoRestante, setTiempoRestante] = useState(10);

    const timerRef = useRef<number | null>(null);
    const preguntaActual = preguntas[indiceActual];

    const limpiarTimer = () => {
        if (timerRef.current !== null) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const manejarRespuestaTimeout = () => {
        setRespuestaSeleccionada(''); // Usuario no respondió
        setEsCorrecta(false);
        limpiarTimer();
    };

    useFocusEffect(
        useCallback(() => {

            return () => {

                reiniciarJuego();
                setMostrarInicio(true);
            };
        }, [])
    );

    useEffect(() => {
        if (finalizado) {
            limpiarTimer();
            return;
        }

        setTiempoRestante(10);
        limpiarTimer();

        timerRef.current = setInterval(() => {
            setTiempoRestante((t) => {
                if (t <= 1) {
                    manejarRespuestaTimeout();
                    return 0;
                }
                return t - 1;
            });
        }, 1000);

        return () => limpiarTimer();
    }, [indiceActual, finalizado]);

    const manejarRespuesta = (opcion: string) => {
        setRespuestaSeleccionada(opcion);
        limpiarTimer();

        if (opcion === preguntaActual.respuestaCorrecta) {
            setEsCorrecta(true);
            setPuntaje((p) => p + 1);
        } else {
            setEsCorrecta(false);
        }
    };

    const siguientePregunta = () => {
        setRespuestaSeleccionada(null);
        setEsCorrecta(null);
        if (indiceActual < preguntas.length - 1) {
            setIndiceActual(indiceActual + 1);
        } else {
            setFinalizado(true);
        }
    };

    const reiniciarJuego = () => {
        setPreguntas(obtenerPreguntasAleatorias());
        setIndiceActual(0);
        setRespuestaSeleccionada(null);
        setEsCorrecta(null);
        setPuntaje(0);
        setFinalizado(false);
        setTiempoRestante(10);
    };

    const iniciarTrivia = () => {
        setMostrarInicio(false);
    };

    const fontSize = Math.min(width * 0.045, MAX_FONT_SIZE);
    const paddingVertical = Math.min(height * 0.018, MAX_PADDING_VERTICAL);
    const paddingHorizontal = Math.min(width * 0.04, MAX_PADDING_HORIZONTAL);
    const logoWidth = Math.min(width * 0.8, MAX_LOGO_WIDTH);
    const logoHeight = Math.min(height * 0.1, MAX_LOGO_HEIGHT);

    return (
        <ScrollView
            contentContainerStyle={[
                styles.container,
                { paddingTop: (StatusBar.currentHeight || 20) + width * 0.06 },
            ]}
        >
            {mostrarInicio ? (
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/trivia-pokemon.png')}
                        style={[styles.logo, { width: logoWidth, height: logoHeight }]}
                        resizeMode="contain"
                    />
                    <TouchableOpacity
                        style={[styles.startButton, { paddingVertical, paddingHorizontal }]}
                        onPress={iniciarTrivia}
                    >
                        <Text style={[styles.startButtonText, { fontSize }]}>Comenzar Trivia</Text>
                    </TouchableOpacity>
                </View>
            ) : !finalizado ? (
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/trivia-pokemon.png')}
                        style={[styles.logo, { width: logoWidth, height: logoHeight }]}
                        resizeMode="contain"
                    />
                    <Text style={[styles.question, { fontSize: fontSize + 2 }]}>
                        Pregunta {indiceActual + 1} de {preguntas.length}
                    </Text>


                    <Text style={[styles.question, { fontSize, marginBottom: height * 0.03 }]}>
                        {preguntaActual.pregunta}
                    </Text>

                    <View style={[styles.optionsContainer, optionLayout]}>
                        {preguntaActual.opciones.map((opcion) => {
                            const esOpcionSeleccionada = respuestaSeleccionada === opcion;
                            const mostrarColor =
                                respuestaSeleccionada !== null && esOpcionSeleccionada
                                    ? esCorrecta
                                        ? styles.optionCorrecta
                                        : styles.optionIncorrecta
                                    : {};

                            return (
                                <TouchableOpacity
                                    key={opcion}
                                    style={[
                                        styles.optionButton,
                                        mostrarColor,
                                        {
                                            paddingVertical,
                                            paddingHorizontal,
                                            width: isLargeScreen ? '45%' : '100%',
                                        },
                                    ]}
                                    disabled={respuestaSeleccionada !== null}
                                    onPress={() => manejarRespuesta(opcion)}
                                >
                                    <Text style={[styles.optionText, { fontSize }]}>{opcion}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <Text style={[styles.timerText, { fontSize }]}>Tiempo restante: {tiempoRestante}s</Text>

                    {respuestaSeleccionada !== null && (
                        <View style={{ marginTop: height * 0.02, alignItems: 'center' }}>
                            {esCorrecta ? (
                                <Text style={[styles.feedback, { fontSize }]}>✅ ¡Correcto!</Text>
                            ) : (
                                <>
                                    <Text style={[styles.feedback, { fontSize, color: '#cc3300' }]}>❌ Incorrecto</Text>
                                    <Text style={[styles.feedback, { fontSize }]}>
                                        ✅ Respuesta correcta: {preguntaActual.respuestaCorrecta}
                                    </Text>
                                </>
                            )}

                            <TouchableOpacity
                                style={[styles.startButton, { marginTop: height * 0.015, paddingVertical, paddingHorizontal }]}
                                onPress={siguientePregunta}
                            >
                                <Text style={[styles.startButtonText, { fontSize }]}>Siguiente</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            ) : (
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/trivia-pokemon.png')}
                        style={[styles.logo, { width: logoWidth, height: logoHeight }]}
                        resizeMode="contain"
                    />
                    <Text style={[styles.feedback, { fontSize: fontSize + 2 }]}>¡Juego terminado! 🎮</Text>
                    <Text style={[styles.feedback, { fontSize }]}>
                        Puntaje: {puntaje} / {preguntas.length}
                    </Text>
                    <TouchableOpacity
                        style={[styles.startButton, { paddingVertical, paddingHorizontal, marginTop: height * 0.015 }]}
                        onPress={reiniciarJuego}
                    >
                        <Text style={[styles.startButtonText, { fontSize }]}>Reiniciar</Text>
                    </TouchableOpacity>
                </View>
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
        backgroundColor: '#FFEB99',
    },
    logo: {
        marginBottom: height * 0.02,
    },
    question: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#222',
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
        color: '#fff',
        textAlign: 'center',
        textTransform: 'capitalize',
        fontWeight: 'bold',
    },
    optionCorrecta: {
        backgroundColor: '#4caf50',
    },
    optionIncorrecta: {
        backgroundColor: '#cc3300',
    },
    timerText: {
        color: '#222',
        textAlign: 'center',
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
        marginBottom: height * 0.015,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});