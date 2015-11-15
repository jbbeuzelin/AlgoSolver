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
var Case = (function () {
    function Case(x, y, a) {
        this.x = x;
        this.y = y;
        this.altitude = a;
    }
    return Case;
})();
var Plan = (function () {
    function Plan(nbLigne, nbColonne, altitude) {
        this.nbLignes = nbLigne;
        this.nbColonnes = nbColonne;
        this.altitude = altitude;
        this.grid = new Array();
        for (var i = 0; i < this.nbLignes; i++) {
            this.grid[i] = new Array();
            for (var j = 0; j < this.nbColonnes; j++) {
                this.grid[i][j] = new Case(j, i, altitude);
            }
        }
    }
    return Plan;
})();
var Globe = (function () {
    function Globe(nbLigne, nbColonne, altitude) {
        this.plans = new Array();
        for (var i = 0; i < altitude; i++) {
            this.plans[i] = new Plan(nbLigne, nbColonne, i);
        }
    }
    /*
    * Donnne la prochaine case ou le ballon ira
    */
    Globe.prototype.GetNextStep = function (c) {
        var nextY = c.y + c.deltaY;
        if (nextY >= this.plans[c.altitude].nbColonnes || nextY < 0) {
            return null;
        }
        var nextX = (c.x + c.deltaX);
        nextX = nextX < 0 ? this.plans[c.altitude].nbColonnes + nextX : nextX % this.plans[c.altitude].nbColonnes;
        return this.plans[c.altitude].grid[nextY][nextX];
    };
    return Globe;
})();
var LoonSolver = (function (_super) {
    __extends(LoonSolver, _super);
    function LoonSolver(fileName) {
        _super.call(this, fileName);
        this.setVars();
        this.solve();
    }
    LoonSolver.prototype.solve = function () {
    };
    LoonSolver.prototype.setVars = function () {
        var _this = this;
        var line = this.reader.nextLine();
        _a = _.map(line.split(' '), _.parseInt), this.nbLignes = _a[0], this.nbColonnes = _a[1], this.nbAltitudes = _a[2];
        this.globe = new Globe(this.nbLignes, this.nbColonnes, this.nbAltitudes);
        line = this.reader.nextLine();
        _b = _.map(line.split(' '), _.parseInt), this.targetNB = _b[0], this.radius = _b[1], this.ballonNB = _b[2], this.turnNB = _b[3];
        line = this.reader.nextLine();
        _c = _.map(line.split(' '), _.parseInt), this.startY = _c[0], this.startX = _c[1];
        this.targetCases = new Array();
        for (var index = 0; index < this.targetNB; index++) {
            var line = this.reader.nextLine();
            var x;
            var y;
            _d = _.map(line.split(' '), _.parseInt), y = _d[0], x = _d[1];
            this.targetCases.push(new Case(x, y, 0));
        }
        for (var iAltitude = 0; iAltitude < this.nbAltitudes; iAltitude++) {
            for (var iLigne = 0; iLigne < this.nbLignes; iLigne++) {
                line = this.reader.nextLine();
                var coord = _.map(line.split(' '), _.parseInt);
                coord.forEach(function (element, index) {
                    // true alors index impaire
                    if (index % 2) {
                        _this.globe.plans[iAltitude].grid[iLigne][(index - 1) / 2].deltaX = element;
                    }
                    else {
                        _this.globe.plans[iAltitude].grid[iLigne][(index) / 2].deltaY = element;
                    }
                });
            }
        }
        console.log(this.globe.plans[0].grid[2][0]);
        var test = this.globe.GetNextStep(this.globe.plans[0].grid[2][0]);
        console.log(test);
        var _a, _b, _c, _d;
        /*[this.R, this.S, this.U, this.P, this.M] = _.map(line.split(' '), _.parseInt);

        for(var i=0;i<this.U;i++) {
            let splitedLine = _.map(this.reader.nextLine().split(' '), _.parseInt);

            this.unavailableSlots.push({row: splitedLine[0], slot: splitedLine[1]});
        }

        for(var i=0;i<this.M;i++) {
            let splitedLine = _.map(this.reader.nextLine().split(' '), _.parseInt);

            this.servers.push({index: i, size: splitedLine[0], capacity: splitedLine[1]});
        }*/
    };
    return LoonSolver;
})(BaseSolver);
new LoonSolver('dc.in');
