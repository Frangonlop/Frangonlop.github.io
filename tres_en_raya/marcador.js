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

export default Marcador;
