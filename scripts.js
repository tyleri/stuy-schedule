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
	return this.toMin() >= start.toMin() && this.toMin() < end.toMin();
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

	if ( ! currTime.isBetween(schedule[0].start, schedule[0].end) ) {
		// If not during school
		for (var i = 1; i < schedule.length; i++)
				if ( $("#Period" + i).hasClass("info") )
					$("#Period" + i).removeClass("info");

		if ( $("#per").html() != "" || $("#min-left").html() != "" ) {
			$("#per").html("");
			$("#min-left").html("");
		}
		var minutes = new Time(8).subtract( currTime );
		var hours = Math.floor(minutes / 60);
		minutes %= 60;
		$("#until-school").html(hours + " hours and " +
				minutes + " minutes until school");
	} else {
		// Updates current period if during school
		if ( $("#until-school").html() != "" )
			$("#until-school").html("");
		var min;
		for (var i = 1; i < schedule.length; i++) {
			if ( currTime.isBetween(schedule[i-1].end,schedule[i].start) ) {
				$("#per").html("Before Period " + i);
				min = schedule[i].start.subtract(currTime);
				$("#min-left").html( min + " minutes left");
			} else if ( currTime.isBetween(schedule[i].start,schedule[i].end) ) {
				$("#per").html("Period " + i);
				if ( ! $("#Period" + i).hasClass("info") )
					$("#Period" + i).addClass("info");
				min = schedule[i].end.subtract(currTime);
				$("#min-left").html( min + " minutes left");
			} else {
				if ( $("#Period" + i).hasClass("info") )
					$("#Period" + i).removeClass("info");
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
