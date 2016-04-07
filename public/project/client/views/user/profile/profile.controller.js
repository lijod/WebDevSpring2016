(function() {

    angular
        .module("GadgetGuruApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $stateParams, UserService) {
        var vm = this;
        function init() {

        }

        init();

    }
})();