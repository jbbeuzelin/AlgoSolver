/// <reference path="../../typings/node/node.d.ts"/>
/// <reference path="../../typings/lodash/lodash.d.ts"/>

'use strict'

import * as fs from 'fs';
import * as _ from 'lodash';
import {solver} from '../../core/BaseSolver';
import {helper} from '../../core/Helper';

class test extends solver.BaseSolver {
    public bad: Array<any>;
    public R: number;
    public C: number;
    public grid;
    public toWrite: Array<string>;
    
	constructor(fileName: string) {
		super(fileName);
        
        this.grid = [];
        this.toWrite = [];
        
        this.solveTestCase(0);
                
		this.writer.writeFile();
	}
    
    solveTestCase(testNumber: number): void {
        [this.R,this.C] = _.map(this.reader.nextLine().split(' '),_.parseInt);
        for(let i = 0; i < this.R; i++){
            let ligne = _.filter(_.map(this.reader.nextLine().split(""),element => {
                if(element == "#")
                    return 1;
                else if(element == ".")
                    return 0;
                return -1
            }),element => {
                return element != -1
            });
            this.grid.push(ligne);
        }
        this.toWrite.push("0");
        //this.jeRemplisCaseParCaseLes1();
        this.jeMetsDesCarresSansFaireDErreurs();
        this.toWrite[0] = ""+(this.toWrite.length-1);
        _.forEach(this.toWrite,element => {
            this.writer.writeToBuffer(element);
        });
        /*let length = _.parseInt(this.reader.nextLine());
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
                  
        this.writer.writeToBuffer(`Case #${testNumber}: ${swapsNumber}`);*/
    }
    
    jeRemplisCaseParCaseLes1(): void{
        for(let i=0; i < this.R; i++){
            for(let j=0; j < this.C; j++){
                if(this.grid[i][j] == 1){
                    this.grid[i][j] += 10;
                    this.toWrite.push("PAINT_SQUARE "+i+" "+j+" 0");
                }
            }
        }
        console.log("Nb opérations",this.toWrite.length-1);
    }
    
   jeMetsDesCarresSansFaireDErreurs(): void{
       let tailleMaximumCarre = 50;
       for(let k=tailleMaximumCarre; k>=0; k--){
           console.log("Analyse pour taille = ",k);
           for(let i=0; i < this.R; i++){
                for(let j=0; j < this.C; j++){
                    if(this.grid[i][j] == 1){
                        let ok = true;
                        checkCaree:
                        for(let ii=-k; ii<=k; ii++){
                            for(let jj=-k; jj<=k; jj++){
                                let iii = i+ii;
                                let jjj = j+jj;
                                if(iii < 0 || jjj < 0 || iii >= this.R || jjj >= this.C || this.grid[iii][jjj] %10 != 1){
                                    ok = false;
                                    break checkCaree;
                                }
                            }
                        }
                        if(ok){
                            if(k>=7){
                                console.log("On écrit","PAINT_SQUARE "+i+" "+j+" "+k);
                            }
                            for(let ii=-k; ii<=k; ii++){
                                for(let jj=-k; jj<=k; jj++){
                                    let iii = i+ii;
                                    let jjj = j+jj;
                                    this.grid[iii][jjj] += 10;
                                }
                            }
                            this.toWrite.push("PAINT_SQUARE "+i+" "+j+" "+k);
                        }
                        //Il peut y avoir un carré qui commence à partir d'ici
                    }
                }
            }
       }
        console.log("Nb opérations",this.toWrite.length-1);
    }
}

new test('practice');
