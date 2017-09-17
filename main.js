'use strict';
const aplicacion =
{
    preguntas:
    {
        pregunta0:
        {
            pregunta: "Cual es la aerolinea mas antigua del mundo?",
            opcion1: "Avianca",
            opcion2: "KLM",
            opcion3: "Qantas",
            respuesta: "KLM",
        },
        pregunta1:
        {
            pregunta: "Cual es el el puerto mas largo del mundo?",
            opcion1: "Sangai",
            opcion2: "Singapor",
            opcion3: "Rotterdam",
            respuesta: "Sangai",
        },
        pregunta2:
        {
            pregunta: "Cual es la distancia mas larga de ciclismo?",
            opcion1: "89km",
            opcion2: "657km",
            opcion3: "337km",
            respuesta: "337km",
        },
        pregunta3:
        {
            pregunta: "Cual es la velociadad maxima de un autobus escolar?",
            opcion1: "590km/h",
            opcion2: "320km/h",
            opcion3: "245km/h",
            respuesta: "590km/h",
        },
        pregunta4:
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
    contCorrectas: undefined,
    incorrectas: undefined,
    h1Pregunta: undefined,
    btnOpcion1: undefined,
    btnOpcion2: undefined,
    btnOpcion3: undefined,
    arregloRespuestas: undefined,
    progreso: undefined,
    fechaAnterior: undefined,
    flechaSiguiente: undefined,
    btnEnviar: undefined,
    btnComenzar: undefined,
    iniciar: function()
    {
        aplicacion.total = Object.keys(aplicacion.preguntas).length;
        aplicacion.contador = 0;
        aplicacion.contCorrectas = 0;
        aplicacion.incorrectas = [];
        aplicacion.h1Pregunta = $("#pregunta");
        aplicacion.btnOpcion1 = $("#opcion1");
        aplicacion.btnOpcion2 = $("#opcion2");
        aplicacion.btnOpcion3 = $("#opcion3");
        aplicacion.arregloRespuestas = new Array(aplicacion.total);
        aplicacion.progreso = $("#progreso");
        aplicacion.fechaAnterior = $("#anterior");
        aplicacion.flechaSiguiente = $("#siguiente");
        aplicacion.btnEnviar = $("#btnEnviar");
        aplicacion.btnComenzar = $("#btnComenzar");
        aplicacion.establecer();
        aplicacion.mostrar();
    },
    establecer: function()
    {
        aplicacion.btnOpcion1.click(aplicacion.guardarRespuestas);
        aplicacion.btnOpcion2.click(aplicacion.guardarRespuestas);
        aplicacion.btnOpcion3.click(aplicacion.guardarRespuestas);
        aplicacion.fechaAnterior.click(aplicacion.anterior);
        aplicacion.flechaSiguiente.click(aplicacion.siguiente);
        aplicacion.btnEnviar.click(aplicacion.comprobar);
        aplicacion.btnComenzar.click(aplicacion.comenzar);

    },
    mostrar: function()
    {
        aplicacion.progreso.text(`${aplicacion.contador} de ${aplicacion.total} respondidas`);
        if(aplicacion.contador != aplicacion.total)
        {
           aplicacion.h1Pregunta.html(aplicacion.preguntas[`pregunta${aplicacion.contador}`].pregunta);
        aplicacion.btnOpcion1.html(aplicacion.preguntas[`pregunta${aplicacion.contador}`].opcion1);
        aplicacion.btnOpcion2.html(aplicacion.preguntas[`pregunta${aplicacion.contador}`].opcion2);
        aplicacion.btnOpcion3.html(aplicacion.preguntas[`pregunta${aplicacion.contador}`].opcion3);
        }
        else
        {
            let contenedorPreguntas = $("#contenedorPreguntas");
            contenedorPreguntas.toggleClass("oculto");
            let contenedorRespuestas = $("#contenedorRespuestas");
            contenedorRespuestas.toggleClass("oculto");
            aplicacion.crearLista();
        }
        
    },
    guardarRespuestas: function()
    {
        aplicacion.arregloRespuestas[aplicacion.contador] = $(this).text();
        console.log($(this).text());
        aplicacion.siguiente();
    },
    siguiente: function()
    {
        aplicacion.contador++;
        aplicacion.mostrar();
    },
    anterior: function()
    {
        aplicacion.contador--;
        aplicacion.mostrar();
    },
    crearLista: function()
    {
        let respuestas = $("#respuestas");
        let num = 0;
        for(let i in aplicacion.preguntas)
        {
            num++;
            let parrafo = $('<p/>');
            parrafo.text(`${num}. ${aplicacion.preguntas[i].pregunta} ${aplicacion.arregloRespuestas[num-1]}`);
            respuestas.append(parrafo);
        }
    },
    comprobar: function()
    {
        let cont = 0;
        let titulo = $("#titulo");
        let respuestas = $("#respuestas");
        for(let i in aplicacion.preguntas)
        {
            if(aplicacion.arregloRespuestas[cont] == aplicacion.preguntas[i].respuesta)
            {
                aplicacion.contCorrectas++;
            }
            else
            {
                aplicacion.incorrectas.push(cont);
                //console.log(respuestas.children("p")[0]);
            }
            cont++;
        }
        //console.log(aplicacion.incorrectas);
        titulo.text(`${aplicacion.contCorrectas} de ${aplicacion.total} correctas!`);
        for(let i in aplicacion.incorrectas)
        {
            respuestas.children("p")[aplicacion.incorrectas[i]].textContent += ` ${aplicacion.preguntas[`pregunta${aplicacion.incorrectas[i]}`].respuesta}`; 
            //console.log(respuestas.children("p")[aplicacion.incorrectas[i]].textContent)            
        }
        aplicacion.btnEnviar.toggleClass("oculto");
        aplicacion.btnComenzar.toggleClass("oculto");
    },
    comenzar: function()
    {
        aplicacion.iniciar();
        let contenedorPreguntas = $("#contenedorPreguntas");
            contenedorPreguntas.toggleClass("oculto");
            let contenedorRespuestas = $("#contenedorRespuestas");
            contenedorRespuestas.toggleClass("oculto");
    },
}

function comenzar()
{
    aplicacion.iniciar();
}

comenzar();