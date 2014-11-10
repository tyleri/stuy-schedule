function updateTime() {
	var time = new Date();
	var hours = time.getHours();
	var minutes = time.getMinutes();
	var seconds = time.getSeconds();
	var timeOfDay = "";

	if (hours > 12) {
		timeOfDay = "PM";
		hours = hours - 12;
	} else
		timeOfDay = "AM";

	minutes = (minutes < 10 ? "0" : "") + minutes;
	seconds = (seconds < 10 ? "0" : "") + seconds;

	var timeStr = hours + ":" + minutes + ":" + seconds + " " + timeOfDay;

	document.getElementByID("clock").firstChild.nodeValue = timeStr;
}
