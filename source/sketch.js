let attractors = [];
let particles = [];
let canvasHeight;
let canvasWidth;
let centerX;
let centerY;
let selectorButton;
let canvasSelected;
let mousePressed1;
let mouseReleased1;
let attractorTypeButton;
let velocityDisplay;
let selector = 0;
let attractorTypeSelector = 1;
let charge;
const ElementaryCharge = 1.602176634e-19;

let res = 10;
let gridX = [];
let gridY = [];
let x, y, dx, dy, E1x, E1y, dxn, dyn, d2, E2, E2x, E2y, EEx, EEy, EE, deltax, deltay;
function setup() {
  //Defines the adjustable canvas height and width
  canvasHeight = windowHeight / 1.5;
  canvasWidth = windowWidth / 1.5;
  //defines the center
  center = canvasHeight / 2;
  //Draws the canvas to window height
  createCanvas(canvasHeight, canvasHeight);
  //Sets background to grey
  background("#3895D3");
  //Creates the attractor

  canvasSelected = document.querySelector("canvas"); //Links the canvas to JS
  canvasSelected.addEventListener("mousedown", function () {
    mousePressed1 = createVector(mouseX / 25, mouseY / 25); //Generates a starting position to calculate the velocity for the placed particle
    if (selector == 0) { //If attractors are selected, places an attractor with the correct charge based on charge selector
      attractors.push(new Attractor(mouseX, mouseY, ElementaryCharge * attractorTypeSelector));
    }
  });

  canvasSelected.addEventListener("mouseup", function () {
    mouseReleased1 = createVector(mouseX / 25, mouseY / 25);  //Generates the end position to calculate velocity for the placed partice
    if (selector == 1) {  //If particles are selected, places a particle with a negative charge, and passes the start and end position to calculate velocity.
      particles.push(new Particle(mouseX, mouseY, mousePressed1, mouseReleased1, ElementaryCharge * -1));
    }

  });

  selectorButton = document.querySelector("#selectorButton"); //Links the placement type button
  selectorButton.addEventListener("click", function () {
    if (selector == 0) {  // If the type is currently set to attractor, switch the type to particle and change the text to reflect.
      selector = 1;
      this.value = "Placing: Particle";
    }
    else if (selector == 1) {// If the type is currently set to particle, switch the type to attractor and change the text to reflect.
      selector = 0;
      this.value = "Placing: Attractor";
    }

  });

  attractorTypeButton = document.querySelector("#attractorTypeButton"); //Links the attractor type button
  attractorTypeButton.addEventListener("click", function () {
    if (attractorTypeSelector == 1) {   // If the type is currently set to positive, switch to negative and change the text to reflect
      attractorTypeSelector = -1;
      this.value = "Attractor Charge: Negative";
    }
    else if (attractorTypeSelector == -1) { // If the type is currently set to negative, switch to positve and change the text to reflect
      attractorTypeSelector = 1;
      this.value = "Attractor Charge: Positive";
    }
  });

  velocityDisplay = document.querySelector("#velocityDisplay"); //Displays the speedometer

  for (let i = 0; i < width / res; i++) {
    gridX.push(height / res);
    gridY.push(height / res);
  }
}

//Draws the actual particles and attractors
function draw() {
  // put drawing code here
  background("#3895D3"); //Generates grey background, wipes all past draws
  drawGrid();
  if (particles.length >= 2) {
    drawFieldGrains(15);
  }

  for (let i = 0; i < attractors.length; i++) {
    let attractor = attractors[i];
    attractor.show();  //Draws the attractor
  }

  //Runs the algorithms for detecting and updating the accelerations and velocities, and draws the particles
  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];
    for (let k = 0; k < particles.length; k++) {
      particle.particleAttracted(particles[k]);
    }
    for (let j = 0; j < attractors.length; j++) {
      particle.attractorAttracted(attractors[j]);
    }

    // particle.magAttraction();
    particle.show();
    particle.update();
  }

}

//Detects if the window has been resized
function windowResized() {
  canvasHeight = windowHeight / 1.5;
  canvasWidth = windowWidth / 1.5;
  resizeCanvas(canvasHeight, canvasHeight); //Resizes the canvas to new window size
  background(51);
}

function drawGrid() {
  stroke(0, 50);
  strokeWeight(2);
  for (var i = 0; i < width; i += 20) {
    line(0, i, width, i);
    line(i, 0, i, height);
  }
}

// function vectorGrid() {
//   print("Vector grid")
//   var x1 = 0;
//   for (var i = 0; i < height / res; i++) {
//     for (var j = 0; j < height / res; j++) {
//       x = res / 2 + i * res
//       y = res / 2 + j * res

//       dx = x - particles[0].x;
//       dy = y - particles[0].y;
//       d1 = sqrt(dx * dx + dy * dy);
//       E1 = -20 / (d1 * d1);
//       E1x = dx * E1 / d1;
//       E1y = dy * E1 / d1;
//       dxn = x - particles[1].x;
//       dyn = y - particles[1].y;
//       d2 = sqrt(dxn * dxn + dyn * dyn);
//       E2 = 20 / (d2 * d2);
//       E2x = dxn * E2 / d2;
//       E2y = dyn * E2 / d2;
//       EEx = E1x + E2x;
//       EEy = E1y + E2y;
//       EE = sqrt(EEx * EEx + EEy * EEy);
//       deltax = 15 * EEx / EE;
//       deltay = 15 * EEy / EE;
//       gridX[i][j] = deltax
//       gridY[i][j] = deltay
//     }

//   }
// }

function drawFieldGrains(length) {
  for (let i = 0; i < 4000; i++) {

    x = noise(i) * width
    y = noise(8000 - i) * height


    dx = x - particles[0].x;
    dy = y - particles[0].y;
    d1 = sqrt(dx * dx + dy * dy);
    E1 = -20 / (d1 * d1);
    E1x = dx * E1 / d1;
    E1y = dy * E1 / d1;

    dxn = x - particles[1].x;
    dyn = y - particles[1].y;
    d2 = sqrt(dxn * dxn + dyn * dyn);
    E2 = 20 / (d2 * d2);
    E2x = dxn * E2 / d2;
    E2y = dyn * E2 / d2;

    EEx = E1x + E2x;
    EEy = E1y + E2y;
    EE = sqrt(EEx * EEx + EEy * EEy);

    deltax = length * EEx / EE;
    deltay = length * EEy / EE;

    stroke(0, 70);

    line(x - deltax / 2, y - deltay / 2, x + deltax / 2, y + deltay / 2);
    // while (x != 1) {
    //   x += 1;
    // }

  }
}