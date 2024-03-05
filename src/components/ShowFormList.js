import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const ShowFormList = () => {
    const [formList, setFormList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [newFormId, setNewFormId] = useState("")
    const [newFormName, setNewFormName] = useState("");
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // Accessing specific search parameters
    const formId = searchParams.get('formId');
  


    const handleCloseModal = () => {
        setShowModal(false);
    }

    //function for displaying all the saved formlist
    useEffect(() => {
        axios.get("http://3.23.40.210:8081/form?formName=")
            .then(res => {
                console.log("res", res.data.data)
                setFormList(res.data.data)
            })
            .catch(err => console.log("error", err))
    }, [])

    const handleSendMail = () => {
        const result = window.location.origin + `/show-form?formId=${newFormId}`
        const body = {
            formId: newFormId,
            formName: newFormName,
            receiverEmail: email,
            patientName: name,
            formUrl:  result
        }
        axios.post(`http://3.23.40.210:8081/form/send`, body)
        .then((res) => {
            setShowModal(false);
            setName("");
            setEmail("");

            console.log(res, "response")
        })
        .catch((err) => console.log('err', err))
  
    }

    const navigate = useNavigate()
    const handleEdit = (formId, flag) => {
        navigate(`/form-edit?formId=${formId}&flag=${flag}`)
    }

    return (
        <>
           <table style={{ marginLeft: "50px", marginRight: '50px', maxWidth: '1200px', borderCollapse: 'collapse', width: '100%' }}>
    <thead>
        <tr style={{ border: '1px solid #ccc' }}>
            <th style={{ padding: '10px', textAlign: 'center' }}>Form Name</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Action</th>
        </tr>
    </thead>
    <tbody>
        {formList.map((ele, i) =>
            <tr key={i} style={{ border: '1px solid #ccc' }}>
                <td style={{ padding: '10px',textAlign: 'center' }}>{ele.formName}</td>
                <td style={{ padding: '10px',textAlign: 'center' }}>
                    <button className="btn btn-primary" style={{ margin: '5px' }} onClick={()=>handleEdit(ele.formId, "edit")}>Edit</button>
                    <button className="btn btn-primary" style={{ margin: '5px' }} onClick={() => { setShowModal(true); setNewFormId(ele.formId); setNewFormName(ele.formName) }}>Send</button>
                    <button className="btn btn-primary" style={{ margin: '5px' }} onClick={()=>handleEdit(ele.formId, "copy")}>Copy</button>
                </td>
            </tr>
        )}
    </tbody>
</table>


            {
                <Modal className="my-4" show={showModal} onHide={handleCloseModal} closebutton={false}>
                    <Modal.Body>
                        <>
                            <div style={{ display: 'flex', margin: '20px' }}>
                                <p style={{ fontWeight: 'bold', padding: '5px' }}> Name: </p>
                                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div style={{ display: 'flex', margin: '20px' }}>
                                <p style={{ fontWeight: 'bold', padding: '5px' }}> Email: </p>
                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <button className="btn btn-primary" onClick={() => handleSendMail(formId)}>Send Email</button>
                            </div>
                        </>
                    </Modal.Body>
                </Modal>
            }

        </>
    )
}

export default ShowFormList;