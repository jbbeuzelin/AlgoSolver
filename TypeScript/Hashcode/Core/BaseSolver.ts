/// <reference path="typings/tsd.d.ts"/>
import * as fs from 'fs';

export module solver {
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
	
	
	export interface IBaseSolver {
		reader : Reader;
	}
	
	export class BaseSolver implements IBaseSolver {
		public reader : Reader;
		
		 constructor(fileName: string) {
		 	this.reader = new Reader(fileName);
		 }
	}
}