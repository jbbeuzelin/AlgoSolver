'use strict'

import { parseInt as _parseInt, times } from 'lodash';

import { BaseSolver } from '../../bin/core/BaseSolver';
import { MathHelper } from '../../bin/core/Helper';

class MYCLASS extends BaseSolver {

	constructor(fileName: string) {
		super(fileName);

		let testCases = _parseInt(this.reader.nextLine());

		console.time('Time tacken by solver');
		times(testCases, (i: number) => this.solveCase(i));
		console.timeEnd('Time tacken by solver');

		this.writer.writeFile();
	}

	solveCase(testCase: number): void {
		this.writer.writeToBuffer(`Case #${testCase + 1}: ${testCase}`);
	}
}

new MYCLASS('./practice');
