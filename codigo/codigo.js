//Variables
const BotonPokemon = document .getElementById("selecionar-pokemon")

const sectionseleccionarataque = document.getElementById("Seleccionar-ataque")

const botonreiniciar = document.getElementById("boton-reiniciar")
const sectionreiniciar = document.getElementById("boton-reiniciar")

const sectionseleccionarpokemon = document.getElementById("Selecionar-mascota")
const spanPokemonElegido = document.getElementById("pokemon-elegido")

const spanPokemonPc = document.getElementById("pokemon-enemigo")

const sectionmensajes = document.getElementById("resultado")
const ataquedejugador = document.getElementById("ataque-de-jugador")
const ataquedepc = document.getElementById("ataque-de-pc")

const spanvidasjugador = document.getElementById("vidasjugador")
const spanvidasenemigo = document.getElementById("vidasenemigo")
const contenedortarjetas = document.getElementById("contenedortarjetas")
const contenedorataques = document.getElementById("contenedorataques")

const sectionmapa = document.getElementById("ver-mapa")
const canvas = document.getElementById("mapa")

let pokemones = []
let ataquejugador = []
let ataquepc = []
let opcionpokemon
let inputFloracorn
let inputPyrolynx
let inputAquanix
let pokemonjugador
let ataquespokemon
let ataquespokemonenemigo
let botonfuego 
let botonagua 
let botonplanta  
let botones = []
let indexataquejugador
let indexataqueenemigo
let victoriasjugador = 0
let victoriaspc = 0
let vidaspokemonjugador = 3
let vidaspokemonenemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo

class Pokemon {
    constructor(nombre, foto, vida,) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x = 20
        this.y = 30
        this.ancho = 80
        this.alto = 80
        this.mapafoto = new Image()
        this.mapafoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }
}

let floracorn = new Pokemon("Floracorn", "./assets/pokemon1.png", 3)

let pyrolynx = new Pokemon("Pyrolynx", "./assets/pokemon2.png", 3)

let aquanix = new Pokemon("Aquanix", "./assets/pokemon3.png", 3)

floracorn.ataques.push(
    { nombre: "🌱", id: "boton-planta" },
    { nombre: "🌱", id: "boton-planta" },
    { nombre: "🌱", id: "boton-planta" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💧", id: "boton-agua" },
)

pyrolynx.ataques.push(
    { nombre: "🔥", id: "botonfuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🌱", id: "boton-planta" },
)

aquanix.ataques.push(
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🌱", id: "boton-planta" },
)

pokemones.push(floracorn, pyrolynx, aquanix)

//Iniciar juego
function startgame() {
    sectionseleccionarataque.style.display = "none"
    sectionmapa.style.display = "none"

    pokemones.forEach((pokemones) => {
        opcionpokemon = `
        <input type="radio" id=${pokemones.nombre} name="Pokemon" />
        <label class="labeldepokemon" for=${pokemones.nombre}>
            <p>${pokemones.nombre}</p>
            <img src=${pokemones.foto} alt=${pokemones.nombre}>
        </label>
        `
    contenedortarjetas.innerHTML += opcionpokemon

     inputFloracorn = document.getElementById("Floracorn")
     inputPyrolynx = document.getElementById("Pyrolynx")
     inputAquanix = document.getElementById("Aquanix")
    })
    BotonPokemon.addEventListener("click", seleccionarPokemon)
  
    botonreiniciar.addEventListener("click", reiniciarjuego)
    sectionreiniciar.style.display = "none"
}

//seleccionar Pokemon(jugador)
function seleccionarPokemon() {
   // sectionseleccionarataque.style.display = "flex"

    sectionmapa.style.display = "flex"
    intervalo = setInterval(pintarpokemon, 50)


    sectionseleccionarpokemon.style.display = "none"
    if (inputFloracorn.checked) {
        spanPokemonElegido.innerHTML = "Jugador: " + inputFloracorn.id
        pokemonjugador = inputFloracorn.id
        extraerataques(pokemonjugador)
        seleccionarpokemonpc()
    } else if (inputPyrolynx.checked) {
        spanPokemonElegido.innerHTML = "Jugador: " + inputPyrolynx.id
        pokemonjugador = inputPyrolynx.id
        extraerataques(pokemonjugador)
        seleccionarpokemonpc()
    } else if (inputAquanix.checked) {
        spanPokemonElegido.innerHTML = "Jugador: " + inputAquanix.id
        pokemonjugador = inputAquanix.id
        extraerataques(pokemonjugador)
        seleccionarpokemonpc()
    } else {alert("por favor recarga la página y selecciona algo")
        extraerataques(pokemonjugador)
        seleccionarpokemonpc()
    }

}

function extraerataques() {
    let ataques
    for (let i = 0; i < pokemones.length; i++) {
        if (pokemonjugador == pokemones[i].nombre) {
            ataques = pokemones[i].ataques
        } 
    }
    mostrarataques(ataques)
}

function mostrarataques(ataques) {
    ataques.forEach((ataque) => {
        ataquespokemon = `
        <button id=${ataque.id} class="ataque-elemental BATataque">${ataque.nombre}</button>
        `
        contenedorataques.innerHTML += ataquespokemon
    })
    let botonfuego 
    botonagua = document.getElementById("boton-agua")
    botonplanta = document.getElementById("boton-planta")
    botonfuego = document.getElementById("boton-fuego")
    botones = document.querySelectorAll(".BATataque")
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                ataquejugador.push("FUEGO")
                console.log(ataquejugador)
                boton.style.background = "#112f58"
                boton.disabled=true
            } else if (e.target.textContent === "💧") {
                ataquejugador.push("AGUA")
                console.log(ataquejugador)
                boton.style.background = "#112f58"
                boton.disabled=true
            } else {
                ataquejugador.push("PLANTA")
                console.log(ataquejugador)
                boton.style.background = "#112f58"
                boton.disabled=true
            }
            ataqueenemigo()
        })
    })
    
}
//seleccionar Pokemon (pc)
function seleccionarpokemonpc() {
    let pokemonaleatorio = aleatorio(0, pokemones.length - 1)
    spanPokemonPc.innerHTML = "Enemigo: " + pokemones[pokemonaleatorio].nombre
    ataquespokemonenemigo = pokemones[pokemonaleatorio].ataques
    secuenciaAtaque()
}

