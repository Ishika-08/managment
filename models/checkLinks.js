const mongoose = require('mongoose');

const checkLinksSchema = new mongoose.Schema({
  websiteName: String,
  newAnchor: String,
  websiteRow: Object
},
{
    collection: "checkLinks"
});

const CheckLinksModel = mongoose.model('checkLinks', checkLinksSchema);

module.exports = CheckLinksModel;
