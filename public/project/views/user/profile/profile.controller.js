(function() {

    angular
        .module("GadgetGuruApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($http, $scope, $state) {
        $scope.$state = $state;
    }
})();