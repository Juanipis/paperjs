paper.install(window);

window.onload = function () {
  paper.setup(document.getElementById("miCanvas"));

  const size = new Size(800, 600);
  view.viewSize = size;
  let direction = 1;

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
  };
};
