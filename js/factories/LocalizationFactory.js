/**
 * Created by root on 16/05/17.
 */

/************** LOCALIZATION FACTORY ********************/
app.factory('LocalizationFactory', function($state){

    //Récupère les coordonnées GPS
    var getLatLng = function(){
        $.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAA15EyEGQPsSjdn0GiGUT1cLaJJSaRYxE", function( data ) {
            return data;
        });
    };

    if (getLatLng() != null && getLatLng() != undefined) {
        var getTown = function(){
            $.post("https://maps.googleapis.com/maps/api/geocode/json?latlng="+local.location.lat+", "+local.location.lng+"&key=AIzaSyBlc0uZkF11VDTTgI56o3e1KS_z8aVKh0A", function (result){
                console.log(result);
                return result.results[5].formatted_address;
            });
        };
    };

    return{
        getLatLng : getLatLng,
        getTown : getTown
    }
});

