const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascota = document.getElementById("boton-mascota")

const mascotaJugador = document.getElementById("mascota-jugador")
const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")

const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensaje = document.getElementById("resultado")

const resultadoJuego = document.getElementById("resultado")
const ataqueDelJugador = document.getElementById("ataque-del-jugador")
const ataqueDelEnemigo = document.getElementById("ataque-del-enemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const verMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let opcionMokepones
let ataquesMokepone
let inputHipodoge 
let inputCapipepo 
let inputRatigueya
let mascotaSeleccionada
let botonFuego 
let botonAgura 
let botonTierra 
let botones = []
let ataqueMokeponeEnemigo
let indexAtaqueJugador
let indexAtaqueEnemigo

let ataqueEnemigo = []
let victoriasJugador = 0
let victoriasEnemigo = 0
let empates = 0

let lienzo = mapa.getContext("2d")
let intervalo
let objetoMascotaJugador
let imgBackground = new Image()
imgBackground.src = './assets/mokemap.png'
const anchoMaxismoMapa = 500
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20 

if (anchoDelMapa > anchoMaxismoMapa){
    anchoDelMapa = anchoMaxismoMapa - 20
}



alturaQueBuscamos = anchoDelMapa * 600 / 800 
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon{
    constructor(nombre, foto, vida, fotoMapa, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    dibujarMokepone(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho, 
            this.alto
            )
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png')
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png')
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png')

mokepones.push(hipodoge,capipepo,ratigueya)

const HIPODOGE_ATAQUE = [    
    {nombre: 'agua', id: 'boton-agua'},
    {nombre: 'agua', id: 'boton-agua'},
    {nombre: 'agua', id: 'boton-agua'},
    {nombre: 'fuego', id: 'boton-fuego'},
    {nombre: 'tierra', id: 'boton-tierra'}
]
hipodoge.ataques.push(...HIPODOGE_ATAQUE)

const CAPIPEPO_ATAQUE = [
    {nombre: 'tierra', id: 'boton-tierra'},
    {nombre: 'tierra', id: 'boton-tierra'},
    {nombre: 'tierra', id: 'boton-tierra'},
    {nombre: 'fuego', id: 'boton-fuego'},
    {nombre: 'agua', id: 'boton-agua'}
]
capipepo.ataques.push(...CAPIPEPO_ATAQUE)

const RATIGUEYA_ATAQUE = [
    {nombre: 'fuego', id: 'boton-fuego'},
    {nombre: 'fuego', id: 'boton-fuego'},
    {nombre: 'fuego', id: 'boton-fuego'},
    {nombre: 'agua', id: 'boton-agua'},
    {nombre: 'tierra', id: 'boton-tierra'} 
]
ratigueya.ataques.push(...RATIGUEYA_ATAQUE)



function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = "none"
    verMapa.style.display = "none"

    mokepones.forEach(mokepon => {
        opcionMokepones = `
            <input type="radio" name="mascota" id=${mokepon.nombre}>
            <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre}>
            </label>
        `
        contenedorTarjetas.innerHTML += opcionMokepones

        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipepo = document.getElementById("Capipepo")
        inputRatigueya = document.getElementById("Ratigueya")
    })

    sectionReiniciar.style.display = "none"
    botonMascota.addEventListener("click", seleccionarMascotaJugador)
    sectionReiniciar.addEventListener("click", reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://localhost:8080/unirse")
    .then(function (res){
        if(res.ok){
            res.text()
            .then(function (respuesta){
                console.log(respuesta)
                jugadorId = respuesta
            })
        }
    })
}

function seleccionarMascotaJugador(){
    sectionSeleccionarMascota.style.display = "none"
    if (inputHipodoge.checked){
        mascotaJugador.innerHTML = inputHipodoge.id
        mascotaSeleccionada = inputHipodoge.id
    }else if (inputCapipepo.checked){
        mascotaJugador.innerHTML = inputCapipepo.id
        mascotaSeleccionada = inputCapipepo.id
    }else if (inputRatigueya.checked){
        mascotaJugador.innerHTML = inputRatigueya.id
        mascotaSeleccionada = inputRatigueya.id
    }else{
        alert("No has seleccionado ninguna mascota")
    }

    
    seleccionarMokepone(mascotaSeleccionada)
    
    extraerAtaque(mascotaSeleccionada)
    verMapa.style.display = "flex"
    iniciarMapa()
}

function seleccionarMokepone(mascotaSeleccionada){
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaSeleccionada
        })
    })
}

