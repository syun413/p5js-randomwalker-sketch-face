let edgeImage;
let walkers = [];
let edgePoints = [];
const numWalkers = 1000; // Increased number of walkers for faster drawing

function preload() {
  edgeImage = loadImage('teacher_edges.png'); // Make sure the path is correct
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  edgeImage.loadPixels();

  // Calculate average brightness and set dynamic threshold
  let avgBrightness = calculateAverageBrightness(edgeImage);
  let threshold = avgBrightness * 0.5; // Set threshold as 50% of average brightness

  // Identify edge points and store their positions
  for (let x = 0; x < edgeImage.width; x++) {
    for (let y = 0; y < edgeImage.height; y++) {
      let index = (x + y * edgeImage.width) * 4;
      let brightness = (edgeImage.pixels[index] + edgeImage.pixels[index + 1] + edgeImage.pixels[index + 2]) / 3;
      if (brightness > threshold) {
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
  for (let i = 0; i < walkers.length; i++) {
    walkers[i].move();
    walkers[i].display();
  }
}

class Walker {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.maxSpeed = 10; // Increased maximum speed
  }

  move() {
    let closestEdge = findClosestEdge(this.pos);

    // Move towards the closest edge point
    if (closestEdge) {
      let desired = p5.Vector.sub(closestEdge, this.pos);
      desired.setMag(this.maxSpeed);
      this.vel.lerp(desired, 0.2); // Use lerp for smoother transition of velocities
      this.vel.limit(this.maxSpeed);
    }

    this.pos.add(this.vel);
  }

  display() {
    stroke(255);
    strokeWeight(1);
    point(this.pos.x, this.pos.y);
  }
}

// Function to calculate average brightness of the image
function calculateAverageBrightness(img) {
  let totalBrightness = 0;
  for (let i = 0; i < img.pixels.length; i += 4) {
    totalBrightness += (img.pixels[i] + img.pixels[i + 1] + img.pixels[i + 2]) / 3;
  }
  return totalBrightness / (img.width * img.height);
}

// Function to find the closest edge to a given position
function findClosestEdge(position) {
  let recordDistance = Infinity;
  let closestEdge = null;

  for (let edge of edgePoints) {
    let d = p5.Vector.dist(position, edge);
    if (d < recordDistance) {
      recordDistance = d;
      closestEdge = edge;
    }
  }
  return closestEdge;
}
