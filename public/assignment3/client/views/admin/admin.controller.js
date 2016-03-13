"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($rootScope, $location) {
        function init() {
            var loggedInUser = $rootScope.user;

            if(loggedInUser === undefined) {
                $location.url("/home");
                return;
            }
        }

        init();
    }

})();
