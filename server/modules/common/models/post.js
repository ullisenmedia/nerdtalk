var Q = require('Q'),
    util = require('util'),
    _ = require('underscore'),
    Model = require('../../../lib/model');

var Post = function () {

    Model.call(this, 'Post');
};

util.inherits(Post, Model);

Post.prototype.find = function (filter, disableOrder) {

    var deferred = Q.defer();

    var filter = filter || {};

    if (!disableOrder) {

        filter.order = [
            {
                property: {
                    name: 'updated_at'
                },
                direction: 'DESCENDING'
            }
        ];
    }

    Post.super_.prototype.find(filter, false, 'Post').then(

        function onSuccess(result) {

            deferred.resolve({
                posts: result.entities,
                paging: result.paging
            });
        },

        function onError(err) {

            deferred.reject(err);
        }
    );

    return deferred.promise;
}
;

Post.prototype.findByTag = function (tag, dataFilter) {

    var deferred = Q.defer();

    var filter = {
        propertyFilter: {
            property: {
                name: 'tags'
            },
            value: {
                stringValue: tag
            },
            operator: 'EQUAL'
        }
    };

    if (filter) {

        filter = _.extend(dataFilter, filter)
    }

    Post.find({filter: filter}, true).then(

        function onSuccess(result) {

            deferred.resolve({
                posts: result.entities,
                paging: result.paging
            });
        },

        function onError(err) {

            deferred.reject(err);
        }
    );

    return deferred.promise;
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

    this.find({filter: filter}, true).then(

        function onSuccess(result) {

            var data = {entity: {}, paging: result.paging};

            if (result.posts.length > 0) {

                data.post = result.posts[0];
            }

            deferred.resolve(data);
        },

        function onError(err) {

            deferred.reject(err);
        }
    );

    return deferred.promise;
};

module.exports = new Post();