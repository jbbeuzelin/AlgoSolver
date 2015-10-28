declare function require(name:string);
var fs = require('fs');
var _ = require('lodash');

class Rack {
	Id: number;
	Space : Array<number>;
	
	constructor(index : number, space: number){
		this.Id = index;
		this.Space = [];
		for(let i = 0; i < space; i++){
			this.Space.push(0);
		}
	}
}

class Server {
	Id: number;
	Capacity : number; 
	Line : number;
	Group : number;
}

var reader = () : void => {
	fs.readFile('input.txt','utf-8', function (err, data) {
	if (err) throw err;
		 solve(data);
	});
}

var solve = (input: string) : void => {
	console.log(_.words(input));
}

reader();

