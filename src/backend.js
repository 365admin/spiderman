var Q = require("q");
var stamplay = require("stamplay");
var Stamplay = new stamplay("365admin", "a3ab2a6ca92239c035b7fa33da2ec969c542188185de3676015f23b75dd04cda");

var backend = {};
module['exports'] = backend;

backend.readCache = function(tag) {
    var deferred = Q.defer();
    var query = {
        tag: tag
    };
    Stamplay.Object("spiderman_cache")
        .get(query, function(err, res) {
            if (err) return deferred.reject(err);
            if (res.data.length === 0) {

                return deferred.resolve(null);
            } else {
                var cache = res.data[0];
                var buffer = cache;
                return deferred.resolve(cache);
            }
        });
    return deferred.promise;
};


backend.updateCache = function(tag, data) {
    var deferred = Q.defer();
    var query = {
        tag: tag
    };
    var buffer = Buffer.from(data);

    Stamplay.Object("spiderman_cache")
        .get(query, function(err, res) {
            if (err) return deferred.reject(err);
            if (res.data.length === 0) {
                Stamplay.Object("spiderman_cache")
                    .save({ "tag": tag, "buffer": buffer.toString('base64') },
                        function(err, res) {
                            if (err) return deferred.reject(err);
                            return deferred.resolve("added " + res);
                        });

            } else {
                var updateData = { "buffer": buffer.toString('base64') };
                var instanceId = res.data[0]._id;
                Stamplay.Object("spiderman_cache")
                    .update(instanceId,
                        updateData,
                        function(err) {
                            if (err) return err;
                            return deferred.resolve("updated");
                        });
            }
        });
    return deferred.promise;
};