(function () {

    angular
        .module("GadgetGuruApp")
        .controller("LoginController", LoginController);

    function LoginController($state, UserService) {
        var vm = this;

        function init() {
            vm.login = login;
            vm.hasError = false;
        }

        init();

        function login(username, password) {
            console.log("login... " + username);
            UserService.findUserByCredentials(username, password)
                .then(function (response) {
                        redirectUserToProfileIfValid(response.data);
                    },
                    function () {
                        console.log("error LoginController->login->findUserByCredentials")
                    });
        }

        function redirectUserToProfileIfValid(user) {
            console.log("Redirecting user: ");
            if(user != null){
                UserService.setCurrentUser(user);
                $state.go("profile.edit", {userId: user._id});
            } else {
                console.log("Username/password error");
                vm.hasError = true;
            }
        }
    }
})();