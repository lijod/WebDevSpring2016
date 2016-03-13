module.exports = function(app, userModel) {
    app.post("/api/assignment/user", register);
    app.get("/api/assignment/user", getAllUser);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user?username=username", getUserByUsername);
    app.get("/api/assignment/user?username=alice&password=wonderland", login);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function register(req, res) {
        var user = req.body;
        userModel.createUser(user);
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

    }

    function login(req, res) {

    }

    function updateUser(req, res) {

    }

    function deleteUserById(req, res) {

    }

}