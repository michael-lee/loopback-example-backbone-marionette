module.exports = function(config) {
    config.set({
        frameworks: ['requirejs', 'jasmine'],
        reporters: ['progress', 'coverage'],
        browsers: ['PhantomJS'],
        files: [
            {pattern: 'client/bower_components/**/*.js', included: false},
            {pattern: 'client/lib/**/*.js', included: false},
            {pattern: 'client/js/**/*.js', included: false},
            {pattern: 'client/tests/**/*.js', included: false},
            'client/tests/test-main.js'
        ],
        preprocessors: {
            'client/js/**/*.js': ['coverage']
        },
        coverageReporter: {
            type : 'html',
            dir: 'client/coverage/'
        },
        plugins: [
            'karma-coverage',
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-requirejs'
        ]
    });
};

