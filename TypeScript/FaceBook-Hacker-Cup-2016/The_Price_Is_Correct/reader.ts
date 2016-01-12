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


class PriceIsCorrect extends BaseSolver {

    public TurnNumber: number;
    public Lines : Array<String>;	
	
	constructor(fileName: string) {
        console.time("Resolution");
        //this.writeExample();
        //console.log("the price is correct resolution");
		super(fileName);
        
        this.TurnNumber = _.parseInt(this.reader.nextLine());
        //console.log("Turn number : " +this.TurnNumber);
        
        this.Lines = new Array<String>();
        
        for(var i = 0; i < this.TurnNumber; i++){
            let possibility = this.solve();
            this.Lines[i] = "Case #" + ( i + 1 ) +": "+ possibility;
        }
        
        console.timeEnd("Resolution");
        this.writeFile();
	}

	solve(): number {
		let NumberPrice: number;
        let MaxPrice: number;
        let PriceArray : Array<number>;
        let Possibility : number = 0;
        let minValue : number = 0;
        let indexForbidden : Array<boolean>;
        
        var line = () => this.reader.nextLine();
        [NumberPrice, MaxPrice] = _.map(line().split(' '), _.parseInt);
        PriceArray = _.map(line().split(' '), _.parseInt);
        
        indexForbidden = new Array<boolean>();
        for(let i : number = 0; i < NumberPrice; i++)
        {
            indexForbidden[i] = false;
        }
        
        minValue = _.min(PriceArray);
        //console.log(minValue);
        
        // On fait un boucle des sommes possibles d'abord 1 par 1, puis 2 par 2, etc 
        for(var i = 1; i <= NumberPrice ; i++ )
        {           
            if(minValue * i > MaxPrice)
            {
                break;
            }
            
            let StartIndex : number = 0;
            var minValueSum = Math.round(MaxPrice / i );
            //console.log("min value sum : "+minValueSum);
            
            if(minValueSum < minValue)
            {
                break;
            }
            
            
            while (StartIndex + i -1 < NumberPrice) {
                if(indexForbidden[StartIndex +1 ]){
                    indexForbidden[StartIndex] = true;
                    StartIndex++;
                }
                else if(indexForbidden[StartIndex])
                {
                    StartIndex++;
                }
                else
                {
                    var Total  = 0;
                    var limit  = StartIndex + i - 1;
                    var stop = false;
                    
                    
                    for(var y = StartIndex; y <= limit; y++){
                        
                        // if(price > MaxPrice)
                        // {
                        //     stop = true;
                        //     break;
                        // }              
                        Total += PriceArray[y]; ;
                        
                        if(Total > MaxPrice)
                        {
                            indexForbidden[StartIndex] = true;
                            break;
                        }                    
                    }
                    
                    if(Total <= MaxPrice && !stop){
                        Possibility +=1;
                    }
                                    
                    StartIndex++;  
                }
            }
        }
        
        return Possibility;
	}
    
    writeFile() {
		var content: string = "";

		for(var i=0; i < this.Lines.length; i++) {
            content += this.Lines[i] + "\n";
		}

		fs.writeFile('dc.out', content, (err) => {
			if (err) throw err;
			console.log('It\'s saved!');
		});
	}
    
    writeExample(): void {
        let limitTurn : number = 40;
        let limitBox : number = 100000;
        let limitPrice : number = 1000000000;
        
        let result : string = "" +limitBox + " " + limitPrice + "\n";
        for(let i = 0; i < limitBox; i++){ 
            let boxPrice : number = Math.round(Math.random() * limitPrice + 1);
            result += boxPrice +" ";
        };
        result += "\n";
        fs.writeFile('example.out', result, (err) => {
			if (err) throw err;
			console.log('It\'s saved!');
		});
    }
}

new PriceIsCorrect('input.in.test');