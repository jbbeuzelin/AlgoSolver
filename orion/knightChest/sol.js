/// <reference path="../../typings/node/node.d.ts"/>
/// <reference path="../../typings/lodash/lodash.d.ts"/>
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var BaseSolver_1 = require('../../core/BaseSolver');
var test = (function (_super) {
    __extends(test, _super);
    function test(fileName) {
        _super.call(this, fileName);
        var size = _.parseInt(this.reader.nextLine());
        var ri, ci;
        _a = _.map(this.reader.nextLine().split(' '), _.parseInt), ri = _a[0], ci = _a[1];
        var re, ce;
        _b = _.map(this.reader.nextLine().split(' '), _.parseInt), re = _b[0], ce = _b[1];
        var numMoves = _.parseInt(this.reader.nextLine());
        // Init board
        var board = [];
        this.fillZeroBoard(board, size);
        board[ri][ci] = 1;
        // Algo
        for (var i = 0; i < numMoves; i++) {
            var newBoard = [];
            this.fillZeroBoard(newBoard, size);
            for (var r = 0; r < size; r++) {
                for (var c = 0; c < size; c++) {
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
        var _a, _b;
    }
    test.prototype.fillZeroBoard = function (board, size) {
        for (var i = 0; i < size; i++) {
            var line = [];
            for (var j = 0; j < size; j++) {
                line.push(0);
            }
            board.push(line);
        }
    };
    test.prototype.completeNewBoardForPoint = function (pointValue, r, c, newBoard) {
        var moves = [
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
        var size = newBoard.length;
        _.forEach(moves, function (m) {
            var newR = r + m[0];
            var newC = c + m[1];
            if (newR < size && newR >= 0 && newC < size && newC >= 0) {
                newBoard[newR][newC] += pointValue;
            }
        });
    };
    return test;
})(BaseSolver_1.solver.BaseSolver);
new test('practice');
