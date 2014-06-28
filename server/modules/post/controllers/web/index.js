'use strict'

var util = require('util'),
    cons = require('consolidate'),
    config = require('../../../../config'),
    Post = require('../../../common/models/post'),
    Controller = require('../../../../lib/controller');

var WebController = function() {

    Controller.call(this);
};

util.inherits(WebController, Controller);

WebController.prototype.initialize = function(app) {

    app.get('/posts/:slug', this.middleware, this.getHandler);
};

WebController.prototype.middleware = function(req, res, next) {

    if(!req.isCrawler) {

        cons.swig( __dirname + '/../../../common/views/index.angular.html', {title: config.app.name}, function(err, html) {

            if (err) throw err;

            res.set('Content-Type', 'text/html');

            res.send(html);
        });

    }  else {

        next();
    }
};

WebController.prototype.getHandler = function(req, res) {

    Post.get(req.query.slug).then(

        function onSuccess(post) {

            return res.render('post', {title: config.app.name, posts: post});
        },

        function onError(err) {

            return res.error(err);
        }
    );
};

module.exports = new WebController();