var fs = require("fs");
var Q = require("q");
var debug = require('debug');
var log = debug('app:log');
log.log = console.log.bind(console);
var XLSX = require("xlsx");
var Workbook = require('xlsx-workbook').Workbook;
var Excel = {};

module['exports'] = Excel;

Excel.createWorkbook = function(filename) {

    log('Creating workbook "%s"', filename);
    var workbook = new Workbook();
    var sheet1 = workbook.add("Sheet1");

    sheet1[0][0] = "365admin";

    // automatically appends the '.xlsx' extension 
    workbook.save(filename);
    return workbook;
};