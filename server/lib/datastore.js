var conf = require('../config'),
    Q = require('q'),
//    Buffer = require('buffer'),
    gapis = require('googleapis')


var Datastore = function(autoConnect) {

    this.autoConnect = autoConnect || this.autoConnect;

    this.initialize();
};

Datastore.prototype = {

    ds: null,
    autoConnect: true,
    credentials: null,

    initialize: function() {

        this.credentials = new gapis.auth.JWT(
            conf.apis.datastore.service_account,
            conf.pem,
            conf.apis.datastore.api_key,
            conf.apis.datastore.scope
        );

        if(this.autoConnect) {

            var that = this;

            this.authorize().then(

                function onSuccess() {

                    that.connect();
                },

                function onError(err) {

                    console.log(err);
                }
            )
        }
    },

    authorize: function() {

        var deferred = Q.defer();

        this.credentials.authorize(function(err) {

            if(err) {

                return deferred.reject(err);
            }

            deferred.resolve();

        });

        return deferred.promise;
    },

    connect: function() {

        var that = this;
        var deferred = Q.defer();

        gapis.discover('datastore', 'v1beta2')
            .withAuthClient(this.credentials)
            .execute(function(err, client) {

                if(err) {

                   return deferred.reject(err);
                }

                var params = client.datastore.withDefaultParams({
                    datasetId: conf.apis.datastore.dataset_id
                });

                that.ds = params.datasets;
            });

        return deferred.promise;
    },

    beginTransaction: function() {

        var deferred = Q.defer();

        this.ds.beginTransaction({datasetId: conf.apis.datastore.dataset_id}, {}).execute(function(err, result) {

            if(err) {

                return deferred.reject(err);
            }

            deferred.resolve(result.transaction);

        });

        return deferred.promise;
    },

    runQuery: function(query, tx) {

        var deferred = Q.defer();

        this.ds.runQuery(query).execute(function(err, result) {

            if(err) {

                return deferred.reject(err);
            }

            var data = {entities: [], paging: {}};

            if (result.batch && result.batch.entityResults.length > 0) {

                data.entities = result.batch.entityResults;
                data.paging = {next: result.batch.endCursor};
            }

            deferred.resolve(data);

        });

        return deferred.promise;
    },

    lookup: function(keys) {

        var deferred = Q.defer();

        this.ds.lookup({keys: keys}).execute(function(err, result) {

            if(err) {

                return deferred.reject(err);
            }

            var data = {};

            if (result.found.length > 0) {

                data = {
                    entity: result.found[0].entity,
                    paging: {next: result.endCursor}
                };
            }

            deferred.resolve(data);

        });

        return deferred.promise;
    }
};

module.exports = new Datastore(true);
