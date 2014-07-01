'use strict'

var config = require('../config');

var DEFAULT_LIMIT = 10;

module.exports = {

    notFound: function() {

        return function(req, res) {

            if (req.accepts('html')) {

                res.redirect('/');
                return;
            }

            // respond with json
            if (req.accepts('json')) {

                res.send({ error: 'Not found' });
                return;
            }

            res.type('txt').send('Not found');
        }

    },

    crawlerDetect: function() {

        return function(req, res, next) {

            req.isCrawler = req.query.hasOwnProperty('_escaped_fragment_');

            next();
        }
    },

    queryFilter: function() {

        var MAX_LIMIT = 4;

        return function(req, res, next) {

            // Request url
            req.fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

            // Filters
            req.filters = {};

            // Limit
            var limit = req.query.limit ? parseInt(req.query.limit) : DEFAULT_LIMIT;
            limit = limit <= MAX_LIMIT ? limit : MAX_LIMIT; // Max limit

            req.filters.limit = limit;

            // Offset
            var offset = req.query.offset ? parseInt(req.query.offset) : 0;

            if(offset > 0) {

                req.filters.offset = offset;
            }

            // Next Cursor
            if(req.next) {

                req.filters.startCursor = req.next;
            }

            next();
        };
    },

    cors: function() {

        return function (req, res, next) {

            if (!req.get('Origin')) {
                return next();
            }

            // This is a test app so use "*" here to accept any origin just in case any once to use this from an
            // external application.

            res.set('Access-Control-Allow-Origin', req.headers.origin);
            res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
            res.set('Access-Control-Allow-Credentials', true);
            res.set('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

            if ('OPTIONS' == req.method) {
                return res.send(200);
            }

            next();
        };
    }
};