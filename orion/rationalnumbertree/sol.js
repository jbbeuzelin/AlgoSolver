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
var Rationalnumbertree = (function (_super) {
    __extends(Rationalnumbertree, _super);
    function Rationalnumbertree(fileName) {
        _super.call(this, fileName);
        var testCases = _.parseInt(this.reader.nextLine());
        for (var i = 0; i < testCases; i++) {
            var ligne = _.map(this.reader.nextLine().split(" "), _.parseInt);
            var id = ligne[0];
            var retour = void 0;
            if (id === 1) {
                var n = ligne[1];
                retour = this.solveN(n);
            }
            else {
                var p = ligne[1];
                var q = ligne[2];
                retour = this.solvePQ(p, q);
            }
            console.log("retour", retour);
            this.writer.writeToBuffer("Case #" + (i + 1) + ": " + retour);
        }
        this.writer.writeFile();
    }
    Rationalnumbertree.prototype.solveCase = function (testCase) {
        this.writer.writeToBuffer("Case #" + (testCase + 1) + ": " + testCase);
    };
    Rationalnumbertree.prototype.solveN = function (n) {
        if (n == 1) {
            return "1";
        }
        var binary = n.toString(2);
        var p = 1;
        var q = 1;
        for (var i = 1; i < binary.length; i++) {
            var char = _.parseInt(binary.charAt(i));
            if (char == 1) {
                p = p + q;
            }
            else {
                q = p + q;
            }
        }
        return "" + p + " " + q;
    };
    Rationalnumbertree.prototype.solvePQ = function (p, q) {
        var retour = [];
        while (!(p === 1 && q === 1)) {
            if (p > q) {
                retour.push(1);
                p -= q;
            }
            else {
                retour.push(0);
                q -= p;
            }
        }
        retour = retour.reverse();
        var chaineRetour = "1" + retour.join("");
        return "" + parseInt(chaineRetour, 2);
    };
    return Rationalnumbertree;
})(BaseSolver_1.solver.BaseSolver);
new Rationalnumbertree('practice');
