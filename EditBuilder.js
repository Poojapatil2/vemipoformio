import { Form, FormBuilder } from "@formio/react";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "../styles/Builder.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import customComponents from "./CustomComponents";
import patientInfo from "./PatientInfo";
import contactInfo from "./ContactInformation";
import responsiblePartyInfo from "./ResponsiblePartyInfo";
import advancedComponents from "./AdvancedComponents";
import layoutComponents from "./LayoutComponents";

const EditBuilder = () => {
  const [jsonSchema, setSchema] = useState({
    components: [],
  });

  const [showModal, setShowModal] = useState(false);
  const [formName, setFormName] = useState(jsonSchema.formName);
  const [editBuilder, setEditBuilder] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Accessing specific search parameters
  const formId = searchParams.get('formId');
  console.log('formId', formId)

  // function for getting all the details of the particular form
  useEffect(() => {
    console.log("locatop", formId)
    if (formId) {
      axios.get(`http://13.59.130.104:8080/form/formid/${formId}`)
      .then(res => {
        console.log("res", res.data.data);
        setFormName(res.data.data.formName)
        setSchema(res.data.data)
      })
      .catch(err => console.log("error", err))
    setEditBuilder(true)
    }
    
  }, [editBuilder, formId])

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const onFormChange = (schema) => {
    console.log("sc", schema)
    setSchema({ ...schema, components: [...schema.components] });
  };

  //function for saving the changes done in the  existing form template.
  const handleSaveEditForm = () => {
    const body = {
      formName: formName,
      formDescription: "This is consent form",
      version: "1.0.0",
      isActive: true,
      companyId: "3",
      components: jsonSchema.components
    }
    axios.put(`http://13.59.130.104:8080/form/formid/${formId}`, body)
      .then((res) => {
        setShowModal(false);
        setSchema({ components: [] })
        setFormName("");
        console.log('res', res)
      })
      .catch((err) => {
        console.log(err, 'err')
      })
  }

  const navigate= useNavigate();
  const handleBack =() => {
    navigate('/')
  }


  return (
    <>
      <div style={{ display: 'flex' }}>
        <div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)} style={{ margin: '20px' }}>Preview</button>
          <button className="btn btn-primary" onClick={handleBack} style={{ margin: '20px' }}>Back to Home</button>
          </div>
          
        <div style={{ display: 'flex', marginTop: '20px', marginLeft: '250px' }}>
          <span style={{ width: '150px', fontWeight: 'bold' }}>Form Name: </span>
          <input className="form-control md-6" value={formName} onChange={(e) => setFormName(e.target.value)} />
        </div>
      </div>
      <FormBuilder
        form={jsonSchema}
        onChange={onFormChange}
        options={{
          builder: {
            premium : false,
            data : false,
            advanced: false,
            layout: false,
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
            customAdvanced : {
              title: 'Advanced',
              weight: 10,
              components: advancedComponents
            },
            customLayout : {
              title: 'Layout',
              weight: 10,
              components: layoutComponents
            }
          },
        }}
      />
      {
        <Modal className= "modal-lg" show={showModal} onHide={handleCloseModal} closebutton={false}>
          <Modal.Body>
            <Modal.Title className="text-center">{formName}</Modal.Title>
            <Form form={jsonSchema} />
            <button className="btn btn-primary" onClick={handleSaveEditForm} >Save Form</button>
          </Modal.Body>
        </Modal>}
    </>
  );
};
export default EditBuilder;
