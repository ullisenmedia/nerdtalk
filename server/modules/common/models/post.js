var Q = require('Q'),
    util = require('util'),
    _ = require('underscore'),
    Model = require('../../../lib/model');

var Post = function () {

    Model.call(this, 'Post');
};

util.inherits(Post, Model);

Post.prototype.find = function (filter, isGQL) {

    if (!filter) {

        var filter = {order: [
            {
                property: {
                    name: 'updated_at'
                },
                direction: 'DESCENDING'
            }
        ]
        };
    }

    return Post.super_.prototype.find(filter, isGQL || false, 'Post');
}
;

Post.prototype.findByTag = function (tag) {

    var filter = {
        propertyFilter: {
            property: {
                name: 'tags'
            },
            value: {
                stringValue: tag
            },
            operator: 'EQUAL'
        },
        order: [
            {
                property: {
                    name: 'updated_at'
                },
                direction: 'DESCENDING'
            }
        ]
    };

    Post.find({filter: filter}).then(

        function onSuccess(posts) {

            return res.json(posts);
        },

        function onError(err) {

            return res.error(err);
        }
    );
};

Post.prototype.findBySlug = function (slug) {

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

    this.find({filter: filter}).then(

        function onSuccess(result) {

            var post = {};

            if (result && result[0]) {

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