var Util = {};

module['exports'] = Util;

Util.office365StatusCode = function(statusWithId) {
    var text = ""
    switch (statusWithId[0]) {
        case "P":
            text = "Previously Released";
            break;
        case "C":
            text = "Cancelled";
            break;
        case "I":
            text = "In Development";
            break;
        case "R":
            text = "Rolling Out";
            break;
        case "L":
            text = "Launched";
            break;
        default:
            break;
    }

    return text;

};