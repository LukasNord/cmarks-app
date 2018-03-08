myApp.service('EventService', ['$http', '$location', function ($http, $location) {
    var self = this;

    self.upcomingEvents = { list: [] };
    self.pastEvents = { list: [] };


    // get speaker's upcoming events
    self.getUpcomingEvents = function () {
        //hard code for now, later take in speaker id
        let speaker_id = 1;
        $http.get(`/event/upcoming/${speaker_id}`)
            .then(function (response) {
                self.upcomingEvents.list = response.data;
                console.log(self.upcomingEvents.list);
            })
            .catch(function (error) {
                console.log('error getting events:', error);
            })
    } // end getUpcomingEvents

    //on load
    self.getUpcomingEvents();

    // get speaker's past events
    self.getPastEvents = function () {
        //hard code for now, later take in speaker id
        let speaker_id = 1;
        $http.get(`/event/past/${speaker_id}`)
            .then(function (response) {
                self.pastEvents.list = response.data;
                console.log(self.pastEvents.list);
            })
            .catch(function (error) {
                console.log('error getting events:', error);
            })
    } // end getPastEvents

    //on load
    self.getPastEvents();

    // change an event's status to complete
    self.completeEvent = function (event_id) {
        console.log('event id:', event_id);

        $http.put(`/event/complete/${event_id}`).then(function (response) {
            console.log('event completed!');
            self.getPastEvents();
            self.getUpcomingEvents();
        })
            .catch(function (error) {
                console.log('error completing event');
            })
    } //end completeEvent

    // add event
    self.addEvent = function (newEvent) {
        //hard code for now, later take in from input on DOM
        let event = {
            speaker_id: 1,
            speaker_name: 'Amy Richardson',
            title: 'Intro to Being the Best',
            location: 'Prime Digital Academy',
            date: '03/15/2018',
            start_time: '01:00 PM'
        } // end newEvent
        $http.post('/event', event).then(function (response) {
            console.log('event added!');
            //get events   
        })
            .catch(function (error) {
                console.log('uh oh, event did not add successfully');
            })
    } // end addEvent


    // edit event


    // get audience member's events

}]);