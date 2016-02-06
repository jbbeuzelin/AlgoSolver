/// <reference path="../../typings/node/node.d.ts"/>
/// <reference path="../../typings/lodash/lodash.d.ts"/>

'use strict'

import * as fs from 'fs';
import * as _ from 'lodash';
import {solver} from '../../core/BaseSolver';
import {helper} from '../../core/Helper';

class Rationalnumbertree extends solver.BaseSolver {

	constructor(fileName: string) {
		super(fileName);

		var testCases = _.parseInt(this.reader.nextLine());
		for(let i=0; i<testCases; i++) {
            let ligne = _.map(this.reader.nextLine().split(" "),_.parseInt);
            let id = ligne[0];
            let retour;
            if(id === 1 ){
                let n = ligne[1];
                retour = this.solveN(n);
            }
            else{
                let p = ligne[1];
                let q = ligne[2];
                retour = this.solvePQ(p,q);
            }
            console.log("retour",retour);
            this.writer.writeToBuffer(`Case #${i+1}: ${retour}`);
		}

		this.writer.writeFile();
	}

	solveCase(testCase: number): void {
        
		this.writer.writeToBuffer(`Case #${testCase+1}: ${testCase}`);
	}
    
    solveN(n: number): string{
        if(n == 1){
            return "1";
        }
        let binary = n.toString(2);
        let p = 1;
        let q = 1;
        for(let i=1; i<binary.length; i++){
            let char = _.parseInt(binary.charAt(i));
            if(char == 1){
                p = p+q;
            }
            else{
                q = p+q;
            }
        }
        return ""+ p+" "+q;
    }
    
    solvePQ(p: number,q: number): string{
        let retour = [];
        while(!(p ===1 && q === 1)){
            if(p>q){
                retour .push( 1 );
                p -= q;
            }
            else{
                retour .push( 0 );
                q -= p;
            }
        }
        retour = retour.reverse();
        let chaineRetour = "1"+retour.join("");
        
        return ""+parseInt(chaineRetour,2);
    }
    
}

new Rationalnumbertree('practice');
