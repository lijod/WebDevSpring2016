(function() {

    angular
        .module("GadgetGuruApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $state) {
        $scope.$state = $state;
    }
})();