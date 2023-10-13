const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema({
  MailBox: String,
  DA: String,
  Website: String,
  Email: String,
  Contacted: String,
  DF: String,
  Topic: String,
  LTE: String,
  AnchorText: String,
  PublishedLink: String,
  Status: String,
  SS: String,
  Note: String,
});

function getModelWithCollectionName(collectionName) {
  return mongoose.model("CustomModel", TableSchema, collectionName);
}

module.exports = getModelWithCollectionName;
