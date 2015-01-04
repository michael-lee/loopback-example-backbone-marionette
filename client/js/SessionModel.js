define([
    'UserModel',
    'jquery.cookie'
], function(UserModel) {
    'use strict';

    return Backbone.Model.extend({
        defaults: {
            logged_in: false,
            user_id: ''
        },

        initialize: function() {
            this.user = new UserModel({});
        },

        url: function() {
            return '/api/Users';
        },

        updateSessionUser: function(userData) {
            this.user.set(_.pick(userData, _.keys(this.user.defaults)));
        },

        resetSession: function() {
            this.set({ logged_in: false });
            $.removeCookie('access_token');
            $.removeCookie('user_id');
        },

        checkAuth: function(callback, args) {
            var access_token = $.cookie('access_token');
            if (access_token) {
                var user_id = $.cookie('user_id');
                var self = this;
                this.fetch({
                    url: this.url() + '/' + user_id,
                    headers: { 'Authorization': access_token },
                    success: function(mod, res) {
                        if (!res.error) {
                            self.updateSessionUser(res);
                            self.set({ user_id: self.user.id, logged_in: true });
                            if ('success' in callback) callback.success(mod, res);
                        } else {
                            self.resetSession();
                            if ('error' in callback) callback.error(mod, res);
                        }
                    }, error:function(mod, res) {
                        self.resetSession();
                        if ('error' in callback) callback.error(mod, res);
                    }
                }).complete( function() {
                    if ('complete' in callback) callback.complete();
                });
            } else {
                this.resetSession();
                if ('error' in callback) callback.error();
                if ('complete' in callback) callback.complete();
            }
        },

        setHeaders: function(xhr) {
            var token = $('meta[name="csrf-token"]').attr('content');
            if (token) xhr.setRequestHeader('X-CSRF-Token', token);
            var access_token = $.cookie('access_token');
            if (access_token) xhr.setRequestHeader('Authorization', access_token);
        },

        setupAjax: function(access_token) {
            $.ajaxSetup({
                headers: {
                    'Authorization': access_token
                }
            });
        },

        postAuth: function(opts, callback, args) {
            var self = this;
            var postData = _.omit(opts, 'method');
            $.ajax({
                url: opts.method === 'signup' ? this.url() : this.url() + '/' + opts.method,
                type: 'POST',
                beforeSend: this.setHeaders,
                data:  JSON.stringify(postData),
                success: function(res) {
                    if ('login' === opts.method) {
                        self.user.set({ id: res.userId });
                        $.cookie('user_id', res.userId, { expires: 30 });
                        $.cookie('access_token', res.id, { expires: 30 });
                        self.setupAjax(res.id);
                        self.user.url = '/api/Users/' + res.userId;
                        self.user.fetch({ async: false });
                        self.set({ user_id: res.userId, logged_in: true });
                    } else if ('signup' === opts.method) {
                        $.ajax({
                            url: '/api/Users/login',
                            contentType: 'application/json',
                            dataType: 'json',
                            type: 'POST',
                            data: JSON.stringify({ username: res.username, password: postData.password }),
                            success: function(token) {
                                self.user.set({ id: token.userId });
                                $.cookie('user_id', token.userId, { expires: 30 });
                                $.cookie('access_token', token.id, { expires: 30 });
                                self.setupAjax(token.id);
                                self.user.url = '/api/Users/' + token.userId;
                                self.user.fetch({ async: false });
                                self.set({ user_id: token.userId, logged_in: true });
                            }
                        });
                    } else {
                        self.resetSession();
                    }
                },
                error: function(mod, res) {
                    if (callback && 'error' in callback) callback.error(res);
                }
            }).complete( function() {
                if (callback && 'complete' in callback) callback.complete(res);
            });
        },

        deleteAuth: function(opts, callback, args) {
            var self = this;
            $.ajax({
                url: this.url() + '/' + $.cookie('user_id'),
                type: 'DELETE',
                beforeSend: this.setHeaders,
                data:  JSON.stringify(opts),
                success: function(res) {
                    self.resetSession();
                },
                error: function(mod, res) {
                    if (callback && 'error' in callback) callback.error(res);
                }
            }).complete( function() {
                if (callback && 'complete' in callback) callback.complete(res);
            });
        },

        login: function(opts, callback, args) {
            this.postAuth(_.extend(opts, { method: 'login' }), callback);
        },

        logout: function(opts, callback, args) {
            this.postAuth(_.extend(opts, { method: 'logout' }), callback);
        },

        signup: function(opts, callback, args) {
            this.postAuth(_.extend(opts, { method: 'signup', email: opts.username + '@email.local' }), callback);
        },

        removeAccount: function(opts, callback, args) {
            this.deleteAuth(opts, callback);
        }
    });
});

