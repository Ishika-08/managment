const getModelWithCollectionName = require("../../models/Website/Website"); 
const TrackCollectionModel = require("../../models/Admin/TrackCollections");
const DatabaseModel = require("../../models/Database");
const ExtraContentsModel = require("../../models/Content/ExtraContent")

const csv = require('csv-parser');
const ContentsModel = require('../../models/Content/Contents');
const mongoose = require("mongoose")

exports.createCollection = async (req, res) => {
  const { collectionName } = req.params;
  const { MailBox } = req.body;

  try {
    if (!collectionName) {
      return res.status(400).json({ error: "Collection name is required" });
    }

    const CustomModel = getModelWithCollectionName(collectionName);

    // Check if the collection name already exists
    const existingCollection = await TrackCollectionModel.findOne({ Website: collectionName });

    if (existingCollection) {
      return res.status(400).json({ error: "Collection name already exists" });
    }

    const newDoc = {
      Website: collectionName,
      MailBox: MailBox,
    };

    try {
      const result = await TrackCollectionModel.insertMany([newDoc]);
      res.status(201).json({ message: "Collection created successfully" });
    } catch (error) {
      console.error(error);
      res.json({ error: "Failed to create collection" });
    }
  } catch (err) {
    console.log(err);
  }
};


exports.AddDataController = async (req, res) => {
  const {table} = req.params;

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileBuffer = req.file.buffer;
  const results = [];
  let model;
  if(table === "Databases"){
    model = DatabaseModel;
  }
  else if(table === "ExtraContents"){
    model = ExtraContentsModel;
  }
  else{
  model = getModelWithCollectionName(table);
  }

  const parser = csv();

  parser.on('data', (data) => {
    results.push(data);
  });

  parser.on('end', () => {

    model.insertMany(results)
      .then(() => {
        console.log("Files Added to the database");
        res.status(200).json({ message: 'File uploaded and data processed successfully' });
      })
      .catch((err) => {
        console.error("Error saving data to the database:", err);
        res.status(500).json({ error: 'Error saving data to the database' });
      });
  });

  parser.on('error', (err) => {
    console.error("Error during CSV parsing:", err);
    res.status(500).json({ error: 'Error parsing the CSV file' });
  });

  parser.write(fileBuffer);
  parser.end();
}


//@description: get all websites

exports.findWebsites = async(req,res)=>{
  const result = await TrackCollectionModel.find({})
  res.json(result)
}

exports.deleteCollection = async (req, res) => {
  const { collectionName } = req.params;
  try {
    const result = await TrackCollectionModel.findOneAndDelete({ Website: collectionName });
    if (!result) {
      return res.status(404).json({ message: 'Collection not found.' });
    }

    await mongoose.connection.db.dropCollection(collectionName);
    res.status(200).json({ message: `Collection ${collectionName} deleted successfully.` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
