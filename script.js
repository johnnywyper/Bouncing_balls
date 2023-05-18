// //window size//
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
window.onload = function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

var mousex = 0;
var mousey = 0;
var canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");

// Listen for mouse movement events and update mouse position variables
addEventListener("mousemove", function (event) {
  mousex = event.clientX;
  mousey = event.clientY;
});

var grav = 0.99;
var tx = window.innerWidth;
var ty = window.innerHeight;

// Create a function to generate a random color
function randomColor() {
  return (
    "rgba(" +
    Math.round(Math.random() * 250) +
    "," +
    Math.round(Math.random() * 250) +
    "," +
    Math.round(Math.random() * 250) +
    "," +
    Math.ceil(Math.random() * 10) / 10 +
    ")"
  );
}

// Define a Ball class
function Ball() {
  this.color = randomColor();
  this.radius = Math.random() * 20 + 14;
  this.startradius = this.radius;
  this.x = Math.random() * (tx - this.radius * 2) + this.radius;
  this.y = Math.random() * (ty - this.radius);
  this.dy = Math.random() * 2;
  this.dx = Math.round((Math.random() - 0.5) * 10);
  this.vel = Math.random() / 5;

  // Define an update method to draw the ball on the canvas
  this.update = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    c.fillStyle = this.color;
    c.fill();
  };
}

// Create an array of Ball objects
var bal = [];
for (var i = 0; i < 50; i++) {
  bal.push(new Ball());
}

// Define an animation function to update and draw the balls on the canvas
function animate() {
  // Update canvas dimensions if the window is resized
  if (tx != window.innerWidth || ty != window.innerHeight) {
    tx = window.innerWidth;
    ty = window.innerHeight;
    canvas.width = tx;
    canvas.height = ty;
  }

  // Clear the canvas before drawing the balls
  c.clearRect(0, 0, tx, ty);

  // Update and draw each ball in the array
  for (var i = 0; i < bal.length; i++) {
    bal[i].update();

    // Apply gravity to the ball's vertical speed
    if (bal[i].y + bal[i].radius >= ty) {
      bal[i].dy = -bal[i].dy * grav;
    } else {
      bal[i].dy += bal[i].vel;
    }

    // Bounce the ball off the walls of the canvas
    if (bal[i].x + bal[i].radius > tx || bal[i].x - bal[i].radius < 0) {
      bal[i].dx = -bal[i].dx;
    }

    // Update the ball's position based on its speed and direction
    bal[i].x += bal[i].dx;
    bal[i].y += bal[i].dy;
  }

  // Request another animation frame to update the balls
  requestAnimationFrame(animate);
}

// Start the animation
animate();
