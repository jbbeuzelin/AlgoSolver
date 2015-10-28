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

interface ISlot {
	row: number;
	slot: number;
}

interface IServer {
	index: number;
	size: number;
	capacity: number;
	line?: number;
	groupId?: number;
	slot?: number;
}

interface IRow {
	index: number;
	values: Array<number>;
}

class HashCode2015Solver extends BaseSolver {
	private R: number;
	private S: number;
	private U: number;
	private P: number;
	private M: number;

	private unavailableSlots: Array<ISlot> = [];
	private rows: IRow[] = [];
	private groups: number[][] = [];
	private servers: Array<IServer> = [];

	constructor(fileName: string) {
		super(fileName);
		this.setVars();

		this.solve();
	}

	solve(): void {
		var orderedServers: IServer[] = _.sortBy(this.servers, (s) => -(s.capacity / s.size - 1 / s.size));

		this.initRows();
		var servers = this.placeServersIntoRows(orderedServers);
		var capaRows = _.map(this.rows, (r) => {
			var capa = _.reduce(r.values, (tot, s) => {
				return s !== -1 ? (tot+s) : tot
			}, 0)
			console.log(capa);
		});

		//console.log(this.rows)
		this.createGroups(servers);

		var capaGroups = _.map(this.groups, g => {
			return _.sum(g, s => servers[s].capacity);
		});

		console.log(capaGroups)
		this.calculateResult(servers);

		this.writeFile(servers);
	}

	initRows(): void {
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
	}

	placeServersIntoRows(servers: IServer[]) {
		var placedServers: IServer[] = [];
		let fill = true;
		while(fill) {
			this.rows = _.sortBy(this.rows, (r: IRow) => _.reduce(r.values, (tot, n) => tot+n, 0));
			var serverNotPlaced = true;
			var rowId = 0;
			var serverId = 0;
			while(serverNotPlaced) {
				let serveToPlace = servers[serverId];
				if(!serveToPlace) {
					fill = false;
					break;
				}
				var sizeToFit: number = serveToPlace.size;
				for(var i=0; i<this.S; i++) {
					if(this.rows[rowId].values[i] !== 0) {
						sizeToFit = serveToPlace.size;
					} else {
						sizeToFit--;
					}
					if(sizeToFit === 0) {
						break;
					}
				}
				if(sizeToFit === 0) {

					for(let j = 0; j<serveToPlace.size; j++) {
						this.rows[rowId].values[i-serveToPlace.size+1+j] = serveToPlace.capacity / serveToPlace.size;
					}

					placedServers.push({
						index: serveToPlace.index,
						capacity: serveToPlace.capacity,
						size: serveToPlace.size,
						line: this.rows[rowId].index,
						slot: i-serveToPlace.size+1
					});
					servers.splice(serverId, 1);

					serverNotPlaced = false;
				} else {
					if(rowId+1 < this.rows.length) {
						rowId++;
					} else if(serverId+1 < servers.length) {
						rowId = 0;
						serverId++;
					} else {
						serverNotPlaced = false;
						fill = false;
					}
				}
			}
		}

		return placedServers;
	}

	createGroups(servers: Array<IServer>): void {
		var serversOrderedByCapa = _.sortBy(servers, (s) => - s.capacity);
		for(var k=0; k<this.P; k++) {
			this.groups.push([]);
		}

		for(var curServer of serversOrderedByCapa) {
			var servsOnThislineByGroups = _.map(this.groups, (g,index) => {
				return {index: index, servers: _.reduce(g, (tot,s) => servers[s].line === curServer.line ? tot + 1 : tot, 0)};
			}, 0);

			var candidates = _.filter(servsOnThislineByGroups, s => s.servers == _.min(_.pluck(servsOnThislineByGroups, 'servers')));

			var canditatesCapa = _.map(candidates, c => {
				var capaGroup = 0;
				for(var s of this.groups[c.index]) {
					capaGroup += servers[s].capacity;
				}
				return {index: c.index, capa: capaGroup};
			});

			var finalCandidate = _.first(_.sortBy(canditatesCapa, cc => cc.capa));

			this.groups[finalCandidate.index].push(servers.indexOf(curServer));
			curServer.groupId = finalCandidate.index;
		}
	}

	setVars(): void {
		var line = this.reader.nextLine();

		[this.R, this.S, this.U, this.P, this.M] = _.map(line.split(' '), _.parseInt);

		for(var i=0;i<this.U;i++) {
			let splitedLine = _.map(this.reader.nextLine().split(' '), _.parseInt);

			this.unavailableSlots.push({row: splitedLine[0], slot: splitedLine[1]});
		}

		for(var i=0;i<this.M;i++) {
			let splitedLine = _.map(this.reader.nextLine().split(' '), _.parseInt);

			this.servers.push({index: i, size: splitedLine[0], capacity: splitedLine[1]});
		}
	}

	calculateResult(servers: IServer[]): void {
		var minCapa: number = 1000;

		for(var i=0; i<this.P; i++) {
			var groupServers = _.where(servers, {groupId: i});

			for(var j=0; j<this.R; j++) {
				var capa = _.sum(_.filter(groupServers, s => s.line !== j), s => s.capacity);
				if(capa < minCapa) {
					minCapa = capa;
				}
			}
		}

		console.log(`Capa Min: ${minCapa}`);
	}

	writeFile(servers: IServer[]) {
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
	}
}

new HashCode2015Solver('dc.in');