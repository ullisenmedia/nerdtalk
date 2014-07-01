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

    app.get('/api/tags/:tag', this.middleware, this.tagHandler);;
};

APIController.prototype.middleware = function(req, res, next) {

    if(!req.params.slug) {

        return res.status(405).send('Invalid request');
    }

    next();
};

APIController.prototype.tagHandler = function(req, res) {

    Post.findByTag(req.params.tag, req.filter).then(

        function onSuccess(posts) {

            return res.json(posts);
        },

        function onError(err) {

            return res.error(err);
        }
    );
};

module.exports = new APIController();