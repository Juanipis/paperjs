function dibujarPerro() {
  let perroGroup = new paper.Group();
  let bodyGroup = dibujarCuerpoPerro();
  let headGroup = dibujarCabezaPerro();

  perroGroup.addChildren([bodyGroup, headGroup]);
  return perroGroup;
}

function dibujarCuerpoPerro() {
  let cuerpoGroup = new paper.Group(); // Grupo para todo el cuerpo del perro

  // Crear capas para cada parte del cuerpo
  let bodyLayer = new paper.Layer();
  let legsLayer = new paper.Layer();
  let tailLayer = new paper.Layer();

  // Crear el cuerpo principal
  let cuerpo = new paper.Path.Rectangle({
    center: [300, 200],
    size: [100, 50],
    radius: new paper.Size(20, 20),
    fillColor: "#895638",
  });
  bodyLayer.addChild(cuerpo);

  // Piernas y pies
  // Pierna 1 y pie 1
  let pierna1 = new paper.Path.Rectangle({
    center: [335, 225],
    size: [20, 40],
    fillColor: "#895638",
  });
  let pie1 = new paper.Path.Ellipse({
    center: [339, 245],
    radius: [13, 8],
    fillColor: "#895638",
  });

  let piernas1 = new paper.Group([pierna1, pie1]);
  piernas1.position.x += 2;

  // Clone de piernas para las otras tres patas
  let piernas2 = piernas1.clone();
  let piernas3 = piernas1.clone();
  piernas2.position.x -= 60;
  piernas3.position.x -= 13;
  piernas3.position.y -= 6;
  piernas3.fillColor = "#462a1c";

  let piernas4 = piernas2.clone();
  piernas4.position.x -= 10;
  piernas4.position.y -= 6;
  piernas4.fillColor = "#462a1c";

  legsLayer.addChildren([piernas4, piernas3, piernas2, piernas1]);

  // Añadir las piernas al cuerpo
  cuerpoGroup.addChild(legsLayer);
  cuerpoGroup.addChild(bodyLayer);

  // Cola
  let cola = dibujarColaPerro(255, 195);
  tailLayer.addChild(cola);
  cuerpoGroup.addChild(tailLayer);

  return cuerpoGroup;
}

function dibujarColaPerro(x, y) {
  let cola = new paper.Path({
    segments: [
      [x + 10, y], // base de la cola cerca del cuerpo
      [x - 40, y - 30], // curva hacia la punta de la cola
      [x - 20, y], // punto más extremo de la cola
      [x, y], // curva de regreso hacia el cuerpo
    ],
    closed: true,
    fillColor: "#895638",
  });
  cola.smooth(); // Suaviza las curvas de los segmentos
  cola.rotate(30, new paper.Point(x, y)); // Rotar la cola a la posición deseada

  return cola;
}

