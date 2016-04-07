(function() {

    angular
        .module("GadgetGuruApp")
        .controller("ProfileReviewController", ProfileReviewController);

    function ProfileReviewController($scope) {
        console.log($scope.profileModel.user);
    }
})();