(function() {

    angular
        .module("GadgetGuruApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($state, UserService, $rootScope) {
        var vm = this;

        function init() {
            vm.register = register
            vm.hasError = false;
            vm.errorMessage = "";
            //console.log($rootScope.currentUser);
        }

        init();

        function register(user) {
            console.log(validateUser(user));
            //return;
            if(!validateUser(user)) {
                vm.hasError = true;
                vm.errorMessage = "You have entered invalid data or missed some fields.";
                return;
            }
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
                vm.hasError = true;
                vm.errorMessage = "Username already exists, please try a different one.";
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
                $state.go("home");
            }
        }

        function validateUser(user) {
            var flag = true;

            if (user) {
                flag = flag && user.username;
                flag = flag && user.password;
                flag = flag && user.firstName;
                flag = flag && user.lastName;
                flag = flag && user.email;
                flag = flag && validateEmail(user.email);

                if (user.password == user.verifyPassword)
                    flag = flag && true;
                else
                    flag = flag && false;
            }
            else {
                flag = flag && false;
            }

            return flag;
        }

        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }

})();