'use strict';
const aplicacion =
{
    preguntas:
    {
        pregunta0:
        {
            pregunta: "¿De qué película es esta imagen?",
            opcion1: "Aladino",
            opcion2: "El Rey León",
            opcion3: "La Sirenita",
            respuesta: "Aladino",
        },
        pregunta1:
        {
            pregunta: "¿Te suena familiar?",
            opcion1: "Pinocho",
            opcion2: "Frozen",
            opcion3: "La Bella Durmiente",
            respuesta: "Frozen",
        },
        pregunta2:
        {
            pregunta: "¿Recuerdas esta?",
            opcion1: "Enredados",
            opcion2: "Fantasía",
            opcion3: "Mulán",
            respuesta: "Mulán",
        },
        pregunta3:
        {
            pregunta: "¿Sabes cuál es esta película?",
            opcion1: "Buscando a Nemo",
            opcion2: "Toy Story",
            opcion3: "Enredados",
            respuesta: "Toy Story",
        },
        pregunta4:
        {
            pregunta: "¿Y esta?",
            opcion1: "Aladino",
            opcion2: "El Rey León",
            opcion3: "La Sirenita",
            respuesta: "El Rey León",
        },
    },
    arregloImagenes: undefined,
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
    flechaAnterior: undefined,
    flechaSiguiente: undefined,
    imagen: undefined,
    btnEnviar: undefined,
    btnComenzar: undefined,
    barra: undefined,
    secProgreso: undefined,
    iniciar: function()
    {
        aplicacion.arregloImagenes = ["img/aladino.jpg", "img/frozen.jpg", "img/mulan.jpg", "img/toystory.jpg", "img/elreyleon.jpg", "img/final.gif"];
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
        aplicacion.flechaAnterior = $("#anterior");
        aplicacion.flechaSiguiente = $("#siguiente");
        aplicacion.imagen = $("#imagen");
        aplicacion.btnEnviar = $("#btnEnviar");
        aplicacion.btnComenzar = $("#btnComenzar");
        aplicacion.barra = $("#barra");
        aplicacion.secProgreso = $("#secProgreso");
        aplicacion.establecer();
        aplicacion.mostrar();
    },
    establecer: function()
    {
        aplicacion.btnOpcion1.click(aplicacion.guardarRespuestas);
        aplicacion.btnOpcion2.click(aplicacion.guardarRespuestas);
        aplicacion.btnOpcion3.click(aplicacion.guardarRespuestas);
        aplicacion.flechaAnterior.click(aplicacion.anterior);
        aplicacion.flechaSiguiente.click(aplicacion.siguiente);
        aplicacion.btnEnviar.click(aplicacion.comprobar);
        aplicacion.btnComenzar.click(aplicacion.reiniciar);

    },
    mostrar: function()
    {
        let contenedorPreguntas = $("#contenedorPreguntas");
        let contenedorRespuestas = $("#contenedorRespuestas");
       aplicacion.imagen.attr("src", aplicacion.arregloImagenes[aplicacion.contador]); aplicacion.progreso.text(`${aplicacion.contador} de ${aplicacion.total} respondidas`);
        aplicacion.barra.attr("aria-valuenow", aplicacion.contador*20);
            aplicacion.barra.css("width", `${aplicacion.contador*20}%`);
        if(aplicacion.contador != aplicacion.total)
        {
            aplicacion.h1Pregunta.text(aplicacion.preguntas[`pregunta${aplicacion.contador}`].pregunta);
        aplicacion.btnOpcion1.text(aplicacion.preguntas[`pregunta${aplicacion.contador}`].opcion1);
            //aplicacion.btnOpcion1.css("color", "black");
        aplicacion.btnOpcion2.text(aplicacion.preguntas[`pregunta${aplicacion.contador}`].opcion2);
        aplicacion.btnOpcion3.text(aplicacion.preguntas[`pregunta${aplicacion.contador}`].opcion3);
            contenedorPreguntas.removeClass("oculto");
            contenedorRespuestas.addClass("oculto");
        }
        else if(aplicacion.contador == aplicacion.total)
        {
            contenedorPreguntas.addClass("oculto");
            contenedorRespuestas.removeClass("oculto");
            aplicacion.crearLista();
            //aplicacion.flechaSiguiente.addClass("disabled");
        }
        
    },
    guardarRespuestas: function()
    {
        aplicacion.arregloRespuestas[aplicacion.contador] = $(this).text();
        //$(this).css("color", "red");
        console.log($(this).text());
        aplicacion.siguiente();
    },
    siguiente: function()
    {
        if(aplicacion.contador >= 0 && aplicacion.contador <= aplicacion.total-1)
        {
            aplicacion.contador++;
        }
        if(aplicacion.arregloRespuestas[aplicacion.contador] == undefined)
        {
            aplicacion.flechaSiguiente.addClass("disabled");
            aplicacion.flechaSiguiente.unbind('click');
        }
        else
        {
            //aplicacion.flechaSiguiente.click(aplicacion.siguiente);
        }
        
        aplicacion.mostrar();
        aplicacion.flechaAnterior.removeClass("invisible");
        aplicacion.flechaSiguiente.removeClass("invisible");
        aplicacion.flechaAnterior.removeClass("disabled");
    },
    anterior: function()
    {
        if(aplicacion.contador >= 1 && aplicacion.contador <= 5)
        {
            aplicacion.contador--;
            aplicacion.flechaSiguiente.click(aplicacion.siguiente);
        }
        if(aplicacion.contador == 0)
        {
            aplicacion.flechaAnterior.addClass("disabled");
        }
        aplicacion.mostrar();
        aplicacion.flechaSiguiente.removeClass("disabled");
    },
    crearLista: function()
    {
        let respuestas = $("#respuestas");
        respuestas.empty();
        let num = 0;
        for(let i in aplicacion.preguntas)
        {
            num++;
            let parrafo = $('<h4/>');
            parrafo.text(`${num}. ${aplicacion.preguntas[i].pregunta} ${aplicacion.arregloRespuestas[num-1]}`);
            respuestas.append(parrafo);
        }
    },
    comprobar: function()
    {
        let cont = 0;
        let titulo = $("#titulo");
        let respuestas = $("#respuestas");
        aplicacion.secProgreso.addClass("oculto");
        aplicacion.flechaAnterior.addClass("oculto");
        aplicacion.flechaSiguiente.addClass("oculto");
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
            respuestas.children("h4")[aplicacion.incorrectas[i]].innerHTML += `<strong> ${aplicacion.preguntas[`pregunta${aplicacion.incorrectas[i]}`].respuesta}</strong>`; 
            respuestas.children("h4")[aplicacion.incorrectas[i]].style = "color: red";
            //console.log(respuestas.children("p")[aplicacion.incorrectas[i]].textContent)            
        }
        aplicacion.btnEnviar.toggleClass("oculto");
        aplicacion.btnComenzar.toggleClass("oculto");
    },
    reiniciar: function()
    {
        aplicacion.contador = 0;
        aplicacion.contCorrectas = 0;
        aplicacion.incorrectas = [];
        aplicacion.iniciar();
        aplicacion.arregloRespuestas = new Array(aplicacion.total);
        let contenedorPreguntas = $("#contenedorPreguntas");
            contenedorPreguntas.removeClass("oculto");
            let contenedorRespuestas = $("#contenedorRespuestas");
            contenedorRespuestas.addClass("oculto");
        aplicacion.mostrar();
        aplicacion.secProgreso.removeClass("oculto");
        aplicacion.flechaAnterior.removeClass("oculto");
        aplicacion.flechaSiguiente.removeClass("oculto");
        aplicacion.flechaAnterior.addClass("invisible");
        aplicacion.flechaSiguiente.addClass("invisible");
    },
}

function comenzar()
{
    aplicacion.iniciar();
}

comenzar();