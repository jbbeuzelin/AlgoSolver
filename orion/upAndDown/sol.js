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
        var cases = _.parseInt(this.reader.nextLine());
        for (var i = 0; i < cases; i++) {
            this.solveTestCase(i + 1);
        }
        this.writer.writeFile();
    }
    test.prototype.solveTestCase = function (testNumber) {
        var length = _.parseInt(this.reader.nextLine());
        var numbers = [];
        numbers = _.map(this.reader.nextLine().split(' '), _.parseInt);
        var orderedNumbers = _.sortBy(numbers);
        var swapsNumber = 0;
        _.forEach(orderedNumbers, function (n) {
            var numberIndex = _.indexOf(numbers, n);
            swapsNumber += Math.min(numberIndex, length - 1 - numberIndex);
            numbers.splice(numberIndex, 1);
            length--;
        });
        this.writer.writeToBuffer("Case #" + testNumber + ": " + swapsNumber);
    };
    return test;
})(BaseSolver_1.solver.BaseSolver);
new test('practice');
