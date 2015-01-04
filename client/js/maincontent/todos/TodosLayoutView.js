define([
    'marionette',
    'Templates',
    'maincontent/todos/todoapp/header/HeaderItemView',
    'maincontent/todos/todoapp/main/TodoListCompositeView',
    'maincontent/todos/todoapp/footer/FooterLayoutView',
    'maincontent/todos/info/InfoItemView',
    'maincontent/todos/todoapp/TodoListCollection'
], function (Marionette, Templates, HeaderItemView, TodoListCompositeView, FooterLayoutView, InfoItemView,
             TodoListCollection) {
    'use strict';

    return Marionette.LayoutView.extend({
        template: Templates.todosLayoutView,

        regions: {
            header: '#header',
            main: '#main',
            footer: '#footer',
            info: '#info'
        },

        ui: {
            todoapp: '#todoapp',
            main: '#main',
            footer: '#footer'
        },

        onBeforeShow: function() {
            var self = this;

            this.todoList = new TodoListCollection();
            this.todoList.fetch();

            this.headerItemView = new HeaderItemView({ collection: this.todoList });
            this.getRegion('header').show(this.headerItemView);

            this.todoListCompositeView = new TodoListCompositeView({ collection: this.todoList });
            this.getRegion('main').show(this.todoListCompositeView);

            this.footerLayoutView = new FooterLayoutView({ collection: this.todoList });
            this.getRegion('footer').show(this.footerLayoutView);
            this.footerLayoutView.on('clear:completed', function(){
                self.triggerMethod('childView:clear:completed');
            });

            this.infoItemView = new InfoItemView();
            this.getRegion('info').show(this.infoItemView);
        },

        onDomRefresh: function() {
            this.listenTo(this.todoList, 'all', this.updateLayout);
        },

        updateLayout: function() {
            this.ui.todoapp.show();
            this.ui.main.toggle(this.todoList.length > 0);
            this.ui.footer.toggle(this.todoList.length > 0);
        },

        updateFilter: function(filter) {
            if (this.footerLayoutView) {
                this.footerLayoutView.updateFilterSelection(filter);
            }
            if (this.ui.todoapp) {
                this.ui.todoapp.attr('class', 'filter-' + (filter === '' ? 'all' : filter));
            }
        },

        onChildViewClearCompleted: function() {
            this.todoList.getCompleted().forEach(function(todo) {
                todo.destroy();
            });
        }
    });
});
