class Marcador {
  #elementId;
  #jugadores = [
    {
      name: 'X',
      puntos: 0,
    },

    {
      name: 'O',
      puntos: 0,
    }
  ]

  constructor(elementId='marcador') {
    this.#elementId = elementId;
    this.imprimir();
  }

  addPuntos(name) {
    let jugador = this.#jugadores.find(j => j.name === name);
    jugador.puntos++;
    this.imprimir();
  }

  imprimir() {
    let marcadorFrontend = document.getElementById(this.#elementId);
    let ul = document.createElement('ul');
    this.#jugadores.forEach(jugador => {
      let li = document.createElement('li');
      li.textContent = `Jugador ${jugador.name} tiene ${jugador.puntos} puntos`;
      ul.append(li);
    });
    marcadorFrontend.innerHTML = '';
    marcadorFrontend.append(ul);
  }

  resetMarcador() {
    this.#jugadores.forEach(jugador => {
      jugador.puntos = 0;
    });
    this.imprimir(); // Actualizar el marcador en el frontend después de reiniciar
  }
  
  getGanador() {
    const puntosX = this.#jugadores.find(j => j.name === 'X').puntos;
    const puntosO = this.#jugadores.find(j => j.name === 'O').puntos;

    if (puntosX > puntosO) {
      return 'X';
    } else if (puntosO > puntosX) {
      return 'O';
    } else {
      return 'Empate';
    }
  }
}

import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import Marcador from './marcador';

class Tablero {
  #casillas;  // Este será el array de arrays donde guardaremos lo que hay en cada posición
  #dimension; // Esta variable determinará el tamaño del tablero
  #turno;     // En esta variable queda guardo a quien le toca, toma valores: X o O
  #elementID;
  #marcador;
  #versusMachine;
  #endGame = false;
  #numRondas;
  
  constructor(dimension = 3, versusMachine=false, rondas) {
    this.#casillas = new Array();
    this.#dimension = dimension;
    this.#versusMachine = versusMachine;
    this.#numRondas = rondas;
    for (let i = 0; i <this.#dimension; i++){
      this.#casillas[i] = new Array();
      for (let j = 0; j < this.#dimension; j++) {
        this.#casillas[i][j] = null;
      }
    }
    this.#turno = 'X';
    this.#marcador = new Marcador();
  }

  imprimir(elementId='tablero') {
    let tablero = document.getElementById(elementId);
    this.#elementID = elementId;
    tablero.innerHTML = '';
    for (let fila = 0; fila < this.#dimension; fila++){
      for (let columna = 0; columna < this.#dimension; columna++){
        let casilla = document.createElement('div');
        casilla.dataset.fila = fila;
        casilla.dataset.columna = columna;
        casilla.dataset.libre = '';
        if (this.#casillas[fila][columna]) {
          casilla.textContent = this.#casillas[fila][columna];
          casilla.dataset.libre = this.#casillas[fila][columna];
        }
        tablero.appendChild(casilla);
        this.addEventClick(casilla);
      }
    }
    tablero.style.gridTemplateColumns = `repeat(${this.#dimension}, 1fr)`;
  }

  isFree(fila, columna) {
    return true ? this.#casillas[fila][columna] === null : false;
  }

  setCasilla(fila, columna, valor) {
    if (this.isFree(fila, columna)) {
      const ahora = new Date();
      const hora = ahora.getHours().toString().padStart(2, '0');
      const minutos = ahora.getMinutes().toString().padStart(2, '0');
      const segundos = ahora.getSeconds().toString().padStart(2, '0');
      const tiempo = `${hora}:${minutos}:${segundos}`;
      
      this.#casillas[fila][columna] = valor;
      let registro = document.getElementById('registro');
      registro.innerHTML += `El jugador ${valor} ha puesto una ficha en la casilla ${fila},${columna} a las ${tiempo}<br>`;
      return true;
    }
    return false;
  }

  getCasilla(fila, columna) {
    return this.#casillas[fila][columna];
  }

