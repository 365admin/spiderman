
var parse = require('parse/node.js')
var _ = require('lodash');
var Q = require('q')
var store = {};
module['exports'] = store;

store.getContactRight = function (name,$){
    var deferred = Q.defer();
    var a = $("H4:contains('" + name + "')")
    a.map(function (i, v) {
        var x = $(this.parent).find(".TellusProductContacts-item-right");
        var data = ""
        x.map(function (i,div)
        {
            child = $(this);
            console.log(name,child.text().inverse);
            data += child.text();
        })
        return data;    
        deferred.resolve();
    });
    return deferred;
}


store.getProductText = function($){
    var a = $(".ProductTextList").html()
    console.log(a.inverse)
    return a   
}
