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
  let cola = new Path.Rectangle({
    center: [250, 195],
    size: [40, 10],
    radius: new Size(5, 5),
    fillColor: "#895638",
  });
  cola.cornerRadius = 5;
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
  let cuerpoPerro = new Group([piernas3, piernas4, cuerpo, piernas1, piernas2, cola]);
  // let cabeza = new Path.Circle({
  //   center: [350, 160],
  //   radius: 30,
  //   fillColor: "#895638",
  // });
  let cabeza = new Path();
  cabeza.moveTo(350, 200); // Punto superior
  cabeza.lineTo(320, 240); // Punto izquierdo
  cabeza.arcTo(new Point(350, 280), new Point(380, 240)); // Curva de la gota
  cabeza.closePath();  // Cerrar el camino
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
    fillColor: "black" // Color de la pupila
  });

  // Crear pupilas para ojo2
  let pupila2 = new Path.Circle({
    center: [361, 152], // Centro del ojo2
    radius: 3, // Tamaño de la pupila
    fillColor: "black" // Color de la pupila
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
