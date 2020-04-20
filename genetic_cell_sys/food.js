// Manages the food collection of the world

class Food {
	constructor(num) {
		// Initialize the foods collections with the value passed for world population
		// Food can be meat or plant
		this.food = []

		// Food is initialized at a random position
		for (let i = 0; i < num; i++) {
			let pos = createVector(random(width), random(height))

			let r = random(100)
			if (r < 50)
				this.food.push({ type: "meat", pos })
			else
				this.food.push({ type: "plant", pos })
		}
	}

	// Add meat food at a location (used when a cell dies)
	add(pos) {
	  this.food.push({ type: "meat", pos: pos.copy() })
	}

	run() {
		for (let i = 0; i < this.food.length; i++) {
			let f = this.food[i]
			if (f.type === "meat") {
				fill(255, 0, 0)
				rect(f.pos.x, f.pos.y, 8, 8)
			}
			else if (f.type === "plant") {
				fill(0, 255, 0)
				rect(f.pos.x, f.pos.y, 8, 8)
			}
		}

		// There's a small chance of meat food appear and more chance of plant food appear randomly
		if (random(1) < 0.001) {
			this.food.push({ type: "meat", pos: createVector(random(width), random(height)) })
		}
		if (random(1) < 0.01) {
			this.food.push({ type: "plant", pos: createVector(random(width), random(height)) })
		}
	}

	// Return the list of food
	getFood() {
	  return this.food
	}
}