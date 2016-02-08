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
var Fbhackercuplandro = (function (_super) {
    __extends(Fbhackercuplandro, _super);
    function Fbhackercuplandro(fileName) {
        _super.call(this, fileName);
        var testCases = _.parseInt(this.reader.nextLine());
        for (var i = 0; i < testCases; i++) {
            this.solveCase(i);
        }
        this.writer.writeFile();
    }
    Fbhackercuplandro.prototype.solveCase = function (testCase) {
        var result = "";
        _a = _.map(this.reader.nextLine().split(' '), _.parseInt), this.nbLoad = _a[0], this.nbWashing = _a[1], this.nbDryer = _a[2], this.dryerTime = _a[3];
        this.washingTimes = _.map(this.reader.nextLine().split(' '), _.parseInt);
        this.writer.writeToBuffer("Case #" + (testCase + 1) + ": " + result);
        var _a;
    };
    Fbhackercuplandro.prototype.nbWashingWorked = function (time) {
        if (time < 0)
            return 0;
        var machineWorked = 0;
        for (var i = 0; i < this.nbWashing; i++) {
            machineWorked += time / this.washingTimes[i] + 1;
        }
        return machineWorked;
    };
    return Fbhackercuplandro;
})(BaseSolver_1.solver.BaseSolver);
new Fbhackercuplandro('practice');
