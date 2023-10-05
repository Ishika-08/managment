const { models} = require('../models');


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
  const { rowId } = req.params; // Get the row ID from the URL parameters
  const { newAnchorValue } = req.body; // Get the new anchor text from the request body
  console.log(req.body)

  try {
    // Find the record with the specified row ID and update the anchor text
    const updatedLink = await models.checkLinks.findByIdAndUpdate(rowId, { anchorText: newAnchorValue });
    console.log(updatedLink)

    if (!updatedLink) {
      return res.status(404).json({ message: 'Link not found' });
    }

    return res.json(updatedLink);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.updateAnchorText = async (req, res) => {
  const {table} = req.params
  const {updateWebsiteId} = req.params
  const {newAnchorValue} = req.body
  console.log(table, updateWebsiteId, newAnchorValue)

  try {
            // Determine the appropriate website model based on websiteName
            let websiteModel;
            switch (table) {
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
            const websiteRow = await websiteModel.findByIdAndUpdate({_id: updateWebsiteId}, {AnchorText: newAnchorValue});
            console.log(websiteRow)

        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred' });
        }
};


