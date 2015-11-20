/// <reference path="../../../typings/node/node.d.ts"/>
/// <reference path="../../../typings/lodash/lodash.d.ts"/>

'use strict'

import * as fs from 'fs';
import * as _ from 'lodash';
import {solver} from '../../Core/BaseSolver';
import {helper} from '../../Core/Helper';

class HairCut extends solver.BaseSolver {
	private caseBarbersNumber: number;
	private casePlace: number;
	private caseBarbersTimesArray: Array<number>;

	constructor(fileName: string) {
		super(fileName);

		var testCases = _.parseInt(this.reader.nextLine());
		for(let i=0; i<testCases; i++) {
			// Reset every case
			this.caseBarbersTimesArray = [];
			// Solve case
			this.solveCase(i);
		}

		this.writer.writeFile();
	}

	solveCase(testCase: number): void {
		// Set vars
		var line = this.reader.nextLine();
		[this.caseBarbersNumber, this.casePlace] = _.map(line.split(' '), _.parseInt);
		line = this.reader.nextLine();
		this.caseBarbersTimesArray = _.map(line.split(' '), _.parseInt);

		var lcm = helper.MathHelper.lcm_nums(this.caseBarbersTimesArray);

		var barberPerLcm = _.reduce(this.caseBarbersTimesArray, (tot, M) => tot + lcm / M, 0);

		var dynamicPlace = this.casePlace % barberPerLcm;

		if (dynamicPlace > 0 && dynamicPlace <= this.caseBarbersNumber) {
			this.writer.writeToBuffer(`Case #${testCase+1}: ${dynamicPlace}`);
		} else {
			this.writer.writeToBuffer(`Case #${testCase+1}: ${0}`);
		}
	}
}

new HairCut('practice');
