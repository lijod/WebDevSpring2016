(function() {

    angular
        .module("GadgetGuruApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $state) {
        var vm = this;
        vm.state = $state;

        console.log($scope.profileModel.paramUser);
        console.log($scope.profileModel.loggedInUser);

    }
})();