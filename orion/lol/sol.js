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
var Lol = (function (_super) {
    __extends(Lol, _super);
    function Lol(fileName) {
        _super.call(this, fileName);
        var testCases = _.parseInt(this.reader.nextLine());
        for (var i = 0; i < testCases; i++) {
            this.solveCase(i);
        }
        this.writer.writeFile();
    }
    Lol.prototype.solveCase = function (testCase) {
        this.writer.writeToBuffer("Case #" + (testCase + 1) + ": " + testCase);
    };
    return Lol;
})(BaseSolver_1.solver.BaseSolver);
new Lol('practice');
