var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

requirejs.config({
    baseUrl: '/client/js',
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
    deps: tests,
    callback: window.__karma__.start
});
