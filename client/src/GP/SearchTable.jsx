import React, {useState, useEffect} from "react";
import axios from "axios"
import WebsiteModal from "./Modals/SuggestSiteModal";
import Publish from "./Modals/PtublishModal"


function SearchTable({ content, handleCheckboxChange, selectedIds, handleChange, fetchUpdatedContent }) {
  const [domain, setDomain] = useState()
  const [websitesFound, setWebsitesFound] = useState([])
  const [website, setWebsite] = useState([])
  const [showWebsiteModal, setShowWebsiteModal] = useState(false);
  const [updateSiteId, setUpdateSiteId] = useState()
  const [searchContent, setSearchContent] = useState([]); 

  
  
  useEffect(() => {
    if (content !== undefined && Array.isArray(content)) {
      setSearchContent(content);
    }
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
    // console.log("in handleSite" + Email)
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

    const handleSelect = (websiteName) =>{
    axios.put('/content/update/contents/' + updateSiteId, {...content, Site: websiteName})
   .then(result =>{
    fetchUpdatedContent(updateSiteId)
    })
   .catch(err => console.log(err))
   setShowWebsiteModal(false)
    }


//to handle publish data modal
const [publishContent, setPublishContent] = useState({ id: null, site: null, showPublish: false });
const openPublishForEntry = (id, site) => {
  setPublishContent({ id, site, showPublish: true });
  // console.log(publishContent)
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
                <thead style={{ position: 'sticky', top: 0, zIndex: 1, background: 'white' }}>
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
                    {Array.isArray(searchContent) && searchContent.map((content, index) => {
                    const rowNumber = index + 1;
                    const {
                      _id,
                      Mailboxes,
                      DocsURL,
                      Title,
                      Email,
                      Status,
                      Site,
                      Requirements,
                      DF,
                    } = content;

                    return (
                      <tr key={_id} scope="row">
                        <td style={{ maxWidth: '100px' }}>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              onChange={(event) => {
                                const site = Site === undefined ? "None" : Site;
                                  const status = Status === undefined? "None" : Status
                                  handleCheckboxChange(event, content._id, status, site);
                              }}
                            />
                            <label className="custom-control-label" htmlFor="customCheck1">
                              {" "}
                              {rowNumber}
                            </label>
                          </div>
                        </td>
                        <td style={{ maxWidth: '100px', wordWrap: 'break-word' }}> {Mailboxes || ' '}</td>
                        <td style={{ maxWidth: '100px', wordWrap: 'break-word' }}>
                        <a href={content.DocsURL} target="_blank" rel="noopener noreferrer">
                        {DocsURL || ' '}
                        </a>
                      </td>
                        <td style={{ maxWidth: '200px', wordWrap: 'break-word' }}>{Title || ' '}</td>
                        <td style={{ maxWidth: '200px', wordWrap: 'break-word' }}> {Email || ' '}</td>
                        <td style={{ maxWidth: '100px', wordWrap: 'break-word' }}>{Status || ' '}</td>
                        <td style={{ maxWidth: '100px', wordWrap: 'break-word' }}>{Site || ' '}</td>
                        <td style={{ maxWidth: '200px', wordWrap: 'break-word' }}>{Requirements || " "}</td>
                        <td style={{ maxWidth: '100px', wordWrap: 'break-word' }}>{DF || " "}</td>
                        <td style={{ maxWidth: '100px', wordWrap: 'break-word' }}>
                          {Status?.toLowerCase().includes('sent') && (
                            <button
                              className="btn btn-success"
                              onClick={() => openPublishForEntry(_id, Site)}
                            >
                              Publish
                            </button>
                          )}

                          {(Site === undefined || Site === '' || Site==="--") && (
                            <button
                              className="btn btn-success"
                              onClick={() => handleSite(Email, _id)}
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
