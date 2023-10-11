import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'

function CreateUser(){
    //for contents table
    const [Mailboxes, setMailBox] = useState("")
    const [DocsURL, setDocsUrl] = useState("")
    const [Title, setTitle] = useState("")
    const [Email, setEmailId] = useState("")
    const [Status, setStatus] = useState("")
    const [Site, setSite] = useState("")
    const [Requirements, setRequirement] = useState("")
    const [DF, setDF] = useState("")


    const navigate = useNavigate()

    const mailboxOptions = [
        { value: "", name: "---------" },
        { value: "4H", name: "ellieben11@gmail.com" },
        { value: "FAO", name: "breannethorne11@gmail.com" },
        { value: "TW", name: "quinnwilde761@gmail.com" },
        { value: "TH", name: "eziomontoya1@gmail.com" },
        { value: "SC", name: "johnocampos121@gmail.com" },
        { value: "T+", name: "katiespring83@gmail.com" },
        { value: "CT", name: "synthiawright35@gmail.com    " },
        { value: "VE", name: "siasmith21@gmail.com" },
        { value: "FP", name: "maddisonparker2354@gmail.com " },
        { value: "Can", name: "adelaideferrano364@gmail.com" },
      ];



    const handleSubmit = (e)=>{
        e.preventDefault();
        const table = "Contents"
        console.log(Mailboxes)
        axios.post(`/content/add/${table}`, { Mailboxes, DocsURL, Title, Email, Status, Site, Requirements, DF})
            .then(result => {
                console.log(result)
                navigate('/GP')
            })
            .catch(err => console.error(err))
    }


    return(
        <>
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
             <div className='w-50 bg-white rounded p-3'>
                 <form>
                     <h2>Add User</h2>
                     <div className='mb-2'>
                         <label htmlFor=''>Mailboxes</label>
                         {/* <input type='text' placeholder='Enter Name' className='form-control'
                             onChange =  {(e) => setMailBox(e.target.value)}
                         /> */}
                         <select
                            className="form-control select2 select2-hidden-accessible"
                            tabIndex="-1"
                            aria-hidden="true"
                            onChange={(e) => setMailBox(e.target.value)}
                        >
                            {mailboxOptions.map((option, index) => (
                            <option key={index} value={option.name}>
                                {option.value} : {option.name}
                            </option>
                            ))}
                        </select>
                     </div>
                     <div className='mb-2'>
                         <label htmlFor=''>Docs URL</label>
                         <input type='text' placeholder='Enter Name' className='form-control'
                             onChange =  {(e) => setDocsUrl(e.target.value)}
                         />
                     </div>
                     <div className='mb-2'>
                         <label htmlFor=''>Title</label>
                         <input type='text' placeholder='Enter Name' className='form-control'
                             onChange =  {(e) => setTitle(e.target.value)}
                         />
                     </div>
                     <div className='mb-2'>
                         <label htmlFor=''>Email ID</label>
                         <input type='email' placeholder='Enter Name' className='form-control'
                             onChange =  {(e) => setEmailId(e.target.value)}
                         />
                     </div>
                     <div className='mb-2'>
                         <label htmlFor=''>Status</label>
                         <input type='text' placeholder='Enter Name' className='form-control'
                             onChange =  {(e) => setStatus(e.target.value)}
                         />
                     </div>
                     <div className='mb-2'>
                         <label htmlFor=''>Site</label>
                         <input type='text' placeholder='Enter Name' className='form-control'
                             onChange =  {(e) => setSite(e.target.value)}
                         />
                     </div>
                     <div className='mb-2'>
                         <label htmlFor=''>Requirements</label>
                         <input type='text' placeholder='Enter Name' className='form-control'
                             onChange =  {(e) => setRequirement(e.target.value)}
                         />
                     </div>
                     <div className='mb-2'>
                         <label htmlFor=''>DF</label>
                         <input type='text' placeholder='Enter Name' className='form-control'
                             onChange =  {(e) => setDF(e.target.value)}
                         />
                     </div>
                     <button className='btn btn-success' onClick={handleSubmit}>Submit</button>
                 </form>
             </div>
        </div>
     </>

    )  

}


export default CreateUser