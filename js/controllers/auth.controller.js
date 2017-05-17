/*********************** Controller de la page d'authentification ****************/
app.controller('AuthCtrl', function($rootScope, $scope, $state, LocalStorageFactory, UserFactory) {

    //Stockage du this
    var auth = this;

    var datas = LocalStorageFactory.getItem('followyourmoney');

    if(datas !== null && datas !== undefined && datas.userdata.idtoken.length > 0){

        var userDatas = {
            'isLogged' : true,
            'avatar'   : datas.userdata.avatar,
            'givename' : datas.userdata.givename,
        };

        UserFactory.setUser(userDatas);
        $state.go('home');
    }

    //Authentification GMAIL success
    function onSignIn(googleUser) {

        var profile = googleUser.getBasicProfile();
        var id_token = googleUser.getAuthResponse().id_token;

        //Récupérer les datas stockées dans le localstorage
        var datas = LocalStorageFactory.getItem('followyourmoney');

        //Si rien défini dans le localstorage, on créé l'item avec l'utilisateur
        if (datas == null) {
            datas = {
                'userdata': {
                    'idtoken'   : id_token,
                    'fullname'  : profile.getGivenName(),
                    'givename'  : profile.getGivenName(),
                    'familyname': profile.getFamilyName(),
                    'avatar'    : profile.getImageUrl(),
                },
                'datas': []
            };
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