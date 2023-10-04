import { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Topic from "./Topics"
import Search from "./Search"
import SearchTable from "./SearchTable";

function Home() {
    const [content, setContent] = useState([]);
    const [selectedRowStatus, setSelectedRowStatus] = useState();
    const [selectedIds, setSelectedIds] = useState([]);
    const [site, setSite] = useState()
    const [showTopics, setShowTopics] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const navigate= useNavigate()
    // console.log(showTopics)
    // console.log(selectedIds.length)
    // console.log(selectedIds)

    const [showAll, setShowAll] = useState(false); // State to control showing all content
  const [filterStatus, setFilterStatus] = useState(""); // State to filter by status
 
  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const fetchFilteredContent = (status) => {
    console.log(status)
    axios.get(`/content/search/status/${status}`)
        .then((response) => {
            setContent(response.data); // Update content with filtered data
        })
        .catch((error) => {
            console.error('Fetch filtered content error:', error);
        });
};

  // Modify the useEffect for showAll to use fetchFilteredContent
  useEffect(() => {
      if (showAll) {
          fetchFilteredContent(""); // Fetch all content initially
      }
  }, [showAll]);

  // Modify the useEffect for filterStatus to use fetchFilteredContent
  useEffect(() => {
      if (filterStatus !== "") {
          fetchFilteredContent(filterStatus); // Fetch filtered content based on status
      }
  }, [filterStatus]);

  useEffect(() => {
    if (showAll) {
      // Fetch all content from the server
      axios.get('/content/all')
        .then((response) => {
          setContent(response.data); // Update content with all data
        })
        .catch((error) => {
          console.error('Fetch all content error:', error);
        });
    }
  }, [showAll]);

  useEffect(() => {
    // Filter the content based on the selected status
    if (filterStatus !== "") {
      const filteredContent = content.filter((item) => item.status === filterStatus);
      setContent(filteredContent);
    }
  }, [filterStatus]);


    const handleCheckboxChange = (event, contentId, status, site) => {
      
        if (event.target.checked) {
            setSite(site);
          setSelectedIds((prev) => [...prev, contentId]);
          setSelectedRowStatus(status);
        } else {
          const updatedSelectedIds = selectedIds.filter(id => id !== contentId);
          setSelectedIds(updatedSelectedIds);
          setShowTopics(false);

      
          if (updatedSelectedIds.length === 0) {
            setSelectedRowStatus("");
          }
        }
      };
      
      

      const handleDelete = () => {
        const table = "Contents"
        if (selectedIds.length === 0) {
          alert('Select at least one item to delete.');
          return;
        }
      
        axios
          .delete('/content/delete/' + table, { data: { ids: selectedIds } })
          .then((response) => {
            console.log(response.data); 
            setContent((prevContent) =>
              prevContent.filter((item) => !selectedIds.includes(item._id))
            );
          })
          .catch((error) => {
            console.error('Delete request error:', error);
          });
      };
      

      const handleUpdate = (e)=>{
        e.preventDefault()
        if(selectedIds.length === 1){
            navigate(`Update/${selectedIds[0]}`)
        }
        else{
                <h4>You can only update one entry at a time</h4>
        }
      }


      useEffect(() => {
       
      }, [selectedIds, selectedRowStatus]);
    
    const handleTopics = () => {
        if(selectedIds.length === 1)
        setShowTopics(true);
    }
    
    useEffect(() => {
        setContent(searchResults);
      }, [searchResults]);

    return (
        <>
         <Search setSearchResults={setSearchResults} />
                

        {/* three buttons */}
                <div className="d-flex justify-content-center align-items-center">
                    <div className="m-2">
                    <Link to="/AddData" className="btn btn-primary btn-lg mt-5">+Add</Link>
                    </div>

                    <div className="m-2">
                    <button className="btn btn-success btn-lg mt-5" onClick={handleUpdate}>Update</button>
                    </div>

                    <div className="m-2">
                    <button className="btn btn-danger btn-lg mt-5" onClick={handleDelete}>Delete</button>
                    </div>

                    <div className="m-2">
                    <button
                        className="btn btn-info btn-lg mt-5"
                        onClick={handleTopics}
                        disabled={(selectedIds.length) !== 1  || selectedRowStatus !== "pending"}
                    >
                        Topics
                    </button>
                    </div>

                     {/* Show All Button */}
                    <div className="m-2">
                      <button
                        className="btn btn-secondary btn-lg mt-5"
                        onClick={handleShowAll}
                      >
                        Show All
                      </button>
                    </div>
                </div>

                {/* Status Filter */}
                {showAll && (
                  <div className="d-flex justify-content-center align-items-center m-5">
                    <div className="w-25">
                      <select
                        className="form-select form-select-sm" // Decrease the width using form-select-sm class
                        value={filterStatus}
                        onChange={handleFilterChange}
                      >
                        <option value="">Filter by Status</option>
                        <option value="link added">Link Added</option>
                        <option value="sent">Sent</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                  </div>
                )}

              <SearchTable
                          content={content}
                          handleCheckboxChange={handleCheckboxChange}
                          selectedIds={selectedIds}
                          selectedRowStatus={selectedRowStatus}
                      />

                  {showTopics && (selectedIds.length) === 1 && (
                      <div className="container">
                          <Topic site={site}/>
                      </div>
                  )}  
        </>
    );
}
export default Home;

