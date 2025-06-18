import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { bancoPreguntas, Pregunta } from '../../src/data/todasPreguntas';

const obtenerPreguntasAleatorias = (): Pregunta[] => {
    const preguntasAleatorias = [...bancoPreguntas].sort(() => 0.5 - Math.random());
    return preguntasAleatorias.slice(0, 10);
};

export default function TriviaScreen() {
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
        setRespuestaSeleccionada(''); // Usuario no respondió
        setEsCorrecta(false);
        limpiarTimer();
    };

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

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {!finalizado ? (
                <View style={styles.quizContainer}>
                    <Text style={styles.ronda}>Ronda {indiceActual + 1} de 10</Text>
                    <Text style={styles.pregunta}>{preguntaActual.pregunta}</Text>

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
                                style={[styles.opcion, mostrarColor]}
                                disabled={respuestaSeleccionada !== null}
                                onPress={() => manejarRespuesta(opcion)}
                            >
                                <Text style={styles.textoOpcion}>{opcion}</Text>
                            </TouchableOpacity>
                        );
                    })}

                    <Text style={styles.tiempo}>Tiempo restante: {tiempoRestante}s</Text>

                    {respuestaSeleccionada !== null && (
                        <View style={styles.feedbackContainer}>
                            {esCorrecta ? (
                                <Text style={styles.correcto}>✅ ¡Correcto!</Text>
                            ) : (
                                <>
                                    <Text style={styles.incorrecto}>❌ Incorrecto</Text>
                                    <Text style={styles.respuestaCorrecta}>
                                        ✅ Respuesta correcta: {preguntaActual.respuestaCorrecta}
                                    </Text>
                                </>
                            )}
                            <TouchableOpacity style={styles.botonSiguiente} onPress={siguientePregunta}>
                                <Text style={styles.textoBoton}>Siguiente</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            ) : (
                <View style={styles.finalContainer}>
                    <Text style={styles.resultado}>¡Juego terminado!</Text>
                    <Text style={styles.puntaje}>
                        Puntaje: {puntaje} / {preguntas.length}
                    </Text>
                    <TouchableOpacity style={styles.botonReiniciar} onPress={reiniciarJuego}>
                        <Text style={styles.textoBoton}>Reiniciar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fea400', // Amarillo similar al de la imagen
    },
    quizContainer: {
        marginTop: 20, // Ajustado para dar espacio al texto de ronda
    },
    ronda: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000', // Negro para el texto de ronda
        textAlign: 'center',
        marginBottom: 10,
    },
    pregunta: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000000', // Negro para contraste con fondo amarillo
    },
    opcion: {
        backgroundColor: '#4169E1', // Azul real para opciones
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    textoOpcion: {
        fontSize: 16,
        color: '#FFFFFF', // Blanco para texto de opciones
    },
    tiempo: {
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center',
        color: '#000000', // Negro para tiempo
    },
    botonSiguiente: {
        marginTop: 20,
        backgroundColor: '#4169E1', // Azul para consistencia
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    textoBoton: {
        color: '#FFFFFF', // Blanco para texto de botones
        fontSize: 16,
    },
    opcionCorrecta: {
        backgroundColor: '#4CAF50', // Verde para opción correcta
    },
    opcionIncorrecta: {
        backgroundColor: '#cc3300', // Rojo para opción incorrecta
    },
    feedbackContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    correcto: {
        color: '#000000', // Negro para "Correcto"
        fontSize: 18,
        fontWeight: 'bold',
    },
    incorrecto: {
        color: '#000000', // Negro para "Incorrecto"
        fontSize: 18,
        fontWeight: 'bold',
    },
    respuestaCorrecta: {
        marginTop: 5,
        fontSize: 16,
        color: '#000000', // Negro para respuesta correcta
    },
    finalContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    resultado: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000', // Negro para resultado
        marginBottom: 20,
    },
    puntaje: {
        fontSize: 20,
        color: '#000000', // Negro para puntaje
        marginBottom: 30,
    },
    botonReiniciar: {
        backgroundColor: '#4169E1', // Azul para consistencia
        padding: 12,
        borderRadius: 8,
    },
});