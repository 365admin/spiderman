var data = require("./data")

var top100 = require('../lib.js');
html = data.index

describe("Getting index of restaurants", function () {
    it("should get link to 10 restaurants "), function () {
        var links = top100.detailsLinks(html);
        expect(links.length).toBe(10);
    }
})
