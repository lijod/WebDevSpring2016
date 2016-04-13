"use strict";
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
module.exports = function (app, userModel) {

    var auth = authorized;
    app.post("/api/assignment/user", register);
    app.post("/api/assignment/login", passport.authenticate('local'), login);
    app.post('/api/assignment/register', register);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user", user);
    app.get("/api/assignment/userby", getUserByUsername);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUserById);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(function (user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                });
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

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
        //userModel.createUser(user)
        //    .then(function (response) {
        //            console.log(response);
        //            user = response;
        //            req.session.currentUser = user;
        //            res.json(user);
        //        },
        //        function (err) {
        //            res.status(400).send(err);
        //        });
        userModel
            .findUserByUsername(newUser.username)
            .then(function (user) {
                    if (user) {
                        res.json(null);
                    } else {
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
        res.json(userModel.findAllUsers());
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
        //var username = req.query.username;
        //var password = req.query.password;
        //var credentials = {
        //    "username": username,
        //    "password": password
        //}
        //userModel.findUserByCredentials(credentials)
        //    .then(function (response) {
        //            var user = response;
        //            req.session.currentUser = user;
        //            res.json(user);
        //        },
        //        function (err) {
        //            res.status(400).send(err);
        //        });

        var user = req.user;
        res.json(user);
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

    function deleteUserById(req, res) {
        var userId = req.params.id;
        userModel.deleteUserById(userId)
            .then(function (response) {
                    res.json(userModel.findAllUsers());
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function loggedin(req, res) {
        //res.json(req.session.currentUser);
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        //req.session.destroy();
        //res.send(200);
        req.logOut();
        res.send(200);
    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }
}