  toogleTurno() {
    if (this.#endGame) return false;

    if (this.#turno === 'X') {
      this.#turno = 'O';
      //Comprobamos si jugamos contra la máquina
      if (this.#versusMachine) {
        let posicionLibre = this.getCasillaFreeRandom();
        this.setCasilla(posicionLibre.i, posicionLibre.j, 'O');
        this.imprimir();
        this.comprobarResultados()
        if (this.#endGame) return false;
        this.toogleTurno();
      }

    } else {
      this.#turno = 'X';
    }
  }

  comprobarResultados() {
    // Comprobamos filas
    let fila;
    let columna;
    let ganado = false;
    for (fila = 0; fila < this.#dimension && !ganado; fila++){
      let seguidas = 0;
      for (columna = 0; columna < this.#dimension; columna++){
        if (columna !== 0) {
          if (this.getCasilla(fila, columna) === this.getCasilla(fila, columna - 1)) {
            if (this.getCasilla(fila, columna) !== null) {
              seguidas++;
            }
          }
        }
      }
      if (seguidas === this.#dimension - 1) {
        console.log('Linea');
        ganado = true;
      }
    }

    // Comprobar columnas
    for (columna = 0; columna < this.#dimension && !ganado; columna++){
      let seguidas = 0;
      for (fila = 0; fila < this.#dimension; fila++){
        if (fila !== 0) {
          if (this.getCasilla(fila, columna) === this.getCasilla(fila-1, columna)) {
            if (this.getCasilla(fila, columna) !== null) {
              seguidas++;
            }
          }
        }
      }
      if (seguidas === this.#dimension - 1) {
        console.log('Columna');
        ganado = true;
      }
    }

    // Diagonal de izq a derecha
    let seguidas = 0;
    for (let i = 0; i < this.#dimension; i++){
      if (i !== 0) {
        if ((this.getCasilla(i, i) === this.getCasilla(i - 1, i - 1)) && this.getCasilla(i,i) !== null) {
          seguidas++;
        }
      }
    }

    if (seguidas === this.#dimension - 1) {
      console.log('Diagonal de izq a derecha');
      ganado = true;
    }

    // Diagonal de izq a derecha
    seguidas = 0;
    for (let i = this.#dimension-1; i >= 0; i--){
      if (i !== this.#dimension - 1) {
        let j = this.#dimension - 1 - i;
        if ((this.getCasilla(i, j) === this.getCasilla(i + 1, j - 1)) && this.getCasilla(i,j) !== null) {
          seguidas++;
        }
      }
    }

    if (seguidas === this.#dimension - 1) {
      console.log('Diagonal de derecha a izquierda');
      ganado = true;
    }

    if (ganado) {
      this.#endGame = true;
      Toastify({
        text: `Ha ganado el jugador ${this.#turno}`,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "blue",
        },
        onClick: function(){} // Callback after click
      }).showToast();

      let libres = document.querySelectorAll('div[data-libre=""]');
      libres.forEach((casillaLibre) => {
        casillaLibre.dataset.libre = '-';
      });

      this.#marcador.addPuntos(this.#turno);
      // document.querySelector('.clearGame').classList.toggle('show');
    } else {
      // Si no se ha ganado hay que comprobar si el tablero está petao, si es así son tablas
      if (this.isFull()) {
        Toastify({
          text: `Han sido tablas`,
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "blue",
          },
          onClick: function(){} // Callback after click
        }).showToast();
        // document.querySelector('.clearGame').classList.toggle('show');
        this.#endGame = true;
      }
    }

  }

  isFull() {
    return !this.#casillas.some(fila => fila.some(casilla => casilla === null));
  }

  addEventClick(casilla) {
    casilla.addEventListener('click', (e) => {
      let casillaSeleccionada = e.currentTarget;
      if (casillaSeleccionada.dataset.libre === '') {
        casillaSeleccionada.textContent = this.#turno;
        this.setCasilla(
          casillaSeleccionada.dataset.fila,
          casillaSeleccionada.dataset.columna,
          this.#turno
        )
        casillaSeleccionada.dataset.libre = this.#turno;
        this.comprobarResultados();
        this.toogleTurno();
      }
    });

    casilla.addEventListener('mouseover', (e) => {
      if (e.currentTarget.dataset.libre === '') {
        e.currentTarget.textContent = this.#turno;
      }
    });

    casilla.addEventListener('mouseleave', (e) => {
      if (e.currentTarget.dataset.libre === '') {
        e.currentTarget.textContent = '';
      }
    })
  }

  get dimension() {
    return this.#dimension;
  }

  get elementID() {
    return this.#elementID;
  }

  limpiar() {
    this.#casillas = this.#casillas.map(casilla => casilla.map(c => null));
    this.#endGame = false;
    this.imprimir();
    document.getElementById('registro').textContent = '';
    document.getElementById('ganador').textContent = '';
    document.getElementById('ganador').style.backgroundColor = 'transparent';
    document.querySelector('.clearGame').classList.remove('show');
  }

