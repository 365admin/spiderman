var Q = require("q");
var debug = require('debug');
var log = debug('app:log');
log.log = console.log.bind(console);

var compare = {};

module['exports'] = compare;

compare.compareItems = function(aItems, bItems) {
    log('comparing');
    var deferred = Q.defer();
    var result = {
        newItems: [],
        changedItems: [],
        removedItems: []
    };

    // new in b
    aItems.forEach(function(aItem) {
        var match = false;
        bItems.forEach(function(bItem) {
            if (aItem.id === bItem.id) {
                match = true;
            }
        });
        if (!match) {
            result.newItems.push(aItem);
        }
    });

    // note in in a 
    bItems.forEach(function(bItem) {
        var match = false;
        aItems.forEach(function(aItem) {
            if (aItem.id === bItem.id) {
                match = true;
            }
        });
        if (!match) {
            result.removedItems.push(bItem);
        }
    });

    // a differ from b
    bItems.forEach(function(bItem) {
        var differ = false;
        aItems.forEach(function(aItem) {
            if (aItem.id === bItem.id) {
                var aJSON = JSON.stringify(aItem);
                var bJSON = JSON.stringify(bItem);
                if (aJSON != bJSON) {
                    differ = true;
                }
            }
        });
        if (differ) {
            result.changedItems.push(bItem);
        }
    });

    deferred.resolve(result);
    return deferred.promise;



}