function Time(h, m) {
	this.hours = h;
	this.minutes = arguments.length == 2 ? m : 0;
}

Time.prototype.toString = function() {
	var str = this.hours + ':';
	str += this.minutes < 10 ? '0'+this.minutes : this.minutes;
	return str;
};

var regSchedule = [
	{start: new Date(2015,0,1,8), end: new Date(2015,0,1,15,35)},
	{start: new Date(2015,0,1,8), end: new Date(2015,0,1,8,41)},
	{start: new Date(2015,0,1,8,45), end: new Date(2015,0,1,9,26)},
	{start: new Date(2015,0,1,9,31), end: new Date(2015,0,1,10,15)},
	{start: new Date(2015,0,1,10,20), end: new Date(2015,0,1,11,1)},
	{start: new Date(2015,0,1,11,6), end: new Date(2015,0,1,11,47)},
	{start: new Date(2015,0,1,11,52), end: new Date(2015,0,1,12,33)},
	{start: new Date(2015,0,1,12,38), end: new Date(2015,0,1,13,19)},
	{start: new Date(2015,0,1,13,24), end: new Date(2015,0,1,14,5)},
	{start: new Date(2015,0,1,14,9), end: new Date(2015,0,1,14,50)},
	{start: new Date(2015,0,1,14,54), end: new Date(2015,0,1,15,35)}
];


function updateSchedule(schedule) {
	for (var i = 1; i < schedule.length; i++) {
		var str = schedule[i].start.toLocaleTimeString() + " - ";
		str += schedule[i].end.toLocaleTimeString();
		$("#Period" + i + ">.time").html(str);
	}
}

function updateTime(schedule) {
	// Updates current time
	var time = new Date();
	time.setFullYear(2015,0,1);
	$("#clock").html( time.toLocaleTimeString() );

	// Updates current period
	var per;
	for (var i = 1; i < schedule.length; i++) {
		if ( isIn(time,schedule[i-1].end,schedule[i].start) ) {
			$("#curr").html("Before Period " + i);
		} else if ( isIn(time,schedule[i].start,schedule[i].end) ) {
			$("#curr").html("Period " + i);
			$("#Period" + i + ">div").addClass("selected");
		} else {
			if ( $("#Period" + i).hasClass("selected") ) {
				$("#Period" + i).removeClass("selected");
			}
		}
	}
	// If not during school
	if (time < schedule[0].start || time > schedule[0].end) {
		var nextMorning = new Date(time);
		nextMorning.setHours(nextMorning.getHours() + 9);
		nextMorning.setHours(8,0,0,0);
		var minutes = Math.ceil( (nextMorning - time)/1000/60);
		var hours = Math.floor(minutes / 60);
		minutes %= 60;
		$("#curr").html(hours + " hours and " +
				minutes + " minutes until school");
	}
}

function setBackground() {
}

function isIn(now, start, end) {
	return start <= now && now < end;
}

$( document ).ready(function() {

	$("#content").hide();
	updateTime(regSchedule);
	updateSchedule(regSchedule);
	$("#content").fadeIn(1500);
	setInterval( "updateTime()", 1000 );

	

});

