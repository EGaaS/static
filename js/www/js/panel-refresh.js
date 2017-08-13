var panelRefreshBtnSelector = '[data-widget="panel-refresh"]';
var panelRefreshSelector = '[data-tool="panel-refresh"]';
var RefreshBtn = '<span class="pull-right" data-tool="panel-refresh" data-toggle="tooltip" title="Refresh Panel"><em class="fa fa-refresh"></em></span>';

function panelRefreshBtn() {
	'use strict';
	
	var onClickRefresh = [];
	
	$(panelRefreshBtnSelector).each(function(){
		var _click = $(this).attr("onclick") ? $(this).attr("onclick") : "";
		onClickRefresh.push("preloader(this);" + _click);
		$(this).replaceWith(RefreshBtn);
	});
	
	$(panelRefreshSelector).each(function(index){
		$(this).attr("id", "panelRefresh_" + index);
		$(this).attr("onclick", onClickRefresh[index]);
	});
}

function panelRefresh() {
	'use strict';
	
	panelRefreshBtn();
}