'use strict'

var util = require('util'),
//    cons = require('consolidate'),
    config = require('../../../../config'),
    Post = require('../../../common/models/post'),
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

    Post.list().then(

        function onSuccess(posts) {

            return res.json(posts);
        },

        function onError(err) {

            return res.error(err);
        }
    );
};

APIController.prototype.postHandler = function(req, res) {

    Post.get(req.params.slug).then(

        function onSuccess(post) {

            return res.json({post: post});
        },

        function onError(err) {

            return res.error(err);
        }
    );
};

module.exports = new APIController();