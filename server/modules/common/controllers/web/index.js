'use strict'

var util = require('util'),
    config = require('../../../../config'),
    Post = require('../../models/post'),
    Controller = require('../../../../lib/controller');

var WebController = function() {

    Controller.call(this);
};

util.inherits(WebController, Controller);

WebController.prototype.initialize = function(app) {

    app.get('/archive', this.middleware, this.archiveHandler);
    app.get('/rss', this.middleware, this.rssHandler);
    app.get('/', this.middleware, this.getHandler);
};

WebController.prototype.middleware = function(req, res, next) {

    if(!req.isCrawler) {

        return res.render('index.angular.html', {title: config.app.name});

    }  else {

        next();
    }
};

WebController.prototype.getHandler = function(req, res) {

    Post.find().then(

        function onSuccess(posts) {

            return res.render('index', {title: config.app.name, posts: posts});
        },

        function onError(err) {

            return res.error(err);
        }
    );
};

WebController.prototype.archiveHandler = function(req, res) {

    return res.render('archive', {title: config.app.name});
};

WebController.prototype.rssHandler = function(req, res) {

    return res.render('index', {title: config.app.name});
};

module.exports = new WebController();