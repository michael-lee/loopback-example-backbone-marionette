define([
    'backbone',
    'marionette',
    'templates',
    'bootstrap'
], function (Backbone, Marionette, templates) {
    'use strict';

    return Marionette.ItemView.extend({
        serializeData: function() {
            return {
                logged_in: window.app.session.get('logged_in'),
                user: window.app.session.user.toJSON()
            }
        },

        template: function(sessionModel) {
            return _.template(templates.navbarItemView)({
                logged_in: sessionModel.logged_in,
                user: sessionModel.user
            });
        },

        events: {
            'click #logout-link': 'onLogoutClick',
            'click #remove-account-link': 'onRemoveAccountClick'
        },

        onLoginStatusChange: function(event) {
            this.render();
            if (window.app.session.get('logged_in') === false) {
                window.app.vent.trigger('loginNeeded');
            }
        },

        onLogoutClick: function(event) {
            event.preventDefault();
            window.app.session.logout({});
        },

        onRemoveAccountClick: function(event) {
            event.preventDefault();
            window.app.session.removeAccount({});
        }
    });
});
