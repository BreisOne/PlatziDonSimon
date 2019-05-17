// Definimos las constantes del Juego.

const red = document.getElementById("red");
const blue = document.getElementById("blue");
const yellow = document.getElementById("yellow");
const green = document.getElementById("green");
const btnEmpezar = document.getElementById("btnEmpezar");
const ULTIMO_NIVEL = 1

class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this);
    this.inicializar();
    this.generarSecuencia();
    setTimeout(this.siguienteNivel, 500)
  }
  
  inicializar() {
    // this pasa a ser el boton clicado en lugar del juego, se reasigna this=juego con .bind(this)
    this.siguienteNivel = this.siguienteNivel.bind(this);
    this.elegirColor = this.elegirColor.bind(this);
    btnEmpezar.classList.toggle('hide');
    this.nivel = 10;
    this.colores = {
      red,
      blue,
      yellow,
      green
    };
  }

  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL)
      .fill(0)
      .map(n => Math.floor(Math.random() * 4));
  }

  siguienteNivel() {
    this.subnivel = 0;
    this.iluminarSecuencia();
    this.agregarEventosClick();
  }

  transformarNumeroAColor(numero) {
    switch (numero) {
      case 0:
        return "red";
      case 1:
        return "blue";
      case 2:
        return "yellow";
      case 3:
        return "green";
    }
  }
  transformarColorANumero(color) {
    switch (color) {
      case "red":
        return 0;
      case "blue":
        return 1;
      case "yellow":
        return 2;
      case "green":
        return 3;
    }
  }
  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumeroAColor(this.secuencia[i]);
      setTimeout(() => this.iluminarColor(color), 1000 * i);
    }
  }
  iluminarColor(color) {
    this.colores[color].classList.add("active");
    setTimeout(() => this.apagarColor(color), 350);
  }
  apagarColor(color) {
    this.colores[color].classList.remove("active");
  }
  agregarEventosClick() {
    this.colores.red.addEventListener("click", this.elegirColor);
    this.colores.blue.addEventListener("click", this.elegirColor);
    this.colores.yellow.addEventListener("click", this.elegirColor);
    this.colores.green.addEventListener("click", this.elegirColor);
  }

  eliminarEventosClick() {
    this.colores.red.removeEventListener("click", this.elegirColor);
    this.colores.blue.removeEventListener("click", this.elegirColor);
    this.colores.yellow.removeEventListener("click", this.elegirColor);
    this.colores.green.removeEventListener("click", this.elegirColor);
  }
  elegirColor(ev) {
    const nombreColor = ev.target.dataset.color
    const numeroColor = this.transformarColorANumero (nombreColor);
    this.iluminarColor(nombreColor);
    if(numeroColor === this.secuencia[this.subnivel]){
      this.subnivel++
      if(this.subnivel === this.nivel){
        this.nivel++
        this.eliminarEventosClick()
        if(this.nivel === (ULTIMO_NIVEL + 1)){
          this.ganoElJuego()
        }else{
          setTimeout(this.siguienteNivel, 1500)
        }

      }
    } else{
      this.perdioElJuego()
    }

  }
  ganoElJuego() {
    swal ('Platzi', 'Felicidades, ganaste el juego!', 'success')
      .then (this.inicializar);
  }
  perdioElJuego(){
    swal ('Platzi', 'Lo sentimos, perdiste el juego!', 'error')
      .then (()=>{
        this.eliminarEventosClick();
        this.inicializar();
      })
  }
}

function empezarJuego() {
  window.juego = new Juego;
}
