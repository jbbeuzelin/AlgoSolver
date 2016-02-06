/// <reference path="../../typings/node/node.d.ts"/>
/// <reference path="../../typings/lodash/lodash.d.ts"/>

'use strict'

import * as fs from 'fs';
import * as _ from 'lodash';
import {solver} from '../../core/BaseSolver';
import {helper} from '../../core/Helper';

class Readphonenumber extends solver.BaseSolver {

    
	constructor(fileName: string) {
		super(fileName);

		var testCases = _.parseInt(this.reader.nextLine());
		for(let i=0; i<testCases; i++) {
			this.solveCase(i);
		}

		this.writer.writeFile();
	}

	solveCase(testCase: number): void {      
        let numberOfBooks = _.parseInt(this.reader.nextLine());
        
        let bookValues = [];
        bookValues = _.map(this.reader.nextLine().split(' '), _.parseInt);
        
        let bobBooks = _.filter(bookValues, v => Math.abs(v) % 2 === 0);
        let alexBooks = _.filter(bookValues, v => Math.abs(v) % 2 === 1);
        
        let sortedBob = _.sortBy(bobBooks).reverse();
        let sortedAlex = _.sortBy(alexBooks);

        let newBooks = [];
        _.forEach(bookValues, (v, i) => {
           if (Math.abs(v) % 2 === 0) {
               newBooks.push(sortedBob[0]);
               sortedBob.splice(0, 1);
           } else {
               newBooks.push(sortedAlex[0]);
               sortedAlex.splice(0, 1);
           }
        });
        
		this.writer.writeToBuffer(`Case #${testCase+1}: ${newBooks.join(' ')}`);
	}

}

new Readphonenumber('practice');
