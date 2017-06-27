var defaultFirstDay = 0;
var options = {
	view: "agendaWeek",
	firstDay: defaultFirstDay
}

var element = $('.zac-calendar');
var headerElement = $('.zac-calendar-header');

$(document).ready(function () {
	element = $('.zac-calendar');
	headerElement = $('.zac-calendar-header');

	createFullCalendar(options);


	var elm = $('.scroll-area').find('.scroll');
	elm.scroll(function (e) {
		var scrollToTop = elm.scrollTop();
		element.find('.fc-scroller').scrollTop(scrollToTop);
		headerElement.find('.fc-scroller').scrollTop(scrollToTop);
	});

	element.bind('mousewheel', function (e) {
		let currentPos = $('.scroll-area').find('.scroll').scrollTop() - e.originalEvent.wheelDelta;
		element.find('.fc-scroller').scrollTop(currentPos);
		headerElement.find('.fc-scroller').scrollTop(currentPos);
		$('.scroll-area').find('.scroll').scrollTop(currentPos);
	});

	$('#today').click(function () {
		today();
	});
	$('#prev').click(function () {
		prev();
	});
	$('#prev2').click(function () {
		moveOneDay(-1);
	});
	$('#next').click(function () {
		next();
	});
	$('#next2').click(function () {
		moveOneDay(1);
	});
	$('#dayView').click(function () {
		changeView('agendaDay')
	});
	$('#weekView').click(function () {
		changeView('agendaWeek');
	});
	$('#weekday').click(function () {
		changeView('weekday');
	});
	$('#monthView').click(function () {
		changeView('month');
	});

	$('#zoomin').click(function () {
		zoom(-5);
	});

	$('#zoomout').click(function () {
		zoom(5);
	});

	$('#rederDay').click(function () {
		var event = {
			title: '1111111111',
			start: moment().add('days', 2).format('YYYY-MM-DD')
		};

		element.fullCalendar("renderEvent", event, true);
	});
});

createFullCalendar = function (options) {
	var config = {
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		customHeader: {
			name: 'Nguyen Van A',
			image: '../dist/b/out/content/images/profile.jpg'
		},
		eventLimit: true,
		views: {
			agenda: {
				eventLimit: 3 // adjust to 6 only for agendaWeek/agendaDay
			}
		},
		fixedAllDayHeight: true,
		eventLimitAutoMonth: true,
		nowIndicator: true,
		hideAgendaGutter: true,
		defaultView: options.view == "weekday" ? 'agendaWeek' : options.view,
		hideAgendaAxis: true,
		hideAgendaScroller: true,
		defaultDate: new Date(),
		firstDay: options.firstDay,
		columnFormat: 'D ddd',
		navLinks: false, // can click day/week names to navigate views
		editable: true,
		selectable: true,
		height: $(window).height() - 100,
		droppable: true,
		weekends: options.view == "weekday" ? false : true,
		windowResize: function(view) {
			element.fullCalendar('option', 'height', $(window).height() - 100);
			headerElement.fullCalendar('option', 'height', $(window).height() - 100);
		},
		allDayResize: function(num) {
			console.log(num);
			var h = 0;
			var elm = $('.fc-row.fc-week.fc-widget-content');
			elm.each(function( i ) {
				var l = elm[i].offsetHeight;
				if (l > h) {
					h = l;
				}
			});
			elm.height(h);
		}
	};

	var configHeader = {
		header: {
			left: 'today',
			center: '',
			right: ''
		},
		eventLimit: true, // allow "more" link when too many events
		views: {
			agenda: {
				eventLimit: 3 // adjust to 6 only for agendaWeek/agendaDay
			}
		},
		fixedAllDayHeight: true,
		noneHeader: true,
		nowIndicator: true,
		hideAgendaGutter: true,
		defaultView: 'agendaWeek',
		hideAgendaAxis: false,
		hideAgendaScroller: true,
		defaultDate: new Date(),
		navLinks: true, // can click day/week names to navigate views
		editable: true,
		selectable: true,
		height: $(window).height() - 100,
		hideAgendaContent: true,
		events: [],
		windowResize: function(view) {
			element.fullCalendar('option', 'height', $(window).height() - 100);
			headerElement.fullCalendar('option', 'height', $(window).height() - 100);
		}
	};

	headerElement.fullCalendar(configHeader);
	element.fullCalendar(config);

	renderEvent();

	// Init scroll position
	$('.scroll-content').height($('.fc-time-grid').height());
	$('.scroll-area').find('.scroll').scrollTop(headerElement.find('.fc-scroller').scrollTop());

}

recycleFullCalendar = function () {
	element.fullCalendar("destroy");
	headerElement.fullCalendar("destroy");

	createFullCalendar(options);
}

