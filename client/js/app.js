define([
    'backbone',
	'marionette',
	'collections/TodoListCollection',
    'views/TodoItemView',
    'views/NavbarItemView',
    'views/TodoAppLayoutView',
    'views/LoginPageItemView',
    'views/AboutItemView',
    'models/SessionModel'
], function (Backbone, Marionette, TodoListCollection, TodoItemView, NavbarItemView, TodoAppLayoutView,
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

    app.loadTodoList = function () {
        todoList.fetch({
            success: function(mod, res) {
                if (Backbone.history.fragment === '' || Backbone.history.fragment === 'login') {
                    Backbone.history.navigate('#/todos', { trigger: true });
                }
            }
        });
    };

    app.showMainContent = function () {
        if (app.session.get('logged_in') === true) {
            app.maincontent.show(new TodoAppLayoutView(viewOptions));
            app.loadTodoList();
        } else {
            app.maincontent.show(new LoginPageItemView());
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
