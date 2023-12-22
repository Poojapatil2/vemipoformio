import { Form, FormBuilder } from "@formio/react";
import { useEffect, useState } from "react";
import { Card, Modal } from "react-bootstrap";
import ReactJson from "react-json-view";
import "../styles/Builder.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
const EditBuilder = () => {

    const [jsonSchema, setSchema] = useState({
        components: [],

    });

    const [showModal, setShowModal] = useState(false);
    const [formName, setFormName] = useState("");
    const [editBuilder, setEditBuilder] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // Accessing specific search parameters
    const formId = searchParams.get('formId');

    useEffect(() => {
        console.log("locatop", formId)
        axios.get(`http://13.59.130.104:8080/form/formid/${formId}`)
        .then(res => {
            console.log("res", res.data.data)
            setSchema(res.data.data)
        })
        .catch(err => console.log("error", err))
        setEditBuilder(true)
      
    }, [editBuilder])

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const onFormChange = (schema) => {
        console.log("sc", schema)
        setSchema({ ...schema, components: [...schema.components] });
    };

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
            setSchema({components: []})
            console.log('res', res)
          })
          .catch((err) => {
            console.log(err, 'err')
          })
    }


    const customComponents = {
      customTextField: {
        title: 'First Name',
        group: 'custom',
        icon: 'fa-solid fa-user',
        template: 'customTextField',
        schema: {
          type: 'textfield',
          key: 'firstName',
          label: 'First Name ',
          input: true,
        },
      },
      customMiddleNameTextField: {
        title: 'Middle Name',
        group: 'custom',
        icon: 'fa-solid fa-user',
        template: 'customTextField',
        schema: {
          type: 'textfield',
          key: 'middleName',
          label: 'Middle Name ',
          input: true,
        },
      },
      customLastNameTextField: {
        title: 'Last Name',
        group: 'custom',
        icon: 'fa-solid fa-user',
        template: 'customTextField',
        schema: {
          type: 'textfield',
          key: 'laastName',
          label: 'Last Name ',
          input: true,
        },
      },
    };

    return (
        <>
            <div style={{ display: 'flex' }}>
                <div>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)} style={{ margin: '20px' }}>Preview</button></div>
                <div style={{ display: 'flex', marginTop: '20px', marginLeft: '250px' }}>
                    <span style={{ width: '150px', fontWeight: 'bold' }}>Form Name: </span>
                    <input className="form-control md-6" value={jsonSchema.formName} onChange={(e)=>setFormName(e.target.value)} />
                </div>
            </div>
            <FormBuilder
        form={jsonSchema}
        onChange={onFormChange}
        options={{
          builder: {
            custom: {
              title: 'Custom',
              default: true,
              weight: 0,
              components: customComponents,
            },
          },
        }}
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
                        <Modal.Title className="text-center">{jsonSchema.formName}</Modal.Title>
                        <Form form={jsonSchema} />
                        <button className="btn btn-primary" onClick={handleSaveEditForm} >Save Form</button>
                    </Modal.Body>
                </Modal>}
        </>
    );
};
export default EditBuilder;
