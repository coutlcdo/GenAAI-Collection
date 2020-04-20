let x
let y
let z

let a = 10
let b = 28
let c = 8/3

let points = []
let points2 = []
let points3 = []

function setup() {
	createCanvas(800, 600, WEBGL)
	createEasyCam()

	x = random(1, 10)
	y = random(25)
	z = random(10)

	colorMode(HSL)
}

function draw() {
	background(0)

	if (points.length > 500) {
		let pointRmv = points.shift()
		points2.push(pointRmv)
	}
	if (points2.length > 1000) {
		let pointRmv = points2.shift()
		points3.push(pointRmv)
	}
	if (points3.length > 5000) {
		points3.shift()
	}

	let dt = random(0.001, 0.01)
	let dx = (a * (y - x)) * dt
	let dy = (x * (b - z) - y) * dt
	let dz = (x * y - c * z) * dt
	x += dx
	y += dy
	z += dz

	points.push(new p5.Vector(x, y, z))

	translate(0, 0, -80)
	scale(8)
	noFill()

	createNewShape(points, '#FF0A2B')
	createNewShape(points2, '#173CFF')
	createNewShape(points3, '#FFCA24')
}

function createNewShape(array, color) {
	stroke(color)
	beginShape()
	for (let vec of array) {
		vertex(vec.x, vec.y, vec.z)
	}
	endShape()
}