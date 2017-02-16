export class SolverParis {

	public parts = [];
	public dessin = 1;
	constructor(public R, public C, public L, public H) {}
	solve(pizza, writer) {
		const ingredients = this.countIngredients(pizza);
		const numberOfM = ingredients['M'];
		const numberOfT = ingredients['T'];

		//this.find(pizza, numberOfM > numberOfT ? 'T': 'M');

		this.testLigne(pizza);

		this.testCol(pizza);
		this.gratter(pizza);

		this.gratterEnCarre(pizza);
//console.log(pizza)
		writer.writeToBuffer(this.parts.length);

		this.parts.forEach(p => {
			writer.writeToBuffer(`${p.from.x} ${p.from.y} ${p.to.x} ${p.to.y}`);
		});
	}

	countIngredients(pizza: string[][]) {
		const ingredientsNumber = {};

		pizza.forEach(line => {
			line.forEach(v => {
				ingredientsNumber[v] = ingredientsNumber[v] || 0;

				ingredientsNumber[v]++;
			})
		});

		return ingredientsNumber;
	}

	find(pizza: string[][], limitant: string) {
		let limitantCoord = {};
		pizza.forEach((line, idxL) => {

			line.forEach((element, idxC) => {
				if (element === limitant) {
					limitantCoord = { name: limitant, x: idxC, y: idxL };
				}
			});

		});
	}

	testLigne(pizza) {

		const square = {x1: 0, y1: 0, x2: 0, y2: 0};

		let go = true;
		//while (go) {
			let actual = { M: 0, T: 0};
			let firstActual = { x: 0, y: 0};

			for (let i = 0; i < this.R; i++) {

				for (let j = 0; j < this.C; j++) {
					let el = pizza[i][j];

					actual[el]++;

					if (actual['M'] >= this.L && actual['T'] >= this.L) {
						if (j - firstActual.y < this.H) {
							this.parts.push({from: firstActual, to: { x: i, y: j}})

							for(let k = firstActual.y; k <= j; k++) {
								pizza[i][k] = this.dessin;
							}
							this.dessin++;
						}

						actual = { M: 0, T: 0};
						firstActual = { x: i, y: j+1};
					}
				}

				if (actual['M'] < this.L || actual['T'] < this.L) {
					actual = { M: 0, T: 0 };

					if (i+1 >= this.R) { break;}
					firstActual = { x: i+1, y: 0};
				}
			}
		//}
	}


	testCol(pizza) {

		const square = {x1: 0, y1: 0, x2: 0, y2: 0};

		let go = true;
		//while (go) {
			let actual = { M: 0, T: 0};
			let firstActual = { x: 0, y: 0};

			for (let i = 0; i < this.C; i++) {

				for (let j = 0; j < this.R; j++) {
					let el = pizza[j][i];
					actual[el]++;

					if (el !== 'M' && el !== 'T') {
						actual = { M: 0, T: 0};
						firstActual = { x: i, y: j+1};
						continue;
					}

					if (actual['M'] >= this.L && actual['T'] >= this.L) {
						if (j - firstActual.y < this.H) {
							this.parts.push({from: { x: firstActual.y, y: firstActual.x}, to: { x: j, y: i}})

							for(let k = firstActual.y; k <= j; k++) {
								pizza[k][i] = this.dessin;
							}
							this.dessin++;
						}

						actual = { M: 0, T: 0};
						firstActual = { x: i, y: j+1};
					}
				}

				if (actual['M'] < this.L || actual['T'] < this.L) {
					actual = { M: 0, T: 0 };

					if (i+1 >= this.C) { break;}
					firstActual = { x: i+1, y: 0};
				}
			}
		//}
	}

	gratter(pizza) {
		this.parts.forEach(part => {
			let from = part.from;
			let to = part.to;

			let isX = from.x !== to.x;
			let go = true;
			while(go) {
				if (isX) {
					if (to.x+1 < this.R && (pizza[to.x+1][to.y] === 'M' || pizza[to.x+1][to.y] === 'T') && to.x+1 - from.x < this.H) {
						pizza[to.x+1][to.y] = pizza[to.x][to.y];
						to.x++;
					} else {
						go = false;
					}
				} else {
					if (to.y+1 < this.C && (pizza[to.x][to.y+1] === 'M' || pizza[to.x][to.y+1] === 'T') && to.y+1 - from.y < this.H) {
						pizza[to.x][to.y+1] = pizza[to.x][to.y];
						to.y++;
					} else {
						go = false;
					}
				}
			}
		});
	}

	gratterEnCarre(pizza) {
		this.parts.forEach(part => {
			let from = part.from;
			let to = part.to;

			let isX = from.x !== to.x;

			if (isX) {

				let length = to.x - from.x;
				let no = false;
				for (let i=from.x; i<=to.x; i++) {
					length++;
					if (to.y+1 >= this.C || (pizza[i][to.y+1] !== 'M' && pizza[i][to.y+1] !== 'T')) {
						no = true;
						break;
					}
				}

				if (!no && length < this.H && to.x+1 < this.R) {
					to.y++;
					pizza[to.x][to.y] = 'lol'
				}

			} else {
				let length = to.y - from.y;
				let no = false;
				for (let i=from.y; i<=to.y; i++) {
					length++;
					if (from.x+1 >= this.R || (pizza[from.x+1][i] !== 'M' && pizza[from.x+1][i] !== 'T')) {
						no = true;
						break;
					}
				}

				if (!no && length < this.H && to.y+1 < this.C) {
					to.x++;
					pizza[to.x][to.y] = 'lol'
				}
			}
		});
	}
	/*dynamicProg(pizza: string[][], limitant: string, pointInProgress : {x: number, y: number}, direction: number, numberLimitant : number, numberCell: number)
	{

		switch (direction) {
			case 1:
				pizza[limitant.y - 1][limitant.x]
				break;

			case 2:

				break;

			case 3:

				break;
			default:
				break;
		}
	}*/
}
