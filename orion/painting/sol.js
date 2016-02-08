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
var test = (function (_super) {
    __extends(test, _super);
    function test(fileName) {
        _super.call(this, fileName);
        this.grid = [];
        this.toWrite = [];
        this.solveTestCase(0);
        this.writer.writeFile();
    }
    test.prototype.solveTestCase = function (testNumber) {
        var _this = this;
        _a = _.map(this.reader.nextLine().split(' '), _.parseInt), this.R = _a[0], this.C = _a[1];
        for (var i = 0; i < this.R; i++) {
            var ligne = _.filter(_.map(this.reader.nextLine().split(""), function (element) {
                if (element == "#")
                    return 1;
                else if (element == ".")
                    return 0;
                //Return -1 pour les caractères de fin de ligne qui seront du coup exclus grâce au _.filter
                return -1;
            }), function (element) {
                return element != -1;
            });
            this.grid.push(ligne);
        }
        //Il faut déjà écrire en entête du fichier le nombre d'opérations, qu'on ne connait pas avant d'avoir résolu !
        this.toWrite.push("0");
        /*
        * Premier algo ou deuxième algo
        */
        //this.jeRemplisCaseParCaseLes1();
        //this.jeMetsDesCarresSansFaireDErreurs();
        this.jeMetsDesCarresEtDesLignesEnPermettantDesErreurs();
        this.nettoyerGrille();
        console.log("Nb opérations", this.toWrite.length - 1);
        //A présent on connait le nombre d'opérations
        this.toWrite[0] = "" + (this.toWrite.length - 1);
        //On n'a plus qu'à écrire dans le fichier
        _.forEach(this.toWrite, function (element) {
            _this.writer.writeToBuffer(element);
        });
        var _a;
    };
    test.prototype.jeRemplisCaseParCaseLes1 = function () {
        for (var i = 0; i < this.R; i++) {
            for (var j = 0; j < this.C; j++) {
                if (this.grid[i][j] == 1) {
                    this.grid[i][j] += 10;
                    this.toWrite.push("PAINT_SQUARE " + i + " " + j + " 0");
                }
            }
        }
        console.log("Nb opérations", this.toWrite.length - 1);
    };
    test.prototype.jeMetsDesCarresSansFaireDErreurs = function () {
        var tailleMaximumCarre = 50;
        for (var k = tailleMaximumCarre; k >= 0; k--) {
            console.log("Analyse pour taille = ", k);
            for (var i = 0; i < this.R; i++) {
                for (var j = 0; j < this.C; j++) {
                    if (this.grid[i][j] == 1) {
                        var ok = true;
                        checkCaree: for (var ii = -k; ii <= k; ii++) {
                            for (var jj = -k; jj <= k; jj++) {
                                var iii = i + ii;
                                var jjj = j + jj;
                                //On s'autorise à repasser sur une case déjà colorée avec le %10. Mais on part toujours d'une case qui n'a jamais été touché grâce au if this.grid[i][j]==1.
                                if (iii < 0 || jjj < 0 || iii >= this.R || jjj >= this.C || this.grid[iii][jjj] % 10 != 1) {
                                    ok = false;
                                    break checkCaree;
                                }
                            }
                        }
                        //Si non ok, cela signifie que le carré n'est pas colorer.
                        if (ok) {
                            //Si les carrés sont de taille intéressante, alors on affiche quel carré on colore. Sinon on s'en branle, il y en a des milliers
                            if (k >= 7) {
                                console.log("On écrit", "PAINT_SQUARE " + i + " " + j + " " + k);
                            }
                            //On colore les cases à colorer
                            for (var ii = -k; ii <= k; ii++) {
                                for (var jj = -k; jj <= k; jj++) {
                                    var iii = i + ii;
                                    var jjj = j + jj;
                                    this.grid[iii][jjj] += 10;
                                }
                            }
                            //On écrit la commande
                            this.toWrite.push("PAINT_SQUARE " + i + " " + j + " " + k);
                        }
                    }
                }
            }
        }
    };
    test.prototype.jeMetsDesCarresEtDesLignesEnPermettantDesErreurs = function () {
        var tailleMaximum = 300;
        for (var k = tailleMaximum; k >= 0; k--) {
            console.log("Analyse pour taille = ", k);
            for (var i = 0; i < this.R; i++) {
                for (var j = 0; j < this.C; j++) {
                    if (k <= 15) {
                        //Carré
                        this.gererCarre(k, i, j);
                    }
                    //Ligne verticale
                    this.gererLigne(k, 0, i, j);
                    //Ligne horizontale
                    this.gererLigne(0, k, i, j);
                }
            }
        }
    };
    test.prototype.gererCarre = function (k, i, j) {
        if (true || this.grid[i][j] == 1) {
            var nb1 = 0;
            var nb0 = 0;
            var ok = true;
            checkCaree: for (var ii = -k; ii <= k; ii++) {
                for (var jj = -k; jj <= k; jj++) {
                    var iii = i + ii;
                    var jjj = j + jj;
                    if (iii < 0 || jjj < 0 || iii >= this.R || jjj >= this.C) {
                        ok = false;
                        break checkCaree;
                    }
                    if (this.grid[iii][jjj] === 1) {
                        nb1++;
                    }
                    if (this.grid[iii][jjj] === 0) {
                        nb0++;
                    }
                }
            }
            //Si non ok, cela signifie que le carré n'est pas colorer.
            if (ok && this.ouiOnColoreCarre(k, nb1, nb0)) {
                //Si les carrés sont de taille intéressante, alors on affiche quel carré on colore. Sinon on s'en branle, il y en a des milliers
                if (k >= 7) {
                    console.log("On écrit", "PAINT_SQUARE " + i + " " + j + " " + k, nb1, nb0);
                }
                this.colorerCarre(k, i, j);
                this.toWrite.push("PAINT_SQUARE " + i + " " + j + " " + k);
            }
        }
    };
    test.prototype.gererLigne = function (ki, kj, i, j) {
        //Il est débile de faire commencer une ligne pile sur une case qui n'est pas à colorer !
        if (this.grid[i][j] % 10 !== 1) {
            return null;
        }
        var ok = true;
        var nb1 = 0;
        var nb0 = 0;
        checkLigne: for (var ii = 0; ii <= ki; ii++) {
            for (var jj = 0; jj <= kj; jj++) {
                var iii = i + ii;
                var jjj = j + jj;
                if (iii < 0 || jjj < 0 || iii >= this.R || jjj >= this.C) {
                    ok = false;
                    break checkLigne;
                }
                if (this.grid[iii][jjj] === 1) {
                    nb1++;
                }
                if (this.grid[iii][jjj] === 0) {
                    nb0++;
                }
            }
        }
        var k = Math.max(ki, kj);
        if (ok && this.ouiOnColoreLigne(k, nb1, nb0)) {
            if (k >= 100) {
                console.log("On écrit", "PAINT_LINE " + i + " " + j + " " + k, nb1, nb0);
            }
            this.colorerLigne(ki, kj, i, j);
            this.toWrite.push("PAINT_LINE " + i + " " + j + " " + (i + ki) + " " + (j + kj));
        }
    };
    test.prototype.ouiOnColoreCarre = function (k, nb1, nb0) {
        //Si ça apporte quelque chose sans plus détruire l'existant, on le fait.
        if (nb0 == 0 && nb1 > 0) {
            return true;
        }
        //Si k=0, on colorie et point barre uniquement si c'est un 1 qu'il faut colorer.
        if (k == 0) {
            return nb1 == 1;
        }
        var premiersK = [1, 2, 3, 5];
        //On a forcément au moins un 0. Donc une fausse note.
        var nbCases = Math.pow(2 * k + 1, 2);
        if (nb1 > nb0 && (nb1 > nbCases * 0.4) && ((k < premiersK.length && nb0 <= premiersK[k]) || (nb0 < (nbCases * 0.08)))) {
            return true;
        }
        return false;
    };
    test.prototype.ouiOnColoreLigne = function (k, nb1, nb0) {
        //Si ça apporte quelque chose sans plus détruire l'existant, on le fait.
        if (nb0 == 0 && nb1 > 0) {
            return true;
        }
        if (k == 0) {
            return nb1 == 1;
        }
        //Si k = 0, c'est déjà traité, et on ne fait qqch que si la case est évidemment à colorer
        //Si k = 1, alors il y a deux cases en question. Franchement, si 
        //Si k = 2, on accepte qu'il y ait une case qui cloche. Mais bien sûr, il faut toujours 
        var premiersK = [0, 0, 0, 1, 1];
        //On a forcément au moins un 0. Donc une fausse note.
        var nbCases = k + 1;
        if (nb1 > nb0 && (nb1 > nbCases * 0.9) && ((k < premiersK.length && nb0 <= premiersK[k]) || (nb0 < (nbCases * 0.00)))) {
            return true;
        }
        return false;
    };
    test.prototype.colorerCarre = function (k, i, j) {
        for (var ii = -k; ii <= k; ii++) {
            for (var jj = -k; jj <= k; jj++) {
                var iii = i + ii;
                var jjj = j + jj;
                this.grid[iii][jjj] += 10;
            }
        }
    };
    //Si ki vaut quelque chose, alors on colore une ligne verticale. Sinon, c'est que l'on colore une ligne horizontale puisque le i est finalement constant.
    test.prototype.colorerLigne = function (ki, kj, i, j) {
        for (var ii = 0; ii <= ki; ii++) {
            for (var jj = 0; jj <= kj; jj++) {
                var iii = i + ii;
                var jjj = j + jj;
                this.grid[iii][jjj] += 10;
            }
        }
    };
    test.prototype.nettoyerGrille = function () {
        for (var i = 0; i < this.R; i++) {
            for (var j = 0; j < this.C; j++) {
                //Il faut effacer car on a coloré alors qu'il aurait fallu laisser des 0.
                if (this.grid[i][j] % 10 == 0 && this.grid[i][j] != 0) {
                    this.toWrite.push("ERASE_CELL " + i + " " + j);
                }
            }
        }
    };
    return test;
})(BaseSolver_1.solver.BaseSolver);
new test('practice');
