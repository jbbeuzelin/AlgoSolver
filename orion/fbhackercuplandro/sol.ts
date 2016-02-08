/// <reference path="../../typings/node/node.d.ts"/>
/// <reference path="../../typings/lodash/lodash.d.ts"/>

'use strict'

import * as fs from 'fs';
import * as _ from 'lodash';
import {solver} from '../../core/BaseSolver';
import {helper} from '../../core/Helper';

class Fbhackercuplandro extends solver.BaseSolver {

    nbLoad : number;
    nbWashing : number;
    nbDryer : number;
    dryerTime : number;
    washingTimes : Array<number>;
        
	constructor(fileName: string) {
		super(fileName);

		var testCases = _.parseInt(this.reader.nextLine());
		for(let i=0; i<testCases; i++) {
			this.solveCase(i);
		}

		this.writer.writeFile();
	}

	solveCase(testCase: number): void {
        let result = "";
        
        [this.nbLoad, this.nbWashing, this.nbDryer, this.dryerTime] = _.map(this.reader.nextLine().split(' '), _.parseInt);
        this.washingTimes = _.map(this.reader.nextLine().split(' '), _.parseInt);
        
        
        
        
        
		this.writer.writeToBuffer(`Case #${testCase+1}: ${result}`);
	}
    
    nbWashingWorked (time: number) : number {
        if(time < 0) return 0;
        let machineWorked : number = 0;
        for( let i = 0; i < this.nbWashing; i++) {
            machineWorked += time / this.washingTimes[i] + 1;
        }
        return machineWorked;
    }
}

new Fbhackercuplandro('practice');
