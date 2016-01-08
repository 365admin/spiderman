var data = require("./data")

var top100 = require('../lib.js');
html = data.index

describe("Getting index of restaurants", function () {
    it("should get link to 50 restaurants "), function () {
        var links = top100.detailsLinks(html);
        console.log(links)
        expect(links.length).toBe(50);
    }
})
