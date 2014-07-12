var url = require('url'),
    safe = require('urlsafe-base64');
    qs = require('querystring');

module.exports = {

    toPage: function(fullUrl, cursor) {

        var urlObj = url.parse(fullUrl, true);
        urlObj.query.next = cursor;
        urlObj.search = '?' + qs.stringify(urlObj.query);

        return url.format(urlObj);
    },
    toHTML: function(html) {

        return safe.decode(html).toString();
    }
};