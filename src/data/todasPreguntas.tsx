export interface Pregunta {
    pregunta: string;
    opciones: string[];
    respuestaCorrecta: string;
}

export const bancoPreguntas: Pregunta[] = [
    {
        pregunta: '¿Cuál de estos Pokémon es de tipo Fuego?',
        opciones: ['Bulbasaur', 'Squirtle', 'Charmander', 'Pikachu'],
        respuestaCorrecta: 'Charmander',
    },
    {
        pregunta: '¿De qué tipo es Pikachu?',
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
        pregunta: '¿Quién es el rival principal de Ash en la primera temporada del anime?',
        opciones: ['Gary', 'Brock', 'James', 'Tracey'],
        respuestaCorrecta: 'Gary',
    },
    {
        pregunta: '¿Qué Pokémon lleva una concha en su espalda?',
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
        pregunta: '¿Qué Pokémon se asemeja a una Pokébola?',
        opciones: ['Voltorb', 'Electrode', 'Koffing', 'Ditto'],
        respuestaCorrecta: 'Voltorb',
    },
    {
        pregunta: '¿Cuál es la evolución de Pichu?',
        opciones: ['Pikachu', 'Raichu', 'Electrode', 'Jolteon'],
        respuestaCorrecta: 'Pikachu',
    },
    {
        pregunta: '¿Cuál es el Pokémon fósil con forma de caparazón?',
        opciones: ['Omanyte', 'Kabuto', 'Aerodactyl', 'Anorith'],
        respuestaCorrecta: 'Omanyte',
    },
    {
        pregunta: '¿Qué tipo es super efectivo contra el tipo Fantasma?',
        opciones: ['Fantasma', 'Siniestro', 'Hada', 'Planta'],
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
        pregunta: '¿De qué tipo es Dratini?',
        opciones: ['Dragón', 'Agua', 'Volador', 'Psíquico'],
        respuestaCorrecta: 'Dragón',
    },
    {
        pregunta: '¿Qué Pokémon se comunica usando telepatía?',
        opciones: ['Mewtwo', 'Alakazam', 'Mr. Mime', 'Abra'],
        respuestaCorrecta: 'Mewtwo',
    },
    {
        pregunta: '¿Qué objeto permite evolucionar a Haunter en Gengar?',
        opciones: ['Piedra Lunar', 'Intercambio', 'Piedra Trueno', 'Piedra Fuego'],
        respuestaCorrecta: 'Intercambio',
    },
    {
        pregunta: '¿De qué tipo es el ataque "Psíquico"?',
        opciones: ['Psíquico', 'Fantasma', 'Normal', 'Hada'],
        respuestaCorrecta: 'Psíquico',
    },
    {
        pregunta: '¿Quién es el líder del gimnasio de Ciudad Azafrán?',
        opciones: ['Sabrina', 'Blaine', 'Misty', 'Lt. Surge'],
        respuestaCorrecta: 'Sabrina',
    },
    {
        pregunta: '¿Cuál es la evolución final de Eevee con Piedra Trueno?',
        opciones: ['Jolteon', 'Flareon', 'Vaporeon', 'Espeon'],
        respuestaCorrecta: 'Jolteon',
    },
    {
        pregunta: '¿Qué Pokémon es conocido por su habilidad "Tormenta de Arena"?',
        opciones: ['Tyranitar', 'Golem', 'Onix', 'Rhydon'],
        respuestaCorrecta: 'Tyranitar',
    },
    {
        pregunta: '¿Qué tipo es super efectivo contra el tipo Roca?',
        opciones: ['Agua', 'Planta', 'Lucha', 'Todos los anteriores'],
        respuestaCorrecta: 'Todos los anteriores',
    },
    {
        pregunta: '¿Cuál es la evolución de Eevee con alta amistad durante el día?',
        opciones: ['Espeon', 'Umbreon', 'Leafeon', 'Glaceon'],
        respuestaCorrecta: 'Espeon',
    },
    {
        pregunta: '¿Qué Pokémon tiene forma de girasol?',
        opciones: ['Sunflora', 'Bellossom', 'Oddish', 'Gloom'],
        respuestaCorrecta: 'Sunflora',
    },
    {
        pregunta: '¿Quién es el líder del gimnasio de Ciudad Celeste?',
        opciones: ['Erika', 'Blaine', 'Koga', 'Sabrina'],
        respuestaCorrecta: 'Erika',
    },
    {
        pregunta: '¿Cuál de estos Pokémon es de tipo Acero?',
        opciones: ['Magnemite', 'Geodude', 'Voltorb', 'Pikachu'],
        respuestaCorrecta: 'Magnemite',
    },
    {
        pregunta: '¿Qué Pokémon evoluciona con una Piedra Hoja?',
        opciones: ['Vileplume', 'Victreebel', 'Exeggutor', 'Gloom'],
        respuestaCorrecta: 'Vileplume',
    },
    {
        pregunta: '¿De qué tipo es el ataque "Terremoto"?',
        opciones: ['Tierra', 'Roca', 'Acero', 'Lucha'],
        respuestaCorrecta: 'Tierra',
    },
    {
        pregunta: '¿Cuál es la evolución final de Cyndaquil?',
        opciones: ['Typhlosion', 'Quilava', 'Houndoom', 'Magmar'],
        respuestaCorrecta: 'Typhlosion',
    },
    {
        pregunta: '¿Qué tipo es super efectivo contra el tipo Eléctrico?',
        opciones: ['Tierra', 'Agua', 'Planta', 'Roca'],
        respuestaCorrecta: 'Tierra',
    },
    {
        pregunta: '¿Cuál de estos Pokémon es de tipo Veneno?',
        opciones: ['Ekans', 'Pidgey', 'Rattata', 'Spearow'],
        respuestaCorrecta: 'Ekans',
    },
    {
        pregunta: '¿Qué Pokémon tiene la habilidad "Regeneración"?',
        opciones: ['Slowbro', 'Slowking', 'Corsola', 'Starmie'],
        respuestaCorrecta: 'Slowbro',
    },
    {
        pregunta: '¿Quién es el líder del gimnasio de Ciudad Verde?',
        opciones: ['Giovanni', 'Lt. Surge', 'Brock', 'Misty'],
        respuestaCorrecta: 'Giovanni',
    },
    {
        pregunta: '¿Cuál es la evolución de Chikorita?',
        opciones: ['Bayleef', 'Meganium', 'Turtwig', 'Grotle'],
        respuestaCorrecta: 'Bayleef',
    },
    {
        pregunta: '¿Qué tipo es super efectivo contra el tipo Dragón?',
        opciones: ['Hada', 'Dragón', 'Hielo', 'Todos los anteriores'],
        respuestaCorrecta: 'Todos los anteriores',
    },
    {
        pregunta: '¿Qué Pokémon evoluciona con una Piedra Sol?',
        opciones: ['Bellossom', 'Sunflora', 'Sunkern', 'Todos los anteriores'],
        respuestaCorrecta: 'Todos los anteriores',
    },
    {
        pregunta: '¿Cuál de estos Pokémon es de tipo Bicho/Volador?',
        opciones: ['Scyther', 'Pinsir', 'Heracross', 'Ledyba'],
        respuestaCorrecta: 'Scyther',
    },
    {
        pregunta: '¿Cuál es la evolución de Mareep?',
        opciones: ['Flaaffy', 'Ampharos', 'Electabuzz', 'Manectric'],
        respuestaCorrecta: 'Flaaffy',
    },
    {
        pregunta: '¿Qué Pokémon tiene forma de tortuga?',
        opciones: ['Squirtle', 'Turtwig', 'Blastoise', 'Wartortle'],
        respuestaCorrecta: 'Squirtle',
    },
    {
        pregunta: '¿Quién es el líder del gimnasio de Ciudad Carmín?',
        opciones: ['Lt. Surge', 'Misty', 'Brock', 'Erika'],
        respuestaCorrecta: 'Lt. Surge',
    },
    {
        pregunta: '¿De qué tipo es el ataque "Danza Dragón"?',
        opciones: ['Dragón', 'Normal', 'Lucha', 'Volador'],
        respuestaCorrecta: 'Dragón',
    },
    {
        pregunta: '¿Qué tipo es super efectivo contra el tipo Volador?',
        opciones: ['Eléctrico', 'Hielo', 'Roca', 'Todos los anteriores'],
        respuestaCorrecta: 'Todos los anteriores',
    },
    {
        pregunta: '¿Cuál es la evolución final de Larvitar?',
        opciones: ['Tyranitar', 'Pupitar', 'Golem', 'Rhydon'],
        respuestaCorrecta: 'Tyranitar',
    },
    {
        pregunta: '¿Qué Pokémon tiene forma de perro?',
        opciones: ['Growlithe', 'Houndour', 'Poochyena', 'Todos los anteriores'],
        respuestaCorrecta: 'Todos los anteriores',
    },
    {
        pregunta: '¿Quién es el líder del gimnasio de Ciudad Pirita?',
        opciones: ['Roark', 'Gardenia', 'Fantina', 'Crasher Wake'],
        respuestaCorrecta: 'Roark',
    },
    {
        pregunta: '¿Qué tipo es super efectivo contra el tipo Psíquico?',
        opciones: ['Bicho', 'Fantasma', 'Siniestro', 'Todos los anteriores'],
        respuestaCorrecta: 'Todos los anteriores',
    },
    {
        pregunta: '¿Cuál es la evolución de Ralts?',
        opciones: ['Kirlia', 'Gardevoir', 'Gallade', 'Medicham'],
        respuestaCorrecta: 'Kirlia',
    },
    {
        pregunta: '¿Qué tipo es super efectivo contra el tipo Hielo?',
        opciones: ['Fuego', 'Lucha', 'Roca', 'Todos los anteriores'],
        respuestaCorrecta: 'Todos los anteriores',
    },
    {
        pregunta: '¿Cuál es la evolución final de Piplup?',
        opciones: ['Empoleon', 'Prinplup', 'Buizel', 'Floatzel'],
        respuestaCorrecta: 'Empoleon',
    },
    {
        pregunta: '¿Qué Pokémon es un pájaro legendario?',
        opciones: ['Moltres', 'Zapdos', 'Articuno', 'Todos los anteriores'],
        respuestaCorrecta: 'Todos los anteriores',
    },
    {
        pregunta: '¿Quién es el líder del gimnasio de Ciudad Canal?',
        opciones: ['Byron', 'Candice', 'Maylene', 'Crasher Wake'],
        respuestaCorrecta: 'Byron',
    },
    {
        pregunta: '¿Qué tipo es super efectivo contra el tipo Siniestro?',
        opciones: ['Hada', 'Lucha', 'Bicho', 'Todos los anteriores'],
        respuestaCorrecta: 'Todos los anteriores',
    },
    {
        pregunta: '¿Cuál es la evolución de Turtwig?',
        opciones: ['Grotle', 'Torterra', 'Bulbasaur', 'Ivysaur'],
        respuestaCorrecta: 'Grotle',
    },
    {
        pregunta: '¿Qué tipo es super efectivo contra el tipo Hada?',
        opciones: ['Acero', 'Veneno', 'Fuego', 'Todos los anteriores'],
        respuestaCorrecta: 'Acero',
    },
    {
        pregunta: '¿Cuál es la evolución final de Chimchar?',
        opciones: ['Infernape', 'Monferno', 'Blaziken', 'Combusken'],
        respuestaCorrecta: 'Infernape',
    },
    {
        pregunta: '¿Qué Pokémon tiene forma de serpiente?',
        opciones: ['Ekans', 'Arbok', 'Seviper', 'Todos los anteriores'],
        respuestaCorrecta: 'Todos los anteriores',
    },
    {
        pregunta: '¿Quién es el líder del gimnasio de Ciudad Trigal?',
        opciones: ['Elesa', 'Clay', 'Skyla', 'Burgh'],
        respuestaCorrecta: 'Elesa',
    },
    {
        pregunta: '¿Qué tipo es super efectivo contra el tipo Lucha?',
        opciones: ['Volador', 'Psíquico', 'Hada', 'Todos los anteriores'],
        respuestaCorrecta: 'Todos los anteriores',
    },
    {
        pregunta: '¿Cuál es la evolución de Oshawott?',
        opciones: ['Dewott', 'Samurott', 'Buizel', 'Floatzel'],
        respuestaCorrecta: 'Dewott',
    },
    {
        pregunta: '¿Qué tipo es super efectivo contra el tipo Veneno?',
        opciones: ['Tierra', 'Psíquico', 'Bicho', 'Hada'],
        respuestaCorrecta: 'Tierra',
    },
    {
        pregunta: '¿Cuál es la evolución final de Tepig?',
        opciones: ['Emboar', 'Pignite', 'Quilava', 'Typhlosion'],
        respuestaCorrecta: 'Emboar',
    },
    {
        pregunta: '¿Qué Pokémon tiene forma de pez?',
        opciones: ['Magikarp', 'Goldeen', 'Seaking', 'Todos los anteriores'],
        respuestaCorrecta: 'Todos los anteriores',
    },
    {
        pregunta: '¿Quién es el líder del gimnasio de Ciudad Arenisca?',
        opciones: ['Cilan', 'Chili', 'Cress', 'Lenora'],
        respuestaCorrecta: 'Cilan',
    },
    {
        pregunta: '¿Cuál es el Pokémon número 10 en la Pokédex Nacional?',
        opciones: ['Caterpie', 'Weedle', 'Pidgey', 'Rattata'],
        respuestaCorrecta: 'Caterpie',
    },
    {
        pregunta: '¿De qué tipo es Blastoise en su forma final?',
        opciones: ['Agua', 'Agua/Roca', 'Agua/Volador', 'Agua/Acero'],
        respuestaCorrecta: 'Agua',
    },
    {
        pregunta: '¿Cuál es la evolución de Weedle?',
        opciones: ['Kakuna', 'Beedrill', 'Butterfree', 'Metapod'],
        respuestaCorrecta: 'Kakuna',
    },
    {
        pregunta: '¿Qué Pokémon es conocido por su habilidad "Hidratación"?',
        opciones: ['Lapras', 'Seel', 'Dewgong', 'Vaporeon'],
        respuestaCorrecta: 'Vaporeon',
    },
    {
        pregunta: '¿Cuál de estos Pokémon es un legendario de tipo Eléctrico?',
        opciones: ['Raikou', 'Entei', 'Suicune', 'Ho-Oh'],
        respuestaCorrecta: 'Raikou',
    },
    {
        pregunta: '¿Cuál es el tipo de Feraligatr?',
        opciones: ['Agua', 'Agua/Tierra', 'Agua/Dragón', 'Agua/Hielo'],
        respuestaCorrecta: 'Agua',
    },
    {
        pregunta: '¿Qué objeto permite evolucionar a Poliwhirl en Poliwrath?',
        opciones: ['Piedra Agua', 'Piedra Lunar', 'Intercambio', 'Piedra Trueno'],
        respuestaCorrecta: 'Piedra Agua',
    },
    {
        pregunta: '¿De qué tipo es el ataque "Rayo Hielo"?',
        opciones: ['Hielo', 'Agua', 'Eléctrico', 'Normal'],
        respuestaCorrecta: 'Hielo',
    },
    {
        pregunta: '¿Cuál es el Pokémon inicial de tipo Planta en la región Hoenn?',
        opciones: ['Treecko', 'Torchic', 'Mudkip', 'Chikorita'],
        respuestaCorrecta: 'Treecko',
    },
    {
        pregunta: '¿Qué Pokémon tiene una flor en su espalda?',
        opciones: ['Roselia', 'Sunflora', 'Bellossom', 'Lileep'],
        respuestaCorrecta: 'Roselia',
    },
    {
        pregunta: '¿Cuál es la evolución de Seel?',
        opciones: ['Dewgong', 'Seaking', 'Golduck', 'Tentacool'],
        respuestaCorrecta: 'Dewgong',
    },
    {
        pregunta: '¿Cuál de estos ataques es de tipo Roca?',
        opciones: ['Roca Afilada', 'Puño Trueno', 'Hoja Afilada', 'Danza Dragón'],
        respuestaCorrecta: 'Roca Afilada',
    },
    {
        pregunta: '¿Cuál es el tipo de Steelix?',
        opciones: ['Acero/Tierra', 'Acero/Roca', 'Acero/Agua', 'Acero/Volador'],
        respuestaCorrecta: 'Acero/Tierra',
    },
    {
        pregunta: '¿Qué Pokémon es conocido por su habilidad "Fuego Interno"?',
        opciones: ['Magmar', 'Flareon', 'Charizard', 'Typhlosion'],
        respuestaCorrecta: 'Magmar',
    },
    {
        pregunta: '¿Quién es el líder del gimnasio de Ciudad Malva?',
        opciones: ['Falkner', 'Bugsy', 'Whitney', 'Morty'],
        respuestaCorrecta: 'Falkner',
    },
    {
        pregunta: '¿Cuál de estos Pokémon es una evolución de Tyrogue?',
        opciones: ['Hitmonlee', 'Machop', 'Primeape', 'Poliwrath'],
        respuestaCorrecta: 'Hitmonlee',
    },
    {
        pregunta: '¿Qué Pokémon tiene la habilidad "Absorbe Agua"?',
        opciones: ['Lapras', 'Quagsire', 'Politoed', 'Wooper'],
        respuestaCorrecta: 'Quagsire',
    },
    {
        pregunta: '¿Cuál es el tipo de Lugia?',
        opciones: ['Psíquico/Volador', 'Dragón/Volador', 'Agua/Volador', 'Fuego/Volador'],
        respuestaCorrecta: 'Psíquico/Volador',
    },
    {
        pregunta: '¿Qué Pokémon puede transformarse en cualquier Pokémon?',
        opciones: ['Ditto', 'Mew', 'Smeargle', 'Porygon'],
        respuestaCorrecta: 'Ditto',
    },
    {
        pregunta: '¿Cuál es la evolución de Igglybuff?',
        opciones: ['Jigglypuff', 'Wigglytuff', 'Cleffa', 'Togepi'],
        respuestaCorrecta: 'Jigglypuff',
    },
    {
        pregunta: '¿Qué Pokémon fósil tiene forma de insecto?',
        opciones: ['Anorith', 'Kabuto', 'Omanyte', 'Lileep'],
        respuestaCorrecta: 'Anorith',
    },
    {
        pregunta: '¿Cuál es la evolución de Geodude?',
        opciones: ['Graveler', 'Golem', 'Rhyhorn', 'Onix'],
        respuestaCorrecta: 'Graveler',
    },
    {
        pregunta: '¿Qué Pokémon tiene múltiples formas regionales?',
        opciones: ['Meowth', 'Ponyta', 'Vulpix', 'Todos los anteriores'],
        respuestaCorrecta: 'Todos los anteriores',
    },
    {
        pregunta: '¿De qué tipo es Larvitar?',
        opciones: ['Roca/Tierra', 'Dragón/Tierra', 'Roca/Acero', 'Tierra/Planta'],
        respuestaCorrecta: 'Roca/Tierra',
    },
    {
        pregunta: '¿Qué Pokémon usa telequinesis para pelear?',
        opciones: ['Alakazam', 'Kadabra', 'Slowbro', 'Hypno'],
        respuestaCorrecta: 'Alakazam',
    },
    {
        pregunta: '¿Cuál es el Pokémon número 251 en la Pokédex Nacional?',
        opciones: ['Celebi', 'Lugia', 'Ho-Oh', 'Mew'],
        respuestaCorrecta: 'Celebi',
    },
    {
        pregunta: '¿Qué Pokémon es de tipo Eléctrico/Acero?',
        opciones: ['Magnezone', 'Electabuzz', 'Jolteon', 'Rotom'],
        respuestaCorrecta: 'Magnezone',
    },
    {
        pregunta: '¿Cuál es la evolución final de Torchic?',
        opciones: ['Blaziken', 'Combusken', 'Infernape', 'Magmortar'],
        respuestaCorrecta: 'Blaziken',
    },
    {
        pregunta: '¿Qué Pokémon tiene forma de camello?',
        opciones: ['Numel', 'Camerupt', 'Hippopotas', 'Sandshrew'],
        respuestaCorrecta: 'Numel',
    },
    {
        pregunta: '¿Quién es el líder del gimnasio de Ciudad Lavacalda?',
        opciones: ['Flannery', 'Norman', 'Winona', 'Wattson'],
        respuestaCorrecta: 'Flannery',
    },
    {
        pregunta: '¿Cuál es la evolución de Bagon?',
        opciones: ['Shelgon', 'Salamence', 'Beldum', 'Metang'],
        respuestaCorrecta: 'Shelgon',
    },
    {
        pregunta: '¿Cuál es la evolución final de Mudkip?',
        opciones: ['Swampert', 'Marshtomp', 'Quagsire', 'Whiscash'],
        respuestaCorrecta: 'Swampert',
    },
    {
        pregunta: '¿Qué Pokémon tiene forma de ciervo?',
        opciones: ['Stantler', 'Sawsbuck', 'Deerling', 'Todos los anteriores'],
        respuestaCorrecta: 'Todos los anteriores',
    },
    {
        pregunta: '¿Quién es el líder del gimnasio de Ciudad Azuliza?',
        opciones: ['Brawly', 'Roxanne', 'Tate & Liza', 'Juan'],
        respuestaCorrecta: 'Brawly',
    },
    {
        pregunta: '¿Cuál es la evolución de Shinx?',
        opciones: ['Luxio', 'Luxray', 'Electrike', 'Manectric'],
        respuestaCorrecta: 'Luxio',
    },
    {
        pregunta: '¿Cuál es la evolución final de Turtwig?',
        opciones: ['Torterra', 'Grotle', 'Abomasnow', 'Roserade'],
        respuestaCorrecta: 'Torterra',
    },
    {
        pregunta: '¿Qué Pokémon tiene forma de pingüino?',
        opciones: ['Piplup', 'Empoleon', 'Prinplup', 'Todos los anteriores'],
        respuestaCorrecta: 'Todos los anteriores',
    },
    {
        pregunta: '¿Cuál es la evolución de Chimchar?',
        opciones: ['Monferno', 'Infernape', 'Pansear', 'Simisear'],
        respuestaCorrecta: 'Monferno',
    },
    {
        pregunta: '¿Qué Pokémon tiene forma de búho?',
        opciones: ['Hoothoot', 'Noctowl', 'Rowlet', 'Todos los anteriores'],
        respuestaCorrecta: 'Todos los anteriores',
    },
    {
        pregunta: '¿Quién es el líder del gimnasio de Ciudad Luminaria?',
        opciones: ['Clemont', 'Viola', 'Korrina', 'Ramos'],
        respuestaCorrecta: 'Clemont',
    },
    {
        pregunta: '¿Cuál es la evolución de Froakie?',
        opciones: ['Frogadier', 'Greninja', 'Poliwag', 'Tympole'],
        respuestaCorrecta: 'Frogadier',
    },
    {
        pregunta: '¿Cuál es la evolución final de Fennekin?',
        opciones: ['Delphox', 'Braixen', 'Simisear', 'Pansear'],
        respuestaCorrecta: 'Delphox',
    },
    {
        pregunta: '¿Qué Pokémon tiene forma de zorro?',
        opciones: ['Vulpix', 'Ninetales', 'Zoroark', 'Todos los anteriores'],
        respuestaCorrecta: 'Todos los anteriores',
    },
    {
        pregunta: '¿Quién es el líder del gimnasio de Ciudad Gres?',
        opciones: ['Kabu', 'Nessa', 'Milo', 'Bea'],
        respuestaCorrecta: 'Kabu',
    },
    {
        pregunta: '¿Cuál es la evolución de Litten?',
        opciones: ['Torracat', 'Incineroar', 'Purrloin', 'Litleo'],
        respuestaCorrecta: 'Torracat',
    },
    {
        pregunta: '¿Cuál es la evolución final de Popplio?',
        opciones: ['Primarina', 'Brionne', 'Dewgong', 'Sealeo'],
        respuestaCorrecta: 'Primarina',
    },
    {
        pregunta: '¿Qué Pokémon tiene forma de pato?',
        opciones: ['Psyduck', 'Golduck', 'Farfetch’d', 'Todos los anteriores'],
        respuestaCorrecta: 'Todos los anteriores',
    },
    {
        pregunta: '¿Quién es el líder del gimnasio de Ciudad Circhester?',
        opciones: ['Melony', 'Gordie', 'Piers', 'Raihan'],
        respuestaCorrecta: 'Melony',
    },
    {
        pregunta: '¿Cuál es la evolución de Grookey?',
        opciones: ['Thwackey', 'Rillaboom', 'Bounsweet', 'Steenee'],
        respuestaCorrecta: 'Thwackey',
    },
    {
        pregunta: '¿Cuál es la evolución final de Scorbunny?',
        opciones: ['Cinderace', 'Raboot', 'Incineroar', 'Torracat'],
        respuestaCorrecta: 'Cinderace',
    },
    {
        pregunta: '¿Qué Pokémon tiene forma de conejo?',
        opciones: ['Buneary', 'Lopunny', 'Azumarill', 'Todos los anteriores'],
        respuestaCorrecta: 'Todos los anteriores',
    },
    {
        pregunta: '¿Quién es el líder del gimnasio de Ciudad Turffield?',
        opciones: ['Milo', 'Nessa', 'Kabu', 'Bea'],
        respuestaCorrecta: 'Milo',
    },
    {
        pregunta: '¿Cuál es la evolución de Sobble?',
        opciones: ['Drizzile', 'Inteleon', 'Quaxly', 'Quaxwell'],
        respuestaCorrecta: 'Drizzile',
    },
    {
        pregunta: '¿Cuál es la evolución final de Sprigatito?',
        opciones: ['Meowscarada', 'Floragato', 'Tinkaton', 'Glimmora'],
        respuestaCorrecta: 'Meowscarada',
    },
    {
        pregunta: '¿Qué Pokémon tiene forma de gato?',
        opciones: ['Meowth', 'Espurr', 'Litten', 'Todos los anteriores'],
        respuestaCorrecta: 'Todos los anteriores',
    }
];