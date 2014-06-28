'use strict'

var util = require('util'),
    config = require('../../../../config'),
    Controller = require('../../../../lib/controller');

var ROUTE_PREFIX = '/';

var WebController = function() {

    Controller.call(this, ROUTE_PREFIX, true);
};

util.inherits(WebController, Controller);

WebController.prototype.get = function(req, res) {

    var template = 'index.angular.html';

    if(req.isCrawler) {

        template = 'index';
    }

    return res.render(template, {title: config.app.name});
};

module.exports = new WebController();