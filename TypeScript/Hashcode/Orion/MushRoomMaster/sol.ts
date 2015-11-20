/// <reference path="../../../typings/node/node.d.ts"/>
/// <reference path="../../../typings/lodash/lodash.d.ts"/>

'use strict'

import * as fs from 'fs';
import * as _ from 'lodash';
import {solver} from '../../Core/BaseSolver';

class MushRoomMaster extends solver.BaseSolver {
	private caseMushroomsArray: Array<number>;
	private caseLength: number;

	constructor(fileName: string) {
		super(fileName);

		var testCases = _.parseInt(this.reader.nextLine());
		for(let i=0; i<testCases; i++) {
			// Reset every case
			this.caseMushroomsArray = [];
			// Solve case
			this.solveCase(i);
		}

		this.writer.writeFile();
	}

	solveCase(caseNumber: number) {
		// Set mushrooms array for this case
		this.caseLength = _.parseInt(this.reader.nextLine());
		var line = this.reader.nextLine();
		this.caseMushroomsArray = _.map(line.split(' '), _.parseInt);

		var firstMethod = this.getFirstMethodAnswer();
		var secondMethod = this.getsecondtMethodAnswer();

		this.writer.writeToBuffer(`Case #${caseNumber+1}: ${firstMethod} ${secondMethod}`);
	}

	getFirstMethodAnswer() {
		var counter = 0;

		for (let i=0; i<(this.caseLength-1); i++) {
			var nextRoundDifference = this.caseMushroomsArray[i] - this.caseMushroomsArray[i+1];
			if (nextRoundDifference >= 0) {
				counter += nextRoundDifference;
			}
		}

		return counter;
	}

	getsecondtMethodAnswer() {
		var biggestDifference = 0;

		for (let i=0; i<(this.caseLength-1); i++) {
			var nextRoundDifference = this.caseMushroomsArray[i] - this.caseMushroomsArray[i+1];
			if (nextRoundDifference > biggestDifference) {
				biggestDifference = nextRoundDifference;
			}
		}

		var counter = 0;
		for (let i=0; i<(this.caseLength-1); i++) {
			if (this.caseMushroomsArray[i] >= biggestDifference) {
				counter += biggestDifference;
			} else {
				counter += this.caseMushroomsArray[i];
			}
		}

		return counter;
	}
}

new MushRoomMaster('A-large-practice');