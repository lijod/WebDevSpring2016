module.exports = function(app, userModel) {
    app.post("/api/assignment/user", register);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user?[username=username&password=password]", login);
    app.get("/api/assignment/user?[username=username]", getUserByUsername);
    app.get("/api/assignment/userby", getUserByUsername);
    app.get("/api/assignment/user", getAllUser);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUserById);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);
    
    function register(req, res) {
        var user = req.body;
        var user = userModel.createUser(user);
        req.session.currentUser = user;
        res.json(userModel.findAllUsers());
    }

    function getAllUser(req, res) {
        res.json(userModel.findAllUsers());
    }

    function getUserById(req, res) {
        var userId = req.params.id;
        res.json(userModel.findUserById(userId));
    }

    function getUserByUsername(req, res) {
        var username = req.query.username;
        console.log(username);
        console.log("usernmanmasn")
        res.json(userModel.findUserByUsername(username));
    }

    function login(req, res) {
        var username = req.query.username;
        var password = req.query.password;
         var credentials = {
            "username": username,
            "password": password
        }
        var user = userModel.findUserByCredentials(credentials);
        req.session.currentUser = user;
        res.json(user);
    }

    function updateUser(req, res) {
        var userId = req.params.id;
        var user = req.body;
        user = userModel.updateUser(userId, user);
        req.session.currentUser = user;
        res.json(userModel.findAllUsers());
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        userModel.deleteUserById(userId);
        res.json(userModel.findAllUsers());
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        console.log("Logged out")
        req.session.destroy();
        res.send(200);
    }
}