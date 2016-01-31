/// <reference path="../../typings/node/node.d.ts"/>
/// <reference path="../../typings/lodash/lodash.d.ts"/>

'use strict'

import * as fs from 'fs';
import * as _ from 'lodash';
import {solver} from '../../core/BaseSolver';
import {helper} from '../../core/Helper';

class Loons extends solver.BaseSolver {
    public R: number;
    public C: number;
    public A: number;
    
    public L: number;
    public V: number;
    public B: number;
    public T: number;
    
    public rs: number;
    public cs: number;
    public startPoint: Case;
    
    public cibles: Array<Case>;
    public balloons: Array<Balloon>;
    
    public map : {vr: number, vc: number}[][][];
    
    public result : number = 0;
    
	constructor(fileName: string) {
		super(fileName);

		this.readFile();
        
        while(true) {
            this.initBalloons();
            let resulttemp=0;
            //resulttemp = this.randomSolve();
            ////console.log("number death : " +_.countBy(this.balloons, (b)=> b.isDead));
            resulttemp = this.solveBaloonParBaloonParMorceau();
            if(resulttemp > this.result){
                 this.result = resulttemp;
                 this.writeLine();
                 console.log(resulttemp);
                 this.writer.writeFileSyncAndEmptyBuffer();
            }
            break;
        }
	}

	solveCase(testCase: number): void {
		this.writer.writeToBuffer(`Case #${testCase+1}: ${testCase}`);
	}
    
    readFile(): void {
        [this.R, this.C, this.A] = _.map(this.reader.nextLine().split(' '), _.parseInt);
        [this.L, this.V, this.B, this.T] = _.map(this.reader.nextLine().split(' '), _.parseInt);
        [this.rs, this.cs] = _.map(this.reader.nextLine().split(' '), _.parseInt);
        this.startPoint={
          r: this.rs,
          c: this.cs  
        };
        
        this.cibles = [];
        for (let i=0; i<this.L; i++) {
            let line = _.map(this.reader.nextLine().split(' '), _.parseInt);
            this.cibles.push({
                r: line[0],
                c: line[1]
            });
        }
        
        this.map = [];
        for (let i=0; i<this.A; i++) {
            this.map[i] = [];
            for (let j=0; j<this.R; j++) {
                this.map[i][j] = [];
                let line = _.map(this.reader.nextLine().split(' '), _.parseInt);
                
                for (let k=0; k<line.length; k+=2) {
                    this.map[i][j][k/2] = {vr: line[k], vc: line[k+1]};
                }
            }
        }
    }
    
    initBalloons(): void {
        this.balloons = [];
        
        for (let i=0; i<this.B; i++) {
            let balloon = new Balloon();
            balloon.altitude = 0;
            balloon.currentCase = {r: this.rs, c: this.cs};
            balloon.changeHistory = [];
            
            this.balloons.push(balloon);
        }
    }
    
    getScore(): number {
        let score=0;
        for (let j=0; j<this.L; j++) {
            let u = this.cibles[j].r;
            let v = this.cibles[j].c;
            
            for (let i=0; i<this.B; i++){
                if(this.balloons[i].isDead){
                    continue;
                }
                let r = this.balloons[i].currentCase.r;
                let c = this.balloons[i].currentCase.c;
                
                if(Math.pow(r - u, 2) + Math.pow(this.columndist(c, v), 2) <= Math.pow(this.V, 2)) {
                    score += 1;
                    break;
                }
            }
        }
        return score;
    }
    
    getScorePourBallon(unBallon): number {
        let score=0;
        for (let j=0; j<this.L; j++) {
            let u = this.cibles[j].r;
            let v = this.cibles[j].c;
            
            if(unBallon.isDead){
                break;
            }
            let r = unBallon.currentCase.r;
            let c = unBallon.currentCase.c;
            
            if(Math.pow(r - u, 2) + Math.pow(this.columndist(c, v), 2) <= Math.pow(this.V, 2)) {
                score += 1;
            }
        }
        return score;
    }
    
    getScorePourCase(uneCase): any {
        if( uneCase == undefined ){
            return {
                score: 0,
                indexDesCasesTouchees: [] 
            }
        }
        let score=0;
        let casesTouchees = [];
        for (let j=0; j<this.L; j++) {
            let u = this.cibles[j].r;
            let v = this.cibles[j].c;
            
            let r = uneCase.r;
            let c = uneCase.c;
            
            if(Math.pow(r - u, 2) + Math.pow(this.columndist(c, v), 2) <= Math.pow(this.V, 2)) {
                score += 1;
                casesTouchees.push(j);
            }
        }
        return {
            score: score,
            indexDesCasesTouchees: casesTouchees
        };
    }
    
