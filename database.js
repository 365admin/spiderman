var fs = require('fs');
var Parse = require('parse/node');
var colors = require('colors');

if (!process.env.SPIDERMANAPPID) {
    console.log("SPIDERMANAPPID missing".red)
    process.exit(1);
}
if (!process.env.SPIDERMANAPPKEY) {
    console.log("SPIDERMANAPPKEY missing".red)
    process.exit(1);
}
var database = {};

module['exports'] = database;

/**
 * Logon to the database then callback, if there is an error during logon,
 * the error message is dumped to console log and the process is terminated 
 * with an exit code 1
 * 
 * @method run
 * @param {String} username User name .
 * @param {String} password Password.
*/
database.run = function (username,password,callback) {
    Parse.initialize(process.env.SPIDERMANAPPID, process.env.SPIDERMANAPPKEY);
    Parse.User.logIn(username,password, {
        success: function (user) {
            console.log("Connected to database as ".green, user.get('username').inverse);
            callback();
        },
        error: function (error) {
            console.log("Cannot logon as ",username, error);
            process.exit(1);
        }
    })
}

/**
 * Tear down the database connection
 * 
 * @method done
*/

database.done = function () {
    console.log("Logging out")
    // Parse.User.logOut().then(function (){
    //       console.log("Logged out")
    //       process.exit(0);
    // })
    console.log("Done")
}

 