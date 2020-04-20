// World class manages with population

class World {
	// Initialization
	constructor(num) {
		// A 'num' quantity of food and cells are initialiazed
		this.food = new Food(num)
		// The population of cells are filled with a new cell with a random position and a new DNA
		this.cells = []
		for (let i=0; i<num; i++) {
			let pos = createVector(random(width), random(height))
			let dna = new DNA()
			this.cells.push(new Cell(pos, dna))
		}
	}

	// Make a new creature (used to force-born with mouse click)
	born(x, y) {
	  let pos = createVector(x, y)
	  let dna = new DNA()
	  this.cells.push(new Cell(pos, dna))
	}

	// Manage what occurs at the loop in sketch.js
	run() {
		// Display food
		this.food.run()

		// Iterate through the array of cells
		for (let i = this.cells.length - 1; i >= 0; i--) {
			let cell = this.cells[i]
			cell.run()
			cell.eat(this.food)
			// If cell is dead, erase it and make food
			if (cell.dead()) {
			  this.cells.splice(i, 1)
			  this.food.add(cell.location)
			}
			// Display new cell if child is born
			// Assexual
			let child = cell.aReproduce()
			if (child != null) this.cells.push(child)
			// Sexual
			for (let j = this.cells.length - 1; j >= 0; j--) {
				if (i !== j && this.cells[j]) {
					let otherCell = this.cells[j]
					if (cell.location.dist(otherCell.location) < cell.size / 2) {
						cell.sReproduce(otherCell)
					}
				}
			}
		}
	}
}