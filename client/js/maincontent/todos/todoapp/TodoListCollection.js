define([
    'backbone',
    'maincontent/todos/todoapp/TodoModel'
], function (Backbone, TodoModel) {
    'use strict';

    return Backbone.Collection.extend({
        url: '/api/Todos',

        model: TodoModel,

        getCompleted: function() {
            return this.where({completed: true});
        },

        getActive: function() {
            return this.where({completed: false});
        },

        comparator: 'created'
    });
});
