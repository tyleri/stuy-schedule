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


function updateSchedule() {
	for (var i = 1; i < regSchedule.length; i++) {
		var str = "<td>" + "Period " + i + "</td>";
		str += "<td>";
		str += regSchedule[i].start.toLocaleTimeString() + " - ";
		str += regSchedule[i].end.toLocaleTimeString();
		str += "</td>";
		$("#Period" + i).html(str);
	}
}

function updateTime() {
	// Updates current time
	var time = new Date();
	time.setFullYear(2015,0,1);
	$("#clock").html( time.toLocaleTimeString() );

	// Updates current period
	for (var i = 1; i < regSchedule.length; i++) {
		if ( isIn(time,regSchedule[i-1].end,regSchedule[i].start) ) {
			$("#curr").html("Before Period " + i);
		} else if ( isIn(time,regSchedule[i].start,regSchedule[i].end) ) {
			$("#curr").html("Period " + i);
			$("#Period" + i)
				.animate({backgroundColor: "blue"}, 1000)
				.css("font-weight", "bold");
		} else {
			$("#Period" + i)
				.animate({backgroundColor: "transparent"}, 1000)
				.css("font-weight", "normal");
		}
	}
	// If not during school
	if (time < regSchedule[0].start || time > regSchedule[0].end) {
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
	return start <= now && now <= end;
}

$( document ).ready(function() {

	$("#content").hide();
	updateTime();
	$("#content").fadeIn(1500);
	setInterval( "updateTime()", 1000 );
	updateSchedule();

});

