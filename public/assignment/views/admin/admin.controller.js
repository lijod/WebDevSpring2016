"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $rootScope, $location) {
        var loggedInUser = $rootScope.user;

        if(loggedInUser === undefined) {
            $location.url("/home");
            return;
        }
    }

})();
