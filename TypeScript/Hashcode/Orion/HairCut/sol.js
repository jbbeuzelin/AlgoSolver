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
var Helper_1 = require('../../Core/Helper');
var HairCut = (function (_super) {
    __extends(HairCut, _super);
    function HairCut(fileName) {
        _super.call(this, fileName);
        var testCases = _.parseInt(this.reader.nextLine());
        for (var i = 0; i < testCases; i++) {
            // Reset every case
            this.caseBarbersTimesArray = [];
            // Solve case
            this.solveCase(i);
        }
        this.writer.writeFile();
    }
    HairCut.prototype.solveCase = function (testCase) {
        // Set vars
        var line = this.reader.nextLine();
        _a = _.map(line.split(' '), _.parseInt), this.caseBarbersNumber = _a[0], this.casePlace = _a[1];
        line = this.reader.nextLine();
        this.caseBarbersTimesArray = _.map(line.split(' '), _.parseInt);
        var lcm = Helper_1.helper.MathHelper.lcm_nums(this.caseBarbersTimesArray);
        var barberPerLcm = _.reduce(this.caseBarbersTimesArray, function (tot, M) { return tot + lcm / M; }, 0);
        var dynamicPlace = this.casePlace % barberPerLcm;
        if (dynamicPlace > 0 && dynamicPlace <= this.caseBarbersNumber) {
            this.writer.writeToBuffer("Case #" + (testCase + 1) + ": " + dynamicPlace);
        }
        else {
            this.writer.writeToBuffer("Case #" + (testCase + 1) + ": " + 0);
        }
        var _a;
    };
    return HairCut;
})(BaseSolver_1.solver.BaseSolver);
new HairCut('practice');
