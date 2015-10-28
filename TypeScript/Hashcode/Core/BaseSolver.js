/// <reference path="typings/tsd.d.ts"/>
var fs = require('fs');
var solver;
(function (solver) {
    var Reader = (function () {
        function Reader(fileName) {
            this.file = fs.readFileSync(fileName, 'utf8');
            this.linesArray = this.file.split('\n');
        }
        Reader.prototype.nextLine = function () {
            return this.linesArray.shift();
        };
        Reader.prototype.getFile = function () {
            return this.file;
        };
        return Reader;
    })();
    var BaseSolver = (function () {
        function BaseSolver(fileName) {
            this.reader = new Reader(fileName);
        }
        return BaseSolver;
    })();
    solver.BaseSolver = BaseSolver;
})(solver = exports.solver || (exports.solver = {}));
