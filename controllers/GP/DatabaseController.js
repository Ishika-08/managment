const DataModel = require('../../models/Database');

// Search for email in the Database table
exports.searchEmail = (req, res) => {
  const { email } = req.params;
  const caseInsensitiveEmail = new RegExp(email, 'i');
  DataModel.find({ Email: caseInsensitiveEmail })
    .then(result => res.json(result))
    .catch(err => res.json(err));
};

