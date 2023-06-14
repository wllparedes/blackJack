

let deck = [];
let tipos = ['C', 'D', 'H', 'S'];
let especiales = ['A', 'J', 'Q', 'K']

let puntosJugador = 0;
let puntosComputadora = 0;

// Referencias para el HTML

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');


const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const puntosHTML = document.querySelectorAll('small');



//  Esta función crea una baraja y también de forma aleatoria
const crearDeck = () => {
    
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        };
    };

    for (let tipo of tipos) { 
        for (esp of especiales) {
            deck.push(esp + tipo);
        }
    }

    // console.log(deck);
    deck = _.shuffle(deck); // ._ underscore
    return deck
};

crearDeck();


//  Esta función nos permite tomar una carta

const pedirCarta = () => {
    
    if (deck.length === 0) {
        throw 'No hay cartas en el Deck'
    }
    
    // Debe de ser de la baraja
    const carta = deck.pop();
    
    return carta;
}

pedirCarta()

const valorCarta = ( carta ) => {

    const valor = carta.substring(0, carta.length - 1); // Sacar del string desde - hasta


    // if (isNaN(valor)) { //! Forma tradicional o básica

    //     puntos = (valor === 'A') ? 11 : 10;

    // } else {
    //     console.log('Es un número');
    //     puntos = Number(valor);
    // }

    // return (valor === 'A') ? 11 : //! Forma walinn
    //     (isNaN(valor)) ? 10 : Number(valor);

    
    return (isNaN(valor)) ? //! Forma Fernando
        (valor === 'A') ? 10 : 11
        : Number(valor)
    
}


//* Turno de la computadora

const turnoComputadora = ( puntosMinimos ) => {
    

    do {
        
        const carta = pedirCarta();

        puntosComputadora += valorCarta(carta);

        puntosHTML[1].innerText = puntosComputadora;

        // <img class="carta" src="assets/cartas/2C.png" alt="">

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');

        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21) {
            break;
        } 
        
    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));



    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana.');
            } else if (puntosMinimos > 21) {
                alert('Computadora gana.');
            } else if(puntosComputadora > 21){
                alert('Jugador gana');
            } else {
                alert('Computadora Gana')
            }
    }, 50);

}



//? Eventos


btnPedir.addEventListener('click', () => { // call back

    const carta = pedirCarta();

    puntosJugador += valorCarta(carta);

    puntosHTML[0].innerText = puntosJugador;


    // <img class="carta" src="assets/cartas/2C.png" alt="">

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');

    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        console.log('Lo siento, perdiste.');
        btnPedir.disabled = true;
        btnDetener.disabled = true; //!
        turnoComputadora(puntosJugador);

    } else if ( puntosJugador === 21 ) {
        console.log('21 Ganaste');
        btnDetener.disabled = true; //!
        btnPedir.disabled = true;
        turnoComputadora(puntosJugador);

    }

}); 



btnDetener.addEventListener('click', () => {

    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugador);

});

btnNuevo.addEventListener('click', () => {
    
    deck = [];
    deck = crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0; 

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;

    console.log(deck);
});

