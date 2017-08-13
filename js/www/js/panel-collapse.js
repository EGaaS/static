var panelCollapseBtnSelector = '[data-widget="panel-collapse"]';
var panelCollapseSelector = '[data-tool="panel-collapse"]';
var storageKeyName = 'eGaaS-panelState';
var CollapseBtn = '<span class="pull-right" data-tool="panel-collapse" data-toggle="tooltip" title="Collapse Panel"><em class="fa fa-minus"></em></span>';

function panelCollapseBtn() {
	'use strict';
	
	$(panelCollapseBtnSelector).each(function(){
		$(this).replaceWith(CollapseBtn);
	});
}

function panelCollapse() {
	'use strict';
	
	panelCollapseBtn();
	
	$(panelCollapseSelector).each(panelCollapseInit);
	
	$(".panel").on('hide.bs.collapse', function(event){
			
	}).on('show.bs.collapse', function(event){
		
	});
}

function panelCollapseInit() {
	'use strict';
	
	var $this        = $(this),
		parent       = $this.parents('.panel'),
		wrapper      = parent.find('.panel-wrapper'),
		collapseOpts = {toggle: false},
		iconElement  = $this.children('em'),
		panelId      = parent.attr('id'),
		height 		 = parent.parent().height() - parent.find('.panel-heading').height() - parent.find('.panel-footer').height() - parseInt(parent.css("margin-bottom")) - parseInt(parent.css("border-top-width")) - parseInt(parent.css("border-bottom-width")) - parseInt(parent.find('.panel-heading').css("padding-top")) - parseInt(parent.find('.panel-heading').css("padding-bottom")) - parseInt(parent.find('.panel-heading').css("border-top-width")) - parseInt(parent.find('.panel-heading').css("border-bottom-width")) - parseInt(parent.find('.panel-footer').css("padding-top")) - parseInt(parent.find('.panel-footer').css("padding-bottom")) - parseInt(parent.find('.panel-footer').css("border-top-width")) - parseInt(parent.find('.panel-footer').css("border-bottom-width"));
	
	if(!wrapper.length) {
		wrapper =
			parent.children('.panel-heading').nextAll()
			.wrapAll('<div/>')
			.parent()
			.addClass('panel-wrapper');
		collapseOpts = {};
	}
	
	wrapper
		.collapse(collapseOpts)
		.on('hide.bs.collapse', function(e) {
			if (parent.hasClass("elastic") || parent.hasClass("elasticMobile")) {
				if (wrapper.find(".panel-body .slimScrollDiv").length) {
					var sh = wrapper.find(".panel-body .slimScrollDiv .list-group").data("height");
					height = parent.parent().height() - parent.find('.panel-heading').height() - parent.find('.panel-footer').height() - parseInt(parent.css("margin-bottom")) - parseInt(parent.css("border-top-width")) - parseInt(parent.css("border-bottom-width")) - parseInt(parent.find('.panel-heading').css("padding-top")) - parseInt(parent.find('.panel-heading').css("padding-bottom")) - parseInt(parent.find('.panel-heading').css("border-top-width")) - parseInt(parent.find('.panel-heading').css("border-bottom-width")) - parseInt(parent.find('.panel-footer').css("padding-top")) - parseInt(parent.find('.panel-footer').css("padding-bottom")) - parseInt(parent.find('.panel-footer').css("border-top-width")) - parseInt(parent.find('.panel-footer').css("border-bottom-width"));
					if (sh < height) {
						wrapper.find(".panel-body").css({"height":height + "px"});
					} else {
						wrapper.find(".panel-body").css({"height":sh + "px"});
					}
				} else {
					if (wrapper.children('.panel-body').height() < height) {
						wrapper.children('.panel-body').css({"height":height + "px"});
					}
				}
				wrapper.css({"display":"block"});
				parent.css({"display":"block"});
				parent.parent().css({"display":"block"});
			}
			
			if (e.target.className.indexOf("panel-wrapper") === 0) {
				setIconHide( iconElement );
				savePanelState(panelId, 'hide');
				wrapper.prev('.panel-heading').addClass('panel-heading-collapsed');
			}
		})
		.on('hidden.bs.collapse', function() {
			if (parent.hasClass("elastic") || parent.hasClass("elasticMobile")) {
				wrapper.children('.panel-body').css({"height":""});
			}
		})
		.on('show.bs.collapse', function(e) {
			if (parent.hasClass("elastic") || parent.hasClass("elasticMobile")) {
				if (wrapper.find(".panel-body .slimScrollDiv").length) {
					var sh = wrapper.find(".panel-body .slimScrollDiv .list-group").data("height");
					height = parent.parent().height() - parent.find('.panel-heading').height() - parent.find('.panel-footer').height() - parseInt(parent.css("margin-bottom")) - parseInt(parent.css("border-top-width")) - parseInt(parent.css("border-bottom-width")) - parseInt(parent.find('.panel-heading').css("padding-top")) - parseInt(parent.find('.panel-heading').css("padding-bottom")) - parseInt(parent.find('.panel-heading').css("border-top-width")) - parseInt(parent.find('.panel-heading').css("border-bottom-width")) - parseInt(parent.find('.panel-footer').css("padding-top")) - parseInt(parent.find('.panel-footer').css("padding-bottom")) - parseInt(parent.find('.panel-footer').css("border-top-width")) - parseInt(parent.find('.panel-footer').css("border-bottom-width"));
					if (sh < height) {
						wrapper.find(".panel-body").css({"height":height + "px"});
					} else {
						wrapper.find(".panel-body").css({"height":sh + "px"});
					}
				} else {
					if (wrapper.children('.panel-body').height() < height) {
						wrapper.children('.panel-body').css({"height":height + "px"});
					}
				}
			}
			
			if (e.target.className.indexOf("panel-wrapper") === 0) {
				setIconShow( iconElement );
				savePanelState(panelId, 'show');
				wrapper.prev('.panel-heading').removeClass('panel-heading-collapsed');
			}
		})
		.on('shown.bs.collapse', function() {
			if (parent.hasClass("elastic") || parent.hasClass("elasticMobile")) {
				wrapper.css({"display":"flex"});
				parent.css({"display":"flex"});
				parent.parent().css({"display":"flex"});
				wrapper.children('.panel-body').css({"height":""});
			}
		});
	
	var currentState = loadPanelState(panelId);
	if(currentState) {
		setTimeout(function() {
			wrapper.collapse(currentState);
		}, 500);
		savePanelState(panelId, currentState);
	}
}

$(document).on('click', panelCollapseSelector, function () {
	'use strict';
	
	var parent = $(this).parents('.panel');
	var wrapper = parent.find('.panel-wrapper');
	wrapper.collapse('toggle');
});

function setIconShow(iconEl) {
	'use strict';
	
	iconEl.removeClass('fa-plus').addClass('fa-minus');
}

function setIconHide(iconEl) {
	'use strict';
	
	iconEl.removeClass('fa-minus').addClass('fa-plus');
}

function savePanelState(id, state) {
	'use strict';
	
	var data = $.localStorage.get(storageKeyName);
	if(!data) { data = {}; }
	data[id] = state;
	$.localStorage.set(storageKeyName, data);
}

function loadPanelState(id) {
	'use strict';
	
	var data = $.localStorage.get(storageKeyName);
	if(data) {
		return data[id] || 'show';
	}
}