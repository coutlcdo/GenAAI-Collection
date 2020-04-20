// Manages the creatures

class Cell {
	// Create a cell with a given position and DNA
	constructor(pos, dna_) {
		this.location = pos.copy()
		this.health = 200
		this.dna = dna_
		// DNA determine the type of feeding, size and speed of cell
		this.feed_type = this.dna.genes.mouth
		// The gene of size/body is mapped so its range can be between 25 and 45
		this.size = map(this.dna.genes.body, 0, 1, 25, 75)
		// Type of tail, define the speed
		this.speed = this.dna.genes.tail*5
		// Vector of speed and its angle, needed to be global to draw the direction of head and tail correctly
		this.vec_speed
		this.angle
		// For perlin noise
		this.xoff1 = random(1000)
		this.xoff2 = random(1000)
	}

	// Manages all the functions that run inside a loop
	run() {
		this.update()
		this.borders()
		this.display()
	}

	// Function to update the position of cells based on their speed
	update() {
		// Using moviment by random walker
		// -------------------
		// let step = p5.Vector.random2D()

		// let r = floor(random(100))
		// if(r < 10) {
		// 	step.mult(random(map(this.speed, 2, 6, 15, 75)))
		// }
		// else {
		// 	step.setMag(this.speed)
		// }

		// Using moviment with perlin noise
		// --------------------------------
		let vx = map(noise(this.xoff1), 0, 1, -this.speed, this.speed)
		let vy = map(noise(this.xoff2), 0, 1, -this.speed, this.speed)
		this.vec_speed = createVector(vx, vy)
		this.angle = this.vec_speed.heading()

		this.xoff1 += 0.01
		this.xoff2 += 0.01

		this.location.add(this.vec_speed)

		// Cell always dying
    	this.health -= 0.2
	}

	// A cell can find food and eat it
	eat(f) {
		let food = f.getFood()
		// Are we touching any food objects?
		for (let i = food.length - 1; i >= 0; i--) {
			let foodLocation = food[i].pos
			let d = this.location.dist(foodLocation)
			if (d < this.size / 2) {
				// If we are, verify if cell can eat it
				if ((this.feed_type === 1 && food[i].type === "meat") || (this.feed_type === 2 && food[i].type === "plant")) {
					this.health += 100
					food.splice(i, 1)
				}
			}
		}
	}

	// Really small chance of assexual cell reproduction
	aReproduce() {
		if (random(1) < 0.0005) {
			// Child is exact copy of single parent
			let childDNA = this.dna.copy()
			// Child DNA can mutate
			childDNA.mutate(0.01, 0.02, 0.02)

			return new Cell(this.location, childDNA)
		} else {
			return null
		}
	}

	// Chance of sexual reproduction
	sReproduce(s_parent) {
		if (random(1) < 0.005) {
			// Sexual reproduction requires dna crossover
			let childDNA = this.dna.crossover(s_parent.dna)
			childDNA.mutate(0.01, 0.01, 0.01)

			return new Cell(this.location, childDNA)
		  } else {
			return null
		  }
	}

	// Wraparound
	borders() {
		if (this.location.x < -this.size)
			this.location.x = width + this.size
		if (this.location.y < -this.size)
			this.location.y = height + this.size
		if (this.location.x > width + this.size)
			this.location.x = -this.size
		if (this.location.y > height + this.size)
			this.location.y = -this.size
	}

	// Function to draw the cells
	display() {
		angleMode(DEGREES)

		ellipseMode(CENTER)
		stroke(0, this.health)
		fill(0, this.health)
		ellipse(this.location.x, this.location.y, this.size, this.size)

		if (this.speed === 5) {
			// With a push and pop, you can cluster changes. For example with functions like translate and rotate that are global
			push()
				// Translating to the base location
				translate(this.location.x, this.location.y)
				// Rotating by the opposite angle because its the tail
				rotate(this.angle-180)
				// Using the vec_speed translated to the base location to draw the tail
				strokeWeight(this.size*0.2)
				line(this.vec_speed.x, this.vec_speed.y, this.size*0.7, this.size*0.7)
			pop()
		}
		if (this.speed === 10) {
			push()
				translate(this.location.x, this.location.y)
				rotate(this.angle-250)
				rect(this.vec_speed.x, this.vec_speed.y, this.size*0.7, this.size*0.7, 10)
			pop()
			push()
				translate(this.location.x, this.location.y)
				rotate(this.angle+250)
				rect(this.vec_speed.x, this.vec_speed.y, this.size*0.7, this.size*0.7, 10)
			pop()
		}
		if (this.speed === 15) {
			push()
				translate(this.location.x, this.location.y)
				rotate(this.angle-180)
				strokeWeight(this.size*0.8)
				line(this.vec_speed.x, this.vec_speed.y, this.size*0.4, this.size*0.4)
			pop()
		}

		if (this.feed_type === 1) {
			push()
				translate(this.location.x, this.location.y)
				rotate(this.angle)
				rect(this.vec_speed.x, this.vec_speed.y, this.size*0.6, this.size*0.6)
			pop()
		}
		if(this.feed_type === 2) {
			push()
				translate(this.location.x, this.location.y)
				rotate(this.angle)
				rect(this.vec_speed.x, this.vec_speed.y, this.size*0.7, this.size*0.7, 50)
			pop()
		}
	}

	// Death
	dead() {
	  if (this.health < 0.0) {
		return true
	  } else {
		return false
	  }
	}
}