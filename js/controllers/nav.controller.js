/*********************** Controller du menu ****************/
app.controller('NavCtrl', function($scope,UserFactory) {

    //Stockage du this
    var nav = this;

    var intrv = setInterval(function(){

        if($scope.user == undefined){
            $scope.user = UserFactory.getUser();
        }
        else{
            $scope.$apply();
            clearInterval(intrv);
        }
    },300);
    
});