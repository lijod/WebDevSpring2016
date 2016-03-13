"use strict";
(function() {

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $location){

        var vm = this;
        vm.logOut = logOut;
        console.log("1");

        function logOut() {
            console.log("2");
            delete $rootScope.user;
            $location.url("/home");
            console.log("3");
        }

    }

})();