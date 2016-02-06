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
        this.grid = [];
        this.toWrite = [];
        this.solveTestCase(0);
        this.writer.writeFile();
    }
    test.prototype.solveTestCase = function (testNumber) {
        var _this = this;
        _a = _.map(this.reader.nextLine().split(' '), _.parseInt), this.R = _a[0], this.C = _a[1];
        for (var i = 0; i < this.R; i++) {
            var ligne = _.filter(_.map(this.reader.nextLine().split(""), function (element) {
                if (element == "#")
                    return 1;
                else if (element == ".")
                    return 0;
                return -1;
            }), function (element) {
                return element != -1;
            });
            this.grid.push(ligne);
        }
        this.toWrite.push("0");
        //this.jeRemplisCaseParCaseLes1();
        this.jeMetsDesCarresSansFaireDErreurs();
        this.toWrite[0] = "" + (this.toWrite.length - 1);
        _.forEach(this.toWrite, function (element) {
            _this.writer.writeToBuffer(element);
        });
        var _a;
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
    };
    test.prototype.jeRemplisCaseParCaseLes1 = function () {
        for (var i = 0; i < this.R; i++) {
            for (var j = 0; j < this.C; j++) {
                if (this.grid[i][j] == 1) {
                    this.grid[i][j] += 10;
                    this.toWrite.push("PAINT_SQUARE " + i + " " + j + " 0");
                }
            }
        }
        console.log("Nb opérations", this.toWrite.length - 1);
    };
    test.prototype.jeMetsDesCarresSansFaireDErreurs = function () {
        var tailleMaximumCarre = 50;
        for (var k = tailleMaximumCarre; k >= 0; k--) {
            console.log("Analyse pour taille = ", k);
            for (var i = 0; i < this.R; i++) {
                for (var j = 0; j < this.C; j++) {
                    if (this.grid[i][j] == 1) {
                        var ok = true;
                        checkCaree: for (var ii = -k; ii <= k; ii++) {
                            for (var jj = -k; jj <= k; jj++) {
                                var iii = i + ii;
                                var jjj = j + jj;
                                if (iii < 0 || jjj < 0 || iii >= this.R || jjj >= this.C || this.grid[iii][jjj] % 10 != 1) {
                                    ok = false;
                                    break checkCaree;
                                }
                            }
                        }
                        if (ok) {
                            if (k >= 7) {
                                console.log("On écrit", "PAINT_SQUARE " + i + " " + j + " " + k);
                            }
                            for (var ii = -k; ii <= k; ii++) {
                                for (var jj = -k; jj <= k; jj++) {
                                    var iii = i + ii;
                                    var jjj = j + jj;
                                    this.grid[iii][jjj] += 10;
                                }
                            }
                            this.toWrite.push("PAINT_SQUARE " + i + " " + j + " " + k);
                        }
                    }
                }
            }
        }
        console.log("Nb opérations", this.toWrite.length - 1);
    };
    return test;
})(BaseSolver_1.solver.BaseSolver);
new test('practice');
