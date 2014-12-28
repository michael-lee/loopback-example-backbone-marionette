define(function (require) {
	'use strict';

	return {
        navbarItemView: require('text!templates/navbarItemView.tmpl'),
        loginPageItemView: require('text!templates/loginPageItemView.tmpl'),
		todoItemView: require('tpl!templates/todoItemView.tmpl'),
        todoAppLayoutView: require('tpl!templates/todoAppLayoutView.tmpl'),
		todosCompositeView: require('tpl!templates/todoListCompositeView.tmpl'),
		footerLayoutView: require('tpl!templates/footerLayoutView.tmpl'),
		headerItemView: require('tpl!templates/headerItemView.tmpl'),
        infoItemView: require('tpl!templates/infoItemView.tmpl'),
        aboutItemView: require('tpl!templates/aboutItemView.tmpl')
	};
});
