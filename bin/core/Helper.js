"use strict";
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
    /* Get coefficient binomial */
    MathHelper.binomial = function (n, k) {
        var coeff = 1;
        for (var x = n - k + 1; x <= n; x++)
            coeff *= x;
        for (x = 1; x <= k; x++)
            coeff /= x;
        return coeff;
    };
    /* Get Number X With N Dices With D Faces */
    MathHelper.GetNumberXWithNDicesWithDFaces = function (wantedNumber, diceNumber, FacesNumber) {
        var turnsNb = Math.floor((wantedNumber - diceNumber) / FacesNumber);
        var result = 0;
        for (var turnNb = 0; turnNb <= turnsNb; turnNb++) {
            var temp = wantedNumber - turnNb * FacesNumber - 1;
            var temp2 = diceNumber - 1;
            result += Math.pow(-1, turnNb) * MathHelper.binomial(diceNumber, turnNb) * MathHelper.binomial(temp, temp2);
        }
        return result;
    };
    return MathHelper;
}());
exports.MathHelper = MathHelper;
var NumberExtension = (function () {
    function NumberExtension() {
    }
    return NumberExtension;
}());
exports.NumberExtension = NumberExtension;
