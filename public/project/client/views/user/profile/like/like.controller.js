(function() {

    angular
        .module("GadgetGuruApp")
        .controller("ProfileLikeController", ProfileLikeController);

    function ProfileLikeController($stateParams, UserService) {
        var vm = this;

        function init() {
            var userId = $stateParams.userId;

            UserService.findLikedGadgets(userId)
                .then(function(response) {
                        vm.likedGadgets = response.data;
                    },
                    function(err) {
                        console.log("ProfileLikeController->init->findLikedGadgets");
                    });
        }

        init();
    }

})();