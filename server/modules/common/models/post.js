var Q = require('Q'),
    util = require('util'),
    _ = require('underscore'),
    Model = require('../../../lib/model');
//    mock = require('./posts.mock.json');

var Post = function() {

    Model.call(this, 'Post');
};

util.inherits(Post, Model);

Post.prototype.findBySlug = function(slug) {

    var query = {
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

    return this.find(query);
};

module.exports = new Post();