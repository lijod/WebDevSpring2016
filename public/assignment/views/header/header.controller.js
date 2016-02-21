(function() {

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location){

        $scope.isLoggedIn = isLoggedIn;
        function isLoggedIn() {
            return ($location.url() != '/home' && $location.url() != '/login' && $location.url() != '/register');
        }

    }

})();