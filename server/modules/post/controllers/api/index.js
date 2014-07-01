'use strict'

var util = require('util'),
    config = require('../../../../config'),
    Post = require('../../../common/models/post'),
    lib = require('../../../../lib/util'),
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

    Post.find(req.filters).then(

        function onSuccess(data) {

            return res.json({
                posts: data.posts,
                paging: {next: lib.toPage(req.fullUrl, data.paging.next)}
            });
        },

        function onError(err) {

            return res.error(err);
        }
    );
};

APIController.prototype.postHandler = function(req, res) {

    Post.findBySlug(req.params.slug).then(

        function onSuccess(data) {

            return res.json({
                post: data.post,
                paging: {next: lib.toPage(req.fullUrl,  data.paging.next)}
            });
        },

        function onError(err) {

            return res.error(err);
        }
    );
};

module.exports = new APIController();