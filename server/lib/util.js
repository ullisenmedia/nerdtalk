var url = require('url'),
    qs = require('querystring');

module.exports = {

    toPage: function(fullUrl, cursor) {

        var urlObj = url.parse(fullUrl, true);
        urlObj.query.next = cursor;
        urlObj.search = '?' + qs.stringify(urlObj.query);

        return url.format(urlObj);
    }
};