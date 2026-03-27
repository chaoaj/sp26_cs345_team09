let bg;
const rows = 20, cols = 10;
const Board = Array.from({ length: rows }, () =>
  Array.from({ length: cols }, () => ({}))
);
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(240, 30, 10);
}
