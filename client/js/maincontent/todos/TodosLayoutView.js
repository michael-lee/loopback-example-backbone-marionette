define([
    'marionette',
    'templates',
    'maincontent/todos/todoapp/header/HeaderItemView',
    'maincontent/todos/todoapp/main/TodoListCompositeView',
    'maincontent/todos/todoapp/footer/FooterLayoutView',
    'maincontent/todos/info/InfoItemView'
], function (Marionette, templates, HeaderItemView, TodoListCompositeView, FooterLayoutView, InfoItemView) {
    'use strict';

    return Marionette.LayoutView.extend({
        template: templates.todosLayoutView,

        regions: {
            header: '#header',
            main: '#main',
            footer: '#footer',
            info: '#info'
        },

        onBeforeShow: function () {
            this.headerItemView = new HeaderItemView({ collection: this.collection });
            this.getRegion('header').show(this.headerItemView);

            this.todoListCompositeView = new TodoListCompositeView({ collection: this.collection });
            this.getRegion('main').show(this.todoListCompositeView);

            this.footerLayoutView = new FooterLayoutView({ collection: this.collection });
            this.getRegion('footer').show(this.footerLayoutView);

            this.infoItemView = new InfoItemView({ collection: this.collection });
            this.getRegion('info').show(this.infoItemView);
        }
    });
});
