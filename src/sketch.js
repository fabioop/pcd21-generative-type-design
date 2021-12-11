// global variables
let skeleton;
let text = "";
let epsilon = 0.5;
const color = "#eb8c34";
const secondaryColor = "#3471eb";

let textDescription, textInput, epsilonDescription, epsilonInput, resetInput;

// load de skeleton
function preload() {
  skeleton = loadJSON("/skeletons/BaskervilleMTStd-Italic.json");
  tree = loadImage("/src/tree.png");
  console.log("skeleton: ", skeleton);
}

function setup() {
  // create canvas
  createCanvas(windowWidth, windowHeight);
  pixelDensity(3);
  frameRate(3);

  textDescription = createP("Text:");
  textDescription.id("text-description");

  epsilonDescription = createP("Detail:");
  epsilonDescription.id("epsilon-description");

  // create a text input
  textInput = createInput(text);
  textInput.id("text-input");
  textInput.input(updateText);

  // create a epsilon input
  epsilonInput = createSelect();
  epsilonInput.id("epsilon-input");
  for (let key of Object.keys(skeleton["glyphs"]).sort()) {
    epsilonInput.option(key);
  }
  epsilonInput.selected(epsilon);
  epsilonInput.changed(updateEpsilon);

  // create clean button
  resetInput = createButton("Reset");
  resetInput.id("reset-input");
  resetInput.mousePressed(cleanCanvas);
}

function draw() {
  background(255);

  const widthRatio = 0.7;
  const initialXPos = 100;

  let currentPosition = createVector(initialXPos, height / 2 + 100);

  for (const character of text) {
    //if finds the character on the array
    if (Object.keys(skeleton["glyphs"][epsilon]).includes(character)) {
      let currentCharacter = skeleton["glyphs"][epsilon][character];

      makeItPop(currentPosition, currentCharacter);
      // drawLine(currentPosition, currentCharacter);

      currentPosition.add(skeleton["maxX"] * widthRatio, 0);
    }
    // if it is a space
    else if (character == " ") {
      currentPosition.add(skeleton["maxX"] * widthRatio, 0);
    }
  }
}

//press Enter to print the canvas
function keyPressed() {
  if (keyCode === 13) {
    printCanvas();
  }
}

//where the magic happens
//fill the skeleton by drawing a shape on every point
function makeItPop(position, character) {
  push();
  translate(position.x, position.y);

  let sizeX = map(mouseX, 0, width, 0, 30, true);
  let sizeY = map(mouseY, 0, height, 0, 30, true);

  for (const line of character) {
    // for (const point of line) {

    for (let index = 0; index < line.length; index++) {
      //take a look at all the available shapes here:
      //https://p5js.org/reference/#group-Shape

      image(tree, line[index].x, line[index].y);
      // ellipse(point.x, point.y, sizeX, sizeY);
      // rotateInc += 3;
      // rotate(frameCount / -100.0);

      //check if the number is even
      // if (int(point.x) % 2 == 0) {
      //   console.log("The number is even.");
      //   push();
      //   noStroke();
      //   fill(color);
      //   polygon(point.x, point.y, random(sizeX, sizeY), random(3, 5));
      //   pop();
      // }

      // // if the number is odd
      // else {
      //   console.log("The number is odd.");

      //   push();
      //   noStroke();
      //   fill(secondaryColor);
      //   polygon(point.x, point.y, random(sizeX, sizeY), random(6, 12));
      //   pop();
      // }
    }
  }
  pop();
}

function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

//draw the skeleton
function drawLine(position, character) {
  push();
  translate(position.x, position.y);
  noStroke(color);
  noFill();

  for (const line of character) {
    beginShape();
    for (const point of line) {
      vertex(point.x, point.y);
    }
    endShape();
  }
  pop();
}

// utility functions
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function updateText() {
  text = textInput.value();
}

function updateEpsilon() {
  epsilon = epsilonInput.value();
}

function cleanCanvas() {
  text = "";
  textInput.value("");
  clear();
}

function printCanvas() {
  let timestamp =
    year() +
    "_" +
    nf(month(), 2) +
    "_" +
    nf(day(), 2) +
    "_" +
    nf(hour(), 2) +
    "_" +
    nf(minute(), 2) +
    "_" +
    nf(second(), 2);
  saveCanvas(timestamp, "png");
}

// if (line.length == 2) {
//   console.log("line: ", line);
//   console.log("two points");

//   const numPoints = 5;

//   var xDist = line[1].x - line[0].x;
//   var yDist = line[1].y - line[0].y;
//   var dist = Math.sqrt(xDist * xDist + yDist * yDist);

//   let len = dist / numPoints;

//   var fractionOfTotal = len / dist;

//   for (let INDEX = 0; INDEX < numPoints; INDEX++) {
//     let x = line[0].x + xDist * (fractionOfTotal * INDEX);
//     let y = line[0].y + yDist * (fractionOfTotal * INDEX);

//     ellipse(x, y, 10, 10);
//   }
// }
