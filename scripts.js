// Time class
// *********************************************************************
function Time(h, m) {
	this.hours = arguments.length < 1 || h > 23 || h < 0 ? 0 : h;
	this.minutes = arguments.length < 2 || m > 59 || m < 0 ? 0 : m;
}

Time.prototype.toMin = function() {
	return this.hours * 60 + this.minutes;
}

Time.prototype.toString = function() {
	var str = this.hours == 0 ? "12"
		: this.hours < 13 ? this.hours + ''
		: this.hours - 12 + '';
	str += ':';
	str += this.minutes < 10 ? '0'+this.minutes : this.minutes;
	str += ' ';
	str += this.hours < 12 ? "AM" : "PM";
	return str;
}

Time.prototype.isBetween = function(start, end) {
	return this.toMin() > start.toMin() && this.toMin() < end.toMin();
}

Time.prototype.subtract = function(t) {
	var x = this.toMin(), y = t.toMin();
	if ( x > y )
		return x - y;
	else
		return x - y + (24 * 60);
}

// End of Time class
// *********************************************************************

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

function updateSchedule(schedule) {
	for (var i = 1; i < schedule.length; i++) {
		var str = schedule[i].start + " - ";
		str += schedule[i].end;
		$("#Period" + i + ">.time").html(str);
	}
}

function updateTime(schedule) {
	// Updates current time
	var currDate = new Date();
	$("#clock").html( currDate.toLocaleTimeString() );

	var currTime = new Time(currDate.getHours(), currDate.getMinutes());
	// If not during school
	if ( ! currTime.isBetween(schedule[0].start, schedule[0].end) ) {
		var minutes = Math.ceil( new Time(8).subtract( currTime ) );
		var hours = Math.floor(minutes / 60);
		minutes %= 60;
		$("#curr").html(hours + " hours and " +
				minutes + " minutes until school");
		if ( $("#curr").hasClass("col-xs-6") )
			$("#curr").removeClass("col-xs-6").addClass("col-xs-12");
	}
	else if ( $("#curr").hasClass("col-xs-12") ) {
		$("#curr").addClass("col-xs-6").removeClass("col-xs-12");
	} else {
		// Updates current period
		var min;
		for (var i = 1; i < schedule.length; i++) {
			if ( currTime.isBetween(schedule[i-1].end,schedule[i].start) ) {
				$("#curr").html("Before Period " + i);
				min = Math.ceil( (schedule[i].start - currTime) / 1000 / 60 );
				$("#min-left").html( min + " minutes left");
			} else if ( currTime.isBetween(schedule[i].start,schedule[i].end) ) {
				$("#curr").html("Period " + i);
				$("#Period" + i + ">div").addClass("bg-primary");
				min = Math.ceil( (schedule[i].end - currTime) / 1000 / 60 );
				$("#min-left").html( min + " minutes left");
			} else {
				$("#Period" + i).removeClass("bg-primary");
			}
		}
	}
}

function setBackground() {
}

$( function() {

	$("#content").hide();
	updateTime(regSchedule);
	updateSchedule(regSchedule);
	$("#content").fadeIn(1500);
	setInterval( "updateTime(regSchedule)", 1000 );

});
