import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
    const preguntasAleatorias = [...bancoPreguntas].sort(() => 0.5 - Math.random());
    return preguntasAleatorias.slice(0, 10);
};

export default function TriviaScreen() {
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
        backgroundColor: '#f4f4f4',
    },
    quizContainer: {
        marginTop: 40,
    },
    pregunta: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    opcion: {
        backgroundColor: '#e0e0e0',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    textoOpcion: {
        fontSize: 16,
    },
    tiempo: {
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center',
        color: '#555',
    },
    botonSiguiente: {
        marginTop: 20,
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    textoBoton: {
        color: '#fff',
        fontSize: 16,
    },
    opcionCorrecta: {
        backgroundColor: '#c8e6c9',
    },
    opcionIncorrecta: {
        backgroundColor: '#ffcdd2',
    },
    feedbackContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    correcto: {
        color: 'green',
        fontSize: 18,
        fontWeight: 'bold',
    },
    incorrecto: {
        color: 'red',
        fontSize: 18,
        fontWeight: 'bold',
    },
    respuestaCorrecta: {
        marginTop: 5,
        fontSize: 16,
        color: '#333',
    },
    finalContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    resultado: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    puntaje: {
        fontSize: 20,
        marginBottom: 30,
    },
    botonReiniciar: {
        backgroundColor: '#28a745',
        padding: 12,
        borderRadius: 8,
    },
});