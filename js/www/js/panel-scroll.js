var panelScrollableSelector = '[data-widget="panel-scroll"]';
var panelScrollable = '[data-scrollable]';

function panelScroll() {
	'use strict';
	
	panelScrollGenerate();
	
	$(panelScrollable).each(panelScrollInit);
}

function panelScrollGenerate() {
	'use strict';
	
	$(panelScrollableSelector).each(function(){
		var el = $(this);
		var html = el.html();
		var height = el.data('height') || 250;
		var start = el.data('start') || 'top';
		var panel = document.createElement('div');
		$(panel).attr("data-height", height);
		$(panel).attr("data-start", start);
		$(panel).attr("data-scrollable", "");
		$(panel).addClass("list-group");
		$(panel).html(html);
		el.parent().addClass("slimScrollContainer");
		el.replaceWith($(panel));
	});
}

function panelScrollInit() {
	'use strict';
	
	$(panelScrollable).each(function(){
		var element = $(this);
		element.slimScroll({
			height: element.data('height'),
			start: element.data('start')
		});
	});
}