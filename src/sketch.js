// global variables
let skeleton;
let text = "";
let epsilon = 0.5;
const color = "#000000";

let textDescription, textInput, epsilonDescription, epsilonInput, resetInput;

// load de skeleton
function preload() {
  skeleton = loadJSON("/skeletons/Scala-Italic.json");
  console.log("skeleton: ", skeleton);
}

function setup() {
  // create canvas
  createCanvas(windowWidth, windowHeight);
  pixelDensity(3);
  frameRate(30);

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

//where the magic happens
//fill the skeleton by drawing a shape on every point
function makeItPop(position, character) {
  push();
  translate(position.x, position.y);
  fill(color);
  noStroke();

  const width = 10;

  for (const line of character) {
    for (const point of line) {
      //take a look at all the available shapes here:
      //https://p5js.org/reference/#group-Shape

      ellipse(point.x, point.y, width, width);
    }
  }
  pop();
}

//draw the skeleton
function drawLine(position, character) {
  push();
  translate(position.x, position.y);
  stroke(color);
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
