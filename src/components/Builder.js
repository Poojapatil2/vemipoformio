import { Form, FormBuilder } from "@formio/react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Modal } from "react-bootstrap";
import "../styles/Builder.css";
import axios from "axios";
import customComponents from "./CustomComponents";
import patientInfo from "./PatientInfo";
import contactInfo from "./ContactInformation";
import responsiblePartyInfo from "./ResponsiblePartyInfo";
import advancedComponents from "./AdvancedComponents";
import layoutComponents from "./LayoutComponents";

const Builder = () => {
  // const myRef = useRef(null);
  // json for the form builder components
  const [jsonSchema, setSchema] = useState({
    components: [],
    
  });
  const [showModal, setShowModal] = useState(false);
  const [formName, setFormName] = useState("");
  const [customData, setCustomData] = useState({
    userType: "userDefine"
  });
  const [loading, setLoading] = useState(true); // Added loading state
  const [textInput, setTextInput] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');
  const [defaultValue, setDefaultValue] = useState('')
  const [defaultImage, setDefaultImage] = useState(null);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [numberValue, setNumberValue] = useState('');
  const [modalClosed, setModalClosed] = useState(false);
  const [flag, setFlag] = useState("");

  const dropdownOptions = [
    { value: 'textfield', label: 'Text Field' },
    { value: 'content', label: 'Image' },
    { value: 'textarea', label: 'Text Area' },
    { value: 'select', label : 'Select'},
    { value: 'checkbox', label:'Checkbox'},
    { value: 'radio', label: 'Radio'},
    { value: 'number', label: 'Number'}
  ];

  // Define the options for select, checkbox, and radio inputs
const selectOptions = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

const checkboxOptions = [
  { label: "Checkbox 1", value: "checkbox1" },
  { label: "Checkbox 2", value: "checkbox2" },
  { label: "Checkbox 3", value: "checkbox3" },
];

const radioOptions = [
  { label: "Radio 1", value: "radio1" },
  { label: "Radio 2", value: "radio2" },
  { label: "Radio 3", value: "radio3" },
];

// Define state variables and handlers for select, checkbox, and radio inputs
const [selectValues, setSelectValues] = useState([]);
const [checkboxValues, setCheckboxValues] = useState([]);
const [radioValue, setRadioValue] = useState("");

const handleSelectChange = (e, value) => {
  const isChecked = e.target.checked;
  if (isChecked) {
    setSelectValues((prevValues) => [...prevValues, value]);
  } else {
    setSelectValues((prevValues) => prevValues.filter((item) => item !== value));
  }
};

const handleCheckboxChange = (e, value) => {
  const isChecked = e.target.checked;
  if (isChecked) {
    setCheckboxValues((prevValues) => [...prevValues, value]);
  } else {
    setCheckboxValues((prevValues) => prevValues.filter((item) => item !== value));
  }
};


  const handleCloseModal = () => {
    setShowModal(false);
    setModalClosed(true);
  }

  const handleDropdownChange = (e) => {
    setDropdownValue(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setDefaultImage(file);
  };

  //get api

  useEffect(() => {
    axios.get(`http://3.23.40.210:8081/form/constants`)
      .then((response) => {
        console.log(response.data, "constants");
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
              html: htmlValue,
              hideLabel: true,
            }
          };
        });
        setCustomData(tempObj);
        setLoading(false); // Set loading to false after fetching data
        console.log(tempObj);
      })
      .catch((error) => console.log(error, "error constant"))
  }, [modalClosed, loading]);


  // function for saving the created form as a template
  const handleSaveForm = () => {
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
    axios.post(`http://3.23.40.210:8081/form`, body)
      .then((res) => {
        setShowModal(false);
        setFormName("");
        setSchema({ components: [] })

        console.log('res', res)
      })
      .catch((err) => {
        console.log(err, 'err')
      })
  }


  const postData = (body) => {
    console.log("body", body)
    axios.post(`http://3.23.40.210:8081/form/constants`, body)
      .then((response) => {
        console.log("response", response.data);
        setShowModal(false);
        setDefaultImage('');
        setTextInput('');
        setDefaultValue('');
        setDropdownValue('');
        setTextAreaValue('')
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSaveVariable = () => {
    // if (!textInput || !dropdownValue || !defaultValue || !defaultImage) {
    //   alert("Please fill in all fields."); // Set error message for mandatory fields
    //   return;
    // }
    let defaultValueToSend = defaultValue; // Default value if dropdownValue is not 'content'
    let body = {};
    

    if (dropdownValue === "content" && defaultImage) {
      // Convert defaultImage to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        body = {
          dataType: dropdownValue,
          title: textInput,
          defaultValue: base64String,
          fieldKey: textInput.trim().toLowerCase().replace(/\s+/g, ''),
        };
        postData(body);
      };
      reader.readAsDataURL(defaultImage);
    } else if(dropdownValue === "textarea") {
        body = {
          dataType: dropdownValue,
          title: textInput,
          defaultValue: textAreaValue,
          fieldKey: textInput.trim().toLowerCase().replace(/\s+/g, ''),
        }
        postData(body);
    } else if(dropdownValue === "select") {
        body = {
          dataType: dropdownValue,
          title: textInput,
          defaultValue: selectValues,
          fieldKey: textInput.trim().toLowerCase().replace(/\s+/g, ''),
        }
        postData(body);
    } else if(dropdownValue === "checkbox") { 
        body = {
          dataType: dropdownValue,
          title: textInput,
          defaultValue: checkboxValues,
          fieldKey: textInput.trim().toLowerCase().replace(/\s+/g, ''),
        }
        postData(body);
    }
      else if (dropdownValue === "radio") {
        body = {
          dataType: dropdownValue,
          title: textInput,
          defaultValue: radioValue,
          fieldKey: textInput.trim().toLowerCase().replace(/\s+/g, ''),
        }
        postData(body);
      } else if(dropdownValue === 'number') {
          body = {
            dataType: dropdownValue,
            title: textInput,
            defaultValue: numberValue,
            fieldKey: textInput.trim().toLowerCase().replace(/\s+/g, ''),
          }
          postData(body);
      } else {
        body = {
        dataType: dropdownValue,
        title: textInput,
        defaultValue: defaultValueToSend,
        fieldKey: textInput.trim().toLowerCase().replace(/\s+/g, ''),
      };
      postData(body);
    }  
  };



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
          <button className="btn btn-primary" onClick={() => { setShowModal(true); setFlag('preview') }} style={{ margin: '20px' }}>Preview</button>
          <button className="btn btn-primary" onClick={handleShowForm} style={{ margin: '20px' }}>Show Form List</button>
          <button className="btn btn-primary" onClick={() => { setShowModal(true); setFlag('newvariable') }}>Add New Variable</button>
        </div>
        <div style={{ display: 'flex', marginTop: '20px', marginLeft: '150px' }}>
          <span style={{ width: '150px', fontWeight: 'bold' }}>Form Name: </span>
          <input className="form-control md-6" onChange={(e) => setFormName(e.target.value)} />

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

      {/* modal for saving the form */}
      {flag === "preview" &&
        <Modal className="my-4" show={showModal} onHide={handleCloseModal} closebutton={false}>
          <Modal.Body>
            <Modal.Title className="text-center">{formName}</Modal.Title>
            <Form form={jsonSchema} />
            <button onClick={handleSaveForm} className="btn btn-primary">Save Form</button>
          </Modal.Body>
        </Modal>
      }

      {/* Modal for creating new variable  */}
      {flag === "newvariable" && (
        <Modal show={showModal} onHide={handleCloseModal} closebutton={false}>
          <Modal.Body>
            <div style={{ margin: '20px' }}>
              <p style={{ fontWeight: 'bold', padding: '5px' }}>Title:</p>
              <input
                type="text"
                className="form-control"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              />
            </div>
            <div style={{ margin: '20px' }}>
              <p style={{ fontWeight: 'bold', padding: '5px' }}>Type:</p>
              <select
                className="form-control"
                value={dropdownValue}
                onChange={handleDropdownChange}
              >
                <option value="">Select an option</option>
                {dropdownOptions.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            {dropdownValue === 'content' ? (
              <div style={{ margin: '20px' }}>
                <p style={{ fontWeight: 'bold', padding: '5px' }}>Default Image:</p>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleImageUpload}
                />
              </div>
            ) : dropdownValue === 'textarea' ? (
              <div style={{ margin: '20px' }}>
                <p style={{ fontWeight: 'bold', padding: '5px' }}>Default Value:</p>
                <textarea
                  className="form-control"
                  value={textAreaValue}
                  onChange={(e) => setTextAreaValue(e.target.value)}
                ></textarea>
              </div>
            ) : dropdownValue === 'number' ? (
              <div style={{ margin: '20px' }}>
                <p style={{ fontWeight: 'bold', padding: '5px' }}>Default Value:</p>
                <input
                  className="form-control"
                  value={numberValue}
                  onChange={(e) => setNumberValue(e.target.value)}
                ></input>
              </div>
            ) :
             dropdownValue === 'select' ? (
              <div style={{ margin: '20px' }}>
                <p style={{ fontWeight: 'bold', padding: '5px' }}>Default Value:</p>
                {selectOptions.map((option, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`checkbox-${index}`}
                      value={option.value}
                      checked={selectValues.includes(option.value)}
                      onChange={(e) => handleSelectChange(e, option.value)}
                    />
                    <label className="form-check-label" htmlFor={`checkbox-${index}`}>
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            ) : dropdownValue === 'checkbox' ? (
              <div style={{ margin: '20px' }}>
                <p style={{ fontWeight: 'bold', padding: '5px' }}>Default Value:</p>
                {checkboxOptions.map((option, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`checkbox-${index}`}
                      value={option.value}
                      checked={checkboxValues.includes(option.value)}
                      onChange={(e) => handleCheckboxChange(e, option.value)}
                    />
                    <label className="form-check-label" htmlFor={`checkbox-${index}`}>
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            ) : dropdownValue === 'radio' ? (
              <div style={{ margin: '20px' }}>
                <p style={{ fontWeight: 'bold', padding: '5px' }}>Default Value:</p>
                {radioOptions.map((option, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id={`radio-${index}`}
                      value={option.value}
                      checked={radioValue === option.value}
                      onChange={(e) => setRadioValue(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor={`radio-${index}`}>
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ margin: '20px' }}>
                <p style={{ fontWeight: 'bold', padding: '5px' }}>Default Value:</p>
                <input
                  type="text"
                  className="form-control"
                  value={defaultValue}
                  onChange={(e) => setDefaultValue(e.target.value)}
                />
              </div>
            )}
            <div style={{ textAlign: "end", marginRight: '35px' }}>
              <button className="btn btn-primary" onClick={() => handleSaveVariable()}>Save</button>
            </div>
          </Modal.Body>
        </Modal>
      )}



    </>
  );
};
export default Builder;
