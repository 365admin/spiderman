var data = require("./data")
var top100 = require('../lib.js');


html = data.details

describe("Getting details of a restaurant", function () {
    it("should get data on a restaurant "), function () {
        var details = top100.details(html);
        expect(details.name).toBe('Piazza Duomo');
    }
})
