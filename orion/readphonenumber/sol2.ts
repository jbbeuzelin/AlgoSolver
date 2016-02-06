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
        let phoneNumber : string;
        let format : Array<number>;
        let indexLimit : number = 0;
        let limit : number = 0;
        let previousNumber : number;
        let numberRepetition : number = 0;
        let result : string = "";
        
        let line = this.reader.nextLine().split(" ");
        phoneNumber = line[0];
        format = _.map(line[1].split("-"), _.parseInt);
        
        limit = format[indexLimit];
        console.log("limit",limit);
        for(let i = 0; i< phoneNumber.length; i++) {
            
            if(i === 0) {
                previousNumber = _.parseInt(phoneNumber[i]);
                numberRepetition = 1;
            }
            else {
                if(i == phoneNumber.length - 1) {
                    console.log("un");
                    result += this.giveWordMultiple(numberRepetition) +this.giveWordNumber(_.parseInt(phoneNumber[i]));
                }
                else if(previousNumber === _.parseInt(phoneNumber[i]) && i < limit) {
                    console.log("deux");
                    numberRepetition++;
                }
                else if(i === limit) {
                    console.log("trois");
                    result += this.giveWordMultiple(numberRepetition) + this.giveWordNumber(_.parseInt(phoneNumber[i-1]));
                    numberRepetition = 1;
                    previousNumber = 10;
                }
                else {
                    console.log("quatre");
                    result += this.giveWordNumber(_.parseInt(phoneNumber[i-1]));
                    numberRepetition = 1;
                    previousNumber = _.parseInt(phoneNumber[i]);
                }  
            }
            
            if(i === limit){
                indexLimit++;
                limit += format[indexLimit];
            }    
        }
        
        
		this.writer.writeToBuffer(`Case #${testCase+1}: ${result}`);
	}
    
    giveWordMultiple(multiple: number) : string {
        var result : string;
        switch (multiple) {
            case 1: 
                result ="";
            case 2:
                result = " double";
                break;
            case 3:
                result = " triple";
                break;
            case 4:
                result = " quadruple";
                break;
            case 5:
                result = " quintuple";
                break;
            case 6:
                result = " sextuple";
                break;
            case 7:
                result = " septuple";
                break;
            case 8:
                result = " octuple";
                break;
            case 9:
                result = " nonuple";
                break;   
            case 10:
                result = " decuple";
                break; 
            default:
                console.log("erreur mutliple", multiple);
                break;
        }
        return result;
    }
    
        giveWordNumber(multiple: number) : string {
        var result : string;
        switch (multiple) {
            case 0:
                result = "zero";
                break;
            case 1:
                result = "one";
                break;
            case 2:
                result = "two";
                break;
            case 3:
                result = "three";
                break;
            case 4:
                result = "four";
                break;
            case 5:
                result = "five";
                break;
            case 6:
                result = "six";
                break;
            case 7:
                result = "seven";
                break;
            case 8:
                result = "eight";
                break;
            case 9:
                result = "nine";
                break;    
            default:
                console.log("erreur number", multiple);
                break;
        }
        return " " + result;
    }
}

new Readphonenumber('practice');
