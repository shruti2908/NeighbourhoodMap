//Udacity Neighbourhood Map Project
// Name: Shruti Upreti
//email: shrutiupreti.nmims@gmail.com
//References: Googlemaps API, MediaWiki API(Wikipedia API), Open source Google Fonts

//When google maps fail to load
function errorHandling() {
    alert("Oops! Looks like there has been some issue loading the maps");
    $('#map-canvas').html("Please try again later"); 
}

//Declared global variables
var map;
var bounds;
var locInfowindow;
var marker;
var markers= [];


//Contains all the locations in myLocations(Model)
var myLocations = [
  { 
    name: 'Law Garden',
    location:{lat: 23.026473,lng: 72.560664},
    address:'Netaji Road, Ellisbridge, Maharashtra Society, Ellisbridge, Ahmedabad, Gujarat 380009',
    phone: "No Contact Information"
  },

  { 
    name: 'Parimal Garden' ,
    location:{lat: 23.020212, lng: 72.556125},
    address:'Parimal Cross Road, Ambawadi, Panchavati Society, Ambawadi, Ahmedabad, Gujarat 380006',
    phone: "No Contact Information"
  },
  { 
    name: 'KFC CG Road',
    location:{lat:23.021579, lng:72.557739},
    address:'No 2, 3rd Eye Building, Chimanlal Girdharlal Road, Opp Parimal Garden, Navrangpura, Ellisbridge, Ahmedabad, Gujarat 380009',
    phone: 07940099900
  },
  { 
    name: 'CEPT University',
    location:{lat: 23.038159, lng:72.549927},
    address:'Kasturba Lalabhai Campus, University Road, Vasant Vihar, Navrangpura, University Area, Ahmedabad, Gujarat 380009',
  	phone: 07926302470
  },

  { 
    name: 'Jalaram Chachh',
    location:{lat: 23.036117,lng: 72.563533},
    address:'Kimsim Complex, Near Swastik Chaurastha, Navrangpura Road, Navrangpura, Shrimali Society, Navrangpura, Ahmedabad, Gujarat 380009',
 	phone: 09512577449
  },

  { 
    name: 'Shiv Cinema',
    location: {lat: 23.031782, lng: 72.571531},
    address:'Opp. City Gold Cinema, Near Atma House, Ashram Road, Vishalpur, Muslim Society, Navrangpura, Ahmedabad, Gujarat 380015',
    phone: 07933016909
  },

  { 
    name: 'Passport Seva Kendra',
    location: {lat: 23.032738,lng: 72.566246},
    address:'Ground & First Floor, Arya Arcade, Netaji Road, Near Mithakhali, Navrangpura, Mithakhali, Navrangpura, Ahmedabad, Gujarat 380009',
    phone: 07926309107
  },
  
  { 
    name: 'Four Points By Sheraton',
    location: {lat: 23.022579, lng: 72.568913},
    address:'Opposite Gujarat College, Ellis Bridge, Ellisbridge, Ahmedabad, Gujarat 380006',
    phone: 07930912345
  },
  
  { 
    name: 'Central',
    location: {lat: 23.020925, lng: 72.555271},
    address: 'C.G. ROAD, KOLONNADE CENTRE, OPP. SAFFRON TOWER,AMBAVADI, Panchavati Society, Ambawadi, Ahmedabad, Gujarat 380006',
    phone: 07930481777
  },

  { 
    name: 'National Handloom',
    location: {lat: 23.028264, lng: 72.558973},
    address:'Near Mansarovar Apartment, Chimanlal Girdharlal Rd, Ellisbridge, Ahmedabad, Gujarat 380009',
    phone: 07926403474
  },

  { 
   name: 'Jade Blue',
   location: {lat:23.0285, lng: 72.5585},
   address:'B-61,, Pariseema Complex, Chimanlal Girdharlal Road, Ellisbridge, Ahmedabad, Gujarat 380006',
   phone: 07926468182
  },

  { 
   name: 'Alfa Bazaar',
   location: {lat: 23.025017, lng: 72.559373},
   address:'Alpha Bazzar , Opposite Thakorebhai Desai Hall, Law Garden, Netaji Rd, Ellisbridge, Ahmedabad, Gujarat 380006',
   phone: 09227888002
  },
  { 
   name: 'Radisson Blu Hotel',
   location: {lat: 23.0233, lng: 72.5569},
   address:'Near Panchvati Cross Roads, Off C.G. Road, Ambawadi, Ellisbridge, Ahmedabad, Gujarat 380006',
   phone: 07940501234
  },
  { 
   name: 'State Bank of India',
   location: {lat: 23.028723, lng: 72.560972},
   address:'Netaji Rd, Sardar Patel Nagar Cross Road, Opp Law Garden, Ellisbridge, Ellisbridge, Ahmedabad, Gujarat 380009',
   phone: 18004253800
  },
  { 
   name: 'Marks and Spencer',
   location: {lat: 23.0244736, lng: 72.5543167},
   address:'AlphaOne City Center, C G Square Mall, Near Panchvati Circle, CG Road, AlphaOne City Center, Ellisbridge, Ahmedabad, Gujarat 380009',
   phone: 08511143250
  }

];

