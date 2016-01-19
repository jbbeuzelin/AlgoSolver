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
var Codingcontestcreationjb = (function (_super) {
    __extends(Codingcontestcreationjb, _super);
    function Codingcontestcreationjb(fileName) {
        _super.call(this, fileName);
        var testCases = _.parseInt(this.reader.nextLine());
        for (var i = 0; i < testCases; i++) {
            this.solveCase(i);
        }
        this.writer.writeFile();
    }
    Codingcontestcreationjb.prototype.solveCase = function (testCase) {
        var numberCase = _.parseInt(this.reader.nextLine());
        var difficultiesArray = _.map(this.reader.nextLine().split(' '), _.parseInt);
        var actualNumber = 0;
        var possibleNextNumber = 0;
        var diff = 0;
        var adding = 0;
        var lengthArray = difficultiesArray.length;
        for (var i = 0; i < lengthArray; i++) {
            var realIndex = i + adding;
            if ((i + 1) == lengthArray) {
                //final testCase
                var sum = realIndex + 1;
                if (sum % 4 == 3) {
                    adding += 1;
                }
                else if (sum % 4 == 1) {
                    adding += 3;
                }
                else if (sum % 4 == 2) {
                    adding += 2;
                }
            }
            else {
                actualNumber = difficultiesArray[i];
                possibleNextNumber = difficultiesArray[i + 1];
                diff = possibleNextNumber - actualNumber;
                if (realIndex % 4 == 0) {
                    if (diff > 30) {
                        adding += 3;
                    }
                    else if (diff <= 0) {
                        adding += 3;
                    }
                    else if (diff <= 10) {
                    }
                    else if (diff <= 20) {
                        adding += 1;
                    }
                    else {
                        adding += 2;
                    }
                }
                else if (realIndex % 4 == 1) {
                    if (diff > 20) {
                        adding += 2;
                    }
                    else if (diff <= 0) {
                        adding += 2;
                    }
                    else if (diff <= 10) {
                    }
                    else {
                        adding += 1;
                    }
                }
                else if (realIndex % 4 == 2) {
                    if (diff > 10) {
                        adding += 1;
                    }
                    else if (diff <= 0) {
                        adding += 1;
                    }
                }
            }
        }
        this.writer.writeToBuffer("Case #" + (testCase + 1) + ": " + adding);
    };
    return Codingcontestcreationjb;
})(BaseSolver_1.solver.BaseSolver);
new Codingcontestcreationjb('practice');
