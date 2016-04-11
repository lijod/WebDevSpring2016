"use strict";
module.exports = function(db) {

    var GadgetSchema = require("./gadget.schema.server.js")(db);
    var GadgetModel = db.model("GG_Gadget", GadgetSchema);

    var api = {
        findGadgetById: findGadgetById,
        findAllById: findAllById,
        addGadget: addGadget
    };

    return api;


    function findGadgetById(gadgetId) {
        return GadgetModel.findById(gadgetId);
    }

    function findAllById(gadgetIdList) {
        return GadgetModel.find({_id : {$in : gadgetIdList}});
    }

    function addGadget(gadget) {
        var gadgetId = gadget._id;
        delete gadget._id;
        return GadgetModel.findOneAndUpdate({_id: gadgetId}, gadget, {upsert: true});
    }

}