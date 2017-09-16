'use strict';
const aplicacion =
{
    preguntas:
    {
        pregunta1:
        {
            pregunta: "Cual es la aerolinea mas antigua del mundo?",
            opcion1: "Avianca",
            opcion2: "KLM",
            opcion3: "Qantas",
            respuesta: "KLM",
        },
        pregunta2:
        {
            pregunta: "Cual es el el puerto mas largo del mundo?",
            opcion1: "Sangai",
            opcion2: "Singapor",
            opcion3: "Rotterdam",
            respuesta: "Sangai",
        },
        pregunta3:
        {
            pregunta: "Cual es la distancia mas larga de ciclismo?",
            opcion1: "89km",
            opcion2: "657km",
            opcion3: "337km",
            respuesta: "337km",
        },
        pregunta4:
        {
            pregunta: "Cual es la velociadad maxima de un autobus escolar?",
            opcion1: "590km/h",
            opcion2: "320km/h",
            opcion3: "245km/h",
            respuesta: "590km",
        },
        pregunta5:
        {
            pregunta: "Cual es el viaje mas largo en un carro a gas?",
            opcion1: "2617km",
            opcion2: "3568km",
            opcion3: "1732km",
            respuesta: "2617km",
        },
    },
    total: undefined,
    contador: undefined,
    correctas: undefined,
    iniciar: function()
    {
        aplicacion.total = Object.keys(aplicacion.preguntas).length;
        aplicacion.contador = 0;
        aplicacion.correctas = 0;
    }
}

function comenzar()
{
    aplicacion.iniciar();
}

comenzar();