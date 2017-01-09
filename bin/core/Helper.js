"use strict";
/// <reference path="../../typings/big-integer/big-integer.d.ts"/>
var bigInt = require("big-integer");
var helper;
(function (helper) {
    var MathHelper = (function () {
        function MathHelper() {
        }
        /**
         * PGCD de 2 nombres
         */
        MathHelper.gcf = function (a, b) {
            return (b == 0) ? (a) : (this.gcf(b, a % b));
        };
        /**
         * PPCM d'un tableau
         */
        MathHelper.lcm_nums = function (originalArray) {
            var ar = originalArray.slice(0);
            if (ar.length > 1) {
                ar.push(this.lcm(ar.shift(), ar.shift()));
                return this.lcm_nums(ar);
            }
            else {
                return ar[0];
            }
        };
        /**
         * PPCM de 2 nombres
         */
        MathHelper.lcm = function (a, b) {
            return (a / this.gcf(a, b)) * b;
        };
        MathHelper.modulo = function (a, b) {
            return ((a % b) + b) % b;
        };
        return MathHelper;
    }());
    helper.MathHelper = MathHelper;
    var NumberExtension = (function () {
        function NumberExtension() {
        }
        NumberExtension.convertBinaryStringToBaseN = function (binary, n) {
            if (n === void 0) { n = 10; }
            var result = bigInt(0);
            for (var i = 0; i < binary.length; i++) {
                var binaryChar = binary.charAt(binary.length - i - 1);
                if (binaryChar === "1") {
                    var conversionStep = bigInt(binaryChar).multiply(bigInt(n).pow(i));
                    result = result.add(conversionStep);
                }
            }
            return result;
        };
        NumberExtension.leastFactor = function (n) {
            if (isNaN(n.toJSNumber()) || !isFinite(n.toJSNumber()))
                return bigInt(NaN);
            if (n.equals(0))
                return bigInt.zero;
            if (n.mod(1).greater(0) || n.multiply(n).lesser(2))
                return bigInt(1);
            if (n.mod(2).equals(0))
                return bigInt(2);
            if (n.mod(3).equals(0))
                return bigInt(3);
            if (n.mod(5).equals(0))
                return bigInt(5);
            var m = NumberExtension.BISqrtApprox(n);
            for (var i = 7; m.greaterOrEquals(i); i += 30) {
                if (n.mod(i).equals(0))
                    return bigInt(i);
                if (n.mod(i + 4).equals(0))
                    return bigInt(i + 4);
                if (n.mod(i + 6).equals(0))
                    return bigInt(i + 6);
                if (n.mod(i + 10).equals(0))
                    return bigInt(i + 10);
                if (n.mod(i + 12).equals(0))
                    return bigInt(i + 12);
                if (n.mod(i + 16).equals(0))
                    return bigInt(i + 16);
                if (n.mod(i + 22).equals(0))
                    return bigInt(i + 22);
                if (n.mod(i + 24).equals(0))
                    return bigInt(i + 24);
            }
            return n;
        };
        NumberExtension.BISqrtApprox = function (n) {
            // if(n.greaterOrEquals(Math.pow(2,100))) {
            //     // big int word
            //     let increment : number = Math.pow(2,26);
            //     let min : BigInteger = bigInt(increment);
            //     let max : BigInteger = bigInt(n).divide(increment);
            //     throw "limit of number reached"; 
            // }
            return bigInt(Math.ceil(Math.sqrt(n.toJSNumber())));
        };
        NumberExtension.XFirstDivisorsOf = function (n, x) {
            if (x === void 0) { x = 5; }
            if (n.lesser(1))
                throw "Argument error";
            var small = [];
            var large = [];
            var end = NumberExtension.BISqrtApprox(n);
            for (var i = bigInt(1); end.greaterOrEquals(i); i = i.add(1)) {
                if (n.mod(i).equals(0)) {
                    if (i.equals(1) || i.equals(n)) {
                        continue;
                    }
                    small.push(i);
                    if (i.pow(2).notEquals(n))
                        large.push(n.divide(i));
                }
                if (small.length + large.length >= x) {
                    break;
                }
                if (i.greaterOrEquals(Math.pow(10, 7)))
                    break;
            }
            large.reverse();
            return small.concat(large);
        };
        return NumberExtension;
    }());
    helper.NumberExtension = NumberExtension;
    //     listDivisors = function listDivisors(n) {
    // 	if (n < 1)
    // 		throw "Argument error";
    // 	var small = [];
    // 	var large = [];
    // 	var end = Math.floor(Math.sqrt(n));
    // 	for (var i = 1; i <= end; i++) {
    // 		if (n % i == 0) {
    // 			small.push(i);
    // 			if (i * i != n)  // Don't include a square root twice
    // 				large.push(n / i);
    // 		}
    // 	}
    // 	large.reverse();
    // 	return small.concat(large);
    // }
})(helper = exports.helper || (exports.helper = {}));
