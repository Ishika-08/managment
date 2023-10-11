import { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Topic from "./Components/TopicsModal"
import Search from "./Search"
import SearchTable from "./SearchTable";

function Home() {
    const [content, setContent] = useState([]);
    const [selectedRowStatus, setSelectedRowStatus] = useState();
    const [selectedIds, setSelectedIds] = useState([]);
    const [site, setSite] = useState()
    const [showTopics, setShowTopics] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [showAll, setShowAll] = useState(false); 
  const [filterStatus, setFilterStatus] = useState(); 
  const [changeContent, setChangeContent] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)
  const [showTopicModal, setShowTopicModal] = useState(false);


  const navigate= useNavigate()

    

    
 //get all data from contents table
  const handleShowAll = () => {
    setShowAll(true);
  };

  useEffect(() => {
    if (showAll) {
      axios.get('/content/all')
        .then((response) => {
          setContent(response.data); 
          setChangeContent(false)
          setOpenFilter(true)
          setShowAll(false)
        })
        .catch((error) => {
          console.error('Fetch all content error:', error);
        });
    }
  }, [showAll, changeContent]);


//to handle status filter and update the content state  
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const fetchFilteredContent = (status) => {
    axios.get(`/content/search/status/${status}`)
        .then((response) => {
            setContent(response.data); 
        })
        .catch((error) => {
            console.error('Fetch filtered content error:', error);
        });
};

  useEffect(() => {
    if(filterStatus === ""){
      handleShowAll()
    }else{
      fetchFilteredContent(filterStatus);
      setChangeContent(false)
    }
  }, [filterStatus, changeContent]);

//to rerender the table when site is added using suggest site button
const handleChange = ()=>{
  console.log("triggered")
  setShowAll(false)
  setChangeContent(true)
}

//to store the selected ids and work with them
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


      // useEffect(() => {
       
      // }, [selectedIds, selectedRowStatus]);
    //for topics modal

    const openTopicModal = () => {
      console.log(showTopicModal)
      setShowTopicModal(true)
      console.log("end" + showTopicModal)

    };
  
    const closeTopicModal = () => {
      setShowTopicModal(false);
    };

    const handleTopics = () => {
      console.log(selectedIds)
        if(selectedIds.length === 1){
          openTopicModal()
          console.log(showTopicModal)
        }
    }
    
    useEffect(() => {
        setContent(searchResults);
      }, [searchResults]);
       //used to navigate to home page


  const navigateToHome = () => {
    navigate("/")
  };



    return (
        <>
        <div className="position-fixed top-0 start-50 translate-middle-x bg-white w-100">
         <button className="btn m-3" onClick={navigateToHome}>
              <i className="fas fa-arrow-left"></i> Back to Home
        </button>                

        {/* three buttons */}
                <div className="d-flex justify-content-center align-items-center ">
                    <div className="m-2">
                    <Link to="/AddData" className="btn btn-primary btn-lg">+Add</Link>
                    </div>

                    <div className="m-2">
                    <button className="btn btn-success btn-lg" onClick={handleUpdate}>Update</button>
                    </div>

                    <div className="m-2">
                    <button className="btn btn-danger btn-lg" onClick={handleDelete}>Delete</button>
                    </div>

                    <div className="m-2">
                    <button
                        className="btn btn-info btn-lg"
                        onClick={handleTopics}
                        disabled={(selectedIds.length) !== 1  || selectedRowStatus !== "pending"}
                    >
                        Topics
                    </button>
                    </div>

                     {/* Show All Button */}
                    <div className="m-2">
                      <button
                        className="btn btn-secondary btn-lg"
                        onClick={handleShowAll}
                      >
                        Show All
                      </button>
                    </div>
                </div>

                {/* Status Filter */}
                {openFilter && (
                  <div className="d-flex justify-content-center align-items-center m-2">
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
                </div>

                <div className="container" style={{ marginTop: '200px' }}>
                <Search setSearchResults={setSearchResults} />

                <SearchTable
                  content={content}
                  handleCheckboxChange={handleCheckboxChange}
                  selectedIds={selectedIds}
                  selectedRowStatus={selectedRowStatus}
                  handleChange = {handleChange}
                />

                {showTopicModal && selectedIds.length === 1 && (
                    <Topic site={site} id={selectedIds[0]} showModal={showTopicModal} closeModal={closeTopicModal} handleChange={handleChange}/>
                )}
              </div>
        </>
    );
}
export default Home;

