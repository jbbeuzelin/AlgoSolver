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
var Readphonenumber = (function (_super) {
    __extends(Readphonenumber, _super);
    function Readphonenumber(fileName) {
        _super.call(this, fileName);
        var testCases = _.parseInt(this.reader.nextLine());
        for (var i = 0; i < testCases; i++) {
            this.solveCase(i);
        }
        this.writer.writeFile();
    }
    Readphonenumber.prototype.solveCase = function (testCase) {
        var numberOfBooks = _.parseInt(this.reader.nextLine());
        var bookValues = [];
        bookValues = _.map(this.reader.nextLine().split(' '), _.parseInt);
        var bobBooks = _.filter(bookValues, function (v) { return Math.abs(v) % 2 === 0; });
        var alexBooks = _.filter(bookValues, function (v) { return Math.abs(v) % 2 === 1; });
        var sortedBob = _.sortBy(bobBooks).reverse();
        var sortedAlex = _.sortBy(alexBooks);
        var newBooks = [];
        _.forEach(bookValues, function (v, i) {
            if (Math.abs(v) % 2 === 0) {
                newBooks.push(sortedBob[0]);
                sortedBob.splice(0, 1);
            }
            else {
                newBooks.push(sortedAlex[0]);
                sortedAlex.splice(0, 1);
            }
        });
        this.writer.writeToBuffer("Case #" + (testCase + 1) + ": " + newBooks.join(' '));
    };
    return Readphonenumber;
})(BaseSolver_1.solver.BaseSolver);
new Readphonenumber('practice');
