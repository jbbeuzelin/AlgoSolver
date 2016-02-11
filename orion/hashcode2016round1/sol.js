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
    // On passe le warehouse et les cliuents possibles + la charge du drone actulle
    Hashcode2016round1.prototype.choosenCustomers = function (wareHouse, possibleCustomers, droneLoad) {
        /*let sortedCustomers = _.sortBy(possibleCustomers, customer => {
            return this.distance(this.positionsW[wareHouse], this.positionsC[customer]);
        });*/
        var _this = this;
        if (droneLoad === void 0) { droneLoad = 0; }
        var sortedCustomers = _.sortBy(possibleCustomers, function (customer) {
            return _this.numberOfOrderedProductsByC[customer];
        });
        var choosenCustomers = [];
        for (var i = 0; i < sortedCustomers.length; i++) {
            var toAdd = 0;
            var customerId = sortedCustomers[i];
            for (var j = 0; j < this.numberOfOrderedProductsByC[customerId]; j++) {
                var productId = this.orderedProductsByC[customerId][j];
                toAdd += this.productsWeights[productId];
                console.log('add', toAdd);
            }
            // Si c'est trop lourd on arrete tout de suite
            // TODO essayer 2 / 3 cas de plus
            if (droneLoad + toAdd > this.maximumLoad) {
                break;
            }
            droneLoad += toAdd;
            choosenCustomers.push(sortedCustomers[i]);
        }
        return choosenCustomers;
    };
    Hashcode2016round1.prototype.distance = function (pos0, pos1) {
        return (pos0[0] - pos1[0]) * (pos0[0] - pos1[0]) + (pos0[1] - pos1[1]) * (pos0[1] - pos1[1]);
    };
    Hashcode2016round1.prototype.loadProductsInstructions = function (products, warehouse, drone) {
        var _this = this;
        var groups = _.groupBy(products);
        _.forEach(groups, function (g) {
            _this.writer.writeToBuffer(drone + " L " + warehouse + " " + g[0] + " " + g.length);
        });
    };
    Hashcode2016round1.prototype.unloadProductsInstructions = function (products, warehouse, drone) {
        var _this = this;
        var groups = _.groupBy(products);
        _.forEach(groups, function (g) {
            _this.writer.writeToBuffer(drone + " U " + warehouse + " " + g[0] + " " + g.length);
        });
    };
    Hashcode2016round1.prototype.deliverProduct = function (drone, customerId, product, numberOfProducts) {
        this.writer.writeToBuffer(drone + " D " + customerId + " " + product + " " + numberOfProducts);
    };
    Hashcode2016round1.prototype.wait = function (drone, time) {
        this.writer.writeToBuffer(drone + " W " + time);
    };
    return Hashcode2016round1;
})(BaseSolver_1.solver.BaseSolver);
new Hashcode2016round1('practice');
