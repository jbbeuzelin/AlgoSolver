/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/lodash/lodash.d.ts"/>
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fs = require('fs');
var _ = require('lodash');
var Reader = (function () {
    function Reader(fileName) {
        this.file = fs.readFileSync(fileName, 'utf8');
        this.linesArray = this.file.split('\n');
    }
    Reader.prototype.nextLine = function () {
        return this.linesArray.shift();
    };
    Reader.prototype.getFile = function () {
        return this.file;
    };
    return Reader;
})();
var BaseSolver = (function () {
    function BaseSolver(fileName) {
        this.reader = new Reader(fileName);
    }
    return BaseSolver;
})();
var HashCode2015Solver = (function (_super) {
    __extends(HashCode2015Solver, _super);
    function HashCode2015Solver(fileName) {
        _super.call(this, fileName);
        this.unavailableSlots = [];
        this.rows = [];
        this.groups = [];
        this.servers = [];
        this.setVars();
        this.solve();
    }
    HashCode2015Solver.prototype.solve = function () {
        var orderedServers = _.sortBy(this.servers, function (s) { return -(s.capacity / s.size - 1 / s.size); });
        this.initRows();
        var servers = this.placeServersIntoRows(orderedServers);
        var capaRows = _.map(this.rows, function (r) {
            var capa = _.reduce(r.values, function (tot, s) {
                return s !== -1 ? (tot + s) : tot;
            }, 0);
            console.log(capa);
        });
        //console.log(this.rows)
        this.createGroups(servers);
        var capaGroups = _.map(this.groups, function (g) {
            return _.sum(g, function (s) { return servers[s].capacity; });
        });
        console.log(capaGroups);
        this.calculateResult(servers);
        this.writeFile(servers);
    };
    HashCode2015Solver.prototype.initRows = function () {
        this.rows = [];
        for (var i = 0; i < this.R; i++) {
            var unavailableSlotsForThisRow = _.pluck(_.where(this.unavailableSlots, { row: i }), 'slot');
            var row = [];
            for (var j = 0; j < this.S; j++) {
                if (unavailableSlotsForThisRow.indexOf(j) > -1) {
                    row.push(-1);
                }
                else {
                    row.push(0);
                }
            }
            this.rows.push({ index: i, values: row });
        }
    };
    HashCode2015Solver.prototype.placeServersIntoRows = function (servers) {
        var placedServers = [];
        var fill = true;
        while (fill) {
            this.rows = _.sortBy(this.rows, function (r) { return _.reduce(r.values, function (tot, n) { return tot + n; }, 0); });
            var serverNotPlaced = true;
            var rowId = 0;
            var serverId = 0;
            while (serverNotPlaced) {
                var serveToPlace = servers[serverId];
                if (!serveToPlace) {
                    fill = false;
                    break;
                }
                var sizeToFit = serveToPlace.size;
                for (var i = 0; i < this.S; i++) {
                    if (this.rows[rowId].values[i] !== 0) {
                        sizeToFit = serveToPlace.size;
                    }
                    else {
                        sizeToFit--;
                    }
                    if (sizeToFit === 0) {
                        break;
                    }
                }
                if (sizeToFit === 0) {
                    for (var j = 0; j < serveToPlace.size; j++) {
                        this.rows[rowId].values[i + j] = serveToPlace.capacity / serveToPlace.size;
                    }
                    placedServers.push({
                        index: serveToPlace.index,
                        capacity: serveToPlace.capacity,
                        size: serveToPlace.size,
                        line: this.rows[rowId].index,
                        slot: i
                    });
                    servers.splice(serverId, 1);
                    serverNotPlaced = false;
                }
                else {
                    if (rowId + 1 < this.rows.length) {
                        rowId++;
                    }
                    else if (serverId + 1 < servers.length) {
                        serverId++;
                    }
                    else {
                        serverNotPlaced = false;
                        fill = false;
                    }
                }
            }
        }
        return placedServers;
    };
    HashCode2015Solver.prototype.createGroups = function (servers) {
        var _this = this;
        var serversOrderedByCapa = _.sortBy(servers, function (s) { return -s.capacity; });
        for (var k = 0; k < this.P; k++) {
            this.groups.push([]);
        }
        for (var _i = 0; _i < serversOrderedByCapa.length; _i++) {
            var curServer = serversOrderedByCapa[_i];
            var servsOnThislineByGroups = _.map(this.groups, function (g, index) {
                return { index: index, servers: _.reduce(g, function (tot, s) { return servers[s].line === curServer.line ? tot + 1 : tot; }, 0) };
            }, 0);
            var candidates = _.filter(servsOnThislineByGroups, function (s) { return s.servers == _.min(_.pluck(servsOnThislineByGroups, 'servers')); });
            var canditatesCapa = _.map(candidates, function (c) {
                var capaGroup = 0;
                for (var _i = 0, _a = _this.groups[c.index]; _i < _a.length; _i++) {
                    var s = _a[_i];
                    capaGroup += servers[s].capacity;
                }
                return { index: c.index, capa: capaGroup };
            });
            var finalCandidate = _.first(_.sortBy(canditatesCapa, function (cc) { return cc.capa; }));
            this.groups[finalCandidate.index].push(servers.indexOf(curServer));
            curServer.groupId = finalCandidate.index;
        }
    };
    HashCode2015Solver.prototype.setVars = function () {
        var line = this.reader.nextLine();
        _a = _.map(line.split(' '), _.parseInt), this.R = _a[0], this.S = _a[1], this.U = _a[2], this.P = _a[3], this.M = _a[4];
        for (var i = 0; i < this.U; i++) {
            var splitedLine = _.map(this.reader.nextLine().split(' '), _.parseInt);
            this.unavailableSlots.push({ row: splitedLine[0], slot: splitedLine[1] });
        }
        for (var i = 0; i < this.M; i++) {
            var splitedLine = _.map(this.reader.nextLine().split(' '), _.parseInt);
            this.servers.push({ index: i, size: splitedLine[0], capacity: splitedLine[1] });
        }
        var _a;
    };
    HashCode2015Solver.prototype.calculateResult = function (servers) {
        var minCapa = 1000;
        for (var i = 0; i < this.P; i++) {
            var groupServers = _.where(servers, { groupId: i });
            for (var j = 0; j < this.R; j++) {
                var capa = _.sum(_.filter(groupServers, function (s) { return s.line !== j; }), function (s) { return s.capacity; });
                if (capa < minCapa) {
                    minCapa = capa;
                }
            }
        }
        console.log("Capa Min: " + minCapa);
    };
    HashCode2015Solver.prototype.writeFile = function (servers) {
        var content = '';
        for (var i = 0; i < this.M; i++) {
            var server = _.findWhere(servers, { index: i });
            if (server) {
                content += server.line + " " + server.slot + " " + server.groupId + "\n";
            }
            else {
                content += 'x\n';
            }
        }
        fs.writeFile('dc.out', content, function (err) {
            if (err)
                throw err;
            console.log('It\'s saved!');
        });
    };
    return HashCode2015Solver;
})(BaseSolver);
new HashCode2015Solver('dc.in');
