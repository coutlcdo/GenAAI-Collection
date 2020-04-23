let x = 0
let y = 0
let step = 50

function setup() {
	createCanvas(windowWidth, windowHeight)
	background(103, 167, 240)
}

function draw() {
	stroke(2, 105, 222)
	fill(2, 105, 222)
	strokeWeight(5)
	ellipse(x, y, step/3)

	if (random(1) < 0.4) {
		line(x, y, x + step, y + step)
	} else {
		stroke(240, 96, 187)
		line(x, y + step, x + step, y)
	}

	x += step
	if (x > width) {
		x = 0
		y += step
	}

	if (y > height) {
		noLoop()
	}
}