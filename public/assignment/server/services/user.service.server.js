"use strict";
//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
module.exports = function (app, userModel, passport) {

    var auth = authorized;
    app.post("/api/assignment/admin/user", auth, createUser);
    app.get("/api/assignment/admin/user", auth, getAllUser);
    app.post("/api/assignment/login", passport.authenticate('assignment'), login);
    app.post('/api/assignment/register', register);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user", user);
    app.get("/api/assignment/userby", getUserByUsername);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/admin/user/:userId", auth, deleteUser);
    app.put("/api/assignment/admin/user/:userId", auth, updateUserAdmin);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);

    function user(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if (username && password) {
            login(req, res);
        } else if (username) {
            getUserByUsername(req, res);
        } else {
            getAllUser(req, res);
        }
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['student'];
        userModel
            .findUserByUsername(newUser.username)
            .then(function (user) {
                    if (user) {
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                })
            .then(function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function getAllUser(req, res) {
        if (isAdmin(req.user)) {
            userModel.findAllUsers()
                .then(function (response) {
                        if (response) {
                            res.json(response);
                        } else {
                            res.send(null);
                        }
                    },
                    function (err) {
                        res.status(400).send(err);
                    });
        }
    }

    function getUserById(req, res) {
        var userId = req.params.id;
        userModel.findUserById(userId)
            .then(function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function getUserByUsername(req, res) {
        var username = req.query.username;
        userModel.findUserByUsername(username)
            .then(function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function createUser(req, res) {
        var newUser = req.body;
        if (newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        userModel
            .findUserByUsername(newUser.username)
            .then(function (user) {
                    if (user == null) {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser)
                            .then(function () {
                                    return userModel.findAllUsers();
                                },
                                function (err) {
                                    res.status(400).send(err);
                                }
                            );
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function updateUser(req, res) {
        var userId = req.params.id;
        var user = req.body;
        userModel.updateUser(userId, user)
            .then(function (response) {
                    return userModel.findUserById(userId);
                },
                function (err) {
                    res.status(400).send(err);
                })
            .then(function (response) {
                req.session.currentUser = response;
                res.json(response);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function updateUserAdmin(req, res) {
        var newUser = req.body;
        if (!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if (typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        userModel
            .updateUser(req.params.userId, newUser)
            .then(function (user) {
                    return userModel.findAllUsers();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function deleteUser(req, res) {
        if (isAdmin(req.user)) {
            userModel
                .deleteUserById(req.params.userId)
                .then(function (user) {
                        return userModel.findAllUsers();
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
                .then(function (users) {
                        res.json(users);
                    },
                    function (err) {
                        res.status(400).send(err);
                    });
        } else {
            res.status(403);
        }
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() && req.user.type === "assignment" ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function isAdmin(user) {
        if (user.roles.indexOf("admin") > -1) {
            return true
        }
        return false;
    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

}

