import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";

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
        axios.get("http://13.59.130.104:8080/form?formName=")
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
        axios.post(`http://13.59.130.104:8080/form/send`, body)
        .then((res) => {
            setShowModal(false);
            setName("");
            setEmail("");

            console.log(res, "response")
        })
        .catch((err) => console.log('err', err))
  
    }


    return (
        <>
            <div style={{ paddingTop: '10px' }}>
                <h3 style={{ paddingTop: '20px', paddingBottom: '20px', textAlign: 'center' }}>FORM LIST</h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', border: '1px solid #ccc', marginLeft: "50px", marginRight: '50px', maxWidth: '1200px' }}>
                <h5>Form Name</h5>
                <h5>Action</h5>
            </div>
            {formList.map((ele, i) =>
                <div key={i} style={{ display: "flex", justifyContent: 'space-evenly', border: '1px solid #ccc', marginLeft: "50px", marginRight: '50px', maxWidth: '1200px' }}>
                    <p>{ele.formName}</p>
                    {/* <p>{ele.formId}</p> */}
                    <div style={{ display: 'flex' }}>
                        <a href={`/form-edit?formId=${ele.formId}`}>Edit</a>
                        <button className="btn btn-primary" style={{ margin: '5px' }} onClick={() => { setShowModal(true); setNewFormId(ele.formId); setNewFormName(ele.formName) }}>Send Form</button>
                    </div>
                </div>
            )}

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