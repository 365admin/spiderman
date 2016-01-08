var data = require("./data")
var top100 = require('../lib.js');

describe("Getting details of a restaurant", function () {
    it("should get data on a restaurant ", function () {
        var restaurant = top100.details(data.baseurl, data.details);
        expect(restaurant.name).toBe('Piazza Duomo');
    });
})
