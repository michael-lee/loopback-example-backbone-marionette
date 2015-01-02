define([
    'backbone',
    'marionette',
    'maincontent/todos/todoapp/TodoListCollection',
    'maincontent/todos/todoapp/main/TodoItemView',
    'navbar/NavbarItemView',
    'maincontent/todos/TodosLayoutView',
    'maincontent/login/LoginPageItemView',
    'maincontent/about/AboutItemView',
    'SessionModel'
], function (Backbone, Marionette, TodoListCollection, TodoItemView, NavbarItemView, TodosLayoutView,
        LoginPageItemView, AboutItemView, SessionModel) {
    'use strict';

    var app = new Marionette.Application();

    app.session = new SessionModel({});

    var todoList = new TodoListCollection();

    var viewOptions = {
        collection: todoList
    };

    app.addRegions({
        navbar: '#navbar',
        maincontent: '#maincontent'
    });

    app.showMainContent = function () {
        if (app.session.get('logged_in') === true) {
            app.maincontent.show(new TodosLayoutView(viewOptions));
            todoList.fetch();
            if (Backbone.history.fragment === '' || Backbone.history.fragment === 'login') {
                Backbone.history.navigate('#/todos', { trigger: true });
            }
        } else {
            app.maincontent.show(new LoginPageItemView());
            Backbone.history.navigate('#/login');
        }
    };

    app.on('start', function () {
        app.navbar.show(new NavbarItemView());
        app.showMainContent();
    });

    app.listenTo(app.session, 'change:logged_in', function () {
        if (app.navbar.currentView === undefined) {
            app.navbar.show(new NavbarItemView());
        }
        app.navbar.currentView.onLoginStatusChange();
        app.showMainContent();
    });

    app.vent.on('loginNeeded', function () {
        app.maincontent.show(new LoginPageItemView());
    });

    app.vent.on('aboutNeeded', function () {
        app.maincontent.show(new AboutItemView());
    });

    app.listenTo(todoList, 'all', function () {
        if (app.maincontent.$el) {
            app.maincontent.$el.show();
            app.maincontent.$el.find('#main').toggle(todoList.length > 0);
            app.maincontent.$el.find('#footer').toggle(todoList.length > 0);
        }
    });

    app.vent.on('todoList:filter', function (filter) {
        app.showMainContent();
        if (app.maincontent.currentView.footerLayoutView) {
            app.maincontent.currentView.footerLayoutView.updateFilterSelection(filter);
        }
        if (document.getElementById('todoapp')) {
            document.getElementById('todoapp').className = 'filter-' + (filter === '' ? 'all' : filter);
        }
    });

    app.vent.on('todoList:clear:completed', function () {
        todoList.getCompleted().forEach(function (todo) {
            todo.destroy();
        });
    });

    return window.app = app;
});
