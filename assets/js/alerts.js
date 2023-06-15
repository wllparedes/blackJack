//? Alertas Modales al incio

document.addEventListener('DOMContentLoaded', () => {
        
    let timerInterval;
    Swal.fire({
        title: 'Bienvenido, vamos a jugar BlackJack!',
        imageUrl: '../../assets/img/fondo-game.png',
        imageWidth: 400,
        imageHeight: 200,
        html: ' Comenzará en <b></b> segundos.',
        timer: 5000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Math.round(Swal.getTimerLeft() / 1000);
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
        Swal.fire({
            title: 'Pulsa el botón <b>Nuevo Juego</b> para comenzar',
            text: 'Luego de pulsarlo se habilitarán Pedir Carta y Detener Juego',
            imageUrl: '../../assets/img/fondo-sw-br.png',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
        }).then(() => {
            Swal.fire({
                title: 'Pulsa el botón <b>Pedir Cartas</b>',
                text: 'Te daremos cartas al azar, tendrás que llegar a 21 o tener un puntaje muy cercano',
                imageUrl: '../../assets/img/fondo-sw-pc.jpeg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
            }).then(() => {
                Swal.fire({
                    title: 'Pulsa el botón <b>Detener Juego</b>',
                    text: 'Pulsalo solo cuando crees que vas a ganar, pero ten cuidado... quizá la pc te gane :)',
                    imageUrl: '../../assets/img/fondo-sw-tc.jpeg',
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: 'Custom image',
                });
            });
        });
    });



});

//? Alertas desición 

const ganaste = () => Swal.fire({
    title: 'Felicidades!',
    text: 'Has logrado ganarle a la computadora.',
    imageUrl: '../../assets/img/fondo-sw-w.jpg',
    imageWidth: 330,
    imageHeight: 200,
    imageAlt: 'proplayer',
});

const empate = () => Swal.fire({
    title: 'Oops..',
    text: 'Qué casualidad, tú IQ es igual al de la PC',
    imageUrl: '../../assets/img/fondo-sw-c.jpg',
    imageWidth: 330,
    imageHeight: 200,
    imageAlt: 'empate-imagen',
});


const perdiste = () => Swal.fire({
    title: 'Lo siento...',
    text: 'No has logrado ganarle a la pc, perdiste',
    imageUrl: '../../assets/img/fondo-sw-l.jpg',
    imageWidth: 330,
    imageHeight: 200,
    imageAlt: 'loser',
});