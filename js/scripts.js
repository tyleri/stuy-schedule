// Time class
// *********************************************************************
function Time(h, m) {
	this.hours = arguments.length < 1 || h > 23 || h < 0 ? 0 : h;
	this.minutes = arguments.length < 2 || m > 59 || m < 0 ? 0 : m;
}

Time.prototype = {
	valueOf: function() {
		return this.hours * 60 + this.minutes;
	},
	toString: function() {
		var str = this.hours == 0 ? "12"
			: this.hours < 13 ? this.hours + ''
			: this.hours - 12 + '';
		str += ':';
		str += this.minutes < 10 ? '0'+this.minutes : this.minutes;
		str += ' ';
		str += this.hours < 12 ? "AM" : "PM";
		return str;
	},
	isIn: function(start, end) {
		return this >= start && this < end;
	},
	subtract: function(t) {
		var x = this.valueOf(), y = t.valueOf();
		return x - y + (x > y ? 0 : 24 * 60);
	}
}

// End of Time class
// *********************************************************************

// changing the Date.toString function
Date.prototype.toString = function() {
	var hours = this.getHours();
	var minutes = this.getMinutes();
	var seconds = this.getSeconds();

	var ampm = hours < 12 ? "AM" : "PM";
	hours =
		hours == 0 ? 12
		: hours < 13 ? hours
		: hours - 12;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;

	return hours + ":" + minutes + ":" + seconds + " " + ampm;
};

var regSchedule = [
{name: "Period 1", id: "p1", start: new Time(8), end: new Time(8,41)},
{name: "Period 2", id: "p2", start: new Time(8,45), end: new Time(9,26)},
{name: "Period 3", id: "p3", start: new Time(9,31), end: new Time(10,15)},
{name: "Period 4", id: "p4", start: new Time(10,20), end: new Time(11,1)},
{name: "Period 5", id: "p5", start: new Time(11,6), end: new Time(11,47)},
{name: "Period 6", id: "p6", start: new Time(11,52), end: new Time(12,33)},
{name: "Period 7", id: "p7", start: new Time(12,38), end: new Time(13,19)},
{name: "Period 8", id: "p8", start: new Time(13,24), end: new Time(14,5)},
{name: "Period 9", id: "p9", start: new Time(14,9), end: new Time(14,50)},
{name: "Period 10", id: "p10", start: new Time(14,54), end: new Time(15,35)}
];

var hrSchedule = [
{name: "Period 1", id: "p1", start: new Time(8), end: new Time(8,40)},
{name: "Period 2", id: "p2", start: new Time(8,45), end: new Time(9,25)},
{name: "Period 3", id: "p3", start: new Time(9,29), end: new Time(10,9)},
{name: "Homeroom", id: "HR", start: new Time(10,13), end: new Time(10,25)},
{name: "Period 4", id: "p4", start: new Time(10,30), end: new Time(11,10)},
{name: "Period 5", id: "p5", start: new Time(11,14), end: new Time(11,54)},
{name: "Period 6", id: "p6", start: new Time(11,58), end: new Time(12,38)},
{name: "Period 7", id: "p7", start: new Time(12,42), end: new Time(13,22)},
{name: "Period 8", id: "p8", start: new Time(13,26), end: new Time(14,6)},
{name: "Period 9", id: "p9", start: new Time(14,10), end: new Time(14,50)},
{name: "Period 10", id: "p10", start: new Time(14,55), end: new Time(15,35)}
];

var AMCHalfDay = [
{name: "Homeroom", id: "FirstHR", start: new Time(8,10), end: new Time(8,30)},
{name: "Period 1", id: "p1", start: new Time(8,35), end: new Time(8,56)},
{name: "Period 2", id: "p2", start: new Time(9), end: new Time(9,21)},
{name: "Period 3", id: "p3", start: new Time(9,25), end: new Time(9,46)},
{name: "Period 4", id: "p4", start: new Time(9,50), end: new Time(10,11)},
{name: "Period 5", id: "p5", start: new Time(10,15), end: new Time(10,36)},
{name: "Period 6", id: "p6", start: new Time(10,40), end: new Time(11,1)},
{name: "Period 7", id: "p7", start: new Time(11,5), end: new Time(11,26)},
{name: "Period 8", id: "p8", start: new Time(11,30), end: new Time(11,51)},
{name: "Period 9", id: "p9", start: new Time(11,55), end: new Time(12,16)},
{name: "Period 10", id: "p10", start: new Time(12,20), end: new Time(12,41)}
];

var PTCHalfDay = [
{name: "Period 1", id: "p1", start: new Time(8,15), end: new Time(8,35)},
{name: "Period 2", id: "p2", start: new Time(8,39), end: new Time(8,59)},
{name: "Period 3", id: "p3", start: new Time(9,3), end: new Time(9,23)},
{name: "Period 4", id: "p4", start: new Time(9,27), end: new Time(9,47)},
{name: "Period 5", id: "p5", start: new Time(9,51), end: new Time(10,11)},
{name: "Period 6", id: "p6", start: new Time(10,15), end: new Time(10,35)},
{name: "Period 7", id: "p7", start: new Time(10,39), end: new Time(10,59)},
{name: "Period 8", id: "p8", start: new Time(11,3), end: new Time(11,23)},
{name: "Period 9", id: "p9", start: new Time(11,27), end: new Time(11,47)},
{name: "Period 10", id: "p10", start: new Time(11,51), end: new Time(12,11)}
];



