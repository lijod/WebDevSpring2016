(function () {

    angular
        .module("GadgetGuruApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $state, UserService) {
        $scope.login = login;

        function login(username, password) {
            console.log("login... " + username);
            UserService.findUserByCredentials(username, password)
                .then(function (response) {
                        redirectUserToProfileIfValid(response.data);
                    },
                    function () {
                        console.log("error LoginController->login->findUserByCredentials")
                    });
        }

        function redirectUserToProfileIfValid(user) {
            console.log("Redirecting user: ");
            console.log(user);
            if(user != null){
                UserService.setCurrentUser(user);
                $state.go("profile", {userId: user._id});
            } else {
                alert("Username and password doesn't exist!")
            }
        }
    }
})();