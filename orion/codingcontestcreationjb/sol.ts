/// <reference path="../../typings/node/node.d.ts"/>
/// <reference path="../../typings/lodash/lodash.d.ts"/>

'use strict'

import * as fs from 'fs';
import * as _ from 'lodash';
import {solver} from '../../core/BaseSolver';
import {helper} from '../../core/Helper';

class Codingcontestcreationjb extends solver.BaseSolver {

	constructor(fileName: string) {
		super(fileName);

		var testCases = _.parseInt(this.reader.nextLine());
		for(let i=0; i<testCases; i++) {
			this.solveCase(i);
		}

		this.writer.writeFile();
	}

	solveCase(testCase: number): void {
        let numberCase : number = _.parseInt(this.reader.nextLine());
        let difficultiesArray : Array<number> = _.map(this.reader.nextLine().split(' '), _.parseInt);
        let actualNumber : number = 0;
        let possibleNextNumber : number = 0;
        let diff : number = 0;
        let adding : number = 0;
        let lengthArray : number = difficultiesArray.length;
        
        for(let i =  0; i < lengthArray; i++)
        {
            let realIndex = i + adding;
            if((i + 1) == lengthArray){
                //final testCase
                let sum = realIndex +1;
                if(sum % 4 == 3){
                    adding += 1;
                }
                else if( sum % 4 == 1){   
                    adding += 3;            
                }
                else if (sum % 4 == 2){
                    adding += 2;
                }   
            }
            else{
           
                actualNumber = difficultiesArray[i];
                possibleNextNumber = difficultiesArray[i+1];
                diff = possibleNextNumber - actualNumber;
                
                if(realIndex % 4 == 0){
                    if(diff > 30){
                        adding += 3;
                    }
                    else if(diff <= 0){
                        adding += 3;
                    }
                    else if(diff <= 10){
                    }
                    else if(diff <= 20){
                        adding +=1;
                    }
                    else {
                        adding += 2;
                    }
                }
                else if( realIndex % 4 == 1){
                    if(diff > 20){
                        adding += 2;
                    }
                    else if(diff <= 0){
                        adding += 2;
                    }
                    else if(diff <= 10)
                    {
                        
                    }
                    else {
                        adding +=1;
                    }                
                }
                else if (realIndex % 4 == 2){
                    if(diff > 10){
                        adding += 1;
                    }
                    else if(diff <= 0){
                        adding += 1;
                    }
                }
            }            
        } 
		this.writer.writeToBuffer(`Case #${testCase+1}: ${adding}`);
	}
}

new Codingcontestcreationjb('practice');