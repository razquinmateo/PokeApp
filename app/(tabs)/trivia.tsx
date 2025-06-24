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
    ViewStyle,
} from 'react-native';
import { bancoPreguntas, Pregunta } from '../../src/data/todasPreguntas';

const obtenerPreguntasAleatorias = (): Pregunta[] => {
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
    const [preguntas, setPreguntas] = useState<Pregunta[]>(obtenerPreguntasAleatorias());
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
        setRespuestaSeleccionada('');
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
                    <Text style={[styles.ronda, { fontSize: fontSize + 2 }]}>
                        Ronda {indiceActual + 1} de {preguntas.length}
                    </Text>
                    <Text style={[styles.pregunta, { fontSize, marginBottom: height * 0.03 }]}>
                        {preguntaActual.pregunta}
                    </Text>
                    <View style={[styles.optionsContainer, optionLayout]}>
                        {preguntaActual.opciones.map((opcion) => {
                            const esOpcionSeleccionada = respuestaSeleccionada === opcion;
                            const mostrarColor =
                                respuestaSeleccionada !== null && esOpcionSeleccionada
                                    ? esCorrecta
                                        ? styles.opcionCorrecta
                                        : styles.opcionIncorrecta
                                    : {};
                            return (
                                <TouchableOpacity
                                    key={opcion}
                                    style={[
                                        styles.opcion,
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
                                    <Text style={[styles.textoOpcion, { fontSize }]}>{opcion}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                    <Text style={[styles.tiempo, { fontSize }]}>Tiempo restante: {tiempoRestante}s</Text>
                    {respuestaSeleccionada !== null && (
                        <View style={{ marginTop: height * 0.02, alignItems: 'center' }}>
                            {esCorrecta ? (
                                <Text style={[styles.correcto, { fontSize }]}>✅ ¡Correcto!</Text>
                            ) : (
                                <>
                                    <Text style={[styles.incorrecto, { fontSize }]}>❌ Incorrecto</Text>
                                    <Text style={[styles.respuestaCorrecta, { fontSize }]}>
                                        ✅ Respuesta correcta: {preguntaActual.respuestaCorrecta}
                                    </Text>
                                </>
                            )}
                            <TouchableOpacity
                                style={[
                                    styles.botonSiguiente,
                                    { paddingVertical, paddingHorizontal, marginTop: height * 0.015 },
                                ]}
                                onPress={siguientePregunta}
                            >
                                <Text style={[styles.textoBoton, { fontSize }]}>Siguiente</Text>
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
                    <Text style={[styles.resultado, { fontSize: fontSize + 2 }]}>¡Juego terminado! 🎮</Text>
                    <Text style={[styles.puntaje, { fontSize }]}>
                        Puntaje: {puntaje} / {preguntas.length}
                    </Text>
                    <TouchableOpacity
                        style={[
                            styles.botonReiniciar,
                            { paddingVertical, paddingHorizontal, marginTop: height * 0.015 },
                        ]}
                        onPress={reiniciarJuego}
                    >
                        <Text style={[styles.textoBoton, { fontSize }]}>Reiniciar</Text>
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
    ronda: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
        textAlign: 'center',
        marginBottom: 10,
    },
    pregunta: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#222',
    },
    optionsContainer: {
        width: '100%',
        marginBottom: height * 0.02,
    },
    opcion: {
        backgroundColor: '#4169E1',
        marginVertical: height * 0.008,
        borderRadius: 10,
    },
    textoOpcion: {
        color: '#fff',
        textAlign: 'center',
        textTransform: 'capitalize',
        fontWeight: 'bold',
    },
    opcionCorrecta: {
        backgroundColor: '#4CAF50',
    },
    opcionIncorrecta: {
        backgroundColor: '#cc3300',
    },
    tiempo: {
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
    botonSiguiente: {
        backgroundColor: '#4169E1',
        borderRadius: 8,
        alignItems: 'center',
    },
    textoBoton: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    correcto: {
        color: '#222',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    incorrecto: {
        color: '#cc3300',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    respuestaCorrecta: {
        color: '#222',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    resultado: {
        fontWeight: 'bold',
        color: '#222',
        marginBottom: height * 0.015,
        textAlign: 'center',
    },
    puntaje: {
        color: '#222',
        marginBottom: height * 0.03,
        textAlign: 'center',
    },
    botonReiniciar: {
        backgroundColor: '#4169E1',
        borderRadius: 8,
    },
});