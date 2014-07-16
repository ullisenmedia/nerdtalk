nerdtalk
    .constant('AppInfo', {
        NAME: 'nerd.talk',
        VERSION: 1.0
    })
    .constant('ScrollState', {
        NONE: 'scroll_state_none',
        BOTH: 'scroll_state_both',
        VERTICAL: 'scroll_state_vertical',
        HORIZONTAL: 'scroll_state_horizontal'
    })
    .constant('Views', {
        SIDE_MENU: {template: {url: '/modules/common/views/partials/side.menu.html'}},
        POST: {template: {url: '/modules/post/views/post.view.html', show: false}}
    });