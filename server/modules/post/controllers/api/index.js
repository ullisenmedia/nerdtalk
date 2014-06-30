'use strict'

var util = require('util'),
    config = require('../../../../config'),
    Post = require('../../../common/models/post'),
    datastore = require('../../../../lib/datastore'),
    Controller = require('../../../../lib/controller');

var APIController = function() {

    Controller.call(this);
};

util.inherits(APIController, Controller);

APIController.prototype.initialize = function(app) {

    app.get('/api/posts', this.getHandler);
    app.get('/api/posts/:slug', this.middleware, this.postHandler);
};

APIController.prototype.middleware = function(req, res, next) {

    if(!req.params.slug) {

        return res.status(405).send('Invalid request');
    }

    next();
};

APIController.prototype.getHandler = function(req, res) {

    var filter = {
        propertyFilter: {
            property: {
                name: 'tags'
            },
            value: {
                stringValue: 'android'
            },
            operator: 'EQUAL'
        }
    };

    Post.find(filter).then(

        function onSuccess(posts) {

            return res.json(posts);
        },

        function onError(err) {

            return res.error(err);
        }
    );
};

APIController.prototype.postHandler = function(req, res) {

    Post.findBySlug(req.params.slug).then(

        function onSuccess(post) {

            return res.json(post);
        },

        function onError(err) {

            return res.error(err);
        }
    );
};

module.exports = new APIController();