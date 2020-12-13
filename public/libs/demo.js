// Call this from the developer console and you can control both instances
var calendars = {};
const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const API_KEY = "token=-wT5U3k_8APimS4Imb-23ieRQX2xXbo1MmmJF0zMwX3Ajnbsezk";
$(document).ready( function() {
    console.info(
        'Welcome to the CLNDR demo. Click around on the calendars and' +
        'the console will log different events that fire.');
        
    var eventArray = [];
    var indexRequest = new XMLHttpRequest();
    indexRequest.open('GET', PROXY_URL+'https://api.pandascore.co/ow/matches?per_page=100&&' + API_KEY);
    indexRequest.onload = function() {
        matches = JSON.parse(indexRequest.responseText);
        for(i = 0; i < matches.length; i++){
            eventArray[i] = {
            title: matches[i].name,
            date: (matches[i].original_scheduled_at).substring(0,10)
            }
        }
        console.log(eventArray)
        calendars.clndr1 = $('.cal1').clndr({
            events: eventArray,
            clickEvents: {
                click: function (target) {
                    console.log('Cal-1 clicked: ', target.events);
                    for(i=0;i<(target.events).length;i++){
                        console.log(target.events[i].title);
                    }
                },
            showAdjacentMonths: true,
            adjacentDaysChangeMonth: false
        });
    
        // Bind all clndrs to the left and right arrow keys
        $(document).keydown( function(e) {
            // Left arrow
            if (e.keyCode == 37) {
                calendars.clndr1.back();
            }
    
            // Right arrow
            if (e.keyCode == 39) {
                calendars.clndr1.forward();
            }
        });
    }
    indexRequest.send();    

    // Assuming you've got the appropriate language files,
    // clndr will respect whatever moment's language is set to.
    // moment.locale('ru');

    // Here's some magic to make sure the dates are happening this month.
    // Events to load into calendar


    // The order of the click handlers is predictable. Direct click action
    // callbacks come first: click, nextMonth, previousMonth, nextYear,
    // previousYear, nextInterval, previousInterval, or today. Then
    // onMonthChange (if the month changed), inIntervalChange if the interval
    // has changed, and finally onYearChange (if the year changed).

});




function loadMatches(){
    var newEvent={};
    var indexRequest = new XMLHttpRequest();
    indexRequest.open('GET', PROXY_URL+'https://api.pandascore.co/ow/matches?range[begin_at]=2020-12-01T17:00:00Z,2020-12-30T22:00:00Z&&' + API_KEY);
    indexRequest.onload = function() {
        matches = JSON.parse(indexRequest.responseText);
        for(i = 0; i < matches.length; i++){
            newEvent.title = matches[i].name;
            newEvent.ate = (matches[i].original_scheduled_at).substring(0,10);
            eventArray.push(newEvent)
        }
    }
    indexRequest.send();
}