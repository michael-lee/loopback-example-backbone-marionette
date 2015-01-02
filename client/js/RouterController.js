define([
], function () {
    'use strict';

    return {
        setFilter: function (param) {
            var filter = param && param.trim() !== 'todos' && param.trim() || '';
            window.app.vent.trigger('todoList:filter', filter);
        },

        showLoginView: function () {
            window.app.session.resetSession();
            window.app.vent.trigger('loginNeeded');
        },

        showAboutView: function () {
            window.app.vent.trigger('aboutNeeded');
        }
    };
});
