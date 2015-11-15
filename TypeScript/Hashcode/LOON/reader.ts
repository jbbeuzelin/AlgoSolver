/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/lodash/lodash.d.ts"/>

'use strict'

import * as fs from 'fs';
import * as _ from 'lodash';

class Reader {
	private linesArray: Array<string>;
	private file: string;

	constructor(fileName: string) {
		this.file = fs.readFileSync(fileName, 'utf8');
		this.linesArray = this.file.split('\n');
	}

	nextLine(): string {
		return this.linesArray.shift()
	}

	getFile(): string {
		return this.file;
	}
}

class BaseSolver {
	protected reader: Reader;
	constructor(fileName: string) {
		this.reader = new Reader(fileName);
	}
}

class Case {
	public x: number;
	public y: number;
	public altitude : number;
	public deltaX: number;
	public deltaY: number; 	
	constructor (x: number, y: number, a: number){
		this.x = x;
		this.y = y;
		this.altitude = a;
	}
}

class Plan{
	public nbLignes: number;
	public nbColonnes: number;
	public altitude: number;
	public grid: Array<Array<Case>>;
	
	public constructor(nbLigne: number,nbColonne: number,altitude: number){
		this.nbLignes=nbLigne;
		this.nbColonnes=nbColonne;
		this.altitude=altitude;
		this.grid=new Array<Array<Case>>();
		for(var i=0;i<this.nbLignes;i++){
			this.grid[i]=new Array<Case>();
			for(var j=0;j<this.nbColonnes;j++){
				this.grid[i][j]=new Case(j,i,altitude);
			}
		}
	}

}

class Globe {
	public plans: Array<Plan>; 
	
	constructor(nbLigne: number, nbColonne: number, altitude: number){
		this.plans = new Array<Plan>();
		for(var i = 0; i< altitude; i++){
			this.plans[i] = new Plan(nbLigne, nbColonne, i);
		}
	}	
	
	/*
	* Donnne la prochaine case ou le ballon ira
	*/
	public GetNextStep (c : Case) : Case {
		var nextY = c.y + c.deltaY;
		if(nextY >= this.plans[c.altitude].nbColonnes || nextY < 0) { return null;}
		var nextX = (c.x + c.deltaX);
		nextX = nextX < 0 ? this.plans[c.altitude].nbColonnes + nextX : nextX % this.plans[c.altitude].nbColonnes;
		return this.plans[c.altitude].grid[nextY][nextX];
	}
}


class LoonSolver extends BaseSolver {

	public globe: Globe;
	public nbLignes:number;
	public nbColonnes:number;
	public nbAltitudes:number;
	public targetNB: number;
	public radius: number;
	public ballonNB: number;
	public turnNB: number;
	public startX: number;
	public startY: number;
	public targetCases: Array<Case>;
	
	
	constructor(fileName: string) {
		super(fileName);
		this.setVars();

		this.solve();
	}

	solve(): void {
		
	}


	setVars(): void {
		var line = this.reader.nextLine();
		[this.nbLignes, this.nbColonnes, this.nbAltitudes] = _.map(line.split(' '), _.parseInt);
		this.globe = new Globe(this.nbLignes,this.nbColonnes,this.nbAltitudes);
		
		line = this.reader.nextLine();
		[this.targetNB, this.radius, this.ballonNB, this.turnNB] = _.map(line.split(' '), _.parseInt);
		
		line = this.reader.nextLine();
		[this.startY, this.startX] = _.map(line.split(' '), _.parseInt);
		
		this.targetCases = new Array<Case>();
		for (var index = 0; index < this.targetNB; index++) {
			var line = this.reader.nextLine();
			var x: number;
			var y: number;
			[y, x] = _.map(line.split(' '), _.parseInt);
			
			this.targetCases.push(new Case(x,y,0));
		}
		
		for (var iAltitude = 0; iAltitude < this.nbAltitudes; iAltitude++) {
			for (var iLigne = 0; iLigne < this.nbLignes; iLigne++) {
				line = this.reader.nextLine();
				var coord = _.map(line.split(' '), _.parseInt);
				coord.forEach((element, index) => {
					// true alors index impaire
					if(index % 2) {
						this.globe.plans[iAltitude].grid[iLigne][(index - 1) /2].deltaX = element;
					}
					else {
						this.globe.plans[iAltitude].grid[iLigne][(index) /2].deltaY = element;
					}
				});
			}		
		}
		 
		console.log(this.globe.plans[0].grid[2][0]);
		var test = this.globe.GetNextStep(this.globe.plans[0].grid[2][0]);
		console.log(test);
		/*[this.R, this.S, this.U, this.P, this.M] = _.map(line.split(' '), _.parseInt);

		for(var i=0;i<this.U;i++) {
			let splitedLine = _.map(this.reader.nextLine().split(' '), _.parseInt);

			this.unavailableSlots.push({row: splitedLine[0], slot: splitedLine[1]});
		}

		for(var i=0;i<this.M;i++) {
			let splitedLine = _.map(this.reader.nextLine().split(' '), _.parseInt);

			this.servers.push({index: i, size: splitedLine[0], capacity: splitedLine[1]});
		}*/
	}
	
	/*initRows(): void {
		this.rows = [];
		for(let i=0; i<this.R; i++) {
			let unavailableSlotsForThisRow = _.pluck(_.where(this.unavailableSlots, {row: i}), 'slot');

			let row = [];
			for(let j=0; j<this.S; j++) {
				if(unavailableSlotsForThisRow.indexOf(j) > -1) {
					row.push(-1);
				} else {
					row.push(0);
				}
			}

			this.rows.push({index: i, values: row});
		}
	}*/






	/*writeFile(servers: IServer[]) {
		var content: string = '';

		for(var i=0; i<this.M; i++) {
			var server = _.findWhere(servers, {index: i});
			if(server) {
				content += `${server.line} ${server.slot} ${server.groupId}\n`;
			} else {
				content += 'x\n';
			}
		}

		fs.writeFile('dc.out', content, (err) => {
			if (err) throw err;
			console.log('It\'s saved!');
		});
	}*/
}

new LoonSolver('dc.in');