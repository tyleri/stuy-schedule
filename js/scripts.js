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
	{start: new Time(8), end: new Time(15,35)},
	{start: new Time(8), end: new Time(8,41)},
	{start: new Time(8,45), end: new Time(9,26)},
	{start: new Time(9,31), end: new Time(10,15)},
	{start: new Time(10,20), end: new Time(11,1)},
	{start: new Time(11,6), end: new Time(11,47)},
	{start: new Time(11,52), end: new Time(12,33)},
	{start: new Time(12,38), end: new Time(13,19)},
	{start: new Time(13,24), end: new Time(14,5)},
	{start: new Time(14,9), end: new Time(14,50)},
	{start: new Time(14,54), end: new Time(15,35)}
];

var hrSchedule = [
	{start: new Time(8), end: new Time(15,35)},
	{start: new Time(8), end: new Time(8,40)},
	{start: new Time(8,45), end: new Time(9,25)},
	{start: new Time(9,29), end: new Time(10,9)},
	{start: new Time(10,30), end: new Time(11,10)},
	{start: new Time(11,14), end: new Time(11,54)},
	{start: new Time(11,58), end: new Time(12,38)},
	{start: new Time(12,42), end: new Time(13,22)},
	{start: new Time(13,26), end: new Time(14,6)},
	{start: new Time(14,10), end: new Time(14,50)},
	{start: new Time(14,55), end: new Time(15,35)}
];

var AMCHalfDay = [
	{start: new Time(8,35), end: new Time(12,41)},
	{start: new Time(8,35), end: new Time(8,56)},
	{start: new Time(9), end: new Time(9,21)},
	{start: new Time(9,25), end: new Time(9,46)},
	{start: new Time(9,50), end: new Time(10,11)},
	{start: new Time(10,15), end: new Time(10,36)},
	{start: new Time(10,40), end: new Time(11,1)},
	{start: new Time(11,5), end: new Time(11,26)},
	{start: new Time(11,30), end: new Time(11,51)},
	{start: new Time(11,55), end: new Time(12,16)},
	{start: new Time(12,20), end: new Time(12,41)}
];



function updateSchedule(schedule) {
	for (var i = 1; i < schedule.length; i++) {
		var str = schedule[i].start.toString() + " - " +
			schedule[i].end.toString();
		$("#Period" + i + ">.time").html(str);
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

	if ( ! currTime.isIn(schedule[0].start, schedule[0].end) ||
			dow == 6 || dow == 0) {
		// If not during school
		for (var i = 1; i < schedule.length; i++)
				if ( $("#Period" + i).hasClass("info") )
					$("#Period" + i).removeClass("info");

		if ( $("#per").html() != "" || $("#min-left").html() != "" ) {
			$("#per").html("");
			$("#min-left").html("");
		}
		var minutes = schedule[0].start.subtract( currTime );
		var hours = Math.floor(minutes / 60);
		minutes %= 60;

		// add 24 or 48 hours if on the weekend
		hours +=
			(dow == 5 && currTime > schedule[0].end) ||
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
		var min;
		for (var i = 1; i < schedule.length; i++) {
			if ( currTime.isIn(schedule[i].start,schedule[i].end) ) {
				$("#per").html("Period " + i);
				if ( ! $("#Period" + i).hasClass("info") )
					$("#Period" + i).addClass("info");
				min = schedule[i].end.subtract(currTime);
				$("#min-left").html( min + " minutes left");
			} else {
				if ( $("#Period" + i).hasClass("info") )
					$("#Period" + i).removeClass("info");

				if ( currTime.isIn(schedule[i-1].end,schedule[i].start) ) {
					$("#per").html("Before Period " + i);
					min = schedule[i].start.subtract(currTime);
					$("#min-left").html( min + " minutes left");
				} 
			}
		}
	}
}

function setBackground() {
}

// tabs
$('#schedule a[href="#regular"]').click(function (e) {
	e.preventDefault();
	$(this).tab('show');
	updateSchedule(regSchedule);
	updatePeriod(regSchedule);
	schedule = regSchedule;
})
$('#schedule a[href="#homeroom"]').click(function (e) {
	e.preventDefault();
	$(this).tab('show');
	updateSchedule(hrSchedule);
	updatePeriod(hrSchedule);
	schedule = hrSchedule;
})
$('#schedule a[href="#AMChalfday"]').click(function (e) {
	e.preventDefault();
	$(this).tab('show');
	updateSchedule(AMCHalfDay);
	updatePeriod(AMCHalfDay);
	schedule = AMCHalfDay;
})

// global variable for changing schedule
var schedule;

$( function() {

	$("#content").hide();

	var today = new Date();
	if ( today.getDay() == 2 )
		$('#schedule a[href="#homeroom"]').click();
	else
		$('#schedule a[href="#regular"]').click();

	updateTime()
	$("#content").fadeIn(1500);
	setInterval(
		function() { updateTime(); updatePeriod(schedule); },
		1000 );

});
