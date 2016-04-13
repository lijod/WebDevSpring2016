"use strict";
module.exports = function (app, userModel, gadgetModel) {

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../../../public/uploads' });

    app.post("/api/gadgetguru/user", register);
    app.get("/api/gadgetguru/user/:id", getUserById);
    app.get("/api/gadgetguru/user", user);
    app.get("/api/gadgetguru/userby", getUserByUsername);
    app.put("/api/gadgetguru/user/:id", updateUser);
    app.post("/api/gadgetguru/user/:id", upload.single('profileImg'), updateUserWithImage);
    app.put("/api/gadgetguru/user/:userId/gadget/:gadgetId/like", addLikedGadget);
    app.put("/api/gadgetguru/user/:userId/gadget/:gadgetId/undolike", undoLikedGadget);
    app.put("/api/gadgetguru/user/:userId/gadget/:gadgetId/isliked", isGadgetLiked);
    app.put("/api/gadgetguru/user/:followerId/user/:followingId/follow", follow);
    app.put("/api/gadgetguru/user/:followerId/user/:followingId/unfollow", unfollow);
    app.get("/api/gadgetguru/user/:followerId/user/:followingId/isfollowing", isUserFollowing);
    app.get("/api/gadgetguru/user/:userId/following", findFollowingUser);
    app.get("/api/gadgetguru/user/:userId/follower", findFollowerUser);
    app.get("/api/gadgetguru/user/:userId/likedgadgets", findLikedGadgets);
    app.delete("/api/gadgetguru/user/:id", deleteUserById);
    app.get("/api/gadgetguru/loggedin", loggedin);
    app.post("/api/gadgetguru/logout", logout);

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

    function updateUserWithImage(req, res) {
        var userId = req.params.id;
        var user = req.body;
        var imageFile = req.file;

        if(imageFile) {
            var destination = imageFile.destination;
            var path = imageFile.path;
            var originalname = imageFile.originalname;
            var size = imageFile.size;
            var mimetype = imageFile.mimetype;
            var filename = imageFile.filename;
            user.imgUrl = "/uploads/" + filename;
        }

        userModel.updateUser(userId, user)
            .then(function (response) {
                    return userModel.findUserById(userId);
                },
                function (err) {
                    res.status(400).send(err);
                })
            .then(function (response) {
                req.session.currentUser = response;
                res.redirect(req.header('Referer') + "#/profile/" + userId + "/edit");
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

    function addLikedGadget(req, res) {
        var userId = req.params.userId;
        var gadgetId = req.params.gadgetId;
        userModel.addLikedGadget(userId, gadgetId)
            .then(function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                })
    }

    function undoLikedGadget(req, res) {
        var userId = req.params.userId;
        var gadgetId = req.params.gadgetId;
        userModel.undoLikedGadget(userId, gadgetId)
            .then(function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                })
    }

    function isGadgetLiked(req, res) {
        var userId = req.params.userId;
        var gadgetId = req.params.gadgetId;
        userModel.findUserById(userId)
            .then(function (response) {
                    var likedGadget = response.likedGadget;
                    var isLiked = likedGadget.indexOf(gadgetId) > -1;
                    res.json({isLiked: isLiked});
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function follow(req, res) {
        var follower = req.params.followerId;
        var following = req.params.followingId;
        userModel.addFollowing(follower, following)
            .then(function (response) {
                    if (response) {
                        return userModel.addFollower(follower, following);
                    } else {
                        res.json({});
                    }
                },
                function (err) {
                    res.status(400).send(err);
                })
            .then(function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function unfollow(req, res) {
        var follower = req.params.followerId;
        var following = req.params.followingId;
        userModel.removeFollowing(follower, following)
            .then(function (response) {
                    if (response) {
                        return userModel.removeFollower(follower, following);
                    } else {
                        res.json({});
                    }
                },
                function (err) {
                    res.status(400).send(err);
                })
            .then(function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }


    function isUserFollowing(req, res) {
        var follower = req.params.followerId;
        var following = req.params.followingId;
        userModel.findUserById(follower)
            .then(function (response) {
                    var followingUsers = response.following;
                    var isFollowing = followingUsers.indexOf(following) > -1;
                    res.json({isFollowing: isFollowing});
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function findFollowingUser(req, res) {
        var userId = req.params.userId;
        userModel.findUserById(userId)
            .then(function (response) {
                    return userModel.findAllById(response.following);
                },
                function (err) {
                    res.status(400).send(err);
                })
            .then(function (response) {
                    res.json(response)
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function findFollowerUser(req, res) {
        var userId = req.params.userId;

        userModel.findUserById(userId)
            .then(function (response) {
                    return userModel.findAllById(response.follower);
                },
                function (err) {
                    res.status(400).send(err);
                })
            .then(function (response) {
                    res.json(response)
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function findLikedGadgets(req, res) {
        var userId = req.params.userId;

        userModel.findUserById(userId)
            .then(function (response) {
                    return gadgetModel.findAllById(response.likedGadget);
                },
                function (err) {
                    res.status(400).send(err);
                })
            .then(function (response) {
                    res.json(response)
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }
}