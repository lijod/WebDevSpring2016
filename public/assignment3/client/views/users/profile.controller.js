"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, UserService) {

        var vm = this;

        function init() {
            var loggedInUser = UserService.getCurrentUser();

            if(loggedInUser === undefined) {
                $location.url("/home");
                return;
            }

            vm.user = loggedInUser;

            vm.update = update;
        }

        init();

        function update(user) {

            UserService.updateUser(user._id, user, function(updatedUser) {
                UserService.setCurrentUser(updatedUser);
                console.log("Updated:");
                console.log(updatedUser);
            });

        }
    }
})();
