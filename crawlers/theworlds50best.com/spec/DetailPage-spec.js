var data = require("./data")
var top100 = require('../lib.js');




describe("Getting details of a restaurant", function () {
    it("should get data on a restaurant "), function () {
        var details = top100.details(data.baseurl,data.details);
        expect(details.name).toBe('Piazza Duomos');
    }
})
