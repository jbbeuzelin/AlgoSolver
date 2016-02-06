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
        let phoneNumber : Array<number>;
        let format : Array<number>;
        let indexLimit : number = 0;
        let limit : number = 0;
        let previousNumber : number;
        let numberRepetition : number = 0;
        let result : string = "";
        
        let line = this.reader.nextLine().split(" ");
        phoneNumber = _.map(line[0].split(""), _.parseInt);
        format = _.map(line[1].split("-"), _.parseInt);
        
        format.forEach((element) => {
            let group = _.take(phoneNumber, element);
            
            let RLE = this.RLE(group);
            //console.log("RLE ", RLE);
            result += this.convert(RLE);
            phoneNumber.splice(0, element);
        });
        
        
		this.writer.writeToBuffer(`Case #${testCase+1}: ${result.slice(1,result.length)}`);
	}
    
    RLE(group : Array<number>) : any {
        
        let previous : number = group[0];
        let compteur : number = 1;
        let result = {
            length : [],
            run : []
        };
        if(group.length === 1) {
            result.length.push(compteur);
            result.run.push(previous);
        }
        for(let i = 1; i< group.length; i++) {
            if(group[i] === previous) {
                compteur++;
            }
            else {
                result.length.push(compteur);
                result.run.push(previous);
                previous = group[i];
                compteur = 1;
            }
            if (i == group.length -1) {
                result.length.push(compteur);
                result.run.push(previous);
            }
        }
        return result;
    }
    
    convert(RLE: any) : string {
        let result = "";
        for(let i = 0; i < RLE.length.length; i++){
            if(RLE.length[i] <= 10) {
                result += this.giveWordMultiple(RLE.length[i]) + this.giveWordNumber(RLE.run[i]);    
            }
            else {
                for(let j = 0; j < RLE.length[i]; j++){
                    result += this.giveWordNumber(RLE.run[i]);
                }
            }
        }
        return result;
    }
    
    giveWordMultiple(multiple: number) : string {
        var result : string;
        switch (multiple) {
            case 1: 
                result ="";
                break;
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
