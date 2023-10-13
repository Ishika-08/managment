import './App.css'
import "react-bootstrap"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./HomePage/Home"
import Add from "./GP/AddData"
import GP from "./GP/GP"
import Update from "./GP/Update"
import Pitch from "./Pitch/pitch"
// import Topic from "./GP/Components/TopicsModal"
import Publish from "./GP/Publish"
import CheckLinks from "./CheckOldLinks/checkLinks"
import Admin from "./Admin/Admin"
import AddData from "./Admin/AddDataModal"
import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.css";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Admin" element={<Admin/>}></Route>
        <Route path="/Pitch" element={<Pitch/>}></Route>
        <Route path="/GP" element={<GP/>}></Route>
        <Route path="/checkLinks" element={<CheckLinks/>}></Route>


        {/* GP routes */}
        <Route path="/AddData" element={<Add/>}></Route>
        <Route path="/GP/Update/:id/" element={<Update/>}></Route>

        {/* <Route path="/GP/Topics/:site" element={<Topic/>}></Route> */}
        <Route path="/GP/publish/:table/:id" element={<Publish/>}></Route>

        {/* Routes for Admin */}
        <Route path="/Admin/AddData" element = {<AddData/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
