const express = require("express") //  Optener express
const cors = require("cors")

const app = express() // Crear la instancia
app.use(cors()) // se utiliza para habilitar el intercambio de recursos de origen cruzado (Cross-Origin Resource Sharing , CORS) en las solicitudes HTTP realizadas desde el navegador.
app.use(express.json()) // Activar peticiones que soportan json como parte de su cuerpo o contenido 
const jugadores = []

class Jugador {
    constructor(id){
        this.id = id
    }

    asignarMokepon(mokepon){
        this.mokepon = mokepon
    }

    actualizarPosicion(x, y){
        this.x = x
        this.y = y
    }

    asignarAtaques(ataques){
        this.ataques = ataques
    }
}

class Mokepon {
    constructor(nombre){
        this.nombre = nombre
    }
}

app.get("/unirse", (req, res) => { // Ejecutar accion cuando se ingresa a la página
    const id = `${Math.random()}`
    const jugador = new Jugador(id)
    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(id)
})


app.post("/mokepon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)

    const indexJugador = jugadores.findIndex(jugador => jugadorId === jugador.id)

    if (indexJugador >= 0){
        jugadores[indexJugador].asignarMokepon(mokepon)
    }
    console.log("mi id: " + jugadores.mokepon)
    console.log("Id jugador" + jugadorId)
    res.end()
})

app.post("/mokepon/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const indexJugador = jugadores.findIndex(jugador => jugadorId === jugador.id)

    if (indexJugador >= 0){
        jugadores[indexJugador].actualizarPosicion(x,y)
    }

    const enemigos = jugadores.filter(jugador => jugadorId !== jugador.id)

    res.send({
        enemigos
    })
})

app.post("/mokepon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const ataques = req.body.ataques || []

    const indexJugador = jugadores.findIndex(jugador => jugadorId === jugador.id)

    if (indexJugador >= 0){
        jugadores[indexJugador].asignarAtaques(ataques)
    }

    res.end()
})

app.get("/mokepon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const jugador = jugadores.find(jugador => jugador.id === jugadorId)

    res.send({
        ataques: jugador.ataques || []
    })
})


app.listen(8080, () => { //crear el servidor
    console.log("Servidor funcionando")
})