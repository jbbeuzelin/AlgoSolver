/// <reference path="../../typings/node/node.d.ts"/>
/// <reference path="../../typings/lodash/lodash.d.ts"/>
/// <reference path="../../typings/bigint/bigint.d.ts"/>
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var BaseSolver_1 = require('../../core/BaseSolver');
var Hashcode2016round1 = (function (_super) {
    __extends(Hashcode2016round1, _super);
    function Hashcode2016round1(fileName) {
        _super.call(this, fileName);
        this.readFile();
        this.writer.writeFile();
    }
    Hashcode2016round1.prototype.readFile = function () {
        _a = _.map(this.reader.nextLine().split(' '), _.parseInt), this.nbRows = _a[0], this.nbColumns = _a[1], this.nbDrones = _a[2], this.deadline = _a[3], this.maximumLoad = _a[4];
        this.P = _.parseInt(this.reader.nextLine());
        this.productsWeights = _.map(this.reader.nextLine().split(' '), _.parseInt);
        this.W = _.parseInt(this.reader.nextLine());
        this.positionsW = [];
        this.productAvailableByW = [];
        for (var i = 0; i < this.W; i++) {
            this.positionsW.push(_.map(this.reader.nextLine().split(' '), _.parseInt));
            this.productAvailableByW.push(_.map(this.reader.nextLine().split(' '), _.parseInt));
        }
        this.C = _.parseInt(this.reader.nextLine());
        this.positionsC = [];
        this.numberOfOrderedProductsByC = [];
        this.orderedProductsByC = [];
        for (var i = 0; i < this.C; i++) {
            this.positionsC.push(_.map(this.reader.nextLine().split(' '), _.parseInt));
            this.numberOfOrderedProductsByC.push(_.parseInt(this.reader.nextLine()));
            this.orderedProductsByC.push(_.map(this.reader.nextLine().split(' '), _.parseInt));
        }
        var _a;
    };
    return Hashcode2016round1;
})(BaseSolver_1.solver.BaseSolver);
new Hashcode2016round1('practice');
//# sourceMappingURL=sol.js.map