    getScorePourCaseSelonContexte(uneCase,caseCibleToucheeAInstantT,instantDeLaSimulation): number {
        if( uneCase == undefined ){
            return 0;
        }
        let score=0;
        for (let j=0; j<this.L; j++) {
            if(!caseCibleToucheeAInstantT[instantDeLaSimulation] || caseCibleToucheeAInstantT[instantDeLaSimulation][j] == 1){
                continue;
            }
            let u = this.cibles[j].r;
            let v = this.cibles[j].c;
            
            let r = uneCase.r;
            let c = uneCase.c;
            
            if(Math.pow(r - u, 2) + Math.pow(this.columndist(c, v), 2) <= Math.pow(this.V, 2)) {
                score += 1;
            }
        }
        return score;
    }
    
    writeLine() : void {
        for(let i = 0; i < this.T; i++) {
            let result = "";
            for(let j = 0; j < this.B; j++) {
                result += this.balloons[j].changeHistory[i] +" ";
            }
            this.writer.writeToBuffer(`${result}`);
        }
    }
    
    columndist(c1: number,c2: number): number{
        let abs = Math.abs(c1-c2);
        return Math.min(abs, this.C - abs);
    }
    
    randomSolve(): number {
        let score = 0;
        
        for(let i=0; i<this.T; i++){
            for(let j=0; j<this.B; j++) {
                if(!this.balloons[j].isStarted) {
                    let variation = Math.floor((Math.random() * 100)) % 2
                    this.balloons[j].isStarted = !!variation;
                    this.balloons[j].changeAltitude(variation, this);
                }
                else{
                   this.balloons[j].changeAltitude(Math.floor((Math.random() * 100)) % 3 - 1, this); 
                } 
            }
            //console.log("Score "+score);
            score += this.getScore();
        }
        
        return score;
    }
    
