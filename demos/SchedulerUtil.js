var SchedulerUtil;
if (SchedulerUtil && (typeof SchedulerUtil != "object" || SchedulerUtil.NAME))
	throw new Error("Namespace 'SchedulerUtil' already exists");

SchedulerUtil = {};
SchedulerUtil.NAME = "SchedulerUtil";
SchedulerUtil.VERSION = 0.1;
SchedulerUtil.SCROLL_DELAY = 100;

(function($) {
	SchedulerUtil.getCalendars = function ( filter ) {
	var result = $("div.zac-calendar");
	return result;
	};

	SchedulerUtil.reload = function() {
		SchedulerUtil.enableForceUpdate();
		SchedulerUtil.getCalendars().fullCalendar("refetchEvents" );
		SchedulerUtil.disableForceUpdate();
	}

	SchedulerUtil.enableForceUpdate = function(){
		this.forceUpdate = true;
	}
	SchedulerUtil.disableForceUpdate = function(){
		this.forceUpdate = false;
	}
	SchedulerUtil.getForceUpdate = function(){
		return this.forceUpdate || false;
	}

})(jQuery);
