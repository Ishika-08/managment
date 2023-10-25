// import { useState, useEffect } from "react"
// import axios from "axios"
// import { useNavigate } from "react-router-dom"

// const DownloadData = () =>{

//     const [name, setName] = useState([])
//     const [table, setTable] = useState()
//     const navigate = useNavigate()


//     useEffect(()=>{
//         axios.get("/download/names")
//         .then((result) =>{
//             console.log(result.data)
//             setName(result.data)
//         })
//     },[])
    
//     const navigateToHome = () => {
//         navigate("/Home")
//       };
  
//   const handleDownload = () => {
//     axios
//       .get(`/download/table/${table}`, {
//         responseType: 'arraybuffer',
//       })
//       .then((response) => {
//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', `${table}.xlsx`);
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//       })
//       .catch((error) => {
//         console.error('Error downloading file:', error);
//       });
//   };

//     return (
//         <>
//             <div className="vh-100">
//         <button className="btn m-3" onClick={navigateToHome}>
//               <i className="fas fa-arrow-left"></i> Back to Home
//             </button>
//       <div className="container m-5">
//         <div className="row justify-content-center">
//           <div className="col-md-6 card p-5">
//             <form className="form-group">
//               <label className="mb-3">Select Table</label>
//               <select
//                 className="form-control select2 select2-hidden-accessible"
//                 tabIndex="-1"
//                 aria-hidden="true"
//                 onChange={(e) => setTable(e.target.value)}
//               >
//                 <option value= "--">--</option>
//                 {name.map((option, index) => (
//                   <option key={index} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//               <button type="button" className="btn btn-lg btn-success mt-4" onClick={handleDownload}>
//                 Download
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//       </div>
//         </>
//     )
// }

// export default DownloadData

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DownloadData = () => {
  const [name, setName] = useState([]);
  const [table, setTable] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/download/names").then((result) => {
      console.log(result.data);
      // Filter out unwanted options from the result
      const filteredNames = result.data.filter(
        (name) =>
          ![
            "Accounts",
            "ExtraContents",
            "SignUp",
            "contents",
            "Topics2",
            "Databases",
            "checkLinks",
            "TrackCollection",
            "SavedDocuments",
            "Track",
          ].includes(name)
      );
      setName(filteredNames);
    });
  }, []);

  const navigateToHome = () => {
    navigate("/Home");
  };

  const handleDownload = () => {
    axios
      .get(`/download/table/${table}`, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${table}.xlsx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };

  return (
    <>
      <div className="vh-100">
        <button className="btn m-3" onClick={navigateToHome}>
          <i className="fas fa-arrow-left"></i> Back to Home
        </button>
        <div className="container m-5">
          <div className="row justify-content-center">
            <div className="col-md-6 card p-5">
              <form className="form-group">
                <label className="mb-3">Select Table</label>
                <select
                  className="form-control select2 select2-hidden-accessible"
                  tabIndex="-1"
                  aria-hidden="true"
                  onChange={(e) => setTable(e.target.value)}
                >
                  <option value="--">--</option>
                  {name.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="btn btn-lg btn-success mt-4"
                  onClick={handleDownload}
                >
                  Download
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DownloadData;
