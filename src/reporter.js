var fs = require("fs");
var Q = require("q");
var debug = require('debug');
var log = debug('app:log');
log.log = console.log.bind(console);
var Workbook = require('xlsx-workbook').Workbook;
var Reporter = {};

module['exports'] = Reporter;

Reporter.createExcelReport = function(filename, featureItems) {
    var deferred = Q.defer();

    log('createExcelReport "%s"', filename);
    var workbook = new Workbook();
    var sheet1 = workbook.add("Features");

    sheet1[0][0] = "365admin";
    // new in b
    var row = 1;
    sheet1[row][0] = "ID";
    sheet1[row][1] = "Title";
    sheet1[row][2] = "Recently Updated";
    sheet1[row][3] = "Recently Added";
    sheet1[row][4] = "More info";
    sheet1[row][5] = "Description";
    row++;

    featureItems.forEach(function(item) {
        sheet1[row][0] = item.id;
        sheet1[row][1] = item.text;
        sheet1[row][2] = item.recentlyUpdated;
        sheet1[row][3] = item.recentlyAdded;
        sheet1[row][4] = item.moreInfo;
        sheet1[row][5] = item.body;
        row++;
    });

    workbook.save(filename);
    deferred.resolve(workbook);

    return deferred.promise;

};