  getCasillaFreeRandom() {
    let i, j;
    do {
      i = Math.floor(Math.random() * (this.#dimension));
      j = Math.floor(Math.random() * (this.#dimension));
    } while (!this.isFree(i, j))
    return {
      i: i,
      j: j
    }
  }

async jugarRondas(numRondas) {
this.#marcador.resetMarcador();
  let rondasJugadas = 0;
  while (rondasJugadas < numRondas) {
    this.limpiar();
    this.imprimir();
    while (!this.#endGame) {
      await new Promise(resolve => setTimeout(resolve, 1000)); 
    }
    rondasJugadas++;

    this.#endGame = false;
  }
  const ganadorFinal = this.#marcador.getGanador();
  document.getElementById('ganador').textContent = `El ganador de todas las rondas es: ${ganadorFinal}`;
  document.getElementById('ganador').style.backgroundColor = '#fff45a9f';
  document.querySelector('.clearGame').classList.add('show');
}


}
export default Tablero;


const buttonCreateTable = document.getElementById('createTable');
const inputDimensions = document.getElementById('dimension');
const resetButton = document.getElementById('resetGame');
const clearButtons = document.querySelectorAll('.clearGameButton');
const preGame = document.querySelector('.preGame');
const inGame = document.querySelector('.inGame');
const rondas = document.getElementById('rondas');

let tablero;

document.getElementById('option1').addEventListener('click', ()=>{
  document.body.style.backgroundImage = "url('img/fondo1.webp')";
});
document.getElementById('option2').addEventListener('click', ()=>{
  document.body.style.backgroundImage = "url('img/fondo2.jpg')";
});
document.getElementById('option3').addEventListener('click', ()=>{
  document.body.style.backgroundImage = "url('img/lavidaesuna.jpeg')";
});
buttonCreateTable.addEventListener('click', (e) => {
  if (!inputDimensions.value) {
    // Toastify({
    //   text: "Debe indicar una dimensión válida",
    //   duration: 3000,
    //   newWindow: false,
    //   close: true,
    //   gravity: "top", // `top` or `bottom`
    //   position: "right", // `left`, `center` or `right`
    //   stopOnFocus: true, // Prevents dismissing of toast on hover
    //   style: {
    //     background: "red",
    //   },
    //   onClick: function(){} // Callback after click
    // }).showToast();

    inputDimensions.classList.add('error');
    inputDimensions.focus();
    return false;
  }
  
  if (isNaN(inputDimensions.value)) {
    // Toastify({
    //   text: "Debe introducir un número válido",
    //   duration: 3000,
    //   newWindow: true,
    //   close: true,
    //   gravity: "top", // `top` or `bottom`
    //   position: "right", // `left`, `center` or `right`
    //   stopOnFocus: true, // Prevents dismissing of toast on hover
    //   style: {
    //     background: "red",
    //   },
    //   onClick: function(){} // Callback after click
    // }).showToast();
    
    inputDimensions.classList.add('error');
    inputDimensions.focus();
    return false;
  }

  if (!rondas.value || isNaN(rondas.value)) {
    // Toastify({
    //   text: "Debe indicar un número de rondas válido",
    //   duration: 3000,
    //   newWindow: false,
    //   close: true,
    //   gravity: "top", // `top` or `bottom`
    //   position: "right", // `left`, `center` or `right`
    //   stopOnFocus: true, // Prevents dismissing of toast on hover
    //   style: {
    //     background: "red",
    //   },
    //   onClick: function(){} // Callback after click
    // }).showToast();

    rondas.classList.add('error');
    rondas.focus();
    return false;
  }

  let checkMachine = document.getElementById('machine');
  tablero = new Tablero(parseInt(inputDimensions.value),checkMachine.checked, parseInt(rondas.value));
  tablero.jugarRondas(parseInt(rondas.value));

  preGame.classList.toggle('hide');
  inGame.classList.toggle('hide');
});

inputDimensions.addEventListener('keydown', () => {
  inputDimensions.classList.remove('error');
});

rondas.addEventListener('keydown', () => {
  rondas.classList.remove('error');
}); 


for (let button of clearButtons) {
  button.addEventListener('click', () => {
    tablero.limpiar();
    tablero.jugarRondas(parseInt(rondas.value));

  });
}

resetButton.addEventListener('click', (e) => {
  document.getElementById('registro').textContent = '';
  document.getElementById(tablero.elementID).innerHTML = '';
  document.getElementById('marcador').innerHTML = '';
  document.getElementById('ganador').textContent = '';
  document.getElementById('ganador').style.backgroundColor = 'transparent';
  document.querySelector('.clearGame').classList.remove('show');
  tablero = null;

  preGame.classList.toggle('hide');
  inGame.classList.toggle('hide');
  inputDimensions.value = '';
  rondas.value = '';
  inputDimensions.focus();
});