renderEvent = function () {
	var events = [
		{
			title: 'All Day Event',
			start: moment().format('YYYY-MM-DD')
		},
		{
			title: 'All Day Event',
			start: moment().format('YYYY-MM-DD')
		},
		{
			title: '1111111111',
			start: moment().add('days', 2).format('YYYY-MM-DD')
		},
		{
			title: 'ghfhgf',
			start: moment().add('days', 3).format('YYYY-MM-DD')
		},{
			title: 'ghfhgf',
			start: moment().add('days', 3).format('YYYY-MM-DD')
		},{
			title: 'ghfhgf',
			start: moment().add('days', 3).format('YYYY-MM-DD')
		},{
			title: 'ghfhgf',
			start: moment().add('days', 3).format('YYYY-MM-DD')
		},{
			title: 'ghfhgf',
			start: moment().add('days', 3).format('YYYY-MM-DD')
		},
		{
			title: '1111111111',
			start: moment().add('days', 2).format('YYYY-MM-DD')
		},
		{
			title: '1111111111',
			start: moment().add('days', 2).format('YYYY-MM-DD')
		},
		{
			title: 'Event 1',
			start: moment().set('hour', 7).set('minute', 0),
			end: moment().set('hour', 9).set('minute', 0),
		},
		{
			id: 999,
			title: 'Event 2',
			start: moment().add('days', -1).set('hour', 9).set('minute', 0),
		},
		{
			title: 'Event 3',
			start: moment().add('days', -2).set('hour', 7).set('minute', 0),
			opacity: null
		},
		{
			title: 'Event 4',
			start: moment().add('days', -1).set('hour', 8).set('minute', 0),
		},
		{
			title: 'Event 5',
			start: moment().add('days', 2).set('hour', 7).set('minute', 0),
		},
		{
			title: 'Event 6',
			start: moment().add('days', 1).set('hour', 8).set('minute', 0),
		}
	]
	element.fullCalendar('renderEvents', events, true);
	//SchedulerUtil.reload();
}

changeView = function (value) {
	var beforeView = options.view;
	headerElement.show();
	if (value == "agendaDay")
		_changeDay();
	else if (value == "weekday")
		_changeWeekday(beforeView);
	else if (value == "agendaWeek")
		_changeWeek(beforeView);
	else if (value == "month")
		_changeMonth(beforeView);

	options.firstDay = defaultFirstDay;
	element.fullCalendar("option", 'firstDay', options.firstDay);
	//$(window).trigger("reload");
	return this;
}

_changeDay = function () {
	element.fullCalendar("changeView", "agendaDay");
	options.view = "agendaDay";
	return this;
}
_changeWeekday = function (beforeView) {
	element.fullCalendar("option", 'weekends', false);
	if (beforeView != "agendaWeek") {
		element.fullCalendar("changeView", "agendaWeek");
	}
	options.view = "weekday";
	return this;
}
_changeWeek = function (beforeView) {
	if (beforeView == "weekday") {
		element.fullCalendar("option", 'weekends', true);
	}
	element.fullCalendar("changeView", "agendaWeek");
	options.view = "agendaWeek";
	return this;
}
_changeMonth = function (beforeView) {
	if (beforeView == "weekday") {
		element.fullCalendar("option", 'weekends', true);
	}
	element.fullCalendar("changeView", "month");
	options.view = "month";
	headerElement.hide();
	return this;
}

today = function () {
	if (options.firstDay != defaultFirstDay) {
		options.firstDay = defaultFirstDay;
		element.fullCalendar("option", 'firstDay', options.firstDay);
	}
	element.fullCalendar('today');
}

prev = function () {
	if (options.firstDay != defaultFirstDay) {
		options.firstDay = defaultFirstDay;
		element.fullCalendar("option", 'firstDay', options.firstDay);
	} else {
		element.fullCalendar('prev');
	}
}

next = function () {
	if (options.firstDay != defaultFirstDay) {
		options.firstDay = defaultFirstDay;
		element.fullCalendar("option", 'firstDay', options.firstDay);
	} else {
		element.fullCalendar('next');
	}
}

moveOneDay = function (type) {
	if (options.view == 'month' || options.view == 'agendaDay') {
		return;
	}
	if (type == 1) {
		options.firstDay += 1;
		if (options.view == 'weekday' && options.firstDay < 2) {
			// Ignore Monday
			options.firstDay += 1;
		}

		if (options.firstDay > 2) {
			element.fullCalendar('next');
		}

		if (options.firstDay == 7) {
			options.firstDay = 0;
		} else if (options.view == 'weekday' && options.firstDay == 6) {
			// Ignore Sacturday
			options.firstDay = 2;
		}

		element.fullCalendar("option", 'firstDay', options.firstDay);
	} else {
		options.firstDay -= 1;
		if (options.view == 'weekday' && options.firstDay < 2) {
			// Ignore Monday
			options.firstDay = 5;
		} else if (options.firstDay < 0) {
			options.firstDay = 6;
		}

		element.fullCalendar("option", 'firstDay', options.firstDay);
		if (options.firstDay > 5 || (options.view == 'weekday' && options.firstDay > 4)) {
			element.fullCalendar('prev');
		}
	}
}

zoom = (function (num) {
	var slatHeight = element.find('.fc-time-grid .fc-slats td').height() + num;
	element.find('.fc-time-grid .fc-slats td').css('height', slatHeight + 'px')
	headerElement.find('.fc-time-grid .fc-slats td').css('height', slatHeight + 'px')
	element.fullCalendar("updateSize");
	headerElement.fullCalendar("updateSize");
});
