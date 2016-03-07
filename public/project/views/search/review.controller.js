(function() {

    angular
        .module("GadgetGuruApp")
        .controller("ReviewController", ReviewController);

    function ReviewController($scope, $rootScope) {
        console.log($rootScope.user);
    }

})();