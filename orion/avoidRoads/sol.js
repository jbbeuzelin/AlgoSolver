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
        var width = _.parseInt(this.reader.nextLine());
        var height = _.parseInt(this.reader.nextLine());
        var ri, ci;
        this.bad = [];
        var badLine = _.map(this.reader.nextLine().split(' '), _.parseInt);
        for (var i = 0; i < badLine.length; i += 4) {
            var rs = void 0, cs = void 0, re = void 0, ce = void 0;
            _a = badLine.slice(i, i + 4), rs = _a[0], cs = _a[1], re = _a[2], ce = _a[3];
            this.bad.push({
                start: { r: rs, c: cs },
                end: { r: re, c: ce }
            });
        }
        // Init board
        var board = [];
        width += 1;
        height += 1;
        this.fillZeroBoard(board, width, height);
        board[0][0] = 1;
        // Algo
        for (var k = 0; k < width + height - 2; k++) {
            var newBoard = [];
            this.fillZeroBoard(newBoard, width, height);
            for (var i = 0; i < width; i++) {
                for (var j = 0; j < height; j++) {
                    if (board[i][j] !== 0) {
                        if (i + 1 < width && this.nonBloque(i, i + 1, j, j)) {
                            newBoard[i + 1][j] += board[i][j];
                        }
                        if (j + 1 < height && this.nonBloque(i, i, j, j + 1)) {
                            newBoard[i][j + 1] += board[i][j];
                        }
                    }
                }
            }
            board = newBoard;
        }
        console.log(board[width - 1][height - 1]);
        this.writer.writeToBuffer('1');
        this.writer.writeFile();
        var _a;
    }
    test.prototype.fillZeroBoard = function (board, width, height) {
        for (var i = 0; i < width; i++) {
            var line = [];
            for (var j = 0; j < height; j++) {
                line.push(0);
            }
            board.push(line);
        }
    };
    test.prototype.nonBloque = function (i, ni, j, nj) {
        var val1 = _.find(this.bad, { start: { c: i, r: j }, end: { c: ni, r: nj } });
        var val2 = _.find(this.bad, { end: { c: i, r: j }, start: { c: ni, r: nj } });
        return val1 === undefined && val2 === undefined;
    };
    return test;
})(BaseSolver_1.solver.BaseSolver);
new test('practice');
