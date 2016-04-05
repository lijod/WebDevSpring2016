module.exports = function (db) {
    var ReviewSchema = db.Schema({
        userId: String,
        gadgetId: String,
        title: String,
        review: String,
        rating: { type: Number, min: 1, max: 5 },
    }, {collection: 'gg_review'});
    return ReviewSchema;
};