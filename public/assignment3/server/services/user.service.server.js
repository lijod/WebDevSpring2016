module.exports = function(app, userModel) {
    app.post("/api/assignment/user", register);
    app.get("/api/assignment/user", user);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user", user);
    app.get("/api/assignment/user", user);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function user(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password) {
            res.json(login(username, password));
            return;
        } else if(username) {
            res.json(getUserByUsername(username));
        } else {
            res.json(getAllUser());
        }
    }

    function register(req, res) {
        var user = req.body;
        userModel.createUser(user);
        res.json(userModel.findAllUsers());
    }

    function getAllUser() {
        return userModel.findAllUsers();
    }

    function getUserById(req, res) {
        var userId = req.params.id;
        res.json(userModel.findUserById(userId));
    }

    function getUserByUsername(username) {
        //var username = req.query.username;
        return userModel.findUserByUsername(username);
    }

    function login(username, password) {
        //var username = req.query.username;
        //var password = req.query.password;
        var credentials = {
            "username": username,
            "password": password
        }
        return userModel.findUserByCredentials(credentials);
    }

    function updateUser(req, res) {
        var userId = req.params.id;
        var user = req.body;
        userModel.updateUser(userId, user);
        res.json(userModel.findAllUsers());
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        userModel.deleteUserById(userId);
        res.json(userModel.findAllUsers());
    }

}