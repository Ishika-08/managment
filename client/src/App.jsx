import './App.css'
import "react-bootstrap"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./HomePage/Home"
import GP from "./GP/GP"
import Pitch from "./Pitch/pitch"
import CheckLinks from "./CheckOldLinks/checkLinks"
import Admin from "./Admin/Admin"
import AddData from "./Admin/AddDataModal"
import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.css";
import LoginForm from './HomePage/LoginForm'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<LoginForm/>}></Route>
        <Route path="/Home" element={<Home/>}></Route>
        <Route path="/Admin" element={<Admin/>}></Route>
        <Route path="/Pitch" element={<Pitch/>}></Route>
        <Route path="/GP" element={<GP/>}></Route>
        <Route path="/checkLinks" element={<CheckLinks/>}></Route>

        {/* Routes for Admin */}
        <Route path="/Admin/AddData" element = {<AddData/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
