paper.install(window);

//importaciones
// de ./hidrante.js la función dibujarHidrante
import dibujarHidrante from "./hidrante.js";
import dibujarLago from "./lago.js";
import { dibujarBosque } from "./arbol.js";
import { dibujarArdilla, animarArdilla } from "./ardilla.js";

window.onload = function () {
  paper.setup(document.getElementById("miCanvas"));

  const size = new Size(window.innerWidth - 21.9, window.innerHeight - 25);
  view.viewSize = size;
  let direction = 1;

  // fondo
  dibujarFondo();

  // vamos a hacer un perro

  let cuerpo = new Path.Rectangle({
    center: [300, 200],
    size: [100, 50],
    fillColor: "black",
  });
  let pie1 = new Path.Rectangle({
    center: [275, 225],
    size: [20, 20],
    fillColor: "black",
  });
  let pie2 = new Path.Rectangle({
    center: [325, 225],
    size: [20, 20],
    fillColor: "black",
  });
  let cola = new Path.Rectangle({
    center: [250, 195],
    size: [40, 10],
    fillColor: "black",
  });

  let cuerpoPerro = new Group([cuerpo, pie1, pie2, cola]);

  let cabeza = new Path.Circle({
    center: [350, 160],
    radius: 30,
    fillColor: "black",
  });
  let nariz = new Path.Ellipse({
    center: [350, 160],
    radius: [10, 7], // radioX y radioY
    fillColor: "red",
  });
  let cabezaPerro = new Group([cabeza, nariz]);

  // Los unimos a traves de un grupo
  let perro = new Group([cuerpoPerro, cabezaPerro]);
  let keys = {};
  let tool = new paper.Tool();

  // Ardilla
  let ardilla = dibujarArdilla(100, 100); // Cambia las coordenadas según donde quieras que empiece la ardilla
  let velocidadArdilla = {
    x: Math.random() * 20 - 2,
    y: Math.random() * 20 - 2,
  };
  let direccionColaArdilla = 1;

  // Para el movimiento del perro, vamos a usar las teclas de dirección
  tool.onKeyDown = function (event) {
    keys[event.key] = true;
  };
  tool.onKeyUp = function (event) {
    keys[event.key] = false;
  };

  view.onFrame = function (event) {
    if (keys["w"]) {
      perro.position.y -= 10;
    }
    if (keys["s"]) {
      perro.position.y += 10;
    }
    if (keys["a"]) {
      perro.position.x -= 10;
    }
    if (keys["d"]) {
      perro.position.x += 10;
    }

    //Para el movimiento de la cola
    cola.rotate(3 * direction);
    if (event.count % 15 === 0) {
      direction *= -1;
    }

    // Animar la ardilla
    animarArdilla(ardilla, velocidadArdilla, direccionColaArdilla, event);
    // animar cola ardilla
    ardilla.children[1].rotate(3 * direccionColaArdilla);
    if (event.count % 10 === 0) {
      direccionColaArdilla *= -1;
    }
  };
};

function dibujarFondo() {
  // Fondo verde
  Path.Rectangle({
    from: [0, 0],
    to: [window.innerWidth, window.innerHeight],
    fillColor: "green",
  });

  // Hidrante
  dibujarHidrante(window.innerWidth * 0.1, window.innerHeight * 0.5);
  dibujarHidrante(window.innerWidth * 0.9, window.innerHeight * 0.2, 1.7);

  // Lago
  dibujarLago(window.innerWidth * 0.7, window.innerHeight * 0.7, 300, 150);

  // Árboles
  // Vamos a hacer mini bosques, para ello varios arboles juntos
  dibujarBosque(window.innerWidth * 0.5, window.innerHeight * 0.25, 5);
  dibujarBosque(window.innerWidth * 0.8, window.innerHeight * 0.75, 5);
  dibujarBosque(window.innerWidth * 0.2, window.innerHeight * 0.75, 5);
  dibujarBosque(window.innerWidth * 0.7, window.innerHeight * 0.25, 5);
  dibujarBosque(window.innerWidth * 0.2, window.innerHeight * 0.1, 5);
  dibujarBosque(window.innerWidth * 0.1, window.innerHeight * 0.2, 5);
  dibujarBosque(window.innerWidth * 0.5, window.innerHeight * 0.5, 5);

  // Hierbas
  for (let i = 0; i < 10; i++) {
    Path.Ellipse({
      center: [window.innerWidth * Math.random(), window.innerHeight * 0.95],
      radius: [10, 30],
      fillColor: "darkgreen",
    });
  }
}
