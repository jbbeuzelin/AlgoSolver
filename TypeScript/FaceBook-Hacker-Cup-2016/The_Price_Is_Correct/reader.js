/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/lodash/lodash.d.ts"/>
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fs = require('fs');
var _ = require('lodash');
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
var PriceIsCorrect = (function (_super) {
    __extends(PriceIsCorrect, _super);
    function PriceIsCorrect(fileName) {
        console.time("Resolution");
        //this.writeExample();
        //console.log("the price is correct resolution");
        _super.call(this, fileName);
        this.TurnNumber = _.parseInt(this.reader.nextLine());
        //console.log("Turn number : " +this.TurnNumber);
        this.Lines = new Array();
        for (var i = 0; i < this.TurnNumber; i++) {
            var possibility = this.solve();
            this.Lines[i] = "Case #" + (i + 1) + ": " + possibility;
        }
        console.timeEnd("Resolution");
        this.writeFile();
    }
    PriceIsCorrect.prototype.solve = function () {
        var _this = this;
        var NumberPrice;
        var MaxPrice;
        var PriceArray;
        var Possibility = 0;
        var minValue = 0;
        var indexForbidden;
        var line = function () { return _this.reader.nextLine(); };
        _a = _.map(line().split(' '), _.parseInt), NumberPrice = _a[0], MaxPrice = _a[1];
        PriceArray = _.map(line().split(' '), _.parseInt);
        indexForbidden = new Array();
        for (var i_1 = 0; i_1 < NumberPrice; i_1++) {
            indexForbidden[i_1] = false;
        }
        minValue = _.min(PriceArray);
        //console.log(minValue);
        // On fait un boucle des sommes possibles d'abord 1 par 1, puis 2 par 2, etc 
        for (var i = 1; i <= NumberPrice; i++) {
            if (minValue * i > MaxPrice) {
                break;
            }
            var StartIndex = 0;
            var minValueSum = Math.round(MaxPrice / i);
            //console.log("min value sum : "+minValueSum);
            if (minValueSum < minValue) {
                break;
            }
            while (StartIndex + i - 1 < NumberPrice) {
                if (indexForbidden[StartIndex + 1]) {
                    indexForbidden[StartIndex] = true;
                    StartIndex++;
                }
                else if (indexForbidden[StartIndex]) {
                    StartIndex++;
                }
                else {
                    var Total = 0;
                    var limit = StartIndex + i - 1;
                    var stop = false;
                    for (var y = StartIndex; y <= limit; y++) {
                        // if(price > MaxPrice)
                        // {
                        //     stop = true;
                        //     break;
                        // }              
                        Total += PriceArray[y];
                        ;
                        if (Total > MaxPrice) {
                            indexForbidden[StartIndex] = true;
                            break;
                        }
                    }
                    if (Total <= MaxPrice && !stop) {
                        Possibility += 1;
                    }
                    StartIndex++;
                }
            }
        }
        return Possibility;
        var _a;
    };
    PriceIsCorrect.prototype.writeFile = function () {
        var content = "";
        for (var i = 0; i < this.Lines.length; i++) {
            content += this.Lines[i] + "\n";
        }
        fs.writeFile('dc.out', content, function (err) {
            if (err)
                throw err;
            console.log('It\'s saved!');
        });
    };
    PriceIsCorrect.prototype.writeExample = function () {
        var limitTurn = 40;
        var limitBox = 100000;
        var limitPrice = 1000000000;
        var result = "" + limitBox + " " + limitPrice + "\n";
        for (var i = 0; i < limitBox; i++) {
            var boxPrice = Math.round(Math.random() * limitPrice + 1);
            result += boxPrice + " ";
        }
        ;
        result += "\n";
        fs.writeFile('example.out', result, function (err) {
            if (err)
                throw err;
            console.log('It\'s saved!');
        });
    };
    return PriceIsCorrect;
})(BaseSolver);
new PriceIsCorrect('input.in.test');
