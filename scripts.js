var regSchedule = [
	{name: "Before School", value: new Date(2015,0,1,8)},
	{name: "Period 1", value: new Date(2015,0,1,8,41)},
	{name: "Before Period 2", value: new Date(2015,0,1,8,45)},
	{name: "Period 2", value: new Date(2015,0,1,9,26)},
	{name: "Before Period 3", value: new Date(2015,0,1,9,31)},
	{name: "Period 3", value: new Date(2015,0,1,10,15)},
	{name: "Before Period 4", value: new Date(2015,0,1,10,20)},
	{name: "Period 4", value: new Date(2015,0,1,11,1)},
	{name: "Before Period 5", value: new Date(2015,0,1,11,6)},
	{name: "Period 5", value: new Date(2015,0,1,11,47)},
	{name: "Before Period 6", value: new Date(2015,0,1,11,52)},
	{name: "Period 6", value: new Date(2015,0,1,12,33)},
	{name: "Before Period 7", value: new Date(2015,0,1,12,38)},
	{name: "Period 7", value: new Date(2015,0,1,13,19)},
	{name: "Before Period 8", value: new Date(2015,0,1,13,24)},
	{name: "Period 8", value: new Date(2015,0,1,14,5)},
	{name: "Before Period 9", value: new Date(2015,0,1,14,9)},
	{name: "Period 9", value: new Date(2015,0,1,14,50)},
	{name: "Before Period 10", value: new Date(2015,0,1,14,54)},
	{name: "Period 10", value: new Date(2015,0,1,15,35)}
];


function updateSchedule() {
	for (var i = 0; i < regSchedule.length; i++) {
		var str = regSchedule[i].value.toLocaleTimeString() + " - ";
		i++;
		str += regSchedule[i].value.toLocaleTimeString();
		$("#Period" + (i+1)/2).html(str);
	}
}

function updateTime() {
	var time = new Date();
	time.setFullYear(2015,0,1);
	var timeStr = time.toLocaleTimeString();

	$("#clock").html(timeStr);

	for (var i = 0; i < regSchedule.length; i++) {
		if (time < regSchedule[i].value) {
			$("#curr").html(regSchedule[i].name);
			break;
		} else {
			$("#curr").html("After School");
		}
	}
}

function setBackground() {
}

$( document ).ready(function() {

	$("#content").hide();
	updateTime();
	$("#content").fadeIn(1500);
	setInterval( "updateTime()", 1000 );
	updateSchedule();

});

