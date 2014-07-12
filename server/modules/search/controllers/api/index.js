'use strict'

var util = require('util'),
    lib = require('../../../../lib/util'),
    config = require('../../../../config'),
    Post = require('../../../common/models/post'),
    datastore = require('../../../../lib/datastore'),
    Controller = require('../../../../lib/controller');

var APIController = function() {

    Controller.call(this);
};

util.inherits(APIController, Controller);

APIController.prototype.initialize = function(app) {

    app.get('/api/search', this.getHandler);
};

APIController.prototype.middleware = function(req, res, next) {

    if(!req.q) {

        return res.status(200).send({posts: []});
    }

    next();
};

APIController.prototype.getHandler = function(req, res) {

    Post.search(req.filters).then(

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

module.exports = new APIController();