'use strict'

import { parseInt as _parseInt, times, map as _map } from 'lodash';

import { BaseSolver } from '../../bin/core/BaseSolver';
import { MathHelper } from '../../bin/core/Helper';

import { SolverParis } from './solverParis';
class Hashcode extends BaseSolver {

	constructor(fileName: string) {
		super(fileName);

		console.time('Time tacken by solver');
		times(1, (i: number) => this.solveCase(i));
		console.timeEnd('Time tacken by solver');

		this.writer.writeFile();
	}

	solveCase(testCase: number): void {
		const [ R, C, L, H ] = this.reader.nextLine().split(' ').map(_parseInt);

		const pizza = [];
		times(R, (l) => {
			const line = this.reader.nextLine().replace(/[\n\r]+/g, '').split('');
			pizza.push(line);
		});

		new SolverParis(R, C, L, H).solve(pizza, this.writer);


		//this.writer.writeToBuffer(`Case #${testCase + 1}: ${testCase}`);
	}
}

new Hashcode('./practice');
