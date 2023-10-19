const mongoose = require("mongoose");

const TrackCollectionsSchema = new mongoose.Schema({
    Website: String,
    MailBox: String
},
{
    collection: "TrackCollection"
});

const TrackCollectionModel = mongoose.model("TrackCollection", TrackCollectionsSchema);

module.exports = TrackCollectionModel;
