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
        
        let width = _.parseInt(this.reader.nextLine());
        let height = _.parseInt(this.reader.nextLine());
        let ri, ci;
        
        this.bad = [];
        let badLine = _.map(this.reader.nextLine().split(' '), _.parseInt);
        for (let i=0; i<badLine.length; i+=4) {
            let rs, cs, re, ce;
            [rs, cs, re, ce] = badLine.slice(i, i+4);
            this.bad.push({
                start: {r: rs,c: cs},
                end: {r: re, c: ce}
            });
        }
        
        // Init board
        let board = [];
        width += 1;
        height += 1;
        this.fillZeroBoard(board, width, height);
        board[0][0] = 1;
        
        // Algo
        for (let k=0; k<width+height-2; k++) {
            
            let newBoard = [];
            this.fillZeroBoard(newBoard, width, height);
            
            for (let i=0; i<width; i++) {
                for (let j=0; j<height; j++) {
                    if (board[i][j] !== 0) {
                        
                        if (i+1 < width && this.nonBloque(i, i+1, j, j)) {
                            newBoard[i+1][j] += board[i][j];
                        }
                        if (j+1 < height && this.nonBloque(i, i, j, j+1)) {
                            newBoard[i][j+1] += board[i][j];
                        }
                    }
                }
            }
            board = newBoard;
        }
        
        console.log(board[width-1][height-1]);
        
		this.writer.writeToBuffer('1');        
		this.writer.writeFile();
	}
    
    fillZeroBoard(board, width, height) {
        for (let i=0; i<width; i++) {
            let line = [];
            for (let j=0; j<height; j++) {
                line.push(0);
            }
            board.push(line);
        }
    }
    
    nonBloque(i, ni, j, nj) {
        let val1 = _.find(this.bad, {start: { c: i, r: j }, end: { c: ni, r: nj} });
        let val2 = _.find(this.bad, {end: { c: i, r: j }, start: { c: ni, r: nj} });
        return val1 === undefined && val2 === undefined;
    }
    
}

new test('practice');
