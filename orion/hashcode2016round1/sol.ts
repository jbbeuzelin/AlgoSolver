/// <reference path="../../typings/node/node.d.ts"/>
/// <reference path="../../typings/lodash/lodash.d.ts"/>
/// <reference path="../../typings/bigint/bigint.d.ts"/>

'use strict'

import * as fs from 'fs';
import * as _ from 'lodash';
import * as bigint from 'BigInt';
import {solver} from '../../core/BaseSolver';
import {helper} from '../../core/Helper';

class Hashcode2016round1 extends solver.BaseSolver {

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

new Hashcode2016round1('practice');
