import React, { useState } from "react";
import axios from "axios"; // Axios is a popular library for making HTTP requests

function CSVFileUpload() {
  const [file, setFile] = useState(null);
  const [table, setTable] = useState(null)
  const [showFile, setShowFile] = useState(false)
  const [allWebsites, setAllWebsites] = useState([])
  const [message, setMessage] = useState("")
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    console.log(table)
    if (file) {
      const formData = new FormData();
      formData.append("csvFile", file);

      try {
        // Send the file to the server using Axios
        await axios.post(`/admin/upload/${table}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // File uploaded successfully
        setShowFile(false)
        console.log("File uploaded successfully.");
        setMessage("File uploaded successfully.");

      } catch (error) {
        console.log("Error uploading file:", error);
        setMessage("Error uploading file:", error);
      }
    }
  };


  const handleWebsite = ()=>{
    setShowFile(false)
    axios.get("/admin/websites/")
    .then((result) =>{
      setAllWebsites(result.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

 const handleDatabase = ()=>{
  setTable("Databases")
  setAllWebsites([])
  setShowFile(true)
 }

  return (
    <div>
      {/* <h1 className="text-center mb-5">Upload a CSV File</h1> */}
      <div className="container d-flex justify-content-center align-items-center mt-3" style = {{marginBottom: "5%"}}>
            <div className="row justify-content-center align-items-center">
            <tr>
            <div class="alert alert-danger font-weight-bold" role="alert">
              you can only add .csv files
            </div>
            </tr>
            <tr>
            <div class="alert alert-danger font-weight-bold" role="alert">
              for website tables only column with following names will be added: 
              MailBox,DA,Website,Email,Contacted,DF,Topic,LTE,AnchorText,PublishedLink,Status,SS,Note

            </div>
            </tr>
            <tr>
            <div class="alert alert-danger font-weight-bold" role="alert">
            for Database table only column with following names will be added: 
            Website, Email
            </div>
            </tr>
      </div>
    </div>


      <div className="container d-flex justify-content-center align-items-center">
            <div className="row justify-content-center align-items-center">
            <tr>
            <div  className="w-100">
            <a href={`/websiteExample.csv`} download>
              <button className="btn btn-success btn-lg mb-4">
                <i className="fas fa-download"></i> Download Website Example
              </button>
            </a>
          </div>
            </tr>
            <tr>
            <div  className="w-100">
            <a href={`/databaseExample.csv`} download>
              <button className="btn btn-success btn-lg mb-4">
                <i className="fas fa-download"></i> Download Database Example
              </button>
            </a>
          </div>
            </tr>
                <tr>
                <button className="w-100 btn btn-primary btn-lg mb-4" onClick = {() => handleWebsite()}>Add data to Website Table</button>
                </tr>
                <tr>
                <button className="w-100 btn btn-secondary btn-lg mb-4" onClick = {() => handleDatabase()}>Add Data to Database table</button>
                </tr>

                <tr>
                {allWebsites.length !== 0 && (
              <div className="dropdown">
            <select
              className="btn btn-secondary btn-lg dropdown-toggle mb-4"
              onChange={(e) => {
                setShowFile(true)
                setTable(e.target.value)
                }}
            >
              <option value="Select Table">
                Select Table
              </option>
              {allWebsites.map((element, index) => {
                return (
                  <option key={index} value={element.Website}>
                    {element.Website}
                  </option>
                );
              })}
            </select>
          </div>
            )}
                </tr>

                <tr>
                {showFile &&
                (
                <div>
                <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className=""
              />
              <button onClick={handleFileUpload}>Upload</button>
              </div>)}
                        </tr>
                    </div>
              </div>
              {message !== "" && <h2 className="text-center m-5">{message}</h2>}
     
    </div>
  );
}

export default CSVFileUpload;

