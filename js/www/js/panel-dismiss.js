var panelDismissBtnSelector = '[data-widget="panel-dismiss"]';
var panelDismissSelector = '[data-tool="panel-dismiss"]';
var DismissBtn = '<span class="pull-right" data-tool="panel-dismiss" data-toggle="tooltip" title="Close Panel"><em class="fa fa-times"></em></span>';

function panelDismissBtn() {
	'use strict';
	
	var onClickDismiss = [];
	
	$(panelDismissBtnSelector).each(function(){
		var _click = $(this).attr("onclick") ? $(this).attr("onclick") : "";
		onClickDismiss.push(_click);
		$(this).replaceWith(DismissBtn);
	});
	
	$(panelDismissSelector).each(function(index){
		$(this).attr("onclick", onClickDismiss[index]);
	});
}

function panelDismiss() {
	'use strict';
	
	panelDismissBtn();
	
	$(".panel").on('panel.remove', function(event, panel, deferred){
		$('[data-toggle="tooltip"]').tooltip('destroy');
		deferred.resolve();
	}).on('panel.removed', function(event, panel){
		
	});
}