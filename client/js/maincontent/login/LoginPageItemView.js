define([
    'marionette',
    'Templates',
    'parsley'
], function (Marionette, Templates) {
    'use strict';

    var ENTER_KEY = 13;

    return Marionette.ItemView.extend({
        serializeData: function() {
            return {
                user: window.app.session.user.toJSON()
            }
        },

        template: function(sessionModel) {
            return _.template(Templates.loginPageItemView)({
                user: sessionModel.user
            });
        },

        ui: {
            login: '#login-template'
        },

        events: {
            'click #login-btn': 'onLoginAttempt',
            'click #signup-btn': 'onSignupAttempt',
            'keyup #login-password-input': 'onPasswordKeyup',
            'keyup #signup-password-confirm-input': 'onConfirmPasswordKeyup'
        },

        showAlert: function(elem, title, klass) {
            $(elem).removeClass('alert-danger alert-warning alert-success alert-info');
            $(elem).addClass(klass);
            $(elem).html('<button class="close" data-dismiss="alert">×</button><strong>' + title + '</strong>');
            $(elem).show('fast');
            setTimeout(function() {
                $(elem).hide();
            }, 7000 );
        },

        onPasswordKeyup: function(event) {
            var k = event.keyCode || event.which;

            if (k == ENTER_KEY && $('#login-password-input').val() === '') {
                event.preventDefault();
            } else if (k == ENTER_KEY) {
                event.preventDefault();
                this.onLoginAttempt();
                return false;
            }
        },

        onConfirmPasswordKeyup: function(event) {
            var k = event.keyCode || event.which;

            if (k == ENTER_KEY && $('#confirm-password-input').val() === '') {
                event.preventDefault();
            } else if (k == ENTER_KEY) {
                event.preventDefault();
                this.onSignupAttempt();
                return false;
            }
        },

        onLoginAttempt: function(event) {
            var self = this;
            if (event) event.preventDefault();
            if (this.$('#login-form').parsley('validate')) {
                window.app.session.login({
                    username: this.$('#login-username-input').val(),
                    password: this.$('#login-password-input').val()
                }, {
                    success: function(mod, res) {
                    },
                    error: function(err) {
                        self.showAlert('#login-alert', 'Login failed!', 'alert-danger');
                    }
                });
            } else {
                this.showAlert('#login-alert', 'Validation failed!', 'alert-danger');
            }
        },

        onSignupAttempt: function(event) {
            var self = this;
            if (event) event.preventDefault();
            if (this.$('#signup-form').parsley('validate')) {
                window.app.session.signup({
                    username: this.$('#signup-username-input').val(),
                    password: this.$('#signup-password-input').val(),
                    name: this.$('#signup-name-input').val()
                }, {
                    success: function(mod, res) {
                    },
                    error: function(err) {
                        self.showAlert('#signup-alert', 'Sign up failed!', 'alert-danger');
                    }
                });
            } else {
                this.showAlert('#signup-alert', 'Validation failed!', 'alert-danger');
            }
        }
    });
});

