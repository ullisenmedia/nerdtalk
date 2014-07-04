nerdtalk.filter('now', function() {

    return function(date) {

        var now = null;

        var isAfter = moment().isAfter(date, 'day');

        if(!isAfter) {

            now = moment(date).fromNow();

        } else {

            now = moment(date).format('MMM DD, YYYY h:mmA');
        }

        return now;
    }
});