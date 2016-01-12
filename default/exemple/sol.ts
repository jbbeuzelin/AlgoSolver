/// <reference path="../../typings/node/node.d.ts"/>
/// <reference path="../../typings/lodash/lodash.d.ts"/>

'use strict'

import * as fs from 'fs';
import * as _ from 'lodash';
import {solver} from '../../core/BaseSolver';
import {helper} from '../../core/Helper';

class Exemple extends solver.BaseSolver {

	constructor(fileName: string) {
		super(fileName);

		var testCases = _.parseInt(this.reader.nextLine());
		for(let i=0; i<testCases; i++) {
			this.solveCase(i);
		}

		this.writer.writeFile();
	}

	solveCase(testCase: number): void {
		this.writer.writeToBuffer(`Case #${testCase+1}: ${testCase}`);
	}
}

new Exemple('practice');
