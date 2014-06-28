'use strict'

var util = require('util'),
    _ = require('underscore'),
    tweets = require('../../models/tweets'),
    Controller = require('../../lib/controller');

var ROUTE_PREFIX = '/api/tweets/:user';

var APIController = function() {

    Controller.call(this, ROUTE_PREFIX);
};

util.inherits(APIController, Controller);

APIController.prototype.get = function(req, res) {

    tweets.getUserTweets({
        user: req.user,
        limit: req.filters.limit

    }).then(function(data) {

            res.json(data);

    }).fail(function(err) {

            res.error(err);
    });
};

module.exports = new APIController();
