var Q = require('Q'),
    util = require('util'),
    _ = require('underscore'),
    Model = require('../../../lib/model');

var Post = function() {

    Model.call(this, 'Post');
};

util.inherits(Post, Model);

Post.prototype.findBySlug = function(slug) {

    var deferred = Q.defer();

    var filter = {
        propertyFilter: {
            property: {
                name: 'slug'
            },
            value: {
              stringValue: slug
            },
            operator: 'EQUAL'
        }
    };

    this.find(filter).then(

        function onSuccess(result) {

            var post = {};

            if(result && result[0]) {

                post = result[0];
            }

            deferred.resolve(post);
        },

        function onError(err) {

            deferred.reject(err);
        }
    );

    return deferred.promise;
};

module.exports = new Post();