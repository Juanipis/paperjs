export default function dibujarArbol(x, y) {
  // Tronco del árbol
  let tronco = new Path.Rectangle({
    point: [x, y],
    size: [20, 100],
    fillColor: "saddlebrown",
  });

  // Forma general de la copa del árbol
  let copa = new Path.Circle({
    center: [x + 10, y - 50],
    radius: 50,
    fillColor: "darkgreen",
  });

  // Detalles de la copa del árbol (hojas individuales)
  let hojas = new Group();
  for (let i = 0; i < 6; i++) {
    let hoja = new Path.Circle({
      center: [
        x + 10 + Math.random() * 40 - 20,
        y - 50 + Math.random() * 40 - 20,
      ],
      radius: 15 + Math.random() * 10,
      fillColor: new Color(0, 0.8, 0, 0.8),
    });
    hojas.addChild(hoja);
  }

  // Agrupa el tronco y la copa para formar el árbol completo
  let arbol = new Group([tronco, copa, hojas]);

  // Escalar de manera aleatoria el árbol entre 0.8 y 1.3
  let factorEscala = Math.random() * 0.5 + 0.8;
  arbol.scale(factorEscala);

  return arbol;
}

export function dibujarBosque(centroX, centroY, numeroArboles) {
  let grupoBosque = new Group();

  for (let i = 0; i < numeroArboles; i++) {
    // Aleatoriedad en la posición de los árboles
    let variacionX = (Math.random() - 0.5) * 200; // Variación de hasta 50px en X
    let variacionY = (Math.random() - 0.5) * 100; // Variación de hasta 50px en Y

    // Aleatoriedad en el tamaño de los árboles
    let factorEscala = Math.random() * 0.2 + 0.9; // Factor de escala entre 0.9 y 1.1

    let arbol = dibujarArbol(centroX + variacionX, centroY + variacionY);
    arbol.scale(factorEscala);
    grupoBosque.addChild(arbol);
  }

  return grupoBosque;
}
