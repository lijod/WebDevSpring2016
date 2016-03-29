"use strict";
module.exports = function(app, userModel) {
    app.post("/api/assignment/user", register);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user", user);
    app.get("/api/assignment/userby", getUserByUsername);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUserById);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);

    function user(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if(username && password) {
            login(req, res);
        } else if(username) {
            getUserByUsername(req, res);
        } else {
            getAllUser(req, res);
        }
    }

    function register(req, res) {
        var user = req.body;
        console.log("register");
        userModel.createUser(user)
            .then(function (response) {
                    console.log(response);
                    user = response;
                    req.session.currentUser = user;
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function getAllUser(req, res) {
        res.json(userModel.findAllUsers());
    }

    function getUserById(req, res) {
        var userId = req.params.id;
        userModel.findUserById(userId)
            .then(function(response) {
                res.json(response);
            },
            function(err) {
                res.status(400).send(err);
            });
    }

    function getUserByUsername(req, res) {
        var username = req.query.username;
        userModel.findUserByUsername(username)
            .then(function(response) {
                res.json(response);
            },
            function(err) {
                res.status(400).send(err);
            });
    }

    function login(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var credentials = {
            "username": username,
            "password": password
        }
        userModel.findUserByCredentials(credentials)
            .then(function (response) {
                    var user = response;
                    req.session.currentUser = user;
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function updateUser(req, res) {
        var userId = req.params.id;
        var user = req.body;
        userModel.updateUser(userId, user)
            .then(function(response) {
                return userModel.findUserById(userId);
            },
            function(err) {
                res.status(400).send(err);
            })
            .then(function(response) {
                req.session.currentUser = response;
                res.json(response);
            }, function(err) {
                res.status(400).send(err);
            });
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
        req.session.destroy();
        res.send(200);
    }
}