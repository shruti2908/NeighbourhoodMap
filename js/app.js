//Udacity Neighbourhood Map Project
// Name: Shruti Upreti
//email: shrutiupreti.nmims@gmail.com
//References: Googlemaps API, MediaWiki API, Open source fonts
//Declared global variables
var map;
var bounds;
var marker;
var markers= [];
var largeInfowindow;

//Contains all the locations in initialLocations(Model)
var initialLocations = [
  { 
    name: 'Law Garden',
    location:{lat: 23.026473,lng: 72.560664},
    address:'Netaji Road, Ellisbridge, Maharashtra Society, Ellisbridge, Ahmedabad, Gujarat 380009'},

  { 
    name: 'Parimal Garden' ,
    location:{lat: 23.020212, lng: 72.556125},
    address:'Parimal Cross Road, Ambawadi, Panchavati Society, Ambawadi, Ahmedabad, Gujarat 380006'},
  { 
    name: 'KFC CG Road',
    location:{lat:23.021579, lng:72.557739},
    address:'No 2, 3rd Eye Building, Chimanlal Girdharlal Road, Opp Parimal Garden, Navrangpura, Ellisbridge, Ahmedabad, Gujarat 380009'},
  { 
    name: 'CEPT University',
    location:{lat: 23.038159, lng:72.549927},
    address:'Kasturba Lalabhai Campus, University Road, Vasant Vihar, Navrangpura, University Area, Ahmedabad, Gujarat 380009'},
  { 
    name: 'Jalaram Chachh',
    location:{lat: 23.036117,lng: 72.563533},
    address:'Kimsim Complex, Near Swastik Chaurastha, Navrangpura Road, Navrangpura, Shrimali Society, Navrangpura, Ahmedabad, Gujarat 380009'},
  { 
    name: 'Shiv Cinema',
    location:{lat: 23.031782, lng: 72.571531},
    address:'Opp. City Gold Cinema, Near Atma House, Ashram Road, Vishalpur, Muslim Society, Navrangpura, Ahmedabad, Gujarat 380015'},
  { 
    name: 'Passport Seva Kendra',
    location:{lat: 23.032738,lng: 72.566246},
    address:'Ground & First Floor, Arya Arcade, Netaji Road, Near Mithakhali, Navrangpura, Mithakhali, Navrangpura, Ahmedabad, Gujarat 380009'},
  { 
    name: 'Four Points By Sheraton',
    location:{lat: 23.022579, lng: 72.568913},
    address:'Opposite Gujarat College, Ellis Bridge, Ellisbridge, Ahmedabad, Gujarat 380006'},
  { 
    name: 'Central',
    location:{lat: 23.020925, lng: 72.555271},
    address: 'C.G. ROAD, KOLONNADE CENTRE, OPP. SAFFRON TOWER,AMBAVADI, Panchavati Society, Ambawadi, Ahmedabad, Gujarat 380006'},
  { 
    name: 'National Handloom',
    location:{lat: 23.028264, lng: 72.558973},
    address:'Near Mansarovar Apartment, Chimanlal Girdharlal Rd, Ellisbridge, Ahmedabad, Gujarat 380009'}
];

// Evaluates length of initialLocations object
var locationsLength = initialLocations.length;

//initMap: initialises the map
function initializeMap() {
  largeInfowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 23.026473, lng: 72.560664},
      zoom: 19,
      scrollwheel: true
    });

    for(i = 0;i < locationsLength; i++){
        marker = new google.maps.Marker({
            map: map,
            position: initialLocations[i].location,
            title: initialLocations[i].name,
            address: initialLocations[i].address,
            animation: google.maps.Animation.DROP
        }); 

        //Create a marker for the initialLocations array to store the every marker for their associated locations.
        initialLocations[i].marker = marker;
        markers.push(marker);

        //Opens infowindow by clicking the marker
        marker.addListener('click', function() {
        animateMarker(this);
        populateInfoWindow(this, largeInfowindow);
    });     
  }

  bounds = new google.maps.LatLngBounds();
  
  //Fits the markers as window resizes
  google.maps.event.addDomListener(window, 'load', displayMarkerList);
  google.maps.event.addDomListener(window, 'resize', displayMarkerList);
  
  //Displays markers on the listed location
  function displayMarkerList () {
    map.setCenter({lat: 42.150897, lng: -77.079306});
          for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
            bounds.extend(markers[i].position);
          }
      map.fitBounds(bounds);      
    }   
  ko.applyBindings(new appViewModel());
}

// Animation for marker
function animateMarker(marker) {
  if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.DROP);
    }
}

//creates infowindow
function populateInfoWindow(marker, infowindow) {
  var streetUrl = 'https://maps.googleapis.com/maps/api/streetview?size=200x100&location=' + marker.address +'';
  //Reference: MediaWiki API
  //AJAX function to call wikipedia API to get the location details
  var wikiRequestTimeout = setTimeout(function(){
        infowindow.setContent("Oops! Couldn't load wikipedia resources for" + '<div>' + marker.title + '</div>');
        infowindow.open(map,marker);
    },1000);
  var url_Wikipedia = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json&callback=wikiCallback';
  $.ajax({
    url: url_Wikipedia,
    dataType: "jsonp",
    success: function( response ) {
      var article = response[2];
      var link = response[3];
      if(infowindow.marker != marker) {
            infowindow.marker = marker;
              infowindow.setContent('<li><a href="' + link +'">'+ marker.title +'</a></li>'+'<div>'+ marker.address +'</div>'+'<div>' + article + '</div>'+'<img class="bgimg" src="' + streetUrl + '">');
              infowindow.open(map, marker);

              // Checks if marker property is cleared
              infowindow.addListener('closeclick', function() {
              infowindow.marker = null;
              map.fitBounds(bounds);
            });
          }
          clearTimeout(wikiRequestTimeout);
    }
  });
}

//ViewModel function     
var appViewModel = function(){

  this.initialLocations = ko.observable(initialLocations);

  //This function displays the infowindow by clicking on the location in list and performs location match with the model data and also toggles the marker
  this.showInfoWindow = function(place){
    for(var i = 0; i < locationsLength; i++){
      if(place.name === initialLocations[i].name){
        var markerNewRef = markers[i];
        animateMarker(markerNewRef);
        populateInfoWindow(markerNewRef, largeInfowindow);
      }
    }
  };

  this.queryLocations = ko.observable('')
  this.loc = ko.computed(function(){
    
    map.fitBounds(bounds);
    largeInfowindow.close();
    var queryLocations = this.queryLocations().toLowerCase();
    return ko.utils.arrayFilter(this.initialLocations(), function(list) {
      var result = list.name.toLowerCase().indexOf(queryLocations) > -1;
      list.marker.setVisible(result);
      return result;
    }); 
  },this);
};
