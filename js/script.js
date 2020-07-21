// Il computer deve generare 16 numeri casuali tra 1 e 100.
// I numeri non possono essere duplicati
// In seguito deve chiedere all'utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
// L’utente non può inserire più volte lo stesso numero.
// Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all'utente un altro numero.
// La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.
// BONUS: (da fare solo se funziona tutto il resto)
// all'inizio il software richiede anche una difficoltà all'utente che cambia il range di numeri casuali:
// con difficoltà 0 => tra 1 e 100
// con difficoltà 1 =>  tra 1 e 80
// con difficoltà 2 => tra 1 e 50

var min;
var max;
var numeriComputer = [];
var difficult = prompt('scegli la difficoltà: easy,medium,hard');
var btnRetry = document.getElementById('retry');

// SWITCH DIFFICOLTA'

switch (difficult) {
    case 'easy':
        min = 1;
        max = 100;
        break;
    case 'medium':
        min = 1;
        max = 80;
        break;
    case 'hard':
        min = 1;
        max = 50;
        break;
    default:
        alert('difficoltà default(medium)');
        min = 1;
        max = 80;
}

// GENERAZIONE NUMERI RANDOM COMPUTER

while (numeriComputer.length < 16){
    var numeroTemp = numeroRandom(min,max);
    if (!checking(numeriComputer,numeroTemp)){
        numeriComputer.push(numeroTemp);
    }
}

// RICHIESTA INSERIMENTO UTENTE

console.log(numeriComputer);

var numeriUtente = [];


var i = 0;
var perso = false;
while (i < (max - 16) && perso == false) {

    var numeroUtente = parseInt(prompt('Inserisci un numero compreso tra ' + min +  ' e ' + max + ' (tentativi rimanenti:' + (max - 16 - numeriUtente.length ) + ')'));

    if (checking(numeriUtente,numeroUtente)) {
        alert ('numero già inserito,riprova');
    }  else if (numeroUtente < min || numeroUtente > max){
        alert ('il numero non rientra nel range indicato');
    }  else if (isNaN(numeroUtente)) {
        alert ('non hai inserito un numero');
    }  else if(checking(numeriComputer,numeroUtente)) {
        document.getElementById('sconfitta').innerHTML = ('HAI PERSO! (hai inserito ' + numeriUtente.length + ' numeri ma purtroppo hai fatto KABOOM!)');
        document.getElementById('bomb').className = 'boom show';
        document.getElementById('esplosione').play();
        perso = true;
    }  else {
        numeriUtente.push(numeroUtente);
    }

    box.innerHTML = numeriUtente;
    i++
}

if (numeriUtente.length == (max - 16)) {
    document.getElementById('applausi').play();
    document.getElementById('scritta-vittoria').innerHTML = ('HAI VINTOOO! (ci sono voluti ' + numeriUtente.length + ' tentativi per vincere)');
    document.getElementById('victory').className = 'victory show';
}


// btnRetry FUNCTION

btnRetry.addEventListener('click', function(){
    location.reload();
}
)



// FUNZIONE NUMERI RANDOM

function numeroRandom(min,max) {
    numero = Math.floor(Math.random()* (max - min + 1) ) + min;
    return numero;
}

// FUNZIONE TROVA NUMERO IN UN ARRAY

function checking(array,numero) {
    var i = 0;
    trovato = false;
    while (i < array.length && trovato == false) {
        if (numero == array[i]) {
            trovato = true;
        }
        i++;
    }
    return trovato;
}
