module.exports = function (db) {
    var UserSchema = db.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        imgUrl: String,
        likedGadget: [String],
        follower: [String],
        following: [String],
        role: {type: String, enum: ["USER", "ADMIN"]},
        type: {type: String, default: "project"}
    }, {collection: 'gg_user'});
    return UserSchema;
};