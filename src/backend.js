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
                if (!cache) { return deferred.resolve(null); }
                if (!cache.obj) { return deferred.resolve(null); }
                if (!cache.obj.buffer) { return deferred.resolve(null); }


                var buf = Buffer.from(cache.obj.buffer, 'base64').toString();


                var cacheData = JSON.parse(buf);

                return deferred.resolve(cacheData);
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
    var bufferText = buffer.toString('base64');
    var obj = { buffer: bufferText };
    Stamplay.Object("spiderman_cache")
        .get(query, function(err, res) {
            if (err) return deferred.reject(err);
            if (res.data.length === 0) {
                Stamplay.Object("spiderman_cache")
                    .save({ "tag": tag, "obj": obj },
                        function(err, res) {
                            if (err) return deferred.reject(err);
                            return deferred.resolve("added " + res);
                        });

            } else {
                var updateData = {
                    "obj": obj
                };
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