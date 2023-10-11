const express = require('express');
const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your-database', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a Mongoose model for collections (e.g., Book)
const CollectionModel = mongoose.model('Collection', new mongoose.Schema({ name: String }));

// Create a new collection based on user input
app.post('/api/create-collection', async (req, res) => {
  const { name } = req.body;
  try {
    await CollectionModel.create({ name });
    res.status(201).json({ message: 'Collection created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Upload a CSV file and add data to a collection
app.post('/api/upload-csv/:collectionName', async (req, res) => {
  const { collectionName } = req.params;
  try {
    const collection = mongoose.model(collectionName);
    const filePath = req.files.csv.path; // Assuming you are using a file upload library
    const data = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        data.push(row);
      })
      .on('end', async () => {
        await collection.insertMany(data);
        res.status(201).json({ message: 'Data added successfully' });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
