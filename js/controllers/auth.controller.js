/*********************** Controller de la page d'authentification ****************/
app.controller('AuthCtrl', function($rootScope, $scope, $state, LocalStorageFactory, UserFactory) {

    //Stockage du this
    var auth = this;

    //Authentification GMAIL success
    function onSignIn(googleUser) {

        var profile = googleUser.getBasicProfile();
        var id_token = googleUser.getAuthResponse().id_token;

        //Récupérer les datas stockées dans le localstorage
        var datas = LocalStorageFactory.getItem('followyourmoney');

        //Si rien défini dans le localstorage, on créé l'item avec l'utilisateur
        if (datas == null) {
            datas = {};

            datas[id_token] = {
                'userdata': {
                    'fullname': profile.getGivenName(),
                    'givename': profile.getGivenName(),
                    'familyname': profile.getFamilyName(),
                    'imgurl': profile.getImageUrl(),
                },
                'datas': {}
            }
        }

        //Update du localstorage
        LocalStorageFactory.setItem('followyourmoney', datas);

        var userDatas = {
            'isLogged' : true,
            'avatar'   : profile.getImageUrl(),
            'givename' : profile.getGivenName(),
        };

        UserFactory.setUser(userDatas);
        $scope.user = UserFactory.getUser();
    
        //Redirection vers la home page
        $state.go('home');

    };

    //Accessibilité de la fonction
    window.onSignIn = onSignIn;

});