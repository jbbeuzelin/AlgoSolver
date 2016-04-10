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
    })();
    helper.MathHelper = MathHelper;
})(helper = exports.helper || (exports.helper = {}));
