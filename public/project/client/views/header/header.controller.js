"use strict";
(function() {

    angular
        .module("GadgetGuruApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($state, UserService) {
        var vm = this;

        function init() {
            vm.logOut = logOut;
        }

        init();

        function logOut() {
            UserService.invalidateCurrentSession()
                .then(function(response) {
                    UserService.setCurrentUser(null);
                    $state.go("home");
                },
                function(err) {
                    console.log("Error logging out");
                });
        }
    }
})();