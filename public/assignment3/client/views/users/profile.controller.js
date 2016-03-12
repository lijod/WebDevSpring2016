"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, $location, UserService) {

        var loggedInUser = $rootScope.user;

        if(loggedInUser === undefined) {
            $location.url("/home");
            return;
        }

        $scope.user = loggedInUser;

        $scope.update = update;

        function update(user) {

            UserService.updateUser(user._id, user, function(updatedUser) {
                $rootScope.user = updatedUser;
                console.log("Updated:");
                console.log(updatedUser);
            });

        }
    }
})();
