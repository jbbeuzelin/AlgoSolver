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

	class Writer {
		private buffer: string = '';

		constructor(private fileName: string) {
			// Empty
		}

		writeToBuffer(content: string, disableAutoLineBreak: boolean = false) {
			this.buffer += `${content}${disableAutoLineBreak ? '' : '\n'}`;
		}

		writeFile() {
			fs.writeFile(this.fileName, this.buffer, (err) => {
				if (err) throw err;
				console.log('It\'s saved!');
			});
		}
	}


	export interface IBaseSolver {
		reader : Reader;
	}

	export class BaseSolver implements IBaseSolver {
		public reader : Reader;
		public writer : Writer;

		 constructor(inFile: string, outFile?: string) {
			if (!outFile) {
				outFile = `${inFile}.out`;
				inFile += `.in`;
			}

		 	this.reader = new Reader(inFile);
			this.writer = new Writer(outFile);
		 }
	}
}