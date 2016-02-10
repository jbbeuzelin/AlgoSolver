#! /usr/bin/env node

var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

console.log('Bienvenue sur le Peach solver :)');

var userArgs = process.argv.slice(2);
var command = userArgs[0];
var dir = 'orion';

switch(command) {
	case 'create':
		create();
	break;
	case 'help':
		help();
	break;
	case 'run':
		run();
	break;
}

function create() {
	var projectName = userArgs[1].toLowerCase();

	if(!projectName) {
		console.log('Il faut préciser un nom de projet lors du "create"');
		return;
	}

	// Dir checks / creations first
	if (!fs.existsSync(path.join('../', dir))){
		fs.mkdirSync(path.join('../', dir));
	}
	if (!fs.existsSync(path.join('../', dir, projectName))){
		fs.mkdirSync(path.join('../', dir, projectName));
	} else {
		console.log('Projet déjà existant.');
		return;
	}

	// Sol.ts
	fs.readFile('./base/sol.ts', 'utf8', function (err, data) {
		if (err) {
			return console.log(err);
		}
		var result = data.replace(/MYCLASS/g, projectName.charAt(0).toUpperCase() + projectName.slice(1));

		var destPath = path.join(__dirname, '../', dir, projectName, 'sol.ts');
		fs.writeFile(destPath, result, function (err) {
			if (err) return console.log(err);
		});
	});

	// tsconfig.json
	fs.readFile('./base/tsconfig.json', 'utf8', function (err, data) {
		if (err) {
			return console.log(err);
		}

		var destPath = path.join(__dirname, '../', dir, projectName, 'tsconfig.json');
		fs.writeFile(destPath, data, function (err) {
			if (err) return console.log(err);
		});
	});

	// practice.in
	fs.readFile('./base/practice.in', 'utf8', function (err, data) {
		if (err) {
			return console.log(err);
		}

		var destPath = path.join(__dirname, '../', dir, projectName, 'practice.in');
		fs.writeFile(destPath, data, function (err) {
			if (err) return console.log(err);
		});
	});
	
	if (!fs.existsSync(path.join('../', dir, projectName, '.vscode'))){
			fs.mkdirSync(path.join('../', dir, projectName, '.vscode'));
	}
	
	// tasks.json
	fs.readFile('./base/.vscode/tasks.json', 'utf8', function (err, data) {
		if (err) {
			return console.log(err);
		}

		var destPath = path.join(__dirname, '../', dir, projectName, '.vscode/tasks.json');
		fs.writeFile(destPath, data, function (err) {
			if (err) return console.log(err);
		});
	});
	
	// launch.json
	fs.readFile('./base/.vscode/launch.json', 'utf8', function (err, data) {
		if (err) {
			return console.log(err);
		}

		var destPath = path.join(__dirname, '../', dir, projectName, '.vscode/launch.json');
		fs.writeFile(destPath, data, function (err) {
			if (err) return console.log(err);
		});
	});
}

function help() {
	console.log('Aide à écrire ici !! Oui tout ca est artisanal ;)');
}

function run() {
	var projectName = userArgs[1].toLowerCase();
	exec('cd ' + path.join(dir, projectName) + ' && tsc');
}