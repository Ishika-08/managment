import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import Topic from "./Modals/TopicsModal"
import Search from "./Search"
import SearchTable from "./SearchTable";
import AddModal from "./Modals/AddDataModal"
import UpdateModal from "./Modals/UpdateModal"

function Home() {
  const [content, setContent] = useState([]);
  const [selectedRowStatus, setSelectedRowStatus] = useState();
  const [selectedIds, setSelectedIds] = useState([]);
  const [site, setSite] = useState()
  const [searchResults, setSearchResults] = useState([]);
  const [showAll, setShowAll] = useState(false); 
  const [filterStatus, setFilterStatus] = useState(); 
  const [changeContent, setChangeContent] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)
  const [showTopicModal, setShowTopicModal] = useState(false);

  const navigate= useNavigate()

  //to handle AddData button Modal
  const [showAddForm, setAddForm] = useState(false)
  const handleCloseAddFormModal = () => setAddForm(false);
  const handleShowAddFormModal = () => setAddForm(true);

  //to handle update button modal
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleUpdateClose = () => setShowUpdateModal(false);
  const handleUpdateShow = () => {
    setShowUpdateModal(true);
  }
  const handleUpdate = () =>{
    if(selectedIds.length === 1){
      handleUpdateShow()
    }else{
      console.log("selectedIds.length = " + selectedIds.length)
    }
  }

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
  console.log(status)
    if (event.target.checked) {
      setSite(site);
      setSelectedIds((prev) => [...prev, contentId]);
      setSelectedRowStatus(status);
    } else {
      const updatedSelectedIds = selectedIds.filter(id => id !== contentId);
      setSelectedIds(updatedSelectedIds);
      // setShowTopics(false);
  
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
      

    //for topics modal
    const openTopicModal = () => {
      setShowTopicModal(true)

    };
  
    const closeTopicModal = () => {
      setShowTopicModal(false);
    };

    const handleTopics = () => {
        if(selectedIds.length === 1){
          openTopicModal()
        }
    }
 
    //to handle search results
    useEffect(() => {
        setContent(searchResults);
      }, [searchResults]);
       //used to navigate to home page


  const navigateToHome = () => {
    navigate("/Home")
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
                    <Button variant="primary" className = "btn btn-lg" onClick={handleShowAddFormModal}>
                      Add Entry
                    </Button>
                    <AddModal show={showAddForm} handleClose={handleCloseAddFormModal} />                   
                     </div>

                     <div className="m-2">
                    <Button variant="success" className = "btn btn-lg" onClick={handleUpdate}>
                      Update
                    </Button>
                      <UpdateModal show={showUpdateModal} handleClose={handleUpdateClose} id={selectedIds[0]}/>                   
                     </div>


                    <div className="m-2">
                    <button className="btn btn-danger btn-lg" onClick={handleDelete}>Delete</button>
                    </div> 


                    <div className="m-2">
                    <button
                        className="btn btn-info btn-lg"
                        onClick={handleTopics}
                        disabled={(selectedIds.length) !== 1  || !selectedRowStatus.toLowerCase().includes("pending")}
                    >
                        Topics
                    </button>
                    <Topic 
                    site={site} 
                    id={selectedIds[0]} 
                    showModal={showTopicModal} 
                    closeModal={closeTopicModal} 
                    handleChange={handleChange}
                    setSelectedIds = { setSelectedIds}
                    />
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
                        className="form-select form-select-sm" 
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

              </div>
        </>
    );
}
export default Home;

