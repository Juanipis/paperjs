export default function dibujarLago(x, y, ancho, alto) {
  // Crea el cuerpo principal del lago
  let cuerpoLago = new Path.Ellipse({
    center: [x, y],
    size: [ancho, alto],
    fillColor: "darkblue",
  });

  // Crea un reflejo para el lago que dé la impresión de luz y profundidad
  let reflejoLago = new Path.Ellipse({
    center: [x, y - alto / 4],
    size: [ancho * 0.7, alto / 8],
    fillColor: new Color(1, 1, 1, 0.2), // Semi-transparente
  });

  // Crea un borde alrededor del lago para dar la impresión de un cambio de profundidad
  let bordeLago = new Path.Ellipse({
    center: [x, y],
    size: [ancho + 10, alto + 10],
    strokeColor: "blue",
    strokeWidth: 3,
  });

  // Agrupa todos los elementos del lago para facilitar la manipulación posterior
  let lago = new Group([bordeLago, cuerpoLago, reflejoLago]);

  return lago;
}
