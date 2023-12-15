let edgeImage;
let walkers = [];
let edgePoints = [];
const numWalkers = 100; // More walkers for a denser drawing

function preload() {
  edgeImage = loadImage('teacher_edges.png'); // Make sure the path is correct
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0); // Draw the background only once if you want to preserve the trails
  edgeImage.loadPixels();

  // Identify edge points and store their positions
  for (let x = 0; x < edgeImage.width; x++) {
    for (let y = 0; y < edgeImage.height; y++) {
      let index = (x + y * edgeImage.width) * 4;
      let brightness = (edgeImage.pixels[index] + edgeImage.pixels[index + 1] + edgeImage.pixels[index + 2]) / 3;
      if (brightness > 128) { // Threshold can be adjusted
        edgePoints.push(createVector(x, y));
      }
    }
  }

  // Create walkers
  for (let i = 0; i < numWalkers; i++) {
    walkers.push(new Walker(random(width), random(height)));
  }
}

function draw() {
  // Comment or remove this line to stop the canvas from getting progressively brighter
  // background(255, 255, 255, 5);

  for (let i = 0; i < walkers.length; i++) {
    walkers[i].move();
    walkers[i].display();
  }

  // Termination condition (example: stop after a certain number of frames)
  // if (frameCount > maxFrames) {
  //   noLoop(); // This stops the p5.js draw loop
  // }
}

class Walker {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
  }

  move() {
    let closestEdge = null;
    let record = Infinity;

    // Find closest edge point
    for (let i = 0; i < edgePoints.length; i++) {
      let d = p5.Vector.dist(this.pos, edgePoints[i]);
      if (d < record) {
        record = d;
        closestEdge = edgePoints[i];
      }
    }

    if (closestEdge) {
      let force = p5.Vector.sub(closestEdge, this.pos);
      force.setMag(1); // Increase the force magnitude for a stronger attraction
      this.vel.add(force);
    }

    this.vel.limit(5); // Limit the velocity to prevent too fast movement
    this.pos.add(this.vel);
  }

  display() {
    stroke(255); // Make the walkers white to be visible on the black background
    strokeWeight(1);
    point(this.pos.x, this.pos.y);
  }
}
