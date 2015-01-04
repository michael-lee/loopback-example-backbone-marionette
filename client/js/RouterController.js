define([
], function () {
    'use strict';

    return {
        setTodosFilter: function(param) {
            var filter = param && param.trim() !== 'todos' && param.trim() || '';
            window.app.vent.trigger('todos:filter', filter);
        },

        showLoginView: function() {
            window.app.session.resetSession();
            window.app.vent.trigger('login:show');
        },

        showAboutView: function() {
            window.app.vent.trigger('about:show');
        }
    };
});
