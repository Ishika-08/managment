//to get names of all the collecitons

const mongoose = require('mongoose');
const fs = require('fs');
const json2csv = require('json2csv').parse;
const path = require('path');
const Excel = require('excel4node');
const ContentModel = require("../../models/Content/Contents")
const getModelWithCollectionName = require("../../models/Website/Website")



// exports.generateCSV = async (req, res) => {
//   try {
//     const { tableName } = req.params;
//     let Model;
//     if (tableName === 'contents') {
//       Model = ContentModel;
//     } else{
//       Model = getModelWithCollectionName(tableName)
//     }
//     // const Model = mongoose.model(tableName);
//     const data = await Model.find().lean();

//     const wb = new Excel.Workbook();
//     const ws = wb.addWorksheet('Sheet 1');

//     const fields = Object.keys(data[0]);
//     for (let i = 0; i < fields.length; i++) {
//       ws.cell(1, i + 1).string(fields[i]);
//     }

//     for (let i = 0; i < data.length; i++) {
//       for (let j = 0; j < fields.length; j++) {
//         const cellValue = data[i][fields[j]] !== undefined ? String(data[i][fields[j]]) : '';
//         ws.cell(i + 2, j + 1).string(cellValue);
//       }
//     }

//     const publicFolder = path.join(__dirname, '../../public');
//     if (!fs.existsSync(publicFolder)) {
//       fs.mkdirSync(publicFolder);
//     }

//     const filePath = path.join(publicFolder, `${tableName}.xlsx`);

//     wb.write(filePath, (err, stats) => {
//       if (err) {
//         console.error('Error writing Excel file:', err);
//         res.status(500).json({ message: 'Error writing Excel file' });
//       } else {
//         res.json({ file: `${tableName}.xlsx` });
//       }
//     });
//   } catch (err) {
//     console.error('Error generating Excel:', err);
//     res.status(500).json({ message: 'Error generating Excel' });
//   }
// };


// exports.generateCSV = async (req, res) => {
//   try {
//     const { tableName } = req.params;
//     let Model;
//     if (tableName === 'contents') {
//       Model = ContentModel;
//     } else {
//       Model = getModelWithCollectionName(tableName);
//     }
//     // const Model = mongoose.model(tableName);
//     const data = await Model.find().lean();

//     // Remove _id and __v from the data
//     const modifiedData = data.map(item => {
//       const { _id, __v, ...rest } = item;
//       return rest;
//     });

//     const wb = new Excel.Workbook();
//     const ws = wb.addWorksheet('Sheet 1');

//     const fields = Object.keys(modifiedData[0]);
//     for (let i = 0; i < fields.length; i++) {
//       ws.cell(1, i + 1).string(fields[i]);
//     }

//     for (let i = 0; i < modifiedData.length; i++) {
//       for (let j = 0; j < fields.length; j++) {
//         const cellValue = modifiedData[i][fields[j]] !== undefined ? String(modifiedData[i][fields[j]]) : '';
//         ws.cell(i + 2, j + 1).string(cellValue);
//       }
//     }

//     const publicFolder = path.join(__dirname, '../../public');
//     if (!fs.existsSync(publicFolder)) {
//       fs.mkdirSync(publicFolder);
//     }

//     const filePath = path.join(publicFolder, `${tableName}.xlsx`);

//     wb.write(filePath, (err, stats) => {
//       if (err) {
//         console.error('Error writing Excel file:', err);
//         res.status(500).json({ message: 'Error writing Excel file' });
//       } else {
//         res.json({ file: `${tableName}.xlsx` });
//       }
//     });
//   } catch (err) {
//     console.error('Error generating Excel:', err);
//     res.status(500).json({ message: 'Error generating Excel' });
//   }
// };

exports.generateCSV = async (req, res) => {
  try {
    const { tableName } = req.params;
    let Model;
    if (tableName === 'contents') {
      Model = ContentModel;
    } else {
      Model = getModelWithCollectionName(tableName);
    }
    // const Model = mongoose.model(tableName);
    const data = await Model.find().lean();

    // Remove _id and __v from the data
    const modifiedData = data.map(item => {
      const { _id, __v, ...rest } = item;
      return rest;
    });

    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet('Sheet 1');

    const fields = Object.keys(modifiedData[0]);
    for (let i = 0; i < fields.length; i++) {
      ws.cell(1, i + 1).string(fields[i]);
    }

    for (let i = 0; i < modifiedData.length; i++) {
      for (let j = 0; j < fields.length; j++) {
        const cellValue = modifiedData[i][fields[j]] !== undefined ? String(modifiedData[i][fields[j]]) : '';
        ws.cell(i + 2, j + 1).string(cellValue);
      }
    }

    const filePath = path.join(__dirname, '../../public', `${tableName}.xlsx`);

    wb.write(filePath, (err, stats) => {
      if (err) {
        console.error('Error writing Excel file:', err);
        res.status(500).json({ message: 'Error writing Excel file' });
      } else {
        res.download(filePath, `${tableName}.xlsx`, (err) => {
          if (err) {
            console.error('Error sending file as download:', err);
            res.status(500).json({ message: 'Error sending file as download' });
          }
          // Delete the file after sending the download response
          fs.unlinkSync(filePath);
        });
      }
    });
  } catch (err) {
    console.error('Error generating Excel:', err);
    res.status(500).json({ message: 'Error generating Excel' });
  }
};





exports.CollectionNames = async (req, res) => {
    try {
      const collections = await mongoose.connection.db.listCollections().toArray();
      const names = collections.map(collection => collection.name);
      res.json(names);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }