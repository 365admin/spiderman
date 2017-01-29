var fs = require("fs");
var Q = require("q");
var debug = require('debug');
var Util = require('./util');
var log = debug('app:log');
log.log = console.log.bind(console);
var Excel = require('exceljs');

var Reporter = {};

module['exports'] = Reporter;

Reporter.createExcelReport = function(filename, featureItems) {
    var deferred = Q.defer();

    log('createExcelReport "%s"', filename);
    var workbook = new Excel.Workbook();

    var sheet1 = workbook.addWorksheet('Features');
    sheet1.columns = [
        { header: 'Id', key: 'id', width: 10 },
        { header: 'Title', key: 'text', width: 32 },
        { header: 'Status', key: 'status', width: 12 },
        { header: 'Tags', key: 'tags', width: 20 },
        { header: 'Recently Updated', key: 'recentlyUpdated', width: 12 },
        { header: 'Recently Added', key: 'recentlyAdded', width: 12 },
        { header: 'More info', key: 'moreInfo', width: 32 },
        { header: 'Description', key: 'body', width: 32 }
    ];

    function trimBody(t) {
        if (!t) return t;
        t = t.replace("\n", "");
        t = t.trim();
        return t;
    }
    featureItems.forEach(function(item) {
        sheet1.addRow({
            id: item.id,
            text: item.text,
            status: Util.office365StatusCode(item.statusWithId),
            tags: item.tags.join(","),
            recentlyUpdated: item.recentlyUpdated,
            recentlyAdded: item.recentlyAdded,
            moreInfo: item.moreInfo ? item.moreInfo : "",
            body: trimBody(item.body)

        });

    });

    workbook.xlsx.writeFile(filename).then(
        function() {
            deferred.resolve(workbook);
        },
        function(err) {
            deferred.reject(err);
        }
    );


    return deferred.promise;
};