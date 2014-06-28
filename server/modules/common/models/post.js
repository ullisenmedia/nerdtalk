var Q = require('Q')
    mock = require('./posts.mock.json');

var Post = function() {

};

Post.prototype = {

    get: function(slug) {

        var deferred = Q.defer();

        var post = _.findWhere(mock, {slug: slug});

        setTimeout(function() {

            deferred.resolve(post || {});

        }, 300);

        return deferred.promise;
    },

    list: function() {

        var deferred = Q.defer();

        setTimeout(function() {

            deferred.resolve(mock);

        }, 300);

        return deferred.promise;
    }
};

module.exports = new Post();