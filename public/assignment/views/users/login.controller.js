(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {

        $scope.login = login;

        function login(username, password) {
            console.log("login... " + username)
            UserService.findUserByUsernameAndPassword(username, password, redirectUserToProfileIfValid);
        }

        function redirectUserToProfileIfValid(user) {
            console.log("User found: " + user);
            console.log(user);
            if(user != null){
                $rootScope.user = user;
                $location.url("/profile")
            }
        }
    }
})();
