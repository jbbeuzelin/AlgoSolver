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
        var numbers = [];
        numbers = _.map(this.reader.nextLine().split(' '), _.parseInt);
        var state = [];
        state[0] = 1;
        for (var i = 1; i < numbers.length; i++) {
            var j = void 0;
            state[i] = 1;
            for (j = 0; j < i; j++) {
                if (numbers[j] <= numbers[i] && state[j] + 1 > state[i]) {
                    state[i] = state[j] + 1;
                }
            }
        }
        var maxLength = _.max(state);
        console.log(maxLength);
        this.writer.writeToBuffer('1');
        this.writer.writeFile();
    }
    return test;
})(BaseSolver_1.solver.BaseSolver);
new test('practice');
