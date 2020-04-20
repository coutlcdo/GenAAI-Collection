// Manages DNA

// The DNA has three properties: mouth, to determine the feeding type; body, to set the size; and tail, to
// set the speed

class DNA {
	constructor(newgenes) {
		// If the DNA has a forced new genetic, the genes passed at the constructor are used, if not, the
		// DNA is sorted randomly
		if (newgenes) {
			this.genes = newgenes
		} else {
			this.genes = new Object()
			this.genes.mouth = floor(random(1, 3))
			this.genes.body = random(1)
			this.genes.tail = floor(random(1, 4))
		}
	}

	copy() {
		return new DNA(this.genes)
	}

	// The crossover is made giving to the child 2/3 of dna from the first parent and 1/3 from the second
	crossover(s_parent_dna) {
		let crossoverDNA = {
			mouth: this.genes.mouth,
			body: this.genes.body,
			tail: s_parent_dna.genes.tail
		}

		return new DNA(crossoverDNA)
	}

	// Based on a mutation probability, picks a new random character in array spots
	mutate(prob1, prob2, prob3) {
		if (random(1) < prob1)
			this.genes.mouth = floor(random(1, 3))
		if (random(1) < prob2)
			this.genes.body = random(1)
		if (random(1) < prob3)
			this.genes.tail = floor(random(1, 4))
	}
}