module.exports = function (db) {
    var GadgetSchema = db.Schema({
        _id: String,
        title: String,
        imgUrl: String,
    }, {collection: 'gg_gadget'});
    return GadgetSchema;
};