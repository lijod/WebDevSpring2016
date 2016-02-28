(function() {

    angular
        .module("GadgetGuruApp")
        .controller("MainController", MainController);

    function MainController($scope, $state) {
        $scope.$state = $state;
    }

})();