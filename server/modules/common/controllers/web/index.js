'use strict'

var util = require('util'),
    path = require('path'),
    _ = require('underscore'),
    moment = require('moment'),
    RSS = require('rss'),
    conf = require('../../../../config'),
    Post = require('../../models/post'),
    lib = require('../../../../lib/util'),
    Controller = require('../../../../lib/controller');

var WebController = function () {

    Controller.call(this);
};

util.inherits(WebController, Controller);

WebController.prototype.initialize = function (app) {

    app.get('/archive', this.middleware, this.archiveHandler);
    app.get('/rss', this.rssHandler);
    app.get('/rss.xml', this.rssHandler);
    app.get('/', this.middleware, this.getHandler);
};

WebController.prototype.middleware = function (req, res, next) {

    if (!req.isCrawler) {

        return res.render('index.angular.html', {title: conf.app.title});

    } else {

        next();
    }
};

WebController.prototype.getHandler = function (req, res) {

    Post.find(req.filters).then(

        function onSuccess(data) {

            return res.render('index', {title: conf.app.title, data: {
                posts: data.posts,
                paging: {next: lib.toPage(req.fullUrl, data.paging.next)}
            }});
        },

        function onError(err) {

            return res.error(err);
        }
    );
};

WebController.prototype.archiveHandler = function (req, res) {

    return res.render('archive', {title: conf.app.title});
};

WebController.prototype.rssHandler = function (req, res) {

    var link = req.protocol + '://' + req.get('host');
    var copyright = util.format('All rights reserved %s, %s', moment().year(), conf.app.author.name);

    var feed = new RSS({
        title: conf.app.title,
        description: conf.app.description,
        feed_url: link + '/rss',
        site_url: link,
        image_url: link + '/image.png',
        author: conf.app.author.name,
        managingEditor: conf.app.author.name,
        webMaster: conf.app.author.name,
        copyright: copyright,
        language: 'en',
        pubDate: moment(),
        ttl: '60'
    });


    Post.find().then(

        function onSuccess(posts) {

            _.each(posts, function (post) {

                feed.item({
                    title: post.title,
                    description: post.summary_html,
                    url: link + '/posts' + post.slug,
                    categories: post.categories,
                    author: post.author.name,
                    date: post.published_at
                });
            });

            res.set('Content-Type', 'text/xml');
            res.send(feed.xml());
        },

        function onError(err) {

            return res.error(err);
        }
    );
};

module.exports = new WebController();