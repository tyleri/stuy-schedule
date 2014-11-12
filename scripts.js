$( document ).ready(function() {

	updateTime();
	setInterval( "updateTime()", 1000 );

});

function updateTime() {
	var time = new Date();
	var timeStr = time.toLocaleTimeString();

	$("#clock").html(timeStr);
}
