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
    radius: new Size(20, 20),
    fillColor: "#895638",
  });
  let pierna1 = new Path.Rectangle({
    center: [335, 225],
    size: [20, 40],
    fillColor: "#895638",
  });
  let pie1 = new Path.Ellipse({
    center: [339, 245],
    radius: [13, 8],
    fillColor: "#895638",
  });
  let cola = dibujarColaPerro(250, 195);
  let piernas1 = new Group([pierna1, pie1]);
  let piernas2 = piernas1.clone();
  let piernas3 = piernas1.clone();
  piernas2.position.x -= 60;
  piernas3.position.x -= 13;
  piernas3.position.y -= 6;
  piernas3.fillColor = "#462a1c";
  let piernas4 = piernas2.clone();
  piernas4.position.x -= 13;
  piernas4.position.y -= 6;
  piernas4.fillColor = "#462a1c";
  let cuerpoPerro = new Group([
    piernas3,
    piernas4,
    cuerpo,
    piernas1,
    piernas2,
    cola,
  ]);
  // let cabeza = new Path.Circle({
  //   center: [350, 160],
  //   radius: 30,
  //   fillColor: "#895638",
  // });
  let cabeza = new Path();
  cabeza.moveTo(350, 200); // Punto superior
  cabeza.lineTo(320, 240); // Punto izquierdo
  cabeza.arcTo(new Point(350, 280), new Point(380, 240)); // Curva de la gota
  cabeza.closePath(); // Cerrar el camino
  cabeza.fillColor = "#895638"; // Marrón claro
  cabeza.rotate(120);
  cabeza.position.y = 160;
  let nariz = new Path.Ellipse({
    center: [377, 180],
    radius: [10, 7], // radioX y radioY
    fillColor: "black",
  });
  nariz.rotate(145);
  let ojo1 = new Path.Circle({
    center: [340, 160],
    radius: 5,
    fillColor: "white",
  });
  let ojo2 = ojo1.clone();
  ojo2.position.x += 20;
  ojo2.position.y -= 8;
  // Crear pupilas para ojo1
  let pupila1 = new Path.Circle({
    center: [341, 160], // Centro del ojo1
    radius: 3, // Tamaño de la pupila
    fillColor: "black", // Color de la pupila
  });

  // Crear pupilas para ojo2
  let pupila2 = new Path.Circle({
    center: [361, 152], // Centro del ojo2
    radius: 3, // Tamaño de la pupila
    fillColor: "black", // Color de la pupila
  });
  // Agrupar ojo1 y su pupila
  let grupoOjo1 = new Group([ojo1, pupila1]);

  // Agrupar ojo2 y su pupila
  let grupoOjo2 = new Group([ojo2, pupila2]);

  // Agregar orejas
  let oreja1 = new Path.Rectangle({
    center: [320, 165],
    size: [30, 50],
    radius: new Size(15, 15),
    fillColor: "#462a1c",
  });
  // new Path.Ellipse({
  //   center: [330, 130],
  //   size: [15, 25],
  //   fillColor: "#E0BB95", // Marrón claro
  // });

  let cabezaPerro = new Group([cabeza, grupoOjo1, grupoOjo2, nariz, oreja1]);

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

  let direccionPata1 = 1;

  // Para el movimiento del perro, vamos a usar las teclas de dirección
  tool.onKeyDown = function (event) {
    keys[event.key] = true;
  };
  tool.onKeyUp = function (event) {
    keys[event.key] = false;
  };

  view.onFrame = function (event) {
    if (keys["w"]) {
      perro.position.y -= 5;
    }
    if (keys["s"]) {
      perro.position.y += 5;
    }
    if (keys["a"]) {
      perro.position.x -= 5;
    }
    if (keys["d"]) {
      perro.position.x += 5;
    }

    //Si alguna de las teclas de dirección está presionada
    if (keys["w"] || keys["a"] || keys["s"] || keys["d"]) {
      // rotar pierna 1
      piernas1.pivot = piernas1.bounds.topLeft;
      piernas1.rotate(1 * direccionPata1);
      if (event.count % 10 === 0) {
        direccionPata1 *= -1;
      }
    }

    // Animar la cola del perro esquina inferior derecha
    cola.pivot = cola.bounds.bottomRight;
    cola.rotate(2 * direction);
    if (event.count % 10 === 0) {
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

function dibujarColaPerro(x, y) {
  let cola = new Path({
    segments: [
      [x + 10, y], // base de la cola cerca del cuerpo
      [x - 40, y - 30], // curva hacia la punta de la cola
      [x - 20, y], // punto más extremo de la cola
      [x, y], // curva de regreso hacia el cuerpo
    ],
    closed: true, // cierra la forma automáticamente conectando el último punto con el primero
    fillColor: "#895638", // color de la cola
  });

  // Ajustar las curvas de los segmentos para crear una cola suave y estilizada
  cola.smooth(); // Suaviza las curvas de los segmentos
  cola.smooth({ type: "catmull-rom" }); // Ajusta el tipo de suavizado si es necesario

  // Rotar la cola a la posición deseada
  cola.rotate(30, new Point(x, y)); // Ajusta el ángulo de rotación si es necesario

  return cola;
}
