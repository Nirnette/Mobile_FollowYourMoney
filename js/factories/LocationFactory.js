/**
 * Created by root on 16/05/17.
 */

/************** LOCATION FACTORY ********************/
app.factory('LocationFactory', function($http){

    return {
        getTown: function() {
             return $http.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAA15EyEGQPsSjdn0GiGUT1cLaJJSaRYxE')
                       .then(function(result) {
                            return $http.post("https://maps.googleapis.com/maps/api/geocode/json?latlng="+result.data.location.lat+", "+result.data.location.lng+"&key=AIzaSyBlc0uZkF11VDTTgI56o3e1KS_z8aVKh0A")
                                .then(function(result) {
                                     return result.data.results[5].formatted_address;
                                });
                        });
        }
   }

});

