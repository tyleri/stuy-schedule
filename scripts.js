$( document ).ready(function() {

	$("#clock").hide();
	updateTime();
	$("#clock").fadeIn(1500);
	setInterval( "updateTime()", 1000 );
	//setInterval( "setBackground()", 5000 );

});

function updateTime() {
	var time = new Date();
	var timeStr = time.toLocaleTimeString();

	$("#clock").html(timeStr);
}

function setBackground() {
}
