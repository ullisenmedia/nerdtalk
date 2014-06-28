'use strict'

var Controller = function(route) {

    this.route = route || this.route;
};

Controller.prototype = {

    // Route signature for all route handlers
    route: '/',

    // Controller setup
    initialize: function(app) {

        console.log(this.route);

        app.post(this.route, this.middleware, this.post);
        app.get(this.route, this.middleware, this.get);
        app.del(this.route, this.middleware, this.del);
        app.put(this.route, this.middleware, this.put);

//        app.get('*', this.middleware, this.get);
    },


    // Default Middleware for controllers
    middleware: function(req, res, next) {

        // TODO: Check to see if the request is coming from a crawler

        next();
    },


    // Controller route handlers
    post: function(req, res) {},
    get: function(req, res) {},
    del: function(req, res) {},
    put: function(req, res) {}
};

module.exports = Controller;
