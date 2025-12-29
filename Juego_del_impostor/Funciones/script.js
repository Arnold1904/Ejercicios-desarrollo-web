// Variables globales
let jugadores = [];
let palabraSeleccionada = '';
let impostorIndex = -1;
let turnoActual = 0;

// Función para iniciar el juego
function iniciarJuego(numJugadores) {
    jugadores = Array.from({ length: numJugadores }, (_, i) => `Jugador ${i + 1}`);
    palabraSeleccionada = seleccionarPalabra();
    impostorIndex = Math.floor(Math.random() * numJugadores);
    turnoActual = 0;

    document.getElementById('inicio').style.display = 'none';
    document.getElementById('juego').style.display = 'block';

    actualizarTurno();
}

// Función para seleccionar una palabra aleatoria del archivo CSV
function seleccionarPalabra() {
    const palabras = ["gato", "perro", "casa", "árbol", "coche", "pelota", "flor", "sol"];
    return palabras[Math.floor(Math.random() * palabras.length)];
}

// Función para manejar el giro de la flip card
function manejarFlipCard() {
    const flipCard = document.querySelector('.flip-card-inner');
    const isFlipped = flipCard.style.transform === 'rotateY(180deg)';
    flipCard.style.transform = isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)';

    const mensaje = turnoActual === impostorIndex ? 'Impostor' : palabraSeleccionada;
    document.getElementById('mensaje').innerText = isFlipped ? '' : mensaje;
}

// Función para pasar al siguiente jugador
function siguienteJugador() {
    turnoActual++;

    if (turnoActual >= jugadores.length) {
        document.getElementById('finalizar').style.display = 'block';
        document.getElementById('siguiente').style.display = 'none';
        const jugadorInicial = jugadores[Math.floor(Math.random() * jugadores.length)];
        mostrarModal(`Todos los jugadores han visto sus cartas. ¡Empieza ${jugadorInicial}!`);
    } else {
        actualizarTurno();
        const flipCard = document.querySelector('.flip-card-inner');
        flipCard.style.transform = 'rotateY(0deg)';
        document.getElementById('mensaje').innerText = '';
    }
}

// Función para actualizar el turno
function actualizarTurno() {
    document.getElementById('turno').innerText = `Turno de: ${jugadores[turnoActual]}`;
}

// Función para finalizar la ronda
function finalizarRonda() {
    document.getElementById('inicio').style.display = 'block';
    document.getElementById('juego').style.display = 'none';
    document.getElementById('finalizar').style.display = 'none';
    document.getElementById('siguiente').style.display = 'block';

    const flipCard = document.querySelector('.flip-card-inner');
    flipCard.style.transform = 'rotateY(0deg)';
    document.getElementById('mensaje').innerText = '';
}

// Función para mostrar un modal de Bootstrap
function mostrarModal(mensaje) {
    const modalBody = document.getElementById('modal-body');
    modalBody.innerText = mensaje;
    const modal = new bootstrap.Modal(document.getElementById('resultadoModal'));
    modal.show();
}