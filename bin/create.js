#! /usr/bin/env node

var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

console.log('Bienvenue sur le Peach solver :)');

var userArgs = process.argv.slice(2);
var command = userArgs[0];
var ALGO_PROJECT_DIRECTORY = 'MyAlgoProject';

switch(command) {
	case 'create':
		create();
	break;
	case 'help':
		help();
	break;
	default:
	console.log("You need to specify your command. You want to solver create / solver help / solver run ?");
}

function create() {
	var projectName = userArgs[1].toLowerCase();

	if(!projectName) {
		console.log('Il faut préciser un nom de projet lors du "create"');
		return;
	}

	// Dir checks / creations first
	var isAlgoProjectDirectoryExist = fs.existsSync(GetProjectDirectoryPath());
	if (!isAlgoProjectDirectoryExist) {
		fs.mkdirSync(GetProjectDirectoryPath());
	}
	var newAlgoProjectDirectoryPath = path.join(GetProjectDirectoryPath(), projectName);

	function copyFile(fromExtension, toExtension) {
		var fromTsconfigPath = path.join(__dirname, fromExtension);
		var toTsconfigPath = path.join(newAlgoProjectDirectoryPath, toExtension);

		fs.readFile(fromTsconfigPath, 'utf8', function (err, data) {
			if (err) {
				return console.log(err);
			}

			var destPath = path.join(toTsconfigPath);
			fs.writeFile(destPath, data, function (err) {
				if (err) return console.log(err);
			});
		});
	}

	var isnewAlgoProjectDirectoryExist = fs.existsSync(newAlgoProjectDirectoryPath);
	if (isnewAlgoProjectDirectoryExist) {
		console.log('Projet déjà existant.');
		return;
	} 

	fs.mkdirSync(newAlgoProjectDirectoryPath);

	// Sol.ts
	var solutionPath = path.join(__dirname, 'base/sol.ts');
	fs.readFile(solutionPath, 'utf8', function (err, data) {
		if (err) {
			return console.log(err);
		}
		var result = data.replace(/MYCLASS/g, projectName.charAt(0).toUpperCase() + projectName.slice(1));

		var destPath = path.join(newAlgoProjectDirectoryPath, 'sol.ts');
		fs.writeFile(destPath, result, function (err) {
			if (err) return console.log(err);
		});
	});

	// practice.in
	copyFile('base/practice.in', 'practice.in');

	// tsconfig.json
	copyFile('base/tsconfig.json', 'tsconfig.json');

	// webpack.config.js
	copyFile('base/webpack.config.js', 'webpack.config.js');
	
	var vscodePath = path.join(newAlgoProjectDirectoryPath, '.vscode');
	if (!fs.existsSync(vscodePath)) {
		fs.mkdirSync(vscodePath);
	}
	
	// tasks.json
	copyFile('base/.vscode/tasks.json', '.vscode/tasks.json');
	
	// launch.json
	copyFile('./base/.vscode/launch.json', '.vscode/launch.json');
}

function help() {
	console.log('Aide à écrire ici !! Oui tout ca est artisanal ;)');
}

function GetProjectDirectoryPath() {
	return path.join(__dirname, '..', ALGO_PROJECT_DIRECTORY);
}
