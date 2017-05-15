/* (c) 2017 Kate, Maria & Tiffany 
	Workshop/TP : Follow Your Money App
	Angular JS, WPA
*/

var app = angular.module('app',['ui.router']);

/*** APP CONFIGURATION ***/
// Injection de deux services : stateProvier et urlRouterProvider pour gérer les URLS
app.config(function($stateProvider,$urlRouterProvider){

	//Enregistrement des états
	//RequireLogin permet en mettant a true ou a false de changer facilement les droits d'acces aux pages
	$stateProvider
		.state('auth',{
			url: '/',
			templateUrl: 'views/auth.html',
			controller: 'AuthCtrl',
			controllerAs: 'auth',
			data: {
		        requireLogin: false
		    }
		})
		.state('home',{
			url: '/list',
			templateUrl: 'views/home.html',
			controller: 'HomeCtrl',
			controllerAs: 'home',
			data: {
		        requireLogin: false
		    }
		})
		.state('form',{
			url: '/new',
			templateUrl: 'views/form.html',
			controller: 'FormCtrl',
			controllerAs: 'form',
			data: {
		        requireLogin: false
		    }
		})

	//Route par défaut si on tente de naviguer autre part que vers les états précédemment définis
	$urlRouterProvider.otherwise('/');
	
});

//Gère l'accès aux pages en fonction de si le user est connecté et s'il a les droits pour voir la page
app.run(function ($rootScope,$state) {

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

  	//Récupération du booléan
    var requireLogin = toState.data.requireLogin;

    //Test si le user a acces a la page ou non
    if (requireLogin && ($rootScope.currentUser === null || $rootScope.currentUser === undefined)){
    	event.preventDefault();
    	return $state.go('auth');
    }
  });

});