function extraerAtaque(mascotaSeleccionada){
    let ataque
    for(let i = 0; i < mokepones.length; i++){
        if(mascotaSeleccionada === mokepones[i].nombre){
            ataque = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataque)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepone = `
            <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepone;
    })

    botonFuego = document.getElementById("boton-fuego")
    botonAgura = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")
    botones = document.querySelectorAll(".BAtaque")
    secuenciaAtaque()
}


function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === "fuego"){
                ataqueJugador.push("FUEGO")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            }else if (e.target.textContent === "agua"){
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            }else{
                ataqueJugador.push("TIERRA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            // ataqueAleatorioEnemigo()
            if (ataqueJugador.length === 5){
                enviarAtaque()
            }
        })
    })
}

function enviarAtaque(){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques(){
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
    .then(function (res){
        if(res.ok){
            res.json()
                .then(function ({ ataques }){
                    if (ataques.length === 5 ){
                        ataqueEnemigo = ataques
                        combate()
                    }
                })
        }
    })
}

function seleccionarMascotaEnemigo(enemigo){
    spanMascotaEnemigo.innerHTML =enemigo.nombre
    ataqueMokeponeEnemigo = enemigo.ataques
}


function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(0, ataqueMokeponeEnemigo.length - 1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1){
        ataqueEnemigo.push("FUEGO")
    }else if (ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push("AGUA")
    }else{
        ataqueEnemigo.push("TIERRA")
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea(){
    if (ataqueJugador.length === 5){
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    clearInterval(intervalo)


    for (let index = 0; index < ataqueJugador.length; index++){
        if (ataqueJugador[index] === ataqueEnemigo[index]){
            indexAmbosOponentes(index, index)
            crearMensaje("Empate")
            empates++
        } else if (ataqueJugador[index] === "FUEGO"  && ataqueEnemigo[index] === "TIERRA"){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador++       
        }else if(ataqueJugador[index] === "AGUA" && ataqueEnemigo[index] === "FUEGO"){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador++       
        }else if(ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA"){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador++       
        }else{
            indexAmbosOponentes(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    console.log(empates + ' empates')
    console.log(victoriasJugador + ' jugador')
    console.log(victoriasEnemigo + ' enemigo')
    validarVidas()
}


function validarVidas(){
    if(victoriasJugador === victoriasEnemigo){
         mensajeFinal("Esto fue un empate!! f")
    }else if (victoriasJugador >  victoriasEnemigo){
        mensajeFinal("Ganaste f")
    }else{
        mensajeFinal("Perdiste f")
    }
}


function mensajeFinal(resultado){
    sectionMensaje.innerHTML = resultado
    botonFuego.disabled =  true
    botonAgura.disabled =  true
    botonTierra.disabled =  true
    sectionReiniciar.style.display = "flex"
}


function crearMensaje(resultado){
    resultadoJuego.innerHTML = resultado;
    let mensajeataqueJugador = document.createElement("p")
    let mensajeataqueEnemigo = document.createElement("p")

    mensajeataqueEnemigo.innerHTML = indexAtaqueEnemigo
    mensajeataqueJugador.innerHTML = indexAtaqueJugador
    
    ataqueDelJugador.appendChild(mensajeataqueJugador)
    ataqueDelEnemigo.appendChild(mensajeataqueEnemigo)
}


function reiniciarJuego(){
    location.reload()
}


function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}



function pintarMapa(){
    objetoMascotaJugador.x += objetoMascotaJugador.velocidadX
    objetoMascotaJugador.y += objetoMascotaJugador.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        imgBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )

    objetoMascotaJugador.dibujarMokepone()
    enviarPosicion(objetoMascotaJugador.x, objetoMascotaJugador.y)

    mokeponesEnemigos.forEach(function (mokepon){
        mokepon.dibujarMokepone()
        detectarColision(mokepon)
    })
}


function enviarPosicion(x, y){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function(res){
        if(res.ok){
            res.json()
            .then(function ({ enemigos }){
                // console.log(enemigos.mokepon.nombre)
                mokeponesEnemigos = enemigos.map(function (enemigo){
                    console.log("name:||||| "  + enemigo.mokepon.nombre)
                    let mokeponEnemigo = null
                    const mokeponNombre = enemigo.mokepon.nombre || ""
                    if (mokeponNombre === "Hipodoge"){
                        mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png', enemigo.id)
                    }else if( mokeponNombre === "Capipepo"){
                        mokeponEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png', enemigo.id)
                    }else if(mokeponNombre === "Ratigueya"){
                        mokeponEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png', enemigo.id)
                    }
                    mokeponEnemigo.x=enemigo.x
                    mokeponEnemigo.y=enemigo.y
                    return mokeponEnemigo
                })
            })
        }
    })
}


function moverDerecha(){
    objetoMascotaJugador.velocidadX = 5
}
function moverIzquierda(){
    objetoMascotaJugador.velocidadX = -5
}

function moverArriba(){
    objetoMascotaJugador.velocidadY = -5
}
function moverAbajo(){
    objetoMascotaJugador.velocidadY = 5
}

function detenerMovimiento(){
    objetoMascotaJugador.velocidadX = 0
    objetoMascotaJugador.velocidadY = 0
}


function teclaPrecionada(event){
    switch(event.key){
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
    }
}


function iniciarMapa(){
    objetoMascotaJugador = obtenerObjectoMascota()
    console.log(objetoMascotaJugador, mascotaSeleccionada + "+++++++++++++")
    // lienzo.fillRect(5, 15, 20, 40) x, y, width, height esté método crea un rectangulo
    intervalo = setInterval(pintarMapa, 50)
    window.addEventListener('keydown', teclaPrecionada)
    window.addEventListener('keyup', detenerMovimiento)
}


function obtenerObjectoMascota(){
    for(let i = 0; i < mokepones.length; i++){
        if(mascotaSeleccionada === mokepones[i].nombre){
            return mokepones[i]
        }
    }
}

function detectarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaJugador = objetoMascotaJugador.y
    const abajoJugador = objetoMascotaJugador.y + objetoMascotaJugador.alto
    const derechaJugador = objetoMascotaJugador.x + objetoMascotaJugador.ancho
    const izquierdaJugador = objetoMascotaJugador.x

    if(arribaJugador > abajoEnemigo || abajoJugador < arribaEnemigo || derechaJugador < izquierdaEnemigo || izquierdaJugador > derechaEnemigo){
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = "flex"
    verMapa.style.display = "none"
    enemigoId = enemigo.id
    seleccionarMascotaEnemigo(enemigo)
}


window.addEventListener("load", iniciarJuego)