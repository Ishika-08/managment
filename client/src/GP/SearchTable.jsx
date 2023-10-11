import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"
import axios from "axios"
import WebsiteModal from "./Components/SuggestSiteModal";

function SearchTable({ content, handleCheckboxChange, selectedIds, selectedRowStatus, handleChange }) {
  const [domain, setDomain] = useState()
  const [websitesFound, setWebsitesFound] = useState([])
  const [website, setWebsite] = useState([])
  const [showWebsiteModal, setShowWebsiteModal] = useState(false);
  const [updateSiteId, setUpdateSiteId] = useState()
  const [searchContent, setSearchContent] = useState(content); 

  
  useEffect(() => {
    setSearchContent(content);
  }, [content, setShowWebsiteModal]);
  

//to find all the websites which contain the domain on clicking suggest site
  useEffect(() => {
    if (domain) {
      axios.get("/website/" + domain)
        .then(result => {
          setWebsitesFound(result.data.websitesFound)})
        .catch(err => console.log(err));
    }
  }, [domain]); 

//to get names of all the website tables
  useEffect(() => {
    axios.get("/websites/")
    .then(result => setWebsite(result.data.websiteNames))
    .catch(err => console.log(err));
  }, []); 


//used for suggest site button get domain
  const handleSite = (Email, id) => {
    console.log("in handleSite" + Email)
    setUpdateSiteId(id);
    axios.get("/database/" + Email)
      .then(result => {
        if (Array.isArray(result.data) && result.data.length > 0) {
          const websiteUrl = result.data[0].Website;
          const url = new URL(websiteUrl);
          const domain = url.hostname; // Extract the domain from the URL
          setDomain(domain);
        } else {
          console.log("No domain in the database table for this email");
        }
      })
      .catch(err => console.log(err));
      setShowWebsiteModal(true);
  }
  
//used for updating site name in contents table and rerendering table
    const handleSelect = (websiteName) =>{
    axios.put('/content/update/contents/' + updateSiteId, {...content, Site: websiteName})
   .then(result =>{
    console.log(result)
    handleChange()
  })
   .catch(err => console.log(err))
   setShowWebsiteModal(false)
    }



  return (
    <>
{/* Search result table */}
<section className="intro m-2">
  <div className="gradient-custom-2 h-100">
    <div className="mask d-flex align-items-center h-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table table-light table-bordered mb-0">
                <thead>
                  <tr>
                    <th scope="col" className="col-1">Select</th>
                    <th scope="col" className="col-1">Mailbox</th>
                    <th scope="col" className="col-1">Docs URL</th>
                    <th scope="col" className="col-2">Title</th>
                    <th scope="col" className="col-2">Email Id</th>
                    <th scope="col" className="col-1">Status</th>
                    <th scope="col" className="col-1">Site</th>
                    <th scope="col" className="col-2">Requirements</th>
                    <th scope="col" className="col-1">DF</th>
                    <th scope="col" className="col-1">Action</th> {/* New column */}
                  </tr>
                </thead>
                <tbody>
                  {searchContent.map((content, index) => {
                    const rowNumber = index + 1;
                    return (
                      <tr key={content._id} scope="row">
                        <td style={{ maxWidth: '100px' }}>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              onChange={(event) => {
                                handleCheckboxChange(event, content._id, content.Status, content.Site);
                              }}
                            />
                            <label className="custom-control-label" htmlFor="customCheck1">
                              {" "}
                              {rowNumber}
                            </label>
                          </div>
                        </td>
                        <td style={{ maxWidth: '100px', wordWrap: 'break-word' }}>{content.Mailboxes}</td>
                        <td style={{ maxWidth: '100px', wordWrap: 'break-word' }}>
                        <a href={content.DocsURL} target="_blank" rel="noopener noreferrer">
                          {content.DocsURL}
                        </a>
                      </td>
                        <td style={{ maxWidth: '200px', wordWrap: 'break-word' }}>{content.Title}</td>
                        <td style={{ maxWidth: '200px', wordWrap: 'break-word' }}>{content.Email}</td>
                        <td style={{ maxWidth: '100px', wordWrap: 'break-word' }}>{content.Status}</td>
                        <td style={{ maxWidth: '100px', wordWrap: 'break-word' }}>{content.Site}</td>
                        <td style={{ maxWidth: '200px', wordWrap: 'break-word' }}>{content.Requirements}</td>
                        <td style={{ maxWidth: '100px', wordWrap: 'break-word' }}>{content.DF}</td>
                        <td style={{ maxWidth: '100px', wordWrap: 'break-word' }}>
                          {content.Status === ("sent" || "Sent") && (
                            <Link
                              to={`/GP/publish/${content.Site}/${content._id}/`}
                              className="btn btn-success"
                              onClick={() => {
                                // Handle publish action here
                              }}
                            >
                              Publish
                            </Link>
                          )}
                          {/* {(content.Site === undefined || content.Site === "") && (
                            <Link
                              className="btn btn-success"
                              onClick={()=> handleSite(content.Email, content._id)}
                            >
                              Suggest Site
                            </Link>
                          )} */}
                          {(content.Site === undefined || content.Site === '') && (
                            <button
                              className="btn btn-success"
                              onClick={() => handleSite(content.Email, content._id)}
                            >
                              Suggest Site
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>




{/* website table list */}
{/* {showWebsiteModal && (
        <section className="additional-table m-2">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12">
                <h2>Website Information</h2>
                <table className="table table-light table-bordered mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Website Name</th>
                      <th scope="col">Presence</th>
                      <th scope="col">Select</th>
                    </tr>
                  </thead>
                  <tbody>
                    {website.map((websiteName, index) => {
                      const isPresent = websitesFound.includes(websiteName);
                      const textColorClass = isPresent ? "text-success" : "text-danger"; 

                      return (
                        <tr key={index}>
                          <td>{websiteName}</td>
                          <td className={textColorClass}>{isPresent ? "Present" : "Not Present"}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                handleSelect(websiteName)
                              }}
                            >
                              Select
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )} */}

      <WebsiteModal
        websitesFound={websitesFound}
        website={website}
        handleSelect = {handleSelect}
        show={showWebsiteModal}
        onHide={() => setShowWebsiteModal(false)}
      />
    </>
    
  );
}

export default SearchTable;
