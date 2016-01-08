var data = require("./data")

var top100 = require('../lib.js');

describe("Getting index of restaurants", function () {
    it("should get link to 50 restaurants "), function () {
        var links = top100.detailsLinks(data.baseurl,data.index);
        
        expect(links.length).toBe(51);
    }
})
