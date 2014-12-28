define([
	'marionette',
	'templates',
	'views/ActiveCountView',
	'views/CompletedCountView'
], function (Marionette, templates, ActiveCountView, CompletedCountView) {
	'use strict';

	return Marionette.LayoutView.extend({
		template: templates.footerLayoutView,

		regions: {
			activeCount: '#todo-count',
			completedCount: '#clear-completed'
		},

		ui: {
			filters: '#filters a'
		},

		events: {
			'click #clear-completed' : 'onClearClick'
		},

		onRender: function () {
			this.activeCount.show(new ActiveCountView({ collection: this.collection }));
			this.completedCount.show(new CompletedCountView({ collection: this.collection }));
		},

		updateFilterSelection: function (filter) {
			this.ui.filters
				.removeClass('selected')
				.filter('[href="#/' + filter + '"]')
				.addClass('selected');
		},

		onClearClick: function () {
			window.app.vent.trigger('todoList:clear:completed');
		}
	});
});
