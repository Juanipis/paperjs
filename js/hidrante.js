export default function dibujarHidrante(x, y, scale = 1.5) {
  let baseHidrante = new Path.Ellipse({
    center: [x, y],
    radius: [20, 10],
    fillColor: "red",
  });

  let cuerpoHidrante = new Path.Rectangle({
    point: [x - 15, y - 30],
    size: [30, 30],
    fillColor: "red",
  });

  let tapaHidrante = new Path.Ellipse({
    center: [x, y - 30],
    radius: [15, 10],
    fillColor: "darkred",
  });

  let salidaUno = new Path.Rectangle({
    point: [x - 20, y - 20],
    size: [5, 10],
    fillColor: "silver",
  });

  let salidaDos = new Path.Rectangle({
    point: [x + 15, y - 20],
    size: [5, 10],
    fillColor: "silver",
  });

  let tapaSuperior = new Path.Circle({
    center: [x, y - 40],
    radius: 5,
    fillColor: "darkred",
  });

  // Detalles adicionales como pernos o tornillos
  let perno1 = new Path.Circle({
    center: [x - 10, y - 20],
    radius: 2,
    fillColor: "black",
  });

  let perno2 = new Path.Circle({
    center: [x + 10, y - 20],
    radius: 2,
    fillColor: "black",
  });

  // Agregando todos a un grupo para manipulación fácil
  let grupoHidrante = new Group([
    baseHidrante,
    cuerpoHidrante,
    tapaHidrante,
    salidaUno,
    salidaDos,
    tapaSuperior,
    perno1,
    perno2,
  ]);
  // Hacer el hidrante un poco más grande
  grupoHidrante.scale(scale);
  return grupoHidrante;
}
