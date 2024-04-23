// Primero, la función para dibujar la ardilla
function dibujarArdilla(x, y) {
  let grupoArdilla = new Group();

  // Cuerpo de la ardilla
  let cuerpo = new Path.Circle({
    center: [x, y],
    radius: 20,
    fillColor: "saddlebrown",
  });
  grupoArdilla.addChild(cuerpo);

  // Cola de la ardilla
  let cola = new Path.Ellipse({
    center: [x - 25, y - 10],
    radius: [30, 10],
    fillColor: "saddlebrown",
  });
  cola.rotate(45);
  grupoArdilla.addChild(cola);

  // Cabeza de la ardilla
  let cabeza = new Path.Circle({
    center: [x + 20, y],
    radius: 10,
    fillColor: "saddlebrown",
  });
  grupoArdilla.addChild(cabeza);

  // Ojo de la ardilla
  let ojo = new Path.Circle({
    center: [x + 25, y - 5],
    radius: 2,
    fillColor: "black",
  });
  grupoArdilla.addChild(ojo);

  // Oreja de la ardilla
  let oreja = new Path.Circle({
    center: [x + 25, y + 5],
    radius: 4,
    fillColor: "saddlebrown",
  });
  grupoArdilla.addChild(oreja);

  return grupoArdilla;
}

// Ahora, la función para animar la ardilla
function animarArdilla(ardilla, event) {
  // Si no existen propiedades de velocidad y dirección, inicialízalas
  if (!ardilla.data.velocidad) {
    ardilla.data.velocidad = new paper.Point(10, 10); // Velocidad inicial en x y y
  }

  // Calcula la nueva posición
  let nuevaPosicion = ardilla.position.add(ardilla.data.velocidad);

  // Comprueba si la ardilla ha alcanzado los bordes del canvas para invertir la dirección
  if (nuevaPosicion.x < 0 || nuevaPosicion.x > paper.view.size.width) {
    ardilla.data.velocidad.x *= -1; // Invertir la dirección horizontal
  }
  if (nuevaPosicion.y < 0 || nuevaPosicion.y > paper.view.size.height) {
    ardilla.data.velocidad.y *= -1; // Invertir la dirección vertical
  }

  // Actualiza la posición de la ardilla
  ardilla.position = ardilla.position.add(ardilla.data.velocidad);

  // Opcional: rotar la ardilla con el tiempo
  ardilla.rotate(Math.sin(event.time) * 2);
}

export { dibujarArdilla, animarArdilla };
