import Tablero from './tablero';
import './style.scss';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import Marcador from './marcador';

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
    Toastify({
      text: "Debe indicar una dimensión válida",
      duration: 3000,
      newWindow: false,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "red",
      },
      onClick: function(){} // Callback after click
    }).showToast();

    inputDimensions.classList.add('error');
    inputDimensions.focus();
    return false;
  }
  
  if (isNaN(inputDimensions.value)) {
    Toastify({
      text: "Debe introducir un número válido",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "red",
      },
      onClick: function(){} // Callback after click
    }).showToast();
    
    inputDimensions.classList.add('error');
    inputDimensions.focus();
    return false;
  }

  if (!rondas.value || isNaN(rondas.value)) {
    Toastify({
      text: "Debe indicar un número de rondas válido",
      duration: 3000,
      newWindow: false,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "red",
      },
      onClick: function(){} // Callback after click
    }).showToast();

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
