//Udacity Neighbourhood Map Project
// Name: Shruti Upreti
//email: shrutiupreti.nmims@gmail.com
//References: Googlemaps API, MediaWiki API(Wikipedia API), Open source Google Fonts, https://www.knockmeout.net/2011/04/utility-functions-in-knockout.js.html

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


//Contains all the locations in myLocations (Model)
var myLocations = [
  { 
    name: 'Law Garden',
    location:{lat: 23.026473,lng: 72.560664},
    address:'Netaji Road, Ellisbridge, Maharashtra Society, Ellisbridge, Ahmedabad, Gujarat 380009',
    phone: "No Contact Information",
    url: '-'
  },

  { 
    name: 'Parimal Garden' ,
    location:{lat: 23.020212, lng: 72.556125},
    address:'Parimal Cross Road, Ambawadi, Panchavati Society, Ambawadi, Ahmedabad, Gujarat 380006',
    phone: "No Contact Information",
    url: '-'
  },
  { 
    name: 'KFC CG Road',
    location:{lat:23.021579, lng:72.557739},
    address:'No 2, 3rd Eye Building, Chimanlal Girdharlal Road, Opp Parimal Garden, Navrangpura, Ellisbridge, Ahmedabad, Gujarat 380009',
    phone: 07940099900,
    url: 'https://www.kfc.co.in/menuwow.php'
  },
  { 
    name: 'CEPT University',
    location:{lat: 23.038159, lng:72.549927},
    address:'Kasturba Lalabhai Campus, University Road, Vasant Vihar, Navrangpura, University Area, Ahmedabad, Gujarat 380009',
  	phone: 07926302470,
  	url: 'http://www.cept.ac.in/'
  },

  { 
    name: 'Jalaram Chachh',
    location:{lat: 23.036117,lng: 72.563533},
    address:'Kimsim Complex, Near Swastik Chaurastha, Navrangpura Road, Navrangpura, Shrimali Society, Navrangpura, Ahmedabad, Gujarat 380009',
 	phone: 09512577449,
 	url: '-'
  },

  { 
    name: 'Shiv Cinema',
    location: {lat: 23.031782, lng: 72.571531},
    address:'Opp. City Gold Cinema, Near Atma House, Ashram Road, Vishalpur, Muslim Society, Navrangpura, Ahmedabad, Gujarat 380015',
    phone: 07933016909,
    url: 'https://www.pvrcinemas.com/;jsessionid=EEE9BC89A61E184381E31D354ADA177A'
  },

  { 
    name: 'Passport Seva Kendra',
    location: {lat: 23.032738,lng: 72.566246},
    address:'Ground & First Floor, Arya Arcade, Netaji Road, Near Mithakhali, Navrangpura, Mithakhali, Navrangpura, Ahmedabad, Gujarat 380009',
    phone: 07926309107,
    url: 'http://passportindia.gov.in/AppOnlineProject/welcomeLink'
  },
  
  { 
    name: 'Four Points By Sheraton',
    location: {lat: 23.022579, lng: 72.568913},
    address:'Opposite Gujarat College, Ellis Bridge, Ellisbridge, Ahmedabad, Gujarat 380006',
    phone: 07930912345,
    url: 'http://www.starwoodhotels.com/fourpoints/property/overview/index.html?propertyID=3927'
  },
  
  { 
    name: 'Central',
    location: {lat: 23.020925, lng: 72.555271},
    address: 'C.G. ROAD, KOLONNADE CENTRE, OPP. SAFFRON TOWER,AMBAVADI, Panchavati Society, Ambawadi, Ahmedabad, Gujarat 380006',
    phone: 07930481777,
    url: '-'
  },

  { 
    name: 'National Handloom',
    location: {lat: 23.028264, lng: 72.558973},
    address:'Near Mansarovar Apartment, Chimanlal Girdharlal Rd, Ellisbridge, Ahmedabad, Gujarat 380009',
    phone: 07926403474,
    url: '-'
  },

  { 
   name: 'Jade Blue',
   location: {lat:23.0285, lng: 72.5585},
   address:'B-61,, Pariseema Complex, Chimanlal Girdharlal Road, Ellisbridge, Ahmedabad, Gujarat 380006',
   phone: 07926468182,
   url: 'https://jadeblue.com/'
  },

  { 
   name: 'Alfa Bazaar',
   location: {lat: 23.025017, lng: 72.559373},
   address:'Alpha Bazzar , Opposite Thakorebhai Desai Hall, Law Garden, Netaji Rd, Ellisbridge, Ahmedabad, Gujarat 380006',
   phone: 09227888002,
   url: '-'
  },

  { 
   name: 'Radisson Blu Hotel',
   location: {lat: 23.0233, lng: 72.5569},
   address:'Near Panchvati Cross Roads, Off C.G. Road, Ambawadi, Ellisbridge, Ahmedabad, Gujarat 380006',
   phone: 07940501234,
   url: 'https://www.radissonblu.com/en/hotel-ahmedabad'
  },

  { 
   name: 'State Bank of India',
   location: {lat: 23.028723, lng: 72.560972},
   address:'Netaji Rd, Sardar Patel Nagar Cross Road, Opp Law Garden, Ellisbridge, Ellisbridge, Ahmedabad, Gujarat 380009',
   phone: 18004253800,
   url: 'https://www.sbi.co.in/'
  },

  { 
   name: 'Marks and Spencer',
   location: {lat: 23.0244736, lng: 72.5543167},
   address:'AlphaOne City Center, C G Square Mall, Near Panchvati Circle, CG Road, AlphaOne City Center, Ellisbridge, Ahmedabad, Gujarat 380009',
   phone: 08511143250,
   url: 'https://www.marksandspencer.com/'
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
            url: myLocations[i].url,
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
  	
          for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
            bounds.extend(markers[i].position);
          }
      map.fitBounds(bounds);      
    }   
  ko.applyBindings(new AppViewModel());
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
  var url_Wikipedia = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json&callback=wikiCallback';
  $.ajax({
    url: url_Wikipedia,
    dataType: "jsonp",
    }).done(function( wikiResponse ) {

    	var article = wikiResponse[2];
      	var link = wikiResponse[3];
      	info_window.marker = marker;
        info_window.setContent('<h1><a href="' + link +'"><strong>'+ marker.title +'</a></h1></strong>' + '<strong>' + "Address:" + '</strong>' + '<p><em>'+ marker.address + '<p><strong>' + "Contact: " + '</strong></p>' + '<p>' + marker.phone + '</p>' + '</em></p>' + '<p><strong>' + "Website: " + '</strong></p>' + '<a href="' + marker.url +'">' + marker.url + '</a><br><br>' + '<div class="article">' + article + '</div><br>'+'<img class="wiki_img" src="' + streetViewUrl + '">');
        info_window.open(map, marker);
        console.log(link);
        if (article.length < 1) {
                  $("a").append("<p>No wikipedia information available</p>");
            }

    	}).fail(function (jqXHR, textStatus) {
                    alert("failed to load wikipedia resources");
                    }); 
}
  

 
//ViewModel function     
var AppViewModel = function(){

  var self = this;

  self.myLocations = ko.observable(myLocations);

  //This function displays the infowindow by clicking on the location in list.
  // Performs location match with the model data(myLocations) and also toggles the marker
  self.showInfoWindow = function(place){
    for(var i = 0; i < myLocations.length; i++){
      if(place.name === myLocations[i].name){
        var newMarker = markers[i];
        animateMarker(newMarker);
        populateInfoWindow(newMarker, locInfowindow);
      }
    }
  };

  self.queryLocations = ko.observable('');
  self.loc = ko.computed(function(){
    
    map.fitBounds(bounds);
    locInfowindow.close();
    var queryLocations = self.queryLocations().toLowerCase();

    //Reference: https://www.knockmeout.net/2011/04/utility-functions-in-knockout.js.html
    //Filters the myLocations array as per the input and sets the corresponding marker to visible
    return ko.utils.arrayFilter(self.myLocations(), function(list) {
      var search_result = list.name.toLowerCase().indexOf(queryLocations) > -1;
      list.marker.setVisible(search_result);
      return search_result;
    }); 
  },self);
};
