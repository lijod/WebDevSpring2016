"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($location, UserService) {
        function init() {
            //var loggedInUser = UserService.getCurrentUser();
            //
            //if(loggedInUser === undefined) {
            //    $location.url("/home");
            //    return;
            //}
        }

        init();
    }

})();
