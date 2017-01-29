var fs = require("fs");
var path = require('path');
var debug = require('debug');
var log = debug('app:log');
var assert = require('assert');
log.log = console.log.bind(console);
var Rimraf = require("rimraf");

global.tempFolder = path.resolve(process.cwd(), "\\temp");


describe('Excel', function() {

    var Excel = require("../src/excel");

    beforeEach(function() {
        log("tempFolder is '%s'", global.tempFolder);
        log("removing '%s'", global.tempFolder);
        Rimraf.sync(global.tempFolder);
        fs.mkdirSync(global.tempFolder);
    });

    it('should create a new document', function() {

        var documentPath = path.resolve(global.tempFolder, "excel1.xslx");
        Excel.createWorkbook(documentPath);
        assert.ok(fs.existsSync(documentPath));

    });

});