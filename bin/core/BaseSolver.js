"use strict";
var fs = require("fs");
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
}());
exports.Reader = Reader;
var Writer = (function () {
    function Writer(fileName) {
        this.fileName = fileName;
        this.buffer = '';
        // Empty
    }
    Writer.prototype.writeToBuffer = function (content, disableAutoLineBreak) {
        if (disableAutoLineBreak === void 0) { disableAutoLineBreak = false; }
        this.buffer += "" + content + (disableAutoLineBreak ? '' : '\n');
    };
    Writer.prototype.writeFile = function () {
        fs.writeFile(this.fileName, this.buffer, function (err) {
            if (err)
                throw err;
            console.log('It\'s saved!');
        });
    };
    return Writer;
}());
exports.Writer = Writer;
var BaseSolver = (function () {
    function BaseSolver(inFile, outFile) {
        if (!outFile) {
            outFile = inFile + ".out";
            inFile += ".in";
        }
        this.reader = new Reader(inFile);
        this.writer = new Writer(outFile);
    }
    return BaseSolver;
}());
exports.BaseSolver = BaseSolver;