function dibujarCabezaPerro() {
  let cabezaGroup = new paper.Group(); // Grupo para toda la cabeza

  // Crear capas para cada parte de la cabeza
  let behindEarLayer = new paper.Layer(); // Capa para la oreja que va detrás
  let headLayer = new paper.Layer(); // Capa para la cabeza
  let eyesLayer = new paper.Layer(); // Capa para los ojos
  let noseLayer = new paper.Layer(); // Capa para la nariz
  let frontEarLayer = new paper.Layer(); // Capa para la oreja que va al frente

  // Oreja detrás (oreja2)
  let oreja2 = new paper.Path.Rectangle({
    center: [365, 160],
    size: [30, 50],
    radius: new paper.Size(15, 15),
    fillColor: "#462a1c",
  });
  oreja2.rotate(-15); // Ligera rotación para apariencia visual
  behindEarLayer.addChild(oreja2);
  cabezaGroup.addChild(behindEarLayer); // Añadir primero para que esté detrás de todo

  // Crear la forma de la cabeza
  let cabeza = new paper.Path();
  cabeza.moveTo(350, 200); // Punto superior
  cabeza.lineTo(320, 240); // Punto izquierdo
  cabeza.arcTo(new paper.Point(350, 280), new paper.Point(380, 240)); // Curva de la gota
  cabeza.closePath(); // Cerrar el camino
  cabeza.fillColor = "#895638"; // Marrón claro
  cabeza.rotate(120);
  cabeza.position.y = 160;
  headLayer.addChild(cabeza);
  cabezaGroup.addChild(headLayer);

  // Nariz
  let nariz = new paper.Path.Ellipse({
    center: [377, 180],
    radius: [10, 7],
    fillColor: "black",
  });
  nariz.rotate(145);
  noseLayer.addChild(nariz);
  cabezaGroup.addChild(noseLayer);

  // Ojos
  let ojo1 = new paper.Path.Circle({
    center: [340, 160],
    radius: 5,
    fillColor: "white",
  });
  let pupila1 = new paper.Path.Circle({
    center: [341, 160],
    radius: 3,
    fillColor: "black",
  });
  let grupoOjo1 = new paper.Group([ojo1, pupila1]);
  eyesLayer.addChild(grupoOjo1);

  let ojo2 = ojo1.clone();
  ojo2.position.x += 20;
  ojo2.position.y -= 8;
  let pupila2 = pupila1.clone();
  pupila2.position.x += 20;
  pupila2.position.y -= 8;
  let grupoOjo2 = new paper.Group([ojo2, pupila2]);
  eyesLayer.addChild(grupoOjo2);

  cabezaGroup.addChild(eyesLayer);

  // Oreja al frente (oreja1)
  let oreja1 = new paper.Path.Rectangle({
    center: [320, 165],
    size: [30, 50],
    radius: new paper.Size(15, 15),
    fillColor: "#462a1c",
  });
  frontEarLayer.addChild(oreja1);
  cabezaGroup.addChild(frontEarLayer);

  return cabezaGroup;
}

let direccionPerro = 1; // 1 para derecha, -1 para izquierda
function moverYAnimarPerro(perro, keys, event) {
  // Variables para controlar el movimiento
  const velocidad = 5; // Cuántos píxeles se mueve el perro por frame cuando se presiona una tecla
  let direccionHorizontal = perro.scaling.x; // Reflejar imagen si es necesario, inicialmente seteado a la escala actual.

  // Movimiento vertical: 'w' para arriba, 's' para abajo
  if (keys["w"]) {
    perro.position.y -= velocidad;
  }
  if (keys["s"]) {
    perro.position.y += velocidad;
  }

  // Movimiento horizontal: 'a' para izquierda, 'd' para derecha
  if (keys["a"]) {
    perro.position.x -= velocidad;
    if (direccionPerro === 1) {
      perro.scaling.x *= -1; // Reflejar imagen
      direccionPerro = -1;
    }
  }
  if (keys["d"]) {
    perro.position.x += velocidad;
    if (direccionPerro === -1) {
      perro.scaling.x *= -1; // Reflejar imagen
      direccionPerro = 1;
    }
  }

  // Animación adicional: rotar las orejas o la cola cuando se mueve el perro
  animarPartesMoviles(perro, keys, direccionHorizontal, event);
}

function animarPartesMoviles(perro, keys, direccion, event) {
  // Vamos a animar la cola del perro para simular un movimiento natural
  // La cola se moverá de arriba a abajo en un rango de 30 grados
  let cola = perro.children[0].children[2];
  let anguloCola = Math.sin(event.time * 10) * 1.2;
  cola.rotate(anguloCola);

  // rotar las patas del perro cuando se mueve
  // las patas del lado izquierdo se mueven en dirección opuesta a las del lado derecho
  if (keys["a"] || keys["d"]) {
    let anguloPiernas = Math.sin(event.time * 10) * 2;
    perro.children[0].children[0].children[0].rotate(anguloPiernas);
    perro.children[0].children[0].children[1].rotate(-anguloPiernas);
    perro.children[0].children[0].children[2].rotate(-anguloPiernas);
    perro.children[0].children[0].children[3].rotate(anguloPiernas);
  }
}

export { dibujarPerro, animarPartesMoviles, moverYAnimarPerro };
