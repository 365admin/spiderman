
var parse = require('parse/node.js')
var _ = require('lodash');
var Q = require('q')
var cheerio = require('cheerio');
var fs = require('fs');
var colors = require('colors');
var lib = {};


module['exports'] = lib;

lib.detailsLinks = function (html) {
    var results = []
    $ = cheerio.load(html);

    var x = $(".c-4")
    x.each(function (x, c4Div, z) {
        var result = {}
        result.href = $(c4Div).children().first()[0].attribs["href"];
        if (result.href.startsWith('/list')) {
            results.push(result)
        }


    })
    return results;
}

lib.details = function (baseurl,html) {
    var result = {}
    $ = cheerio.load(html);

    result.name =  $("h1").first().text();
    result.place =  $("h2").first().text();
    result.quote =  $(".quote").first().text();
    

    $("h3:contains('On the pass')")[0].parent.children.forEach(function (elem,no) {
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
               result.contact = $(elem).text()
               break;
       
           default:
               break;
       }
       
    })
    


    result.images = [];
    $("li").each(function (x, li, z) {
        var img =  $(li).find("img")[0];
        if (img){
        var src = baseurl + img.attribs["src"]
        result.images.push(src);
        }

    })

    return result;
}