function updateSchedule(schedule) {
	for (var i = 0; i < schedule.length; i++) {
		var str = schedule[i].start.toString() + " - " +
			schedule[i].end.toString();
		$("#" + schedule[i].id + ">.time").html(str);
	}
}

function updateTime() {
	// Updates current time
	var today = new Date();
	$("#clock").html( today );
}

function updatePeriod(schedule) {
	// Updates current time
	var today = new Date();
	var dow = today.getDay(); // day of week
	var currTime = new Time(today.getHours(), today.getMinutes());

	if ( ! currTime.isIn(schedule[0].start, schedule[schedule.length-1].end) ||
			dow == 6 || dow == 0) {
		// If not during school
		for (var i = 0; i < schedule.length; i++)
				if ( $("#" + schedule[i].id).hasClass("info") )
					$("#Period" + i).removeClass("info");

		if ( $("#per").html() != "" || $("#min-left").html() != "" ) {
			$("#per").html("");
			$("#min-left").html("");
		}
		var minutes = schedule[0].start.subtract(currTime);
		var hours = Math.floor(minutes / 60);
		minutes %= 60;

		// add 24 or 48 hours if on the weekend
		hours +=
			(dow == 5 && currTime > schedule[schedule.length-1].end) ||
			(dow == 6 && currTime < schedule[0].start) ?
			24 * 2 :
			(dow == 6 && currTime > schedule[0].start) ||
			(dow == 0 && currTime < schedule[0].start) ?
			24 : 0;

		$("#until-school").html(hours + " hours and " +
				minutes + " minutes until school");
	} else {
		// Updates current period if during school
		if ( $("#until-school").html() != "" )
			$("#until-school").html("");
		var min, curr;
		for (var i = 0; i < schedule.length; i++) {
			curr = schedule[i];
			if ( currTime.isIn(curr.start, curr.end) ) {
				$("#per").html(curr.name);
				if ( ! $("#" + curr.id).hasClass("info") )
					$("#" + curr.id).addClass("info");
				min = curr.end - currTime;
				$("#min-left").html( min + " minutes left");
			} else {
				if ( $("#" + curr.id).hasClass("info") )
					$("#" + curr.id).removeClass("info");
				if (i != 0) 
					if ( currTime.isIn(schedule[i-1].end,curr.start) ) {
						$("#per").html("Before " + curr.name);
						min = curr.start - currTime;
						$("#min-left").html( min + " minutes left");
					} 
			}
		}
	}
}

function setBackground() {
}

// tabs
$('#schedule a[href="#Regular"]').click(function (e) {
	e.preventDefault();
	$(this).tab('show');
	$('#HR').hide();
	$('#FirstHR').hide();
	updateSchedule(regSchedule);
	updatePeriod(regSchedule);
	schedule = regSchedule;
    $('#currSchedule').html("Regular Schedule");
    $('#caltabinfo').hide();
    $('#weathertabinfo').hide();
    $('.table').show();
})
$('#schedule a[href="#Homeroom"]').click(function (e) {
	e.preventDefault();
	$(this).tab('show');
	$('#HR').show();
	$('#FirstHR').hide();
	updateSchedule(hrSchedule);
	updatePeriod(hrSchedule);
	schedule = hrSchedule;
    $('#currSchedule').html("Homeroom");
    $('#caltabinfo').hide();
    $('#weathertabinfo').hide();
    $('.table').show();
})
$('#schedule a[href="#AMCHalfDay"]').click(function (e) {
	e.preventDefault();
	$(this).tab('show');
	$('#HR').hide();
	$('#FirstHR').show();
	updateSchedule(AMCHalfDay);
	updatePeriod(AMCHalfDay);
	schedule = AMCHalfDay;
    $('#currSchedule').html("AMC Half Day");
    $('#caltabinfo').hide();
    $('#weathertabinfo').hide();
    $('.table').show();
})
$('#schedule a[href="#PTCHalfDay"]').click(function (e) {
	e.preventDefault();
	$(this).tab('show');
	$('#HR').hide();
	$('#FirstHR').hide();
	updateSchedule(PTCHalfDay);
	updatePeriod(PTCHalfDay);
	schedule = PTCHalfDay;
    $('#currSchedule').html("PTC Half Day");
    $('#caltabinfo').hide();
    $('#weathertabinfo').hide();
    $('.table').show();
})
$('#schedule a[href="#Cal"]').click(function (e) {
	e.preventDefault();
	$(this).tab('show');
    $('#currSchedule').html("Schedule");
    $('#caltabinfo').show();
	$('.table').hide();
    $('#weathertabinfo').hide();
})
$('#schedule a[href="#Weather"]').click(function (e) {
	e.preventDefault();
	$(this).tab('show');
    $('#currSchedule').html("Schedule");
    $('#weathertabinfo').show();
	$('.table').hide();
    $('#caltabinfo').hide();
})

// global variable for changing schedule
var schedule;

$( function() {

	var today = new Date();
	if ( today.getDay() == 2 )
		$('#schedule a[href="#Homeroom"]').click();
	else
		$('#schedule a[href="#Regular"]').click();

	updateTime();
	$("body").fadeIn(1500);
	setInterval(
		function() { updateTime(); updatePeriod(schedule); },
		1000 );

});
