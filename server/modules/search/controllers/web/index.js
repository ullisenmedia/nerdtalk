'use strict'

var util = require('util'),
    path = require('path'),
    _ = require('underscore'),
    conf = require('../../../../config'),
    Post = require('../../../common/models/post'),
    lib = require('../../../../lib/util'),
    Controller = require('../../../../lib/controller');

var WebController = function () {

    Controller.call(this);
};

util.inherits(WebController, Controller);

WebController.prototype.initialize = function (app) {

    app.get('/search', this.getHandler);
};

WebController.prototype.middleware = function (req, res, next) {

    if (!req.isCrawler) {

        return res.render('index.angular.html', {title: conf.app.title});

    } else {

        next();
    }
};

WebController.prototype.getHandler = function (req, res) {

    Post.search(req.filters).then(

        function onSuccess(data) {

            return res.render('search', {title: conf.app.title, data: {
                posts: data.posts,
                paging: {next: lib.toPage(req.fullUrl, data.paging.next)}
            }});
        },

        function onError(err) {

            return res.error(err);
        }
    );
};

module.exports = new WebController();