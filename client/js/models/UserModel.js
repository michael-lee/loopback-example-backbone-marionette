define([
    'backbone'
], function(Backbone) {

    return Backbone.Model.extend({
        defaults: {
            id: 0,
            username: '',
            name: '',
            email: ''
        },

        url: function() {
            return '/api/Users';
        }
    });
});

