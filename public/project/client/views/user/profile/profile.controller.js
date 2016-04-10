(function () {

    angular
        .module("GadgetGuruApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $stateParams, $q, UserService) {
        var vm = this;

        function init() {

        }

        init();

    }
})();