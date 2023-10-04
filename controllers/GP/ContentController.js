const { models} = require('../models');

// Add data to the mentioned table
exports.addDataToTable = (req, res) => {
  const { table } = req.params;

  if (models[table]) {
    const Model = models[table];
    Model.create(req.body)
      .then(contents => {
        res.json(contents);
      })
      .catch(err => res.json(err));
  } else {
    res.status(404).json({ error: 'Table not found' });
  }
};

// Get data from contents table
exports.getDataById = (req, res) => {
  const { id } = req.params;
  models.Contents.findById({ _id: id })
    .then(result => res.json(result))
    .catch(err => res.json(err));
};

exports.getDataByEmail = (req,res) => {
    const email = req.params.searchEmail
    models.Contents.find({Email: email})
   .then(content => {
    res.json(content)})
   .catch(err => res.json(err))
}

//get all data
exports.getAll = (req, res) => {
  models.Contents.find({})
    .then(result => res.json(result))
    .catch(err => res.json(err));
};

//get data by status
exports.getDataByStatus = (req, res) => {
  const status = req.params.searchStatus;

  // Use a case-insensitive regular expression query to match any letter case
  models.Contents.find({ Status: { $regex: new RegExp(status, 'i') } })
    .then((content) => {
      console.log(content);
      res.json(content);
    })
    .catch((err) => res.json(err));
};


//get topics from ExtraContents table
exports.getTopics = (req,res) =>{
  const site = req.params.site
  models.ExtraContents.find({Site: { $regex: new RegExp(site, 'i') }})
  .then((result) => {
    res.json(result)})
  .catch(err => res.json(err))
}

exports.getDataByEmail = (req,res) => {
    const email = req.params.searchEmail
    models.Contents.find({Email: email})
   .then(content => {
    res.json(content)})
   .catch(err => res.json(err))
}


// Update data in contents table
exports.updateDataById = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  models.Contents.findByIdAndUpdate(
    { _id: id },
    data
  )
    .then((result) => {
      res.json(result);
    })
    .catch(err => res.json(err));
};

// Delete entries from specified tables
exports.deleteEntries = (req, res) => {
  const { tableName } = req.params;
  const { ids } = req.body;

  // Use tableName to determine which table to delete from
  if (tableName === 'Contents') {
    models.Contents.deleteMany({ _id: { $in: ids } })
      .then(() => res.status(200).json({ message: 'Items deleted successfully' }))
      .catch(err => res.json(err));
  } else if (tableName === 'ExtraContents') {
    models.ExtraContents.deleteOne({ _id: ids })
      .then(() => res.status(200).json({ message: 'Items deleted successfully' }))
      .catch(err => res.json(err));
  } else {
    res.status(400).json({ error: 'Invalid table name' });
  }
};