//initializeMap: initialises the map
function initializeMap() {
  locInfowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: {lat: 23.026473, lng: 72.560664},
      zoom: 19,
      scrollwheel: true
    });
    //specifies properties of marker
    for(i = 0;i < myLocations.length; i++){
        marker = new google.maps.Marker({
            map: map,
            position: myLocations[i].location,
            title: myLocations[i].name,
            address: myLocations[i].address,
            phone: myLocations[i].phone,
            animation: google.maps.Animation.BOUNCE,
            draggable: true
        }); 

        //Creates marker to store in their associated locations.
        myLocations[i].marker = marker;
        markers.push(marker);

        //When marker gets clicked, info window will open and marker will animate
        marker.addListener('click', function() {
        animateMarker(this);
        populateInfoWindow(this, locInfowindow);
    });     
  }
  //specifies bounds by taking in lat and long for a location
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
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

//creates infowindow
function populateInfoWindow(marker, info_window) {
  var streetViewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=200x100&location=' + marker.address +'';
  //AJAX function to call wikipedia API to get the location details
  var mediaWikiReqTimeout = setTimeout(function(){
        info_window.setContent("Oops! Couldn't load wikipedia resources for" + '<p><strong>' + marker.title + '</strong></p>');
        info_window.open(map,marker);
    },2000);
  var url_Wikipedia = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json&callback=wikiCallback';
  $.ajax({
    url: url_Wikipedia,
    dataType: "jsonp",
    success: function( response ) {
      var article = response[2];
      var link = response[3];
      if(info_window.marker != marker) {
            info_window.marker = marker;
              info_window.setContent('<h1><strong><a href="' + link +'">'+ marker.title +'</a></strong></h1>' + '<strong>' + "Address:" + '</strong>' + '<p><em>'+ marker.address + '<p><strong>' + "Contact: " + '</strong></p>' + '<p>' + marker.phone + '</p>' + '</em></p>'+'<div class="article">' + article + '</div><br>'+'<img class="wiki_img" src="' + streetViewUrl + '">');
              info_window.open(map, marker);

              // Checks if marker property is cleared
              info_window.addListener('closeclick', function() {
              info_window.marker = null;
              map.fitBounds(bounds);
            });
          }
          clearTimeout(mediaWikiReqTimeout);
    }
  });
}

//ViewModel function     
var appViewModel = function(){

  this.myLocations = ko.observable(myLocations);

  //This function displays the infowindow by clicking on the location in list.
  // Performs location match with the model data(myLocations) and also toggles the marker
  this.showInfoWindow = function(place){
    for(var i = 0; i < myLocations.length; i++){
      if(place.name === myLocations[i].name){
        var newMarker = markers[i];
        animateMarker(newMarker);
        populateInfoWindow(newMarker, locInfowindow);
      }
    }
  };

  this.queryLocations = ko.observable('')
  this.loc = ko.computed(function(){
    
    map.fitBounds(bounds);
    locInfowindow.close();
    var queryLocations = this.queryLocations().toLowerCase();
    return ko.utils.arrayFilter(this.myLocations(), function(list) {
      var result = list.name.toLowerCase().indexOf(queryLocations) > -1;
      list.marker.setVisible(result);
      return result;
    }); 
  },this);
};
