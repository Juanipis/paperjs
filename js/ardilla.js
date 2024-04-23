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
function animarArdilla(ardilla, velocidad, direccionColaArdilla, event) {
  // Mover la ardilla
  ardilla.position.x += velocidad.x;
  ardilla.position.y += velocidad.y;

  // Cambiar la dirección si la ardilla llega al borde del canvas
  if (ardilla.bounds.left < 0 || ardilla.bounds.right > view.size.width) {
    velocidad.x *= -1;
  }
  if (ardilla.bounds.top < 0 || ardilla.bounds.bottom > view.size.height) {
    velocidad.y *= -1;
  }
}

export { dibujarArdilla, animarArdilla };
