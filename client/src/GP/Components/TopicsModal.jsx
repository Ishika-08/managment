// import { useEffect, useState } from "react";
// import axios from "axios";

// const Topics = ({site, id}) => {
//   const [content, setContent] = useState([]);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [copiedTitles, setCopiedTitles] = useState(""); 

//   useEffect(() => {
//     axios
//       .get("/content/topics/" + site)
//       .then((result) => {
//         console.log(result.data)
//         setContent(result.data);
//       })
//       .catch((err) => console.log(err));
//   }, [site]);

//   const handleCheckBox = (id) => {
//     // Toggle the selection status of the row
//     setSelectedRows((prevSelectedRows) => {
//       if (prevSelectedRows.includes(id)) {
//         return prevSelectedRows.filter((rowId) => rowId !== id);
//       } else {
//         return [...prevSelectedRows, id];
//       }
//     });
//   };

//   const handleCopy = () => {
//     const selectedTitles = content
//       .filter((row) => selectedRows.includes(row._id))
//       .map((row) => row.Title)
//       .join("\n");

//     // Copy the selected titles to the clipboard
//     navigator.clipboard.writeText(selectedTitles).then(() => {
//       setCopiedTitles(selectedTitles);
//     });
//   };

//   const handleSelect = (row)=>{
//     const table = "ExtraContents"
  
//     axios.put('/content/update/' + id, {DocsURL: row.DocsURL, Title: row.Title, Status:row.Status})
//     .then(result => console.log(result))
//     .catch(err => console.log(err))

//     axios
//     .delete('/content/delete/' + table, { data: { ids: row._id } })
//     .then((result) => {
//       setContent((prevContent) =>
//         prevContent.filter((item) => !(row._id).includes(item._id))
//       );
//     })
//     .catch((error) => {
//       console.error('Delete request error:', error);
//     });
// };


  

//   return (
//     <>
//       <section className="intro my-5">
//         <div className="gradient-custom-2 h-100">
//           <div className="mask d-flex align-items-center h-100">
//             <div className="container">
//               <div className="row justify-content-center">
//                 <div className="col-12">
//                   <div className="table-responsive">
//                     <table className="table table-light table-bordered mb-0">
//                       <thead>
//                         <tr>
//                           <th scope="col">#</th>
//                           <th scope="col">DocsURL</th>
//                           <th scope="col">Title</th>
//                           <th scope="col">Status</th>
//                           <th scope="col">Select</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {content.map((row, index) => {
//                           const rowNumber = index + 1;
//                           return (
//                             <tr key={row._id}>
//                               <td>
//                                 <input
//                                   type="checkbox"
//                                   checked={selectedRows.includes(row._id)}
//                                   onChange={() => handleCheckBox(row._id)}
//                                 />
//                                 {rowNumber}
//                               </td>
//                               <td>{row.DocsURL}</td>
//                               <td>{row.Title}</td>
//                               <td>{row.Status}</td>
//                               <td>
//                                 <button
//                                   className="btn btn-primary"
//                                   onClick={() => handleSelect(row)}
//                                 >
//                                   Select
//                                 </button>
//                               </td>
//                             </tr>
//                           );
//                         })}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <button className="btn btn-primary m-2" onClick={handleCopy}>
//         Copy 
//       </button>
     
//     </>
//   );
//       }

// export default Topics

import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Table } from "react-bootstrap";

const Topics = ({ site, id, showModal, closeModal, handleChange }) => {
  const [content, setContent] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [copiedTitles, setCopiedTitles] = useState("");

  useEffect(() => {
    axios
      .get("/content/topics/" + site)
      .then((result) => {
        console.log(result.data);
        setContent(result.data);
      })
      .catch((err) => console.log(err));
  }, [site]);

  const handleCheckBox = (id) => {
    // Toggle the selection status of the row
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(id)) {
        return prevSelectedRows.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelectedRows, id];
      }
    });
  };

  const handleCopy = () => {
    const selectedTitles = content
      .filter((row) => selectedRows.includes(row._id))
      .map((row) => row.Title)
      .join("\n");

    // Copy the selected titles to the clipboard
    navigator.clipboard.writeText(selectedTitles).then(() => {
      setCopiedTitles(selectedTitles);
    });
  };

  const handleSelect = (row) => {
    const table = "ExtraContents";

    axios
      .put("/content/update/topic/" + id, {
        DocsURL: row.DocsURL,
        Title: row.Title,
        Status: row.Status,
      })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));

    axios
      .delete("/content/delete/" + table, { data: { ids: row._id } })
      .then((result) => {
        setContent((prevContent) =>
          prevContent.filter((item) => item._id !== row._id)
        );
      })
      handleChange()
      closeModal()
      .catch((error) => {
        console.error("Delete request error:", error);
      });
  };

  return (
    <>
      <Modal show={showModal} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Topics</Modal.Title>
        </Modal.Header>
        <Modal.Body  className="modal-body">
        <div className="table-responsive">
          <table className="table table-bordered" style={{ width: '100%', tableLayout: 'fixed' }}>
          <colgroup>
                  <col style={{ width: '5%' }} />
                  <col style={{ width: '30%' }} />
                  <col style={{ width: '9%' }} />
                  <col style={{ width: '9%' }} />
                  <col style={{ width: '9%' }} />
            </colgroup>
            <thead>
              <tr>
                <th>#</th>
                <th>DocsURL</th>
                <th>Title</th>
                <th>Status</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {content.map((row, index) => {
                const rowNumber = index + 1;
                return (
                  <tr key={row._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row._id)}
                        onChange={() => handleCheckBox(row._id)}
                      />
                      {rowNumber}
                    </td>
                    <td>{row.DocsURL}</td>
                    <td>{row.Title}</td>
                    <td>{row.Status}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleSelect(row)}
                      >
                        Select
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCopy}>
            Copy
          </Button>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Topics;
