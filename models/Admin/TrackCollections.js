const mongoose = require("mongoose");

const TrackCollectionsSchema = new mongoose.Schema({
    Website: String,
    MailBox: String
},
{
    collection: "TrackCollection"
});

TrackCollectionModel = new mongoose.model("TrackCollection", TrackCollectionsSchema)

module.exports = TrackCollectionModel