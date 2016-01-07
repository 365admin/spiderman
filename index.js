//var crawler = require("./crawlers/visitcopenhagen")

var lib = require("./crawlers/theworlds50best.com/lib");
var data = require("./crawlers/theworlds50best.com/spec/data");

console.log(lib.details('www.theworlds50best.com',data.details));
process.exit(0)

