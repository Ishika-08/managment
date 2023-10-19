import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"
import axios from "axios"
import WebsiteModal from "./Modals/SuggestSiteModal";
import Publish from "./Modals/PtublishModal"


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
    axios.get("/admin/websites/")
    .then(result => setWebsite(result.data))
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


//to handle publish data modal
const [publishContent, setPublishContent] = useState({ id: null, site: null, showPublish: false });
const openPublishForEntry = (id, site) => {
  setPublishContent({ id, site, showPublish: true });
  console.log(publishContent)
};
const closePublishForEntry = () => {
  setPublishContent({ ...publishContent, showPublish: false });
};

  return (
    <>
{/* Search result table */}
<section className="intro m-2">
<div className="table-responsive" style={{ textAlign: 'center', overflowX: 'auto' }}>
              <table className="table table-bordered" style={{ width: '100%', tableLayout: 'fixed' }}>
                <colgroup>
                  <col style={{ width: '5%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '9%' }} />
                  <col style={{ width: '9%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '9%' }} />
                  <col style={{ width: '10%' }} />
                </colgroup>
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
                    <th scope="col" className="col-1">Action</th> 
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
                          {content?.Status?.toLowerCase().includes("sent") && (
                            <button
                              className="btn btn-success"
                              onClick={() => openPublishForEntry(content._id, content.Site)}
                            >
                              Publish
                            </button>
                          )}

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
</section>

      <WebsiteModal
        websitesFound={websitesFound}
        website={website}
        handleSelect = {handleSelect}
        show={showWebsiteModal}
        onHide={() => {
          setShowWebsiteModal(false)
          //make the websitesFound array empty
        }}
      />

      {publishContent.showPublish && (
        <Publish
          show={publishContent.showPublish}
          onClose={closePublishForEntry}
          id={publishContent.id}
          site={publishContent.site}
        />
      )}
    </>

    

    
  );
}

export default SearchTable;
