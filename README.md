Stuyvesant Schedule
=============

You can find the website for this project at
[tyleri.github.io/stuy-schedule](http://tyleri.github.io/stuy-schedule).

This is a simple website used to keep track of the current period,
using the schedule of Stuyvesant High School. This project is based
off of the schedule website created by Mr. Peter Brooks, who teaches
at the school. You can find his original website at
[bert.stuy.edu/pbrooks/schedules/schedules.py][1].

[1]: http://bert.stuy.edu/pbrooks/schedules/schedules.py

For this website, I used
[Bootstrap](http://getbootstrap.com/)
and
[jQuery](https://jquery.com/)
, along with my own custom HTML, CSS, and JavaScript. Since
JavaScript doesn't have a separate Time class (only a Date class
that includes fields for time), I wrote my own class to better
implement the methods I needed for the function. The Time class
can be found at the top of the scripts.js file.

After creating the basic table for keeping track of the period, I
proceeded to add calendar and weather widgets. The calendar is a
Google Calendar generated widget that includes three sources: one
simply shows the weather, while the other two pulls in school events
from the calendar on the
[Stuyvesant website](http://stuy.enschool.org/).
The weather widget was provided by
[forecast.io](http://blog.forecast.io/forecast-embeds/)
and displays the weather info for Stuyvesant's latitude and
longitude coordinates, which were found using
[iTouchMap](http://itouchmap.com/latlong.html).
The favicon was provided by
[freefavicon.com](http://www.freefavicon.com/)
and was scaled to different sizes using
[realfavicongenerator.net](http://realfavicongenerator.net/).
The images for the tabs are from the
[Glyphicons](http://glyphicons.com/)
Halflings set included with Bootstrap.
