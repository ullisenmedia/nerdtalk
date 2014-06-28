'use strict'

var util = require('util'),
    config = require('../../config'),
    Controller = require('../../lib/controller');

var ROUTE_PREFIX = '/:user?';

var WebController = function() {

    Controller.call(this, ROUTE_PREFIX, true);
};

util.inherits(WebController, Controller);

WebController.prototype.get = function(req, res) {

    return res.render('index', {title: config.app.name});
};

module.exports = new WebController();