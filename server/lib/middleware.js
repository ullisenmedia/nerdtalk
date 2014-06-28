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

    queryFilter: function() {

        return function(req, res, next) {

            // Limit
            var limit = req.query.limit ? parseInt(req.query.limit) : DEFAULT_LIMIT;
            limit = limit <= 100 ? limit : 100; // Max limit

            // Skip
            var skip = req.query.skip ? parseInt(req.query.skip) : 0;

            req.filters = {
                limit: limit,
                skip: skip
            };

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