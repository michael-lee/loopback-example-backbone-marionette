define(function (require) {
    'use strict';

    return {
        loginPageItemView: require('text!../templates/loginPageItemView.tpl'),
        navbarItemView: require('text!../templates/navbarItemView.tpl'),
        todosLayoutView: require('tpl!../templates/todosLayoutView.tpl'),
        aboutItemView: require('tpl!../templates/aboutItemView.tpl'),
        headerItemView: require('tpl!../templates/headerItemView.tpl'),
        todosCompositeView: require('tpl!../templates/todoListCompositeView.tpl'),
        todoItemView: require('tpl!../templates/todoItemView.tpl'),
        footerLayoutView: require('tpl!../templates/footerLayoutView.tpl'),
        infoItemView: require('tpl!../templates/infoItemView.tpl')
    };
});
