var Q = require('Q'),
    moment = require('moment'),
    util = require('util'),
    _ = require('underscore'),
    Model = require('../../../lib/model');

var Post = function () {

    Model.call(this, 'Post');
};

util.inherits(Post, Model);

Post.prototype.search = function (filter) {

    return this.find(filter, true);
};

Post.prototype.find = function (filter, disableOrder, tx) {

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

    Post.super_.prototype.find(filter, false, 'Post', tx).then(

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

    var slugFilter = {
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

    this.find({filter: slugFilter}, true).then(

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

//    return that.find({filter: slugFilter}, true)
//        .then(function (result) {
//
//            var data = {entity: {}, paging: result.paging}
//
//            if (result.posts.length > 0) {
//
//                data.post = result.posts[0];
//
//                var updatedAt = moment(data.post.updated_at);
//
//                var pageFilter = {
//                    compositeFilter: {
//                        operator: 'AND',
//                        filters: [
//                            {
//                                propertyFilter: {
//                                    property: {
//                                        name: 'updated_at'
//                                    },
//                                    value: {
//                                        dateTimeValue: updatedAt
//                                    },
//                                    operator: 'GREATER_THAN'
//                                }
//                            },
//                            {
//                                propertyFilter: {
//                                    property: {
//                                        name: 'updated_at'
//                                    },
//                                    value: {
//                                        dateTimeValue: updatedAt
//                                    },
//                                    operator: 'LESS_THAN'
//                                }
//                            }
//
//                        ]
//                    }
//                };
//
//                return [data, that.find({filter: pageFilter, limit: 4}, false)];
//            }
//
//            return data;
//
//        })
//        .spread(function (post, posts) {
//
//            var nextURL = "";
//            var prevURL = "";
//
//            post.paging = {
//                next: nextURL,
//                previous: prevURL
//            };
//
//            return post;
//        }).fail(function(err) {
//
//            console.log(err);
//        });
};

module.exports = new Post();