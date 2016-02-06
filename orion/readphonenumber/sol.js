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
        var _this = this;
        var phoneNumber;
        var format;
        var indexLimit = 0;
        var limit = 0;
        var previousNumber;
        var numberRepetition = 0;
        var result = "";
        var line = this.reader.nextLine().split(" ");
        phoneNumber = _.map(line[0].split(""), _.parseInt);
        format = _.map(line[1].split("-"), _.parseInt);
        format.forEach(function (element) {
            var group = _.take(phoneNumber, element);
            var RLE = _this.RLE(group);
            //console.log("RLE ", RLE);
            result += _this.convert(RLE);
            phoneNumber.splice(0, element);
        });
        this.writer.writeToBuffer("Case #" + (testCase + 1) + ": " + result.slice(1, result.length));
    };
    Readphonenumber.prototype.RLE = function (group) {
        var previous = group[0];
        var compteur = 1;
        var result = {
            length: [],
            run: []
        };
        if (group.length === 1) {
            result.length.push(compteur);
            result.run.push(previous);
        }
        for (var i = 1; i < group.length; i++) {
            if (group[i] === previous) {
                compteur++;
            }
            else {
                result.length.push(compteur);
                result.run.push(previous);
                previous = group[i];
                compteur = 1;
            }
            if (i == group.length - 1) {
                result.length.push(compteur);
                result.run.push(previous);
            }
        }
        return result;
    };
    Readphonenumber.prototype.convert = function (RLE) {
        var result = "";
        for (var i = 0; i < RLE.length.length; i++) {
            if (RLE.length[i] <= 10) {
                result += this.giveWordMultiple(RLE.length[i]) + this.giveWordNumber(RLE.run[i]);
            }
            else {
                for (var j = 0; j < RLE.length[i]; j++) {
                    result += this.giveWordNumber(RLE.run[i]);
                }
            }
        }
        return result;
    };
    Readphonenumber.prototype.giveWordMultiple = function (multiple) {
        var result;
        switch (multiple) {
            case 1:
                result = "";
                break;
            case 2:
                result = " double";
                break;
            case 3:
                result = " triple";
                break;
            case 4:
                result = " quadruple";
                break;
            case 5:
                result = " quintuple";
                break;
            case 6:
                result = " sextuple";
                break;
            case 7:
                result = " septuple";
                break;
            case 8:
                result = " octuple";
                break;
            case 9:
                result = " nonuple";
                break;
            case 10:
                result = " decuple";
                break;
            default:
                console.log("erreur mutliple", multiple);
                break;
        }
        return result;
    };
    Readphonenumber.prototype.giveWordNumber = function (multiple) {
        var result;
        switch (multiple) {
            case 0:
                result = "zero";
                break;
            case 1:
                result = "one";
                break;
            case 2:
                result = "two";
                break;
            case 3:
                result = "three";
                break;
            case 4:
                result = "four";
                break;
            case 5:
                result = "five";
                break;
            case 6:
                result = "six";
                break;
            case 7:
                result = "seven";
                break;
            case 8:
                result = "eight";
                break;
            case 9:
                result = "nine";
                break;
            default:
                console.log("erreur number", multiple);
                break;
        }
        return " " + result;
    };
    return Readphonenumber;
})(BaseSolver_1.solver.BaseSolver);
new Readphonenumber('practice');
