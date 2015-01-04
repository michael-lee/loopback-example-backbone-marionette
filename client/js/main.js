require.config({
    paths: {
        'underscore': '../bower_components/underscore/underscore',
        'backbone': '../bower_components/backbone/backbone',
        'marionette': '../bower_components/backbone.marionette/lib/backbone.marionette',
        'jquery': '../bower_components/jquery/dist/jquery',
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
        'text': '../bower_components/text/text',
        'jquery.cookie': '../bower_components/jquery.cookie/jquery.cookie',
        'parsley': '../lib/parsley/parsley',
        'tpl': '../lib/tpl/tpl'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'marionette': {
            deps: ['backbone'],
            exports: 'Backbone.Marionette'
        },
        'bootstrap': {
            deps: ['jquery'],
            exports: 'Bootstrap'
        },
        'parsley': {
            deps: ['jquery']
        },
        'jquery.cookie': {
            deps: ['jquery']
        }
    },
    deps: ['jquery', 'underscore']
});

require([
    'app',
    'backbone',
    'Router',
    'RouterController',
    'jquery.cookie'
], function (app, Backbone, Router, RouterController) {
    'use strict';

    $.ajaxSetup({
        cache: false,
        contentType: 'application/json',
        dataType: 'json',
        headers: {
            'Authorization': $.cookie('access_token') || ''
        },
        statusCode: {
            401: function() {
                window.location.replace('#/login');
            }
        }
    });

    app.session.checkAuth({
        complete: function() {
            app.start();
            new Router({ controller: RouterController });
            Backbone.history.start();
        }
    });
});
