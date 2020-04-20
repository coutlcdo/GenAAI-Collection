let world

function setup() {
	createCanvas(1200, 800)
	// World is initialiazed with 20 creatures and 20 food
	world = new World(20)
}

function draw() {
	background(175)
	// Function to run the world
	world.run()
}

// Force-born creatures
function mousePressed() {
  world.born(mouseX, mouseY)
}

function mouseDragged() {
  world.born(mouseX, mouseY)
}