//? Patron Módulo

const miModulo = (() => { //* Funcion anonima que se llama automaticamente
    'use strict';


    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'], especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];
    // let puntosJugador = 0, puntosComputadora = 0;

    // Referencias para el HTML

    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHTML = document.querySelectorAll('small');

    // Esta función inicializa el Juego

    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();

        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        };

        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;

    };

    //  Esta función crea una baraja y también de forma aleatoria
    const crearDeck = () => {
    
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            };
        };

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            };
        };
        return _.shuffle(deck);// ._ underscore
    };


    //  Esta función nos permite tomar una carta

    const pedirCarta = () => {
    
        if (deck.length === 0) {
            throw 'No hay cartas en el Deck';
        };
    
        return deck.pop();
    };

    // Esta funcion sirve para obtener el valor de la carta
    const valorCarta = (carta) => {

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
            : Number(valor);
    
    };

    // Turno: 0 = primer player 1 y el último será la computadora
    const acumularPuntos = ( carta,turno ) => {        
        
        puntosJugadores[turno] += valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        
        return puntosJugadores[turno]
    
    };


    const crearCarta = ( carta, turno ) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
        
    };

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;
        
        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana.');
            } else if (puntosMinimos > 21) {
                alert('Computadora gana.');
            } else if (puntosComputadora > 21) {
                alert('Jugador gana');
            } else {
                alert('Computadora Gana');
            };
        }, 50);  
    };



    //* Turno de la computadora

    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;
        do {
        
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1)

            // if (puntosMinimos > 21) {
            //     break;
            // };
        
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
        
        determinarGanador();
    };


    //? Eventos


    btnPedir.addEventListener('click', () => { // call back

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            console.log('Lo siento, perdiste.');
            btnPedir.disabled = true;
            btnDetener.disabled = true; //!
            turnoComputadora(puntosJugador);

        } else if (puntosJugador === 21) {
            console.log('21 Ganaste');
            btnDetener.disabled = true; //!
            btnPedir.disabled = true;
            turnoComputadora(puntosJugador);

        };

    });



    btnDetener.addEventListener('click', () => {

        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugadores[0]);

    });

    btnNuevo.addEventListener('click', () => {
    
        inicializarJuego();

    });


    return { nuevoJuego : inicializarJuego };

})();



