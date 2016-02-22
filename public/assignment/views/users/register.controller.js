"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {

        $scope.register = register;

        function register(user) {
            UserService.createUser(user, redirectUserToProfileIfValid);
        }

        function redirectUserToProfileIfValid(user) {
            console.log("Redirecting user: ");
            console.log(user);
            if(user != null){
                $rootScope.user = user;
                $location.url("/profile")
            }
        }

    }
})();