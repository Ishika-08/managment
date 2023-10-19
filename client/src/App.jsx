import './App.css'
import {useState} from "react"
import "react-bootstrap"
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from "./HomePage/Home"
import GP from "./GP/GP"
import Pitch from "./Pitch/pitch"
import CheckLinks from "./CheckOldLinks/checkLinks"
import Admin from "./Admin/Admin"
import AddData from "./Admin/AddDataModal"
import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.css";
import LoginForm from './HomePage/LoginForm'
import ShowWebsites from './Admin/ShowWebsite'


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<LoginForm setIsAuthenticated={setIsAuthenticated}/>}></Route>
        <Route path="/Home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
        <Route path="/Admin" element={isAuthenticated ? <Admin /> : <Navigate to="/" />} />
        <Route path="/Pitch" element={isAuthenticated ? <Pitch /> : <Navigate to="/" />}></Route>
        <Route path="/GP" element={isAuthenticated ? <GP/> : <Navigate to="/" />}></Route>
        <Route path="/checkLinks" element={isAuthenticated ? <CheckLinks/> : <Navigate to="/" />}></Route>

        {/* Routes for Admin */}
        <Route path="/Admin/AddData" element={isAuthenticated ? <AddData/> : <Navigate to="/" />}></Route>
        <Route path="/admin/show_websites" element={isAuthenticated ? <ShowWebsites/> : <Navigate to="/" />}></Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App

// App.jsx

// import './App.css';
// import "react-bootstrap";
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from "./HomePage/Home";
// import GP from "./GP/GP";
// import Pitch from "./Pitch/pitch";
// import CheckLinks from "./CheckOldLinks/checkLinks";
// import Admin from "./Admin/Admin";
// import AddData from "./Admin/AddDataModal";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "@fortawesome/fontawesome-free/css/all.css";
// import LoginForm from './HomePage/LoginForm';
// import ProtectedRoute from './ProtectedRoute'; 
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LoginForm />} />
//         <ProtectedRoute path="/Home" element={<Home />} />
//         <ProtectedRoute path="/Admin" element={<Admin />} />
//         <ProtectedRoute path="/Pitch" element={<Pitch />} />
//         <ProtectedRoute path="/GP" element={<GP />} />
//         <ProtectedRoute path="/checkLinks" element={<CheckLinks />} />

//         {/* Routes for Admin */}
//         <ProtectedRoute path="/Admin/AddData" element={<AddData />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

