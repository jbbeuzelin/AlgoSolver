/// <reference path="../../typings/node/node.d.ts"/>
/// <reference path="../../typings/lodash/lodash.d.ts"/>

'use strict'

import * as fs from 'fs';
import * as _ from 'lodash';
import {solver} from '../../core/BaseSolver';
import {helper} from '../../core/Helper';

class test extends solver.BaseSolver {
    public bad: Array<any>;
    
	constructor(fileName: string) {
		super(fileName);
        
        let cases = _.parseInt(this.reader.nextLine());

        for (let i=0; i<cases; i++) {
            this.solveTestCase(i+1);
        }
                
		this.writer.writeFile();
	}
    
    solveTestCase(testNumber: number): void {
        let length = _.parseInt(this.reader.nextLine());
        let numbers = [];
        numbers = _.map(this.reader.nextLine().split(' '), _.parseInt);
        let orderedNumbers = _.sortBy(numbers);
        let swapsNumber = 0;
        
        _.forEach(orderedNumbers, n => {
            let numberIndex = _.indexOf(numbers, n);
            swapsNumber += Math.min(numberIndex, length - 1 - numberIndex);
            
            numbers.splice(numberIndex, 1);
            length--;
        });
                  
        this.writer.writeToBuffer(`Case #${testNumber}: ${swapsNumber}`);
    }
}

new test('practice');
