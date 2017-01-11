 //MVVM for Neighbourhood Map

 // var markers = [];
 //Declares global variables
 var map;
 var infoWindow;
 // Contains all the locations and search function
 var locations = [
		{ title: 'Law Garden', location:{lat: 23.026473,lng: 72.560664}},
		{ title: 'KFC CG Road', location:{lat:23.021579, lng:72.557739}},
		{ title: 'CEPT University', location:{lat: 23.038159, lng:72.549927}},
		{ title: 'National Handloom', location:{lat: 23.028264, lng: 72.558973}},
		{ title: 'Comfort Inn President Hotel', location:{lat:23.035006,lng: 72.560181}},
		{ title: 'Passport Seva Kendra', location:{lat: 23.032738,lng: 72.566246}},
		{ title: 'Gandhigram Railway', location:{lat:23.026787,lng: 72.567869}},
		{ title: 'Jalaram Chachh', location:{lat: 23.036117,lng: 72.563533}},
		{ title: 'Doctor House', location:{lat: 23.019928, lng:72.558312}},
		{ title: 'Parimal Garden', location:{lat: 23.020212, lng: 72.556125}}

	]; 
 

//Holds information about a Location in a window  
	var Location = function(data) {
	var self = this;
	this.title = data.title;
	this.lat = data.lat;
	this.lng = data.lng;
	this.street = "";
	this.city = "";
	this.URL = "";

	this.visible = ko.observable(true);
	 // var largeInfowindow = new google.maps.InfoWindow();
  //    var bounds = new google.maps.LatLngBounds();

     for (var i = 0; i < locations.length; i++) {
          // Gets the position from the location array.
          var position = locations[i].location;
          var title = locations[i].title;
          // Creates a marker per location, then puts into markers array.
          var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
          });
          // Push the marker to array of markers.
          markers.push(marker);
          // Create an onclick event to open an infowindow at each marker.
          marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
          });
          bounds.extend(markers[i].position);
        }
        // Extend the boundaries of the map for each marker
        map.fitBounds(bounds);
      }

function AppViewModel() {

	var self = this;

	function initMap(){
  	map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          scrollwheel: true,
          zoom: 14
        });
  	//When map doesnt load
 	if (typeof google != ('object')) {
	$('#map').append("<h2>Oops! Looks like there is some problem loading the maps..</h2>");
}
	infoWindow = new google.maps.InfoWindow({ content: "contentStr" }); 

}