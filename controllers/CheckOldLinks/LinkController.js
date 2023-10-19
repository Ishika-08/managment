const { models} = require('../models');
 
exports.getWebsiteData = async(req,res) =>{
  const {model} = req.params
  console.log("tableName: " + model)
  // const websiteData = [];
  try{
    const result = await models.checkLinks.find({websiteName: model})

  //   let websiteModel;
  //   switch (model) {
  //     case 'CTModel':
  //       websiteModel = models.CT;
  //       break;
  //     case 'H4Model':
  //       websiteModel = models.H4;
  //       break;
  //     case 'CanModel':
  //       websiteModel = models.Can;
  //       break;
  //     case 'THModel':
  //       websiteModel = models.TH;
  //       break;
  //     case 'TPlusModel':
  //       websiteModel = models.TPlus;
  //       break;
  //     case 'FAOModel':
  //       websiteModel = models.FAO;
  //       break;
  //     case 'FPModel':
  //       websiteModel = models.FP;
  //       break;
  //     case 'SCModel':
  //       websiteModel = models.SC;
  //       break;
  //     case 'TWModel':
  //       websiteModel = models.TW;
  //       break;
  //     case 'VEModel':
  //       websiteModel = models.VE;
  //       break;
  //     default:
  //       // Handle unknown name here
  //       break;
  //   }

  //   for(const entry of result){
  //     const {newAnchor, _id } = entry;
  //     const websiteRow = await websiteModel.findById(entry.rowID);
        
  //   const rowData = {
  //     _id,
  //     newAnchor,
  //     websiteRow
  //   };

  //   websiteData.push(rowData);
  // }
  // console.log(websiteData)
  // res.json(websiteData);
  res.json(result)
  }
  catch(err){
    console.log(err)
  }
}

exports.getFaultyLinks = async (req, res) => {
    try {
            // Find all entries in the CheckLinksModel
            const checkLinksEntries = await models.checkLinks.find();
        
            // Initialize an object to store data for each website
            const websiteData = {};
        
            // Loop through the entries in CheckLinksModel
            for (const entry of checkLinksEntries) {
              const { websiteName, rowID, newAnchor, _id } = entry;
        
              // Determine the appropriate website model based on websiteName
              let websiteModel;
              switch (websiteName) {
                case 'CTModel':
                  websiteModel = models.CT;
                  break;
                case 'H4Model':
                  websiteModel = models.H4;
                  break;
                case 'CanModel':
                  websiteModel = models.Can;
                  break;
                case 'THModel':
                  websiteModel = models.TH;
                  break;
                case 'TPlusModel':
                  websiteModel = models.TPlus;
                  break;
                case 'FAOModel':
                  websiteModel = models.FAO;
                  break;
                case 'FPModel':
                  websiteModel = models.FP;
                  break;
                case 'SCModel':
                  websiteModel = models.SC;
                  break;
                case 'TWModel':
                  websiteModel = models.TW;
                  break;
                case 'VEModel':
                  websiteModel = models.VE;
                  break;
                default:
                  // Handle unknown name here
                  break;
              }
        
              // Find the corresponding row in the website model using rowID
              const websiteRow = await websiteModel.findById(rowID);
        
              // Create an object with the necessary data
              const rowData = {
                _id,
                newAnchor,
                websiteRow
              };
        
              // Add the rowData to the websiteData object
              if (!websiteData[websiteName]) {
                websiteData[websiteName] = [];
              }
              websiteData[websiteName].push(rowData);
            }
        
            // Send the websiteData object as a response
            res.json(websiteData);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred' });
          }
};

//to updat checklinks table when new anchorText is entered
exports.updateAnchorText = async (req, res) => {
  const { rowId } = req.params; 
  const { newAnchorValue } = req.body; 

  try {
    // Find the record with the specified row ID and update the anchor text
    const updatedLink = await models.checkLinks.findByIdAndUpdate(rowId, { anchorText: newAnchorValue });

    if (!updatedLink) {
      return res.status(404).json({ message: 'Link not found' });
    }

    return res.json(updatedLink);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.updateWebsite = async (req, res) => {
  const {table} = req.params
  const {selectRowId} = req.params
  const {newAnchorValue} = req.body
  const {updateWebsiteId} = req.body
  const websiteModel = models[table]

  try {      
            // Find the corresponding row in the website model using rowID
            await websiteModel.findByIdAndUpdate({_id: updateWebsiteId}, {AnchorText: newAnchorValue}, {new: true})
            const CheckLinksRow = await models.checkLinks.findByIdAndUpdate({_id: selectRowId}, {"websiteRow.AnchorText": newAnchorValue}, {new: true});
            return res.json("row updated")

        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'An error occurred' });
        }
};


exports.delete = async (req,res) =>{
  const {id} = req.params
  try{
    await models.checkLinks.findByIdAndDelete({_id: id})
    return res.json("row deleted")
  }
  catch(err){
    return res.json(err)
  }

}

//to delte in the particular webiste table
exports.deleteWebsiteTable = async (req,res) =>{
  const {tableName} = req.params
  const {id} = req.body
  const model= models[tableName]

  try{
    const deletedRow = await model.findByIdAndDelete({_id: id})
    return res.json(deletedRow)
  }
  catch(err){
    return res.json(err)
  }

}