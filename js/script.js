paper.install(window);

import dibujarHidrante from "./hidrante.js";
import dibujarLago from "./lago.js";
import { dibujarBosque } from "./arbol.js";
import { dibujarArdilla, animarArdilla } from "./ardilla.js";
import { dibujarPerro, moverYAnimarPerro } from "./perro.js";

window.onload = function () {
  paper.setup(document.getElementById("miCanvas"));
  const size = new Size(window.innerWidth - 21.9, window.innerHeight - 25);
  view.viewSize = size;

  // Capas
  let backgroundLayer = new paper.Layer(); // Capa para el fondo
  let dogLayer = new paper.Layer(); // Capa para el perro
  let squirrelLayer = new paper.Layer(); // Capa para la ardilla

  // fondo
  dibujarFondo(backgroundLayer); // Esta función dibuja elementos directamente en backgroundLayer

  // Perro
  let perro = dibujarPerro(); // Esta función retorna el grupo del perro, que añadiremos a su capa
  dogLayer.addChild(perro);

  // Ardilla
  let ardilla = dibujarArdilla(100, 100); // Cambia las coordenadas según preferencia
  squirrelLayer.addChild(ardilla);

  let keys = {};
  let tool = new paper.Tool();

  // Movimiento y Animación
  tool.onKeyDown = function (event) {
    keys[event.key] = true;
  };

  tool.onKeyUp = function (event) {
    keys[event.key] = false;
  };

  paper.view.onFrame = function (event) {
    animarArdilla(ardilla, event);
    moverYAnimarPerro(perro, keys, event);
  };

  paper.view.draw();
};

function dibujarFondo(backgroundLayer) {
  // Activamos la capa de fondo, todo lo que se dibuje ahora se hará en esta capa.
  backgroundLayer.activate();

  // Césped
  let cesped = new paper.Path.Rectangle({
    from: [0, 0],
    to: [paper.view.size.width, paper.view.size.height],
    fillColor: "green",
  });

  // Hidrantes - Usando la función existente dibujarHidrante() para colocar hidrantes en el mapa
  dibujarHidrante(paper.view.size.width * 0.1, paper.view.size.height * 0.5);
  dibujarHidrante(
    paper.view.size.width * 0.9,
    paper.view.size.height * 0.2,
    1.7
  );

  // Lago - Dibujando un lago usando la función existente dibujarLago()
  dibujarLago(
    paper.view.size.width * 0.7,
    paper.view.size.height * 0.7,
    300,
    150
  );

  // Árboles - Usamos la función dibujarBosque() para colocar grupos de árboles en diferentes partes del fondo
  dibujarBosque(paper.view.size.width * 0.5, paper.view.size.height * 0.25, 5);
  dibujarBosque(paper.view.size.width * 0.8, paper.view.size.height * 0.75, 5);
  dibujarBosque(paper.view.size.width * 0.2, paper.view.size.height * 0.75, 5);
  dibujarBosque(paper.view.size.width * 0.7, paper.view.size.height * 0.25, 5);
  dibujarBosque(paper.view.size.width * 0.2, paper.view.size.height * 0.1, 5);
  dibujarBosque(paper.view.size.width * 0.1, paper.view.size.height * 0.2, 5);
  dibujarBosque(paper.view.size.width * 0.5, paper.view.size.height * 0.5, 5);
}
