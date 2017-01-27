var _ = require('lodash');
var Q = require('q')
var cheerio = require('cheerio');
var fs = require('fs');
var colors = require('colors');

var lib = {}
module['exports'] = lib;

lib.detailsLinks = function(baseurl, html) {
    console.log("Extracting list of url's ".green)

    var results = []
    $ = cheerio.load(html);

    var x = $(".c-4")
    x.find('a').each(function(x, a, z) {
        var href = a.attribs["href"];
        if (href.startsWith('/list')) {
            results.push({ href: baseurl + href })
        }
    })
    return results;
}

lib.details = function(baseurl, html) {
    console.log("Extracting details ".green)
    var result = {}
    $ = cheerio.load(html);

    result.name = $("h1").first().text();
    result.place = $("h2").first().text();
    result.quote = $(".quote").first().text();
    result.placement = $(".ho").first().text();
    result.images = [];
    $("#rpc").find("li").each(function(x, li, z) {
        var img = $(li).find("img")[0];
        if (img) {
            var src = baseurl + img.attribs["src"]
            result.images.push(src);
        }
    })

    result.body = "";
    result.featureGroups = [];
    var body = $(".feature-group__status-label").each(function(no, elem) {
            //console.log(no,elem.name,$(elem).text())
            //if (elem.name === 'p') {
            result.featureGroups.push($(elem).text());
            //}
        })
        /*
            $("h3:contains('On the pass')")[0].parent.children.forEach(function(elem, no) {
                //console.log(no,elem.name,$(elem).text())
                switch (no) {
                    case 0:
                        result.chefImg = baseurl + elem.attribs["src"]
                        break;
                    case 2:
                        result.onThePass = $(elem).text()
                        break;
                    case 4:
                        result.styleOfFood = $(elem).text()
                        break;
                    case 6:
                        result.standOutDish = $(elem).text()
                        break;
                    case 8:
                        var lis = $(elem).find('li')
                        lis.each(function(no, elem) {
                            switch (no) {
                                case 0:
                                    var lines = $(elem).text().split('+');
                                    result.address = lines[0];
                                    result.phoneNumber = '+' + lines[1];
                                    break;
                                case 1:
                                    result.url = $(elem).text();
                                    break;

                                default:
                                    break;
                            }
                            //console.log(no,elem.name,$(elem).text())
                        })
                        break;
                    default:
                        break;
                }
            })
        */
    return result;
}