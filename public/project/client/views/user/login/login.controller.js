(function () {

    angular
        .module("GadgetGuruApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {
        $scope.login = login;

        function login(username, password) {
            console.log("login... " + username);
            UserService.findUserByCredentials(username, password)
                .then(function (response) {
                        redirectUserToProfileIfValid(response.data);
                    },
                    function () {
                        console.log("error LoginCOntroller->login->findUserByCredentials")
                    });
        }

        function redirectUserToProfileIfValid(user) {
            console.log(user);
            console.log("Redirecting user: ");
            if (user != null) {
                $rootScope.user = user;
                $location.url("/profile");
            }
        }
    }
})();