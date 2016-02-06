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
var Loons = (function (_super) {
    __extends(Loons, _super);
    function Loons(fileName) {
        _super.call(this, fileName);
        this.result = 0;
        this.cache = {};
        this.readFile();
        while (true) {
            this.initBalloons();
            this.genererLes81Millions();
            break;
            var resulttemp = 0;
            //resulttemp = this.randomSolve();
            ////console.log("number death : " +_.countBy(this.balloons, (b)=> b.isDead));
            resulttemp = this.solveBaloonParBaloonParMorceau();
            if (resulttemp > this.result) {
                this.result = resulttemp;
                this.writeLine();
                console.log("Best score", resulttemp);
                this.writer.writeFileSyncAndEmptyBuffer();
            }
        }
    }
    Loons.prototype.solveCase = function (testCase) {
        this.writer.writeToBuffer("Case #" + (testCase + 1) + ": " + testCase);
    };
    Loons.prototype.readFile = function () {
        _a = _.map(this.reader.nextLine().split(' '), _.parseInt), this.R = _a[0], this.C = _a[1], this.A = _a[2];
        _b = _.map(this.reader.nextLine().split(' '), _.parseInt), this.L = _b[0], this.V = _b[1], this.B = _b[2], this.T = _b[3];
        _c = _.map(this.reader.nextLine().split(' '), _.parseInt), this.rs = _c[0], this.cs = _c[1];
        this.startPoint = {
            r: this.rs,
            c: this.cs
        };
        this.cibles = [];
        for (var i = 0; i < this.L; i++) {
            var line = _.map(this.reader.nextLine().split(' '), _.parseInt);
            this.cibles.push({
                r: line[0],
                c: line[1]
            });
        }
        this.map = [];
        for (var i = 0; i < this.A; i++) {
            this.map[i] = [];
            for (var j = 0; j < this.R; j++) {
                this.map[i][j] = [];
                var line = _.map(this.reader.nextLine().split(' '), _.parseInt);
                for (var k = 0; k < line.length; k += 2) {
                    this.map[i][j][k / 2] = { vr: line[k], vc: line[k + 1] };
                }
            }
        }
        var _a, _b, _c;
    };
    Loons.prototype.initBalloons = function () {
        this.balloons = [];
        for (var i = 0; i < this.B; i++) {
            var balloon = new Balloon();
            balloon.altitude = 0;
            balloon.currentCase = { r: this.rs, c: this.cs };
            balloon.changeHistory = [];
            this.balloons.push(balloon);
        }
    };
    Loons.prototype.getScore = function () {
        var score = 0;
        for (var j = 0; j < this.L; j++) {
            var u = this.cibles[j].r;
            var v = this.cibles[j].c;
            for (var i = 0; i < this.B; i++) {
                if (this.balloons[i].isDead) {
                    continue;
                }
                var r = this.balloons[i].currentCase.r;
                var c = this.balloons[i].currentCase.c;
                if (Math.pow(r - u, 2) + Math.pow(this.columndist(c, v), 2) <= Math.pow(this.V, 2)) {
                    score += 1;
                    break;
                }
            }
        }
        return score;
    };
    Loons.prototype.getScorePourBallon = function (unBallon) {
        var score = 0;
        for (var j = 0; j < this.L; j++) {
            var u = this.cibles[j].r;
            var v = this.cibles[j].c;
            if (unBallon.isDead) {
                break;
            }
            var r = unBallon.currentCase.r;
            var c = unBallon.currentCase.c;
            if (Math.pow(r - u, 2) + Math.pow(this.columndist(c, v), 2) <= Math.pow(this.V, 2)) {
                score += 1;
            }
        }
        return score;
    };
    Loons.prototype.getScorePourCase = function (uneCase) {
        if (uneCase == undefined) {
            return {
                score: 0,
                indexDesCasesTouchees: []
            };
        }
        var score = 0;
        var casesTouchees = [];
        for (var j = 0; j < this.L; j++) {
            var u = this.cibles[j].r;
            var v = this.cibles[j].c;
            var r = uneCase.r;
            var c = uneCase.c;
            if (Math.pow(r - u, 2) + Math.pow(this.columndist(c, v), 2) <= Math.pow(this.V, 2)) {
                score += 1;
                casesTouchees.push(j);
            }
        }
        return {
            score: score,
            indexDesCasesTouchees: casesTouchees
        };
    };
    Loons.prototype.getScorePourCaseSelonContexte = function (uneCase, caseCibleToucheeAInstantT, instantDeLaSimulation) {
        if (uneCase == undefined) {
            return 0;
        }
        var score = 0;
        for (var j = 0; j < this.L; j++) {
            if (!caseCibleToucheeAInstantT[instantDeLaSimulation] || caseCibleToucheeAInstantT[instantDeLaSimulation][j] == 1) {
                continue;
            }
            var u = this.cibles[j].r;
            var v = this.cibles[j].c;
            var r = uneCase.r;
            var c = uneCase.c;
            if (Math.pow(r - u, 2) + Math.pow(this.columndist(c, v), 2) <= Math.pow(this.V, 2)) {
                score += 1;
            }
        }
        return score;
    };
    Loons.prototype.writeLine = function () {
        for (var i = 0; i < this.T; i++) {
            var result = "";
            for (var j = 0; j < this.B; j++) {
                result += this.balloons[j].changeHistory[i] + " ";
            }
            this.writer.writeToBuffer("" + result);
        }
    };
    Loons.prototype.columndist = function (c1, c2) {
        var abs = Math.abs(c1 - c2);
        return Math.min(abs, this.C - abs);
    };
    Loons.prototype.randomSolve = function () {
        var score = 0;
        for (var i = 0; i < this.T; i++) {
            for (var j = 0; j < this.B; j++) {
                if (!this.balloons[j].isStarted) {
                    var variation = Math.floor((Math.random() * 100)) % 2;
                    this.balloons[j].isStarted = !!variation;
                    this.balloons[j].changeAltitude(variation, this);
                }
                else {
                    this.balloons[j].changeAltitude(Math.floor((Math.random() * 100)) % 3 - 1, this);
                }
            }
            //console.log("Score "+score);
            score += this.getScore();
        }
        return score;
    };
    Loons.prototype.solveBaloonParBaloonParMorceau = function () {
        var _this = this;
        //throw new Error();
        var score = 0;
        var reinit = function () {
            var caseCibleToucheeAInstantT = [];
            for (var i = 0; i < _this.T; i++) {
                caseCibleToucheeAInstantT.push([]);
                for (var j = 0; j < _this.cibles.length; j++) {
                    caseCibleToucheeAInstantT[i][j] = 0;
                }
            }
            return caseCibleToucheeAInstantT;
        };
        var nb = 8;
        var caseCibleToucheeAInstantT = reinit();
        //console.log("T=",this.T);
        for (var i = 0; i < this.T; i += nb) {
            //console.log("Tour",i);
            for (var j = 0; j < this.B; j++) {
                if (!this.balloons[j].isDead) {
                    var chemin = this.obtenirCheminPourCase(this.balloons[j].currentCase, this.balloons[j].altitude, nb, i, caseCibleToucheeAInstantT);
                    var parcours = chemin.parcours;
                    var casesFutures = [{ case: this.balloons[j].currentCase, altitude: this.balloons[j].altitude }];
                    //console.log("Parcours pour ballon",j,parcours);
                    //console.log("Score pour ballon",j,chemin.score);
                    //console.log("Case initiale",casesFutures);
                    for (var k = 0; k < parcours.length; k++) {
                        var nouvelleCase = this.nextCase(casesFutures[k].case, casesFutures[k].altitude + parcours[k]);
                        casesFutures.push({ case: nouvelleCase, altitude: casesFutures[k].altitude + parcours[k] });
                    }
                    casesFutures.shift();
                    //console.log("Cases futures",casesFutures);
                    casesFutures.forEach(function (element, index) {
                        var retour = _this.getScorePourCase(element.case);
                        var lesIndex = retour.indexDesCasesTouchees;
                        for (var _i = 0; _i < lesIndex.length; _i++) {
                            var position = lesIndex[_i];
                            if (!caseCibleToucheeAInstantT[i + index]) {
                                break;
                            }
                            caseCibleToucheeAInstantT[i + index][position] = 1;
                        }
                    });
                    /*let nb1=0;
                    for(let i = 0; i < this.T; i++){
                        for(let j=0; j< this.cibles.length; j++){
                            if(caseCibleToucheeAInstantT[i][j]==1){
                                nb1++;
                            }
                        }
                    }
                    
                    console.log("Nb1",nb1);*/
                    for (var _i = 0; _i < parcours.length; _i++) {
                        var unChangement = parcours[_i];
                        this.balloons[j].changeAltitude(unChangement, this);
                    }
                }
            }
        }
        return this.getScoreDepuisContexte(caseCibleToucheeAInstantT);
    };
    Loons.prototype.getScoreDepuisContexte = function (caseCibleToucheeAInstantT) {
        var nb1 = 0;
        for (var i = 0; i < this.T; i++) {
            for (var j = 0; j < this.cibles.length; j++) {
                if (caseCibleToucheeAInstantT[i][j] == 1) {
                    nb1++;
                }
            }
        }
        return nb1;
    };
    Loons.prototype.cheminPossiblePourCase = function (uneCase, uneAltitude) {
        if (!uneCase) {
            return [];
        }
        var cheminsPossibles = [];
        if (uneAltitude > 1 && this.nextCase(uneCase, uneAltitude - 1)) {
            cheminsPossibles.push(-1);
        }
        if (uneAltitude < this.A - 1 && this.nextCase(uneCase, uneAltitude + 1)) {
            cheminsPossibles.push(1);
        }
        if (this.nextCase(uneCase, uneAltitude + 1)) {
            cheminsPossibles.push(0);
        }
        return cheminsPossibles;
    };
    Loons.prototype.cheminPossiblePourCaseAvecAltitude = function (uneCase) {
        if (!uneCase) {
            return [];
        }
        var clef = "cheminPossible" + uneCase.r + "-" + uneCase.c + "-" + uneCase.a;
        if (this.cache[clef]) {
            return this.cache[clef];
        }
        var retour = this.cheminPossiblePourCase({ r: uneCase.r, c: uneCase.c }, uneCase.a);
        this.cache[clef] = retour;
        return retour;
    };
    Loons.prototype.obtenirCheminPourCase = function (uneCase, uneAltitude, profondeur, instantDeLaSimulation, caseCibleToucheeAInstantT) {
        var _this = this;
        var lesChemins = this.cheminPossiblePourCase(uneCase, uneAltitude);
        if (lesChemins.length == 0) {
            return { chemin: 0, score: -1000000, parcours: [0] };
        }
        var lesScores;
        if (profondeur == 1) {
            lesScores = _.map(lesChemins, function (chemin) { var futureCase = _this.nextCase(uneCase, uneAltitude + chemin); return { parcours: [chemin], chemin: chemin, score: _this.getScorePourCaseSelonContexte(futureCase, caseCibleToucheeAInstantT, instantDeLaSimulation) }; });
        }
        else {
            lesScores = _.map(lesChemins, function (chemin) {
                var appelRecursif = _this.obtenirCheminPourCase(_this.nextCase(uneCase, uneAltitude + chemin), uneAltitude + chemin, profondeur - 1, instantDeLaSimulation + 1, caseCibleToucheeAInstantT);
                return {
                    parcours: [chemin].concat(appelRecursif.parcours),
                    chemin: chemin,
                    score: _this.getScorePourCaseSelonContexte(_this.nextCase(uneCase, uneAltitude + chemin), caseCibleToucheeAInstantT, instantDeLaSimulation) + appelRecursif.score
                };
            });
        }
        var max = _.max(lesScores, function (unScore) { return unScore.score; });
        var tousCeuxQuiOntLeMax = _.filter(lesScores, function (unElement) { return unElement.score == max.score; });
        var indexChoisi = Math.floor(Math.random() * tousCeuxQuiOntLeMax.length);
        return tousCeuxQuiOntLeMax[indexChoisi];
    };
    Loons.prototype.testScore = function () {
        var score = 0;
        this.balloons[0].changeAltitude(1, this);
        score += this.getScore();
        this.balloons[0].changeAltitude(1, this);
        score += this.getScore();
        this.balloons[0].changeAltitude(1, this);
        score += this.getScore();
        this.balloons[0].changeAltitude(0, this);
        score += this.getScore();
        this.balloons[0].changeAltitude(0, this);
        score += this.getScore();
        //console.log(score);
    };
    Loons.prototype.nextCase = function (uneCase, uneAltitude) {
        if (uneAltitude == 0) {
            return uneCase;
        }
        if (uneCase == undefined) {
            return undefined;
        }
        if (this.cache[uneCase.r + "-" + uneCase.c + "-" + uneAltitude]) {
            return this.cache[uneCase.r + "-" + uneCase.c + "-" + uneAltitude];
        }
        var leVent = this.map[uneAltitude - 1][uneCase.r][uneCase.c];
        var caseRetour = {
            r: uneCase.r + leVent.vr,
            c: ((uneCase.c + leVent.vc) + this.C) % this.C
        };
        if (caseRetour.r < 0 || caseRetour.r >= this.R) {
            this.cache[uneCase.r + "-" + uneCase.c + "-" + uneAltitude] = undefined;
            return undefined;
        }
        this.cache[uneCase.r + "-" + uneCase.c + "-" + uneAltitude] = caseRetour;
        return caseRetour;
    };
    Loons.prototype.nextCaseAvecAltitude = function (uneCase) {
        var caseRetour = this.nextCase(uneCase, uneCase.a);
        if (caseRetour == undefined) {
            return undefined;
        }
        return {
            r: caseRetour.r,
            c: caseRetour.c,
            a: uneCase.a
        };
    };
    Loons.prototype.genererTableau4Dimensions = function () {
        var retour = [];
        for (var i = 0; i < this.T; i++) {
            retour.push([]);
            for (var j = 0; j < this.R; j++) {
                retour[i].push([]);
                for (var k = 0; k < this.C; k++) {
                    retour[i][j].push([]);
                    for (var l = 0; l <= this.A; l++) {
                        retour[i][j][k].push(false);
                    }
                }
            }
        }
        return retour;
    };
    Loons.prototype.genererLes81Millions = function () {
        this.matrice = this.genererTableau4Dimensions();
        console.log("Matrice vierge créée");
        var tableau = [{
                r: this.startPoint.r,
                c: this.startPoint.c,
                a: 0,
            }];
        for (var i = 0; i < this.T; i++) {
            console.log("T courant", i);
            var positionsFutures = [];
            var positionsFuturesObjet = {};
            for (var _i = 0; _i < tableau.length; _i++) {
                var element = tableau[_i];
                var possibilites = this.cheminPossiblePourCaseAvecAltitude(element);
                for (var _a = 0; _a < possibilites.length; _a++) {
                    var possibilite = possibilites[_a];
                    var nextCase = this.nextCaseAvecAltitude({ r: element.r, c: element.c, a: element.a + possibilite });
                    if (nextCase != undefined && !(positionsFuturesObjet[nextCase.r + "-" + nextCase.c + "-" + nextCase.a])) {
                        positionsFutures.push(nextCase);
                        positionsFuturesObjet[nextCase.r + "-" + nextCase.c + "-" + nextCase.a] = true;
                    }
                }
            }
            tableau = positionsFutures;
            console.log(tableau.length);
            for (var _b = 0; _b < tableau.length; _b++) {
                var position = tableau[_b];
                this.matrice[i][position.r][position.c][position.a] = true;
            }
        }
    };
    Loons.prototype.dynamicProgrammingSolve = function () {
    };
    return Loons;
})(BaseSolver_1.solver.BaseSolver);
var Case = (function () {
    function Case() {
    }
    return Case;
})();
var CaseAvecAltitude = (function () {
    function CaseAvecAltitude() {
    }
    return CaseAvecAltitude;
})();
var Chemin = (function () {
    function Chemin() {
    }
    return Chemin;
})();
var Balloon = (function () {
    function Balloon() {
        this.isDead = false;
        this.isStarted = false;
    }
    Balloon.prototype.changeAltitude = function (value, loon) {
        this.changeHistory.push(value);
        this.altitude += value;
        if (value > 0) {
            this.isStarted = true;
        }
        this.currentCase = this.nextCase(loon);
    };
    Balloon.prototype.nextCase = function (loon) {
        if (this.isStarted && (this.isDead || !loon.map[this.altitude - 1] || !loon.map[this.altitude - 1][this.currentCase.r])) {
            this.isDead = true;
            return;
        }
        if (this.altitude - 1 < 0) {
            return this.currentCase;
        }
        var leVent = loon.map[this.altitude - 1][this.currentCase.r][this.currentCase.c];
        var retour = {
            r: this.currentCase.r + leVent.vr,
            c: ((this.currentCase.c + leVent.vc) + loon.C) % loon.C
        };
        if (retour.r < 0 || retour.r > loon.R - 1) {
            this.isDead = true;
            return undefined;
        }
        return retour;
    };
    return Balloon;
})();
new Loons('practice');