    solveBaloonParBaloonParMorceau(): number{
        
        /*console.log(this.obtenirCheminPourCase(this.balloons[0].currentCase,this.balloons[0].altitude,1));
        console.log(this.obtenirCheminPourCase(this.balloons[0].currentCase,this.balloons[0].altitude,2));
        console.log(this.obtenirCheminPourCase(this.balloons[0].currentCase,this.balloons[0].altitude,3));
        console.log(this.obtenirCheminPourCase(this.balloons[0].currentCase,this.balloons[0].altitude,4));
        console.log(this.obtenirCheminPourCase(this.balloons[0].currentCase,this.balloons[0].altitude,5));
        console.log(this.obtenirCheminPourCase(this.balloons[0].currentCase,this.balloons[0].altitude,6));
        console.log(this.obtenirCheminPourCase(this.balloons[0].currentCase,this.balloons[0].altitude,7));
        console.log(this.obtenirCheminPourCase(this.balloons[0].currentCase,this.balloons[0].altitude,8));
        console.log(this.obtenirCheminPourCase(this.balloons[0].currentCase,this.balloons[0].altitude,9));
        console.log(this.obtenirCheminPourCase(this.balloons[0].currentCase,this.balloons[0].altitude,10));
        console.log(this.obtenirCheminPourCase(this.balloons[0].currentCase,this.balloons[0].altitude,13));*/
        //throw new Error();
        let score=0;
        var reinit = () => {
            var caseCibleToucheeAInstantT = [];
            for(let i = 0; i < this.T; i++){
                caseCibleToucheeAInstantT.push([]);
                for(let j=0; j< this.cibles.length; j++){
                    caseCibleToucheeAInstantT[i][j]=0;
                }
            }
            return caseCibleToucheeAInstantT;
        }
        var nb=1;
        for(let i=0; i<this.T/nb; i+=nb){
            var caseCibleToucheeAInstantT = reinit();
            for(let j=0; j < this.B; j++) {
                if(!this.balloons[j].isDead){
                    let chemin = this.obtenirCheminPourCase(this.balloons[j].currentCase,this.balloons[j].altitude,7, i, caseCibleToucheeAInstantT);
                    let parcours = chemin.parcours;
                    
                    let casesFutures = [{case: this.balloons[j].currentCase,altitude: this.balloons[j].altitude}];
                    
                    //console.log("Parcours pour ballon",j,parcours);
                    //console.log("Score pour ballon",j,chemin.score);
                    //console.log("Case initiale",casesFutures);
                    
                    for(let k=0; k < parcours.length; k++ ){
                        let nouvelleCase = this.nextCase(casesFutures[k].case,casesFutures[k].altitude + parcours[k]);
                        casesFutures.push({case: nouvelleCase, altitude: casesFutures[k].altitude + parcours[k] });
                    }
                    
                    casesFutures.shift();
                    
                    //console.log("Cases futures",casesFutures);
                    
                    casesFutures.forEach((element, index) => {
                        let retour = this.getScorePourCase(element.case);
                        let lesIndex = retour.indexDesCasesTouchees;
                        for(let position of lesIndex){
                            if(!caseCibleToucheeAInstantT[i + index]){
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
                    
                    this.balloons[j].changeAltitude(chemin.chemin, this);
                }
            }
            console.log("Score "+score);
            //console.log("Position courante",this.balloons[0].currentCase,this.balloons[0].altitude);
            score += this.getScore();
        }
        return score;
    }
    
    cheminPossiblePourCase(uneCase: Case,uneAltitude: number): Array<number>{
        if(!uneCase){
            return [];
        }
        let cheminsPossibles=[];
        if(uneAltitude > 1 && this.nextCase(uneCase,uneAltitude-1)){
            cheminsPossibles.push(-1);
        }
        if(uneAltitude < this.A-1 && this.nextCase(uneCase,uneAltitude+1)){
            cheminsPossibles.push(1);
        }
        if(this.nextCase(uneCase,uneAltitude+1)){
            cheminsPossibles.push(0);
        }
        return cheminsPossibles;
    }
    
    obtenirCheminPourCase(uneCase: Case,uneAltitude: number, profondeur: number, instantDeLaSimulation: number, caseCibleToucheeAInstantT): Chemin{
        let lesChemins = this.cheminPossiblePourCase(uneCase, uneAltitude);
        if(lesChemins.length == 0){
           return {chemin: 0,score: -1000000, parcours: [0]};
        }
        let lesScores;
        if(profondeur == 1){
            lesScores = _.map(lesChemins,(chemin) => { let futureCase= this.nextCase( uneCase,uneAltitude+chemin ) ; return {parcours:[chemin], chemin: chemin,score: this.getScorePourCaseSelonContexte( futureCase, caseCibleToucheeAInstantT, instantDeLaSimulation  ) });
        }
        else{
            lesScores = _.map(lesChemins,(chemin) => { 
                let appelRecursif = this.obtenirCheminPourCase( this.nextCase( uneCase,uneAltitude+chemin ), uneAltitude+chemin, profondeur-1, instantDeLaSimulation+1, caseCibleToucheeAInstantT );
                return {
            parcours: [chemin, ...appelRecursif.parcours],
            chemin: chemin,
            score: this.getScorePourCaseSelonContexte( this.nextCase( uneCase,uneAltitude+chemin ),caseCibleToucheeAInstantT, instantDeLaSimulation ) + appelRecursif.score;
            }});
        }
        
        let max = _.max(lesScores,(unScore) => unScore.score );
        let tousCeuxQuiOntLeMax = _.filter(lesScores,(unElement) => unElement.score == max.score);
        let indexChoisi = Math.floor(Math.random() * tousCeuxQuiOntLeMax.length);
        return tousCeuxQuiOntLeMax[indexChoisi];
    }
    
    testScore() : void {
        let score = 0;
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
    }
    
    nextCase(uneCase,uneAltitude): Case {
        if(uneAltitude == 0){
            return uneCase;
        }
        let leVent = this.map[uneAltitude - 1][uneCase.r][uneCase.c];
        
        let caseRetour = {
            r: uneCase.r + leVent.vr,
            c: ((uneCase.c + leVent.vc) + this.C) % this.C  
        };
        if(caseRetour.r<0 || caseRetour.r>=this.R){
            return null;
        }
        return caseRetour;
    }
}

class Case {
   public r: number;
   public c: number;
}

class Chemin {
   public chemin: number;
   public score: number;
   public parcours: Array<number>;
}

class Balloon {
    public currentCase: Case;
    public altitude: number;
    public changeHistory: Array<number>;
    public isDead : boolean = false;
    public isStarted : boolean = false; 
    
    public changeAltitude(value, loon: Loons) {
        this.changeHistory.push(value);
        this.altitude += value;
        if(value>0){
            this.isStarted = true;
        }
        this.currentCase = this.nextCase(loon);
    }
    
    nextCase(loon): Case {
        if (this.isStarted && (this.isDead || !loon.map[this.altitude - 1] || !loon.map[this.altitude - 1][this.currentCase.r])) {
            this.isDead = true;
            return;
        }
        if(this.altitude-1 < 0){
            return this.currentCase;
        }
        let leVent = loon.map[this.altitude - 1][this.currentCase.r][this.currentCase.c];
        
        let retour = {
            r: this.currentCase.r + leVent.vr,
            c: ((this.currentCase.c + leVent.vc) + loon.C) % loon.C  
        };
        
        if(retour.r < 0 || retour.r > loon.R-1){
            this.isDead = true;
            return undefined;
        }
        return retour;
    }
   
}

new Loons('practice');
