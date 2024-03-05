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
  const [customData, setCustomData] = useState({});
  const [loading, setLoading] = useState(true); // Added loading 
  const [modalClosed, setModalClosed] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Accessing specific search parameters
  const formId = searchParams.get('formId');
  const flag = searchParams.get('flag');
  // console.log(flag,'formId', formId)

  // function for getting all the details of the particular form
  useEffect(() => {
    // console.log("locatop", formId)
    if (formId) {
      axios.get(`http://3.23.40.210:8081/form/formid/${formId}`)
      .then(res => {
        // console.log("res", res.data.data);
        if(flag === 'edit') {
          setFormName(res.data.data.formName)
        } else {
          setFormName("")
        }
       
        setSchema(res.data.data)
      })
      .catch(err => console.log("error", err))
    setEditBuilder(true)
    }
    
  }, [editBuilder, formId])

  const handleCloseModal = () => {
    setShowModal(false);
    setModalClosed(true);
  }

  const onFormChange = (schema) => {
    console.log("sc", schema)
    setSchema({ ...schema, components: [...schema.components] });
  };

  // for displaying the user defined costant
  useEffect(() => {
    axios.get(`http://3.23.40.210:8081/form/constants`)
      .then((response) => {
        // console.log(response.data, "constants");
        const tempObj = {
          premium: false,
        };
        response.data.data.forEach(item => {
          let htmlValue = '';
          if (item.dataType.toLowerCase() === 'content') {
            htmlValue = item.defaultValue ? `<img class="test" src=${item.defaultValue}></img>` : '';
          }
          tempObj[item.fieldKey] = {
            title: item.title,
            group: 'custom',
            icon: 'fa-solid fa-user',
            schema: {
              type: item.dataType.toLowerCase(),
              key: item.fieldKey,
              label: item.title,
              input: true,
              defaultValue: item.defaultValue,
              html: htmlValue
            }
          };
        });
        setCustomData(tempObj);
        setLoading(false); // Set loading to false after fetching data
        // console.log(tempObj, customData, "variable");
      })
      .catch((error) => console.log(error, "error constant"))
  }, [modalClosed, loading]);


  //function for saving the changes done in the  existing form template.
  const handleSaveEditForm = () => {
    if (formName.trim() === '') {
      alert('Please enter a form name.');
      setShowModal(false)
      return;
    }
    const body = {
      formName: formName,
      formDescription: "This is consent form",
      version: "1.0.0",
      isActive: true,
      companyId: "3",
      components: jsonSchema.components
    }
    if(flag === 'copy') {
      axios.post(`http://3.23.40.210:8081/form`, body)
      .then((res) => {
        setShowModal(false);
        setSchema({ components: [] })
        setFormName("");
        console.log('res', res)
      })
      .catch((err) => {
        console.log(err, 'err')
      })
    } else 
    { 
      axios.put(`http://3.23.40.210:8081/form/formid/${formId}`, body)
      .then((res) => {
        setShowModal(false);
        setSchema({ components: [] })
        setFormName("");
        console.log('res', res)
      })
      .catch((err) => {
        console.log(err, 'err')
      })}
   
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
      {!loading && (
        <FormBuilder
          form={jsonSchema}
          onChange={onFormChange}
          options={{
            builder: {
              premium: false,
              data: false,
              advanced: false,
              layout: false,
              customBasic: {
                title: 'Custom',
                default: false,
                weight: 10,
                components: customComponents,
              },
              customConstant: {
                title: 'Variables',
                default: false,
                weight: 10,
                components: customData,
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
              customAdvanced: {
                title: 'Advanced',
                weight: 10,
                components: advancedComponents
              },
              customLayout: {
                title: 'Layout',
                weight: 10,
                components: layoutComponents
              }
            },
          }}
        />
      )}
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
