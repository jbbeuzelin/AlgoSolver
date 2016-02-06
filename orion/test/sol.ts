/// <reference path="../../typings/node/node.d.ts"/>
/// <reference path="../../typings/lodash/lodash.d.ts"/>

'use strict'

import * as fs from 'fs';
import * as _ from 'lodash';
import {solver} from '../../core/BaseSolver';
import {helper} from '../../core/Helper';

class test extends solver.BaseSolver {

	constructor(fileName: string) {
		super(fileName);
        
        let numbers = [];
		numbers = _.map(this.reader.nextLine().split(' '), _.parseInt);
        
        let state = [];
        state[0] = 1;
        
        for (let i=1; i<numbers.length; i++) {
            state[i] = 1;
            for (let j=0; j<i; j++) {
                if (numbers[j] <= numbers[i] && state[j] + 1 > state[i]) {
                    state[i] = state[j] + 1;
                }
            }
        }
        
        let maxLength = _.max(state);
        console.log(maxLength);
        
		this.writer.writeToBuffer('1');        
		this.writer.writeFile();
	}
}

new test('practice');
