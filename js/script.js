// Instalar Paper.js en el scope global
paper.install(window);

window.onload = function () {
  paper.setup(document.getElementById("miCanvas"));

  const size = new Size(800, 600);
  view.viewSize = size;

  var estrella = new Path.Star({
    center: [300, 100],
    points: 10,
    radius1: 10,
    radius2: 40,
    fillColor: "green",
  });
};
