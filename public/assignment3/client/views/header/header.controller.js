"use strict";
(function() {

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService){

        var vm = this;

        function init() {
            vm.logOut = logOut;
        }

        init();

        function logOut() {
            UserService.invalidateCurrentSession();
            $location.url("/home");
        }

    }

})();