'use strict'

import * as _ from 'lodash';
import { solver } from '../../bin/core/BaseSolver';
import { helper } from '../../bin/core/Helper';

class MYCLASS extends solver.BaseSolver {

	constructor(fileName: string) {
		super(fileName);

		let testCases = _.parseInt(this.reader.nextLine());

		console.time('Time tacken by solver');
		_.times(testCases, (i: number) => this.solveCase(i));
		console.timeEnd('Time tacken by solver');

		this.writer.writeFile();
	}

	solveCase(testCase: number): void {
		this.writer.writeToBuffer(`Case #${testCase + 1}: ${testCase}`);
	}
}

new MYCLASS(__dirname + '/practice');
