import * as base from "../Core/BaseSolver"

var reader = function()
{
	var test = new base.solver.BaseSolver("input.txt", "output.txt");
	console.log(test.reader.getFile());
}

reader();

