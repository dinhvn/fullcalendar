var options = {
	view: "agendaWeek"
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
		element.fullCalendar('today');
		headerElement.fullCalendar('today');
	});
	$('#prev').click(function () {
		element.fullCalendar('prev');
		headerElement.fullCalendar('prev');
	});
	$('#next').click(function () {
		element.fullCalendar('next');
		headerElement.fullCalendar('next');
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
		nowIndicator: true,
		hideAgendaGutter: true,
		defaultView: options.view == "weekday" ? 'agendaWeek' : options.view,
		hideAgendaAxis: true,
		hideAgendaScroller: true,
		defaultDate: '2017-03-21',
		columnFormat: 'D ddd',
		navLinks: false, // can click day/week names to navigate views
		editable: true,
		selectable: true,
		eventLimit: true, // allow "more" link when too many events
		height: 500,
		droppable: true,
		weekends: options.view == "weekday" ? false : true
	};

	var configHeader = {
		header: {
			left: 'today',
			center: '',
			right: ''
		},
		noneHeader: true,
		nowIndicator: true,
		hideAgendaGutter: true,
		defaultView: 'agendaWeek',
		hideAgendaAxis: false,
		hideAgendaScroller: true,
		defaultDate: '2017-03-21',
		navLinks: true, // can click day/week names to navigate views
		editable: true,
		selectable: true,
		eventLimit: true, // allow "more" link when too many events
		height: 500,
		hideAgendaContent: true,
		events: []
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
			start: '2017-03-12'
		},
		{
			title: 'Long Event',
			start: '2017-03-14',
			end: '2017-02-10'
		},
		{
			id: 999,
			title: 'Repeating Event',
			start: '2017-03-21T12:00:00'
		}
	]
	element.fullCalendar('renderEvents', events);
	SchedulerUtil.reload();
}

changeView = function (value) {
	var beforeView = options.view;
	headerElement.show();
	if (value == "agendaDay")
		_changeDay();
	else if (value == "weekday")
		_changeWeekday();
	else if (value == "agendaWeek")
		_changeWeek();
	else if (value == "month")
		_changeMonth();
	var nowView = options.view;
	if (beforeView == "weekday" || nowView == "weekday")
		recycleFullCalendar();

	//$(window).trigger("reload");
	return this;
}

_changeDay = function () {
	element.fullCalendar("changeView", "agendaDay");
	options.view = "agendaDay";
	return this;
}
_changeWeekday = function () {
	element.fullCalendar("changeView", "agendaWeek");
	options.view = "weekday";
	return this;
}
_changeWeek = function () {
	element.fullCalendar("changeView", "agendaWeek");
	options.view = "agendaWeek";
	return this;
}
_changeMonth = function () {
	element.fullCalendar("changeView", "month");
	options.view = "month";
	headerElement.hide();
	return this;
}
