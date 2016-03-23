"use strict";
(function() {

    angular
        .module("GadgetGuruApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($state, UserService) {
        var vm = this;

        function init() {
            vm.logOut = logOut;
        }

        init();

        function logOut() {
            UserService.invalidateCurrentSession();
            $state.go("home");
        }
    }
})();