const DataModel = require('../../models/Database');

// Search for email in the Database table
exports.searchEmail = async (req, res) => {
  try{
    const {email} = req.params
    const result = await DataModel.find({ Email: { $regex: email, $options: 'i' } });
    return res.json(result)
  }
  catch(err){
    console.log(err)
  }
};

