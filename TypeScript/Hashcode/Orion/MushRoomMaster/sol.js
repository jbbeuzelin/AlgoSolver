/// <reference path="../../../typings/node/node.d.ts"/>
/// <reference path="../../../typings/lodash/lodash.d.ts"/>
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var BaseSolver_1 = require('../../Core/BaseSolver');
var MushRoomMaster = (function (_super) {
    __extends(MushRoomMaster, _super);
    function MushRoomMaster(fileName) {
        _super.call(this, fileName);
        var testCases = _.parseInt(this.reader.nextLine());
        for (var i = 0; i < testCases; i++) {
            // Reset every case
            this.caseMushroomsArray = [];
            // Solve case
            this.solveCase(i);
        }
        this.writer.writeFile();
    }
    MushRoomMaster.prototype.solveCase = function (caseNumber) {
        // Set mushrooms array for this case
        this.caseLength = _.parseInt(this.reader.nextLine());
        var line = this.reader.nextLine();
        this.caseMushroomsArray = _.map(line.split(' '), _.parseInt);
        var firstMethod = this.getFirstMethodAnswer();
        var secondMethod = this.getsecondtMethodAnswer();
        this.writer.writeToBuffer("Case #" + (caseNumber + 1) + ": " + firstMethod + " " + secondMethod);
    };
    MushRoomMaster.prototype.getFirstMethodAnswer = function () {
        var counter = 0;
        for (var i = 0; i < (this.caseLength - 1); i++) {
            var nextRoundDifference = this.caseMushroomsArray[i] - this.caseMushroomsArray[i + 1];
            if (nextRoundDifference >= 0) {
                counter += nextRoundDifference;
            }
        }
        return counter;
    };
    MushRoomMaster.prototype.getsecondtMethodAnswer = function () {
        var biggestDifference = 0;
        for (var i = 0; i < (this.caseLength - 1); i++) {
            var nextRoundDifference = this.caseMushroomsArray[i] - this.caseMushroomsArray[i + 1];
            if (nextRoundDifference > biggestDifference) {
                biggestDifference = nextRoundDifference;
            }
        }
        var counter = 0;
        for (var i = 0; i < (this.caseLength - 1); i++) {
            if (this.caseMushroomsArray[i] >= biggestDifference) {
                counter += biggestDifference;
            }
            else {
                counter += this.caseMushroomsArray[i];
            }
        }
        return counter;
    };
    return MushRoomMaster;
})(BaseSolver_1.solver.BaseSolver);
new MushRoomMaster('A-large-practice');
