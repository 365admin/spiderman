var Q = require('q')
var cheerio = require('cheerio');
var fs = require('fs');
var colors = require('colors');

var lib = {}
module['exports'] = lib;

lib.details = function(baseurl, html) {
    console.log("Extracting details ".green)
    var result = {}
    $ = cheerio.load(html);

    result.body = "";
    result.featureGroups = [];
    result.featureItems = [];
    $(".feature-group__status-label").each(function(no, elem) {
        result.featureGroups.push($(elem).text());
    })

    $(".feature-item").each(function(no, elem) {
        var item = {}
        item.text = $(elem).find(".feature-item__title-text").first().text();

        item.id = $(elem).attr("id")

        item.recentlyUpdated = $(elem).attr("data-is-recently-updated");
        item.recentlyAdded = $(elem).attr("data-recently-added");
        item.statusWithId = $(elem).find(".feature-item__content").first().attr("id");

        item.tags = [];
        item.body = $(elem).find(".feature-item__description").first().text();
        $(elem).find(".feature-item__tag > a").each(function(no2, elem2) {
            item.tags.push($(elem2).text())
        });
        result.featureItems.push(item);

    })



    return result;
}