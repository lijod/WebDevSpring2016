(function() {

    angular
        .module("GadgetGuruApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($state, UserService, $rootScope) {
        var vm = this;

        function init() {
            vm.register = register;
            console.log($rootScope.currentUser);
        }

        init();

        function register(user) {
            console.log("register");
            console.log(user);
            UserService.findUserByUsername(user.username)
                .then(function(response){
                        doRegister(user, response);
                    },
                    function() {
                        console.log("error, User->register->findUserByUsername");
                    });
        }

        function doRegister(currUser, response) {
            var user = response.data;
            console.log(user);
            if (user) {
                console.log("User Already Exists");
                alert("User Already Exists");
            } else {
                UserService.createUser(currUser)
                    .then(function(respose){
                            UserService.findUserByUsername(currUser.username)
                                .then(redirectUserToProfileIfValid,
                                    function() {
                                        console.log("error, User->register->findUserByUsername");
                                    });
                        },
                        function() {
                            console.log("error, User->register->doRegister->createUser");
                        });
            }
        }

        function redirectUserToProfileIfValid(response) {
            var user = response.data;
            console.log(user);
            if(user != null){
                console.log("Redirecting user: ");
                UserService.setCurrentUser(user);
                $state.go("profile", {userId: user._id});
            }
        }
    }

})();