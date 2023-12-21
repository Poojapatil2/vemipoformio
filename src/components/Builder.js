import { Form, FormBuilder } from "@formio/react";
import { Components } from "@formio/react";
import { useState } from "react";
import { Card, Modal } from "react-bootstrap";
import FirstName from "./FirstName";
import ReactJson from "react-json-view";
import "../styles/Builder.css";
import axios from "axios";

const Builder = () => {
  

  // Components.setComponent('firstName', FirstName);

  const [jsonSchema, setSchema] = useState({
    // "display": "form",
    // "type": "form",
    components: [
      // {
      //   label: "First Name",
      //   placeholder: "First Name",
      //   key: "firstName",
      //   tableView: true,
      //   input: true, 
      //   "components": []
      // }
    ],
  });
  const [showModal, setShowModal] = useState(false);
  const [formName, setFormName] = useState("");

  const handleCloseModal = () => {
    setShowModal(false);
  }

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
      setSchema({components: []})
      console.log('res', res)
    })
    .catch((err) => {
      console.log(err, 'err')
    })
  }


  const onFormChange = (schema) => {
    setSchema({ ...schema, components: [...schema.components] });
  };
  return (
    <>
      <div style={{ display: 'flex' }}>
        <div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)} style={{ margin: '20px' }}>Preview</button>
          <a href="/form-list" className="btn btn-primary" style={{ margin: '20px' }}>Show Form List</a>
          </div>
        <div style={{ display: 'flex', marginTop: '20px', marginLeft: '250px' }}>
          <span style={{ width: '150px', fontWeight: 'bold' }}>Form Name: </span>
          <input className="form-control md-6" onChange={(e)=> setFormName(e.target.value)} />
        </div>
      </div>
      <FormBuilder
        form={jsonSchema}
        onChange={onFormChange}
        // options={{
        //   builder: {
        //     custom: {
        //       basic: {
        //         default: true,
        //         components: require('./formbuilder.json')
        //       }
        //     }
        //   }
        // }}
      />
      {/* <Card title="Form JSON Schema" className="my-4">
        <Card.Body>
          <Card.Title className="text-center">As JSON Schema</Card.Title>
          <ReactJson src={jsonSchema} name={null} collapsed={true}></ReactJson>
        </Card.Body>
      </Card> */}
      {
        <Modal className="my-4" show={showModal} onHide={handleCloseModal} closebutton={false}>
          <Modal.Body>
            <Modal.Title className="text-center">Form Name:{formName}</Modal.Title>
            <Form form={jsonSchema} />
            <button onClick={handleSaveForm} className="btn btn-primary">Save Form</button>
          </Modal.Body>
        </Modal>}
    </>
  );
};
export default Builder;
