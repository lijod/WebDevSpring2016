(function() {

    angular
        .module("GadgetGuruApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($http, $scope, $state) {
        $scope.state = $state;
    }
})();