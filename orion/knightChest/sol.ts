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
        
        let size = _.parseInt(this.reader.nextLine());
        let ri, ci;        
        [ri, ci] = _.map(this.reader.nextLine().split(' '), _.parseInt);
        
        let re, ce;        
        [re, ce] = _.map(this.reader.nextLine().split(' '), _.parseInt);
        
        let numMoves = _.parseInt(this.reader.nextLine());
        
        // Init board
        let board = [];
        this.fillZeroBoard(board, size);
        board[ri][ci] = 1;
        
        // Algo
        for (let i=0; i<numMoves; i++) {
            let newBoard = [];
            this.fillZeroBoard(newBoard, size);
            
            for (let r=0; r<size; r++) {
                for (let c=0; c<size; c++) {
                    if (board[r][c] !== 0) {
                        this.completeNewBoardForPoint(board[r][c], r, c, newBoard);
                    }
                }
            }
            
            board = newBoard;
        }
        console.log(board);
        console.log(board[re][ce]);
        
		this.writer.writeToBuffer('1');        
		this.writer.writeFile();
	}
    
    fillZeroBoard(board, size) {
        for (let i=0; i<size; i++) {
            let line = [];
            for (let j=0; j<size; j++) {
                line.push(0);
            }
            board.push(line);
        }
    }
    
    completeNewBoardForPoint(pointValue, r, c, newBoard) {
        let moves = [
            [-1, 0],
            [0, -1],
            [-1, -1],
            [1, 0],
            [0, 1],
            [1, 1],
            [-1, 1],
            [1, -1],
            [2, 1],
            [-2, 1],
            [-2, -1],
            [2, -1],
            [1, 2],
            [-1, 2],
            [-1, -2],
            [1, -2]
        ];
        
        let size = newBoard.length;
        _.forEach(moves, m => {
            let newR = r + m[0];
            let newC = c + m[1];
            if (newR < size && newR >=0 && newC < size && newC >=0) {
                newBoard[newR][newC] += pointValue;
            }
        });
    }
}

new test('practice');
