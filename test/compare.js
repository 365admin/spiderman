var Q = require("q");
var debug = require('debug');
var log = debug('app:log');
var assert = require('assert');
log.log = console.log.bind(console);

var Comparer = require("../src/comparer.js");
var oldItems = require("./fasttrack.microsoft.com-roadmap.old.json");
var newItems = require("./fasttrack.microsoft.com-roadmap.new.json");


describe('Compare', function() {

    describe('expect to have data', function() {
        it('should return true if we have old items', function() {
            assert.ok(oldItems);
        });
        it('should return true if we have old featureItems', function() {
            assert.ok(oldItems.featureItems);
        });
        it('should return true if we have new items', function() {
            assert.ok(newItems);
        });
        it('should return true if we have new featureItems', function() {
            assert.ok(newItems.featureItems);
        });
    });

    describe('expect to have some differences', function(done) {
        Comparer.compareItems(oldItems.featureItems, newItems.featureItems)
            .then(function(result) {
                it('should return a result object', function() {
                    assert.ok(result);
                });
                it('should return a collection of new items', function() {
                    assert.ok(result.newItems);
                });
                it('should return a collection of removed items', function() {
                    assert.ok(result.removedItems);
                });
                it('should return a collection of changed items.', function() {
                    assert.ok(result.changedItems);
                });

                it('should have 2 changed items', function() {
                    assert.equal(result.changedItems.length, 2);
                });
                it('should have 1 removed items', function() {
                    assert.equal(result.removedItems.length, 1);
                });
                it('should have 1 new items', function() {
                    assert.equal(result.newItems.length, 1);
                });

                done();
            }, function(err) {
                done(err);
            });

    });

});