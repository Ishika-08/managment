import React, {useEffect, useState} from 'react'
import { Button, Modal } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'

function CreateUser({ show, handleClose }){
    //for contents table
    const [Mailboxes, setMailBox] = useState()
    const [DocsURL, setDocsUrl] = useState()
    const [Title, setTitle] = useState()
    const [Email, setEmailId] = useState()
    const [Status, setStatus] = useState()
    const [Site, setSite] = useState()
    const [Requirements, setRequirement] = useState()
    const [DF, setDF] = useState()
    const [mailboxOptions, setmailBoxOptions] = useState([])


    const navigate = useNavigate()


    useEffect(()=>{
        axios.get("/admin/websites/")
    .then((result) =>{
        console.log(result.data)
      setmailBoxOptions(result.data)
    })
    .catch(err => {
      console.log(err)
    })
    }, [])


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
        handleClose()
    }


    return(
        <>
         <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className='bg-white rounded p-3'>
                 <form>
                     <div className='mb-2'>
                         <label htmlFor=''>Mailboxes</label>
                         <select
                            className="form-control select2 select2-hidden-accessible"
                            tabIndex="-1"
                            aria-hidden="true"
                            onChange={(e) => setMailBox(e.target.value)}
                        >
                            <option value = "">---------</option>
                            {mailboxOptions.map((option, index) => (
                            <option key={index} value={option.MailBox}>
                                {option.Website} : {option.MailBox}
                            </option>
                            ))}
                        </select>
                     </div>
                     <div className='mb-2'>
                         <label htmlFor=''>Docs URL</label>
                         <input type='text' placeholder='Enter Docs URL' className='form-control'
                             onChange =  {(e) => setDocsUrl(e.target.value)}
                         />
                     </div>
                     <div className='mb-2'>
                         <label htmlFor=''>Title</label>
                         <input type='text' placeholder='Enter Title' className='form-control'
                             onChange =  {(e) => setTitle(e.target.value)}
                         />
                     </div>
                     <div className='mb-2'>
                         <label htmlFor=''>Email ID</label>
                         <input type='email' placeholder='Enter Email' className='form-control'
                             onChange =  {(e) => setEmailId(e.target.value)}
                         />
                     </div>
                     <div className='mb-2'>
                         <label htmlFor=''>Status</label>
                         <select
                            className="form-control select2 select2-hidden-accessible"
                            tabIndex="-1"
                            aria-hidden="true"
                            onChange={(e) => setStatus(e.target.value)}
                        >
                           <option value="">-------</option>
                           <option value="Link Added">Link Added</option>
                           <option value="Sent">Sent</option>
                           <option value="Pending">Pending</option>
                        </select>
                     </div>
                     <div className='mb-2'>
                         <label htmlFor=''>Site</label>
                         <select
                            className="form-control select2 select2-hidden-accessible"
                            tabIndex="-1"
                            aria-hidden="true"
                            onChange={(e) => setSite(e.target.value)}
                        >
                            <option value = "">---------</option>

                            {mailboxOptions.map((element, index) => {
                                if(element.Website === "TPlus"){
                                    return(<option value="T+">T+</option>)
                                }else{
                                    return (
                                    <option key={index} value={element.Website}>
                                        {element.Website}
                                    </option>
                            );
                                }
                        })}
                        </select>
                     </div>
                     <div className='mb-2'>
                         <label htmlFor=''>Requirements</label>
                         <input type='text' placeholder='Enter Requirements' className='form-control'
                             onChange =  {(e) => setRequirement(e.target.value)}
                         />
                     </div>
                     <div className='mb-2'>
                         <label htmlFor=''>DF</label>
                         <select
                            className="form-control select2 select2-hidden-accessible"
                            tabIndex="-1"
                            aria-hidden="true"
                            onChange={(e) => setDF(e.target.value)}
                        >
                           <option value="">-------</option>
                           <option value="Yes">Yes</option>
                           <option value="No">No</option>
                        </select>
                     </div>
                 </form>
             </div>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="primary" onClick={handleSubmit}>Submit</Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
     </>

    )  

}


export default CreateUser