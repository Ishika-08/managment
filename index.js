const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const cors = require('cors');
const cron = require('node-cron');

const connectToDatabase = require("./config/db")

const databaseRouter = require('./routes/GP/DatabaseRoutes');
const websiteRouter = require('./routes/GP/WebsiteRoutes');
const contentRouter = require('./routes/GP/ContentRoutes');
const trackRouter = require('./routes/Pitch/TrackRouter');
const LinkRouter = require('./routes/CheckOldLinks/LinkRouter');
const checkHrefRouter = require('./routes/CheckOldLinks/CheckHrefRouter');

const ContentsModel = require("./models/Content/Contents")
const ExtraContentsModel = require("./models/Content/ExtraContent")
const DataModel = require("./models/Database")
const TrackModel = require("./models/Track")
const AccountsSchema = require("./models/Accounts")
const CheckLinksModel = require("./models/checkLinks")
const SavedDocumentsModel = require("./models/SavedDocuments")
const {CTModel,H4Model,CanModel,THModel, TPlusModel,FAOModel, FPModel, SCModel, TWModel, VEModel} = require("./models/Website/CT");

const models = {
  SavedDocuments: SavedDocumentsModel,
    Accounts: AccountsSchema,
    checkLinks: CheckLinksModel,
    Track: TrackModel, 
    Contents: ContentsModel,
    ExtraContents: ExtraContentsModel,
    Database: DataModel,
    CT: CTModel,
    H4: H4Model,
    Can: CanModel,
    TH: THModel,
    TPlus: TPlusModel,
    FAO: FAOModel,
    FP: FPModel,
    SC: SCModel,
    TW: TWModel,
    VE: VEModel
  };
  
  const website = {
    CT: CTModel,
    H4: H4Model,
    Can: CanModel,
    TH: THModel,
    TPlus: TPlusModel,
    FAO: FAOModel,
    FP: FPModel,
    SC: SCModel,
    TW: TWModel,
    VE: VEModel
  };
 

  



const app = express()
app.use(express.json())
app.use(cors())

connectToDatabase()

//for GP
app.use('/database', databaseRouter);
app.use('/website', websiteRouter);
app.use('/content', contentRouter);


//for Pitch
app.use('/track', trackRouter);

//for check old links
app.use('/check-href', checkHrefRouter);
app.use('/check-links', LinkRouter);


// Schedule the script to run every 15 days at midnight
// cron.schedule('0 0 */15 * *', () => {
//   console.log('Running the script every 15 days at midnight.');

  // Trigger the '/check-href' route by making an HTTP GET request to your own server
//   axios.get('http://localhost:4000/check-href')
//     .then(response => {
//       console.log('Check-href route triggered successfully.');
//       // You can log or handle the response if needed.
//     })
//     .catch(error => {
//       console.error('Error triggering check-href route:', error);
//       // Handle the error if the request fails.
//     });
// });




//to get the name of all the websites(website sheets) present in GP
app.get("/websites", (req, res) => {
  const websiteNames = Object.keys(website);
  
  if (websiteNames.length > 0) {
    res.json({ websiteNames });
  } else {
    res.status(404).json({ error: "No websites found" });
  }
});

app.get("/models", (req, res) => {
  const modelNames = Object.keys(models);
  
  if (modelNames.length > 0) {
    res.json({ modelNames });
  } else {
    res.status(404).json({ error: "No websites found" });
  }
});

// app.use(express.static(path.join(__dirname + "/public")));

app.use(express.static(path.join(__dirname + "/client/dist")));
app.get("*", (req,res)=>{
  res.sendFile(path.resolve(__dirname + "/client/dist/index.html"))
})


 
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server started at port ${PORT}`)
})