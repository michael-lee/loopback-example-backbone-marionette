define([
    'marionette',
    'Templates'
], function (Marionette, Templates) {
    'use strict';

    return Marionette.ItemView.extend({
        template: Templates.infoItemView
    });
});
