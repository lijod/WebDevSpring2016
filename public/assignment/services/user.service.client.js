(function(){

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {

        var users = [
            {        "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]                },
            {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]                },
            {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]                },
            {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]                }
        ];

        var api = {
            findUserByUsernameAndPassword : findUserByUsernameAndPassword
        };

        return api;

        function findUserByUsernameAndPassword(username, password, callback) {
            var user = null;

            for (var i = 0; i < users.length; i++) {
                if(validateUser(users[i], username, password)){
                    user = users[i];
                    break;
                }
            }

            callback(user);

        }

        function validateUser(user, username, password) {
            return (user.username === username && user.password === password)
        }

    }

})();