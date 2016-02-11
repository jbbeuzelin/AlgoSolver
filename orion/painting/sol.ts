/// <reference path="../../typings/node/node.d.ts"/>
/// <reference path="../../typings/lodash/lodash.d.ts"/>

'use strict'

import * as fs from 'fs';
import * as _ from 'lodash';
import {solver} from '../../core/BaseSolver';
import {helper} from '../../core/Helper';

class test extends solver.BaseSolver {
    public bad: Array<any>;
    public R: number;
    public C: number;
    public grid;
    public toWrite: Array<string>;
    
	constructor(fileName: string) {
		super(fileName);
        
        this.grid = [];
        this.toWrite = [];
        
        this.solveTestCase(0);
                
		this.writer.writeFile();
	}
    
    solveTestCase(testNumber: number): void {
        [this.R,this.C] = _.map(this.reader.nextLine().split(' '),_.parseInt);
        for(let i = 0; i < this.R; i++){
            let ligne = _.filter(_.map(this.reader.nextLine().split(""),element => {
                if(element == "#")
                    return 1;
                else if(element == ".")
                    return 0;
                //Return -1 pour les caractères de fin de ligne qui seront du coup exclus grâce au _.filter
                return -1
            }),element => {
                return element != -1
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
        console.log("Nb opérations",this.toWrite.length-1);
        
        //A présent on connait le nombre d'opérations
        this.toWrite[0] = ""+(this.toWrite.length-1);
        
        //On n'a plus qu'à écrire dans le fichier
        _.forEach(this.toWrite,element => {
            this.writer.writeToBuffer(element);
        });
    }
    
    jeRemplisCaseParCaseLes1(): void{
        for(let i=0; i < this.R; i++){
            for(let j=0; j < this.C; j++){
                if(this.grid[i][j] == 1){
                    this.grid[i][j] += 10;
                    this.toWrite.push("PAINT_SQUARE "+i+" "+j+" 0");
                }
            }
        }
        console.log("Nb opérations",this.toWrite.length-1);
    }
    
   jeMetsDesCarresSansFaireDErreurs(): void{
       let tailleMaximumCarre = 50;
       for(let k=tailleMaximumCarre; k>=0; k--){
           console.log("Analyse pour taille = ",k);
           for(let i=0; i < this.R; i++){
                for(let j=0; j < this.C; j++){
                    if(this.grid[i][j] == 1){
                        let ok = true;
                        checkCaree:
                        for(let ii=-k; ii<=k; ii++){
                            for(let jj=-k; jj<=k; jj++){
                                let iii = i+ii;
                                let jjj = j+jj;
                                
                                //On s'autorise à repasser sur une case déjà colorée avec le %10. Mais on part toujours d'une case qui n'a jamais été touché grâce au if this.grid[i][j]==1.
                                if(iii < 0 || jjj < 0 || iii >= this.R || jjj >= this.C || this.grid[iii][jjj] %10 != 1){
                                    ok = false;
                                    break checkCaree;
                                }
                            }
                        }
                        //Si non ok, cela signifie que le carré n'est pas colorer.
                        if(ok){
                            //Si les carrés sont de taille intéressante, alors on affiche quel carré on colore. Sinon on s'en branle, il y en a des milliers
                            if(k>=7){
                                console.log("On écrit","PAINT_SQUARE "+i+" "+j+" "+k);
                            }
                            
                            //On colore les cases à colorer
                            for(let ii=-k; ii<=k; ii++){
                                for(let jj=-k; jj<=k; jj++){
                                    let iii = i+ii;
                                    let jjj = j+jj;
                                    this.grid[iii][jjj] += 10;
                                }
                            }
                            
                            //On écrit la commande
                            this.toWrite.push("PAINT_SQUARE "+i+" "+j+" "+k);
                        }
                        //Il peut y avoir un carré qui commence à partir d'ici
                    }
                }
            }
       }
    }
    
    jeMetsDesCarresEtDesLignesEnPermettantDesErreurs(): void{
       let tailleMaximum = 300;
       for(let tour=0; tour < 2; tour++){
           for(let k = tailleMaximum; k>=0; k--){
                console.log("Analyse pour taille = ",k);
                for(let i=0; i < this.R; i++){
                        for(let j=0; j < this.C; j++){
                            //On fait un premier tour pour les carrés intéressants.
                            if(k <= 15 && ((tour==0 && k>=6) || tour == 1)){
                                //Carré
                                this.gererCarre(k, i, j);
                            }
                            if(tour>0){
                                //Ligne verticale
                                this.gererLigne(k, 0, i, j);
                                //Ligne horizontale
                                this.gererLigne(0, k, i, j);
                            }
                        }
                }
            }
       }
    }
    
    gererCarre(k, i, j): void{
        if(true || this.grid[i][j] == 1){
            let nb1 = 0;
            let nb0 = 0;
            let ok = true;
            checkCaree:
            for(let ii=-k; ii<=k; ii++){
                for(let jj=-k; jj<=k; jj++){
                    let iii = i+ii;
                    let jjj = j+jj;
                    
                    if(iii < 0 || jjj < 0 || iii >= this.R || jjj >= this.C){
                        ok = false;
                        break checkCaree;
                    }
                    if(this.grid[iii][jjj] === 1){
                        nb1++;
                    }
                    if(this.grid[iii][jjj] === 0){
                        nb0++;
                    }
                }
            }
            //Si non ok, cela signifie que le carré n'est pas colorer.
            if(ok && this.ouiOnColoreCarre(k,nb1,nb0)){
                //Si les carrés sont de taille intéressante, alors on affiche quel carré on colore. Sinon on s'en branle, il y en a des milliers
                if(k >= 7){
                    console.log("On écrit","PAINT_SQUARE "+i+" "+j+" "+k,nb1,nb0);
                }
                this.colorerCarre(k,i,j);
                this.toWrite.push("PAINT_SQUARE "+i+" "+j+" "+k);
            }
        }
    }
    
    gererLigne(ki, kj, i, j): void{
        //Il est débile de faire commencer une ligne pile sur une case qui n'est pas à colorer !
        if(this.grid[i][j] % 10 !== 1){
            return null;
        }
        let ok = true;
        let nb1 = 0;
        let nb0 = 0;
        checkLigne:
        for(let ii=0; ii <= ki; ii++){
            for(let jj=0; jj <= kj; jj++){
                let iii = i+ii;
                let jjj = j+jj;
                if(iii < 0 || jjj < 0 || iii >= this.R || jjj >= this.C){
                    ok = false;
                    break checkLigne;
                }
                if(this.grid[iii][jjj] === 1){
                    nb1++;
                }
                if(this.grid[iii][jjj] === 0){
                    nb0++;
                }
            }
        }
        let k = Math.max(ki,kj);
        if(ok && this.ouiOnColoreLigne(k,nb1,nb0)){
            if(k >= 100){
                console.log("On écrit","PAINT_LINE "+i+" "+j+" "+k,nb1,nb0);
            }
            this.colorerLigne(ki,kj,i,j);
            this.toWrite.push("PAINT_LINE "+i+" "+j+" "+(i+ki)+" "+(j+kj));
        }
    }
    
    ouiOnColoreCarre(k, nb1, nb0): boolean{
        //Si ça apporte quelque chose sans plus détruire l'existant, on le fait.
        if(nb0 == 0 && nb1 > 0){
            return true;
        }
        //Si k=0, on colorie et point barre uniquement si c'est un 1 qu'il faut colorer.
        if(k==0){
            return nb1 == 1;
        }
        let premiersK = [0,0,0,0];
        //On a forcément au moins un 0. Donc une fausse note.
        let nbCases = Math.pow(2 * k +1,2);
        if(nb1 > nb0 && (nb1 > nbCases * 0.7) && ((k < premiersK.length && nb0 <= premiersK[k]) || (nb0 < (nbCases * 0.01) ) )){
            return true;
        }
        return false;
    }
    
    ouiOnColoreLigne(k, nb1, nb0): boolean{
        //Si ça apporte quelque chose sans plus détruire l'existant, on le fait.
        if(nb0 == 0 && nb1 > 0){
            return true;
        }
        if(k == 0){
            return nb1 == 1;
        }
        //Si k = 0, c'est déjà traité, et on ne fait qqch que si la case est évidemment à colorer
        //Si k = 1, alors il y a deux cases en question. Franchement, si 
        //Si k = 2, on accepte qu'il y ait une case qui cloche. Mais bien sûr, il faut toujours 
        let premiersK = [0,0,0,0,0];
        //On a forcément au moins un 0. Donc une fausse note.
        let nbCases = k+1;
        if(nb1 > nb0 && (nb1 > nbCases * 0.7) && ((k < premiersK.length && nb0 <= premiersK[k]) || (nb0 < (nbCases * 0.00) ) )){
            return true;
        }
        return false;
    }
    
    colorerCarre(k, i, j): void{
        for(let ii=-k; ii <= k; ii++){
            for(let jj=-k; jj <= k; jj++){
                let iii = i+ii;
                let jjj = j+jj;
                this.grid[iii][jjj] += 10;
            }
        }
    }
    
    //Si ki vaut quelque chose, alors on colore une ligne verticale. Sinon, c'est que l'on colore une ligne horizontale puisque le i est finalement constant.
    colorerLigne(ki, kj, i, j): void{
        for(let ii=0; ii <= ki; ii++){
            for(let jj=0; jj <= kj; jj++){
                let iii = i+ii;
                let jjj = j+jj;
                this.grid[iii][jjj] += 10;
            }
        }
    }
    
    nettoyerGrille(): void{
        for(let i=0; i < this.R; i++){
            for(let j=0; j < this.C; j++){
                //Il faut effacer car on a coloré alors qu'il aurait fallu laisser des 0.
                if(this.grid[i][j] % 10 == 0 && this.grid[i][j] != 0){
                    this.toWrite.push("ERASE_CELL "+i+" "+j);
                }
            }
        }
    }
}

new test('practice');
