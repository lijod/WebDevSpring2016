"use strict";
(function() {

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location){

        $scope.logOut = logOut;
        function logOut() {
            delete $rootScope.user;
            $location.url("/home");
        }

    }

})();