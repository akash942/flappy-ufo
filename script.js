const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ufo_png = document.getElementById("png-ufo");

const asteroid_png = document.getElementById("png-asteroid");

const ufo = {
  X: 50,
  Y: 50,
  size: 25,
  dy: 0.8,
  da: 0.02,
};

const asteroid = {
  X: 190,
  Y: 50,
  size: 30,
  dx: -1,
};

//clears canvas every frame
function clear() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
}

//draws ufo every frame
function draw_ufo() {
  ctx.drawImage(ufo_png, ufo.X, ufo.Y, ufo.size, ufo.size);
}
const random_arr = [asteroid.Y]; //array that stores y-axis of every asteroid

//for randomly placing asteroids on y-axis
function random() {
  for (let i = 0; i < 2; i++) {
    random_arr.push(Math.random() * canvas.height);
  }
}

//draws asteroids every frame
function draw_asteroid() {
  let DX = 0;
  // let DY = asteroid.Y;
  let DA = 0.2;
  for (let i = 0; i < 50; i++) {
    ctx.drawImage(
      asteroid_png,
      asteroid.X + DX,
      random_arr[i],
      asteroid.size,
      asteroid.size
    );
    DX += 40;
    // DA += 0.02;
    random();
    // DY = random_arr[i];
  }
}

let index = 0;
let astX = 0;
let astdx = 0;
//position changing function
function newpos() {
  ufo.Y += ufo.dy;
  ufo.dy += ufo.da;
  asteroid.X += asteroid.dx;
  astX = asteroid.X;
  if (ufo.Y + ufo.size > canvas.height) {
    ufo.dy = 0;
    cancelAnimationFrame();
  }

  // collision detection
  if (
    ufo.Y + ufo.size > random_arr[index] + 12 &&
    ufo.Y < random_arr[index] + asteroid.size - 12 &&
    ufo.X + ufo.size > astX + astdx + 12 &&
    ufo.X < astX + astdx + asteroid.size - 12
  ) {
    console.log("hit");
    cancelAnimationFrame();
  }
  if (ufo.X > astX + asteroid.size + astdx) {
    astdx += 40;
    index++;
    console.log(astdx + "  working  ");
  }
}

//jumping fn
window.addEventListener("keydown", function (e) {
  if (e.key === " ") {
    ufo.dy = -1;
  }
});

//repeating fn
function update() {
  clear();
  draw_ufo();
  draw_asteroid();
  newpos();

  requestAnimationFrame(update);
}

document.querySelector("button").addEventListener("click", function (event) {
  update();
  document.getElementById("start").style.display = "none";
});