function aleatorio(min, max) {
    return Math.floor( Math.random() *(max - min + 1) + min)
}

//ATAQUE PC
function ataqueenemigo() {
    let ataquealeatorio = aleatorio(1,ataquespokemonenemigo.length -1)
    if (ataquealeatorio == 0 || ataquealeatorio == 1) {
        ataquepc.push( "FUEGO")
    } else if (ataquealeatorio == 3 || ataquealeatorio == 4) {
        ataquepc.push("AGUA") 
    } else {
        ataquepc.push("PLANTA")
    }
    console.log(ataquepc)
    iniciarcombate()
}

function iniciarcombate() {
    if (ataquejugador.length == 5) {
        combate()
    }
}

function indexambosataques(jugador, pc) {
    indexataquejugador = ataquejugador[jugador]
    indexataqueenemigo = ataquepc[pc]

}

//COMBATE
function combate() {
    
    for (let index = 0; index < ataquejugador.length; index++) {
        if(ataquejugador[index] == ataquepc[index]) {
            indexambosataques(index, index)
            crearmensaje("EMPATE")
        } else if(ataquejugador[index] == "FUEGO" && ataquepc[index] == "PLANTA") {
            indexambosataques(index, index)
            crearmensaje("GANASTE🎉")
            victoriasjugador++
            spanvidasjugador.innerHTML = victoriasjugador
        } else if (ataquejugador[index] == "AGUA" && ataquepc[index] == "FUEGO"){
            indexambosataques(index, index)
            crearmensaje("GANASTE🎉")
            victoriasjugador++
            spanvidasjugador.innerHTML = victoriasjugador
        } else if(ataquejugador[index] == "PLANTA" && ataquepc[index] == "AGUA") {
            indexambosataques(index, index)
            crearmensaje("GANASTE🎉")
            victoriasjugador++
            spanvidasjugador.innerHTML = victoriasjugador
        } else {
            indexambosataques(index, index)
            crearmensaje("PERDISTE😥")
            victoriaspc++
            spanvidasenemigo.innerHTML = victoriaspc
        }
    }
    
    final()
}

//Final del combate

function crearmensaje(resultadodecombate) {
    let nuevoataquejugador = document.createElement("p")
    let nuevoataqueenemigo = document.createElement("p")
    let resultadojugador = ""
    let resultadoenemigo = ""
    if (resultadodecombate == "EMPATE") {
        resultadojugador = "🟡"
        resultadoenemigo = "🟡"
    } else if (resultadodecombate == "GANASTE🎉") {
        resultadojugador = "✅"
        resultadoenemigo = "❌"
    } else {
        resultadojugador = "❌"
        resultadoenemigo = "✅"
    }

    sectionmensajes.innerHTML = resultadodecombate
    nuevoataquejugador.innerHTML = indexataquejugador + resultadojugador
    nuevoataqueenemigo.innerHTML = indexataqueenemigo + resultadoenemigo
    ataquedejugador.appendChild(nuevoataquejugador)
    ataquedepc.appendChild(nuevoataqueenemigo)
}

function final() {
    let parrafo = document.createElement("p")
    if (victoriasjugador == victoriaspc) {
        alert("Final del combate. Tuviste " + victoriasjugador + " victoria/s, y tu enemigo ha quedado con " + victoriaspc + " victoria/s, eso significa que el juego ha quedado en empate.")
    mensajefinal("El juego ha quedado en empate")
    } else if (victoriasjugador > victoriaspc){
        alert("Final del combate. Tuviste " + victoriasjugador + " victoria/s, y tu enemigo ha quedado con " + victoriaspc + " victoria/s, eso significa Ganaste el juego :)")
    mensajefinal("Has ganado el juego :)")
    } else {
        alert("Final del combate. Tuviste " + victoriasjugador + " victoria/s, y tu enemigo ha quedado con " + victoriaspc + " victoria/s, eso significa Perdite el juego :(")
        mensajefinal("Has perdido el juego :)")
    }
}

function mensajefinal(resultadofinal) {
    sectionmensajes.innerHTML = resultadofinal
    sectionreiniciar.style.display = "block"    
}

function reiniciarjuego() {
    location.reload()
}

function pintarpokemon() {
    floracorn.x = floracorn.x + floracorn.velocidadX
    floracorn.y = floracorn.y + floracorn.velocidadY 
    lienzo.clearRect(0, 0 , mapa.width, mapa.height)
    lienzo.drawImage(
        floracorn.mapafoto,
        floracorn.x,
        floracorn.y,
        floracorn.ancho,
        floracorn.alto,
    )
    
}

function right() {
    floracorn.velocidadX = 5
}

function left() {
    floracorn.velocidadX = -5
}

function up() {
    floracorn.velocidadY = -5
}

function down() {
    floracorn.velocidadY = 5
}

function detenermovimiento() {
    floracorn.velocidadX = 0
    floracorn.velocidadY = 0
}

window.addEventListener("load", startgame) 