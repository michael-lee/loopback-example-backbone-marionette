define([
    'marionette',
    'Templates',
    'maincontent/todos/todoapp/footer/ActiveCountView',
    'maincontent/todos/todoapp/footer/CompletedCountView'
], function (Marionette, Templates, ActiveCountView, CompletedCountView) {
    'use strict';

    return Marionette.LayoutView.extend({
        template: Templates.footerLayoutView,

        regions: {
            activeCount: '#todo-count',
            completedCount: '#clear-completed'
        },

        ui: {
            filters: '#filters a'
        },

        triggers: {
            'click #clear-completed' : 'clear:completed'
        },

        onRender: function() {
            this.activeCount.show(new ActiveCountView({ collection: this.collection }));
            this.completedCount.show(new CompletedCountView({ collection: this.collection }));
        },

        updateFilterSelection: function(filter) {
            this.ui.filters
                .removeClass('selected')
                .filter('[href="#/' + filter + '"]')
                .addClass('selected');
        }
    });
});
