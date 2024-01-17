import { Form, FormBuilder } from "@formio/react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Modal } from "react-bootstrap";
import "../styles/Builder.css";
import axios from "axios";
import customComponents from "./CustomComponents";
import patientInfo from "./PatientInfo";
import contactInfo from "./ContactInformation";
import responsiblePartyInfo from "./ResponsiblePartyInfo";

const Builder = () => {

  // json for the form builder components
  const [jsonSchema, setSchema] = useState({
    components: []
  });
  const [showModal, setShowModal] = useState(false);
  const [formName, setFormName] = useState("");
  
  const handleCloseModal = () => {
    setShowModal(false);
  }

// function for saving the created form as a template
  const handleSaveForm = () => {
    const body = {
      formName: formName,
      formDescription: "This is consent form",
      version: "1.0.0",
      isActive: true,
      companyId: "3",
      components: jsonSchema.components
    }
    axios.post(`http://13.59.130.104:8080/form`, body) 
    .then((res) => {
      setShowModal(false);
      setFormName("");
      setSchema({components: []})
      console.log('res', res)
    })
    .catch((err) => {
      console.log(err, 'err')
    })
  }

  //function for getting components inthe drag and drop zone 
  const onFormChange = (schema) => {
    setSchema({ ...schema, components: [...schema.components] });
  };

  const navigate = useNavigate()
  const handleShowForm = () => {
      navigate(`/form-list`)
  }

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)} style={{ margin: '20px' }}>Preview</button>
          <button  className="btn btn-primary" onClick={handleShowForm} style={{ margin: '20px' }}>Show Form List</button>
          </div>
        <div style={{ display: 'flex', marginTop: '20px', marginLeft: '250px' }}>
          <span style={{ width: '150px', fontWeight: 'bold' }}>Form Name: </span>
          <input className="form-control md-6" onChange={(e)=> setFormName(e.target.value)} />
        </div>
      </div>
      <FormBuilder
        form={jsonSchema}
        onChange={onFormChange}
        options={{
          builder: {
            premium : false,
            // premiumComponents :  {
            //   title : 'Premium',
            //   default: false,

            // },
            customBasic: {
              title: 'Custom',
              default: false,
              weight: 10,
              components: customComponents,
            },
            customPatient: {
              title: 'Patient Info',
              default: false,
              weight: 10,
              components: patientInfo
            },
            customContact: {
              title: 'Contact Info',
              default: false,
              weight: 10,
              components: contactInfo
            },
            customResponsible: {
              title: 'Responsible Party Info',
              default: false,
              weight: 10,
              components: responsiblePartyInfo
            },
          },
        }}
      />
      {
        <Modal className="my-4" show={showModal} onHide={handleCloseModal} closebutton={false}>
          <Modal.Body>
            <Modal.Title className="text-center">Form Name:{formName}</Modal.Title>
            <Form form={jsonSchema} />
            <button onClick={handleSaveForm} className="btn btn-primary">Save Form</button>
          </Modal.Body>
        </Modal>
      }
    </>
  );
};
export default Builder;
