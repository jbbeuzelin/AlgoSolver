var fs = require('fs');
var _ = require('lodash');
var Rack = (function () {
    function Rack(index, space) {
        this.Id = index;
        this.Space = [];
        for (var i = 0; i < space; i++) {
            this.Space.push(0);
        }
    }
    return Rack;
})();
var Server = (function () {
    function Server() {
    }
    return Server;
})();
var reader = function () {
    fs.readFile('input.txt', 'utf-8', function (err, data) {
        if (err)
            throw err;
        solve(data);
    });
};
var solve = function (input) {
    console.log(_.words(input));
};
reader();
