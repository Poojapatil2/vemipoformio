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
        // const responsedata = {
        //     components: [
        //         {
        //             "label": "Text Field",
        //             "labelPosition": "top",
        //             "placeholder": "",
        //             "description": "",
        //             "tooltip": "",
        //             "prefix": "",
        //             "suffix": "",
        //             "widget": {
        //                 "type": "input"
        //             },
        //             "inputMask": "",
        //             "displayMask": "",
        //             "applyMaskOn": "change",
        //             "allowMultipleMasks": false,
        //             "customClass": "",
        //             "tabindex": "",
        //             "autocomplete": "",
        //             "hidden": false,
        //             "hideLabel": false,
        //             "showWordCount": false,
        //             "showCharCount": false,
        //             "mask": false,
        //             "autofocus": false,
        //             "spellcheck": true,
        //             "disabled": false,
        //             "tableView": true,
        //             "modalEdit": false,
        //             "multiple": false,
        //             "persistent": true,
        //             "inputFormat": "plain",
        //             "protected": false,
        //             "dbIndex": false,
        //             "case": "",
        //             "truncateMultipleSpaces": false,
        //             "encrypted": false,
        //             "redrawOn": "",
        //             "clearOnHide": true,
        //             "customDefaultValue": "",
        //             "calculateValue": "",
        //             "calculateServer": false,
        //             "allowCalculateOverride": false,
        //             "validateOn": "change",
        //             "validate": {
        //                 "required": false,
        //                 "pattern": "",
        //                 "customMessage": "",
        //                 "custom": "",
        //                 "customPrivate": false,
        //                 "json": "",
        //                 "minLength": "",
        //                 "maxLength": "",
        //                 "strictDateValidation": false,
        //                 "multiple": false,
        //                 "unique": false
        //             },
        //             "unique": false,
        //             "errorLabel": "",
        //             "errors": "",
        //             "key": "textField",
        //             "tags": [],
        //             "properties": {},
        //             "conditional": {
        //                 "show": null,
        //                 "when": null,
        //                 "eq": "",
        //                 "json": ""
        //             },
        //             "customConditional": "",
        //             "logic": [],
        //             "attributes": {},
        //             "overlay": {
        //                 "style": "",
        //                 "page": "",
        //                 "left": "",
        //                 "top": "",
        //                 "width": "",
        //                 "height": ""
        //             },
        //             "type": "textfield",
        //             "input": true,
        //             "refreshOn": "",
        //             "dataGridLabel": false,
        //             "addons": [],
        //             "inputType": "text",
        //             "id": "ejqbdbb",
        //             "defaultValue": null
        //         },
        //         {
        //             "label": "Text Area",
        //             "labelPosition": "top",
        //             "placeholder": "",
        //             "description": "",
        //             "tooltip": "",
        //             "prefix": "",
        //             "suffix": "",
        //             "widget": {
        //                 "type": "input"
        //             },
        //             "displayMask": "",
        //             "applyMaskOn": "change",
        //             "editor": "",
        //             "autoExpand": false,
        //             "customClass": "",
        //             "tabindex": "",
        //             "autocomplete": "",
        //             "hidden": false,
        //             "hideLabel": false,
        //             "showWordCount": false,
        //             "showCharCount": false,
        //             "autofocus": false,
        //             "spellcheck": true,
        //             "disabled": false,
        //             "tableView": true,
        //             "modalEdit": false,
        //             "multiple": false,
        //             "persistent": true,
        //             "inputFormat": "html",
        //             "protected": false,
        //             "dbIndex": false,
        //             "case": "",
        //             "truncateMultipleSpaces": false,
        //             "encrypted": false,
        //             "redrawOn": "",
        //             "clearOnHide": true,
        //             "customDefaultValue": "",
        //             "calculateValue": "",
        //             "calculateServer": false,
        //             "allowCalculateOverride": false,
        //             "validateOn": "change",
        //             "validate": {
        //                 "required": false,
        //                 "pattern": "",
        //                 "customMessage": "",
        //                 "custom": "",
        //                 "customPrivate": false,
        //                 "json": "",
        //                 "minLength": "",
        //                 "maxLength": "",
        //                 "minWords": "",
        //                 "maxWords": "",
        //                 "strictDateValidation": false,
        //                 "multiple": false,
        //                 "unique": false
        //             },
        //             "unique": false,
        //             "errorLabel": "",
        //             "errors": "",
        //             "key": "textArea",
        //             "tags": [],
        //             "properties": {},
        //             "conditional": {
        //                 "show": null,
        //                 "when": null,
        //                 "eq": "",
        //                 "json": ""
        //             },
        //             "customConditional": "",
        //             "logic": [],
        //             "attributes": {},
        //             "overlay": {
        //                 "style": "",
        //                 "page": "",
        //                 "left": "",
        //                 "top": "",
        //                 "width": "",
        //                 "height": ""
        //             },
        //             "type": "textarea",
        //             "rows": 3,
        //             "wysiwyg": false,
        //             "input": true,
        //             "refreshOn": "",
        //             "dataGridLabel": false,
        //             "allowMultipleMasks": false,
        //             "addons": [],
        //             "mask": false,
        //             "inputType": "text",
        //             "inputMask": "",
        //             "fixedSize": true,
        //             "id": "e0zx2zl",
        //             "defaultValue": null
        //         },
        //         {
        //             "label": "Select Boxes",
        //             "labelPosition": "top",
        //             "optionsLabelPosition": "right",
        //             "description": "",
        //             "tooltip": "",
        //             "customClass": "",
        //             "tabindex": "",
        //             "inline": false,
        //             "hidden": false,
        //             "hideLabel": false,
        //             "autofocus": false,
        //             "disabled": false,
        //             "tableView": false,
        //             "modalEdit": false,
        //             "dataSrc": "values",
        //             "values": [
        //                 {
        //                     "label": "test",
        //                     "value": "test",
        //                     "shortcut": ""
        //                 }
        //             ],
        //             "valueProperty": "",
        //             "persistent": true,
        //             "protected": false,
        //             "dbIndex": false,
        //             "encrypted": false,
        //             "clearOnHide": true,
        //             "customDefaultValue": "",
        //             "calculateValue": "",
        //             "calculateServer": false,
        //             "allowCalculateOverride": false,
        //             "validate": {
        //                 "required": false,
        //                 "onlyAvailableItems": false,
        //                 "customMessage": "",
        //                 "custom": "",
        //                 "customPrivate": false,
        //                 "json": "",
        //                 "strictDateValidation": false,
        //                 "multiple": false,
        //                 "unique": false
        //             },
        //             "errorLabel": "",
        //             "minSelectedCountMessage": "",
        //             "maxSelectedCountMessage": "",
        //             "errors": "",
        //             "key": "selectBoxes",
        //             "tags": [],
        //             "properties": {},
        //             "conditional": {
        //                 "show": null,
        //                 "when": null,
        //                 "eq": "",
        //                 "json": ""
        //             },
        //             "customConditional": "",
        //             "logic": [],
        //             "attributes": {},
        //             "overlay": {
        //                 "style": "",
        //                 "page": "",
        //                 "left": "",
        //                 "top": "",
        //                 "width": "",
        //                 "height": ""
        //             },
        //             "type": "selectboxes",
        //             "data": {
        //                 "url": ""
        //             },
        //             "template": "<span>{{ item.label }}</span>",
        //             "redrawOn": "",
        //             "input": true,
        //             "placeholder": "",
        //             "prefix": "",
        //             "suffix": "",
        //             "multiple": false,
        //             "unique": false,
        //             "refreshOn": "",
        //             "dataGridLabel": false,
        //             "widget": null,
        //             "validateOn": "change",
        //             "showCharCount": false,
        //             "showWordCount": false,
        //             "allowMultipleMasks": false,
        //             "addons": [],
        //             "authenticate": false,
        //             "ignoreCache": false,
        //             "inputType": "checkbox",
        //             "fieldSet": false,
        //             "id": "exwiq7",
        //             "defaultValue": {}
        //         },
        //         {
        //             "type": "button",
        //             "label": "Submit",
        //             "key": "submit",
        //             "size": "md",
        //             "block": false,
        //             "action": "submit",
        //             "disableOnInvalid": true,
        //             "theme": "primary",
        //             "id": "e0817m",
        //             "input": true,
        //             "placeholder": "",
        //             "prefix": "",
        //             "customClass": "",
        //             "suffix": "",
        //             "multiple": false,
        //             "defaultValue": null,
        //             "protected": false,
        //             "unique": false,
        //             "persistent": false,
        //             "hidden": false,
        //             "clearOnHide": true,
        //             "refreshOn": "",
        //             "redrawOn": "",
        //             "tableView": false,
        //             "modalEdit": false,
        //             "dataGridLabel": true,
        //             "labelPosition": "top",
        //             "description": "",
        //             "errorLabel": "",
        //             "tooltip": "",
        //             "hideLabel": false,
        //             "tabindex": "",
        //             "disabled": false,
        //             "autofocus": false,
        //             "dbIndex": false,
        //             "customDefaultValue": "",
        //             "calculateValue": "",
        //             "calculateServer": false,
        //             "widget": {
        //                 "type": "input"
        //             },
        //             "attributes": {},
        //             "validateOn": "change",
        //             "validate": {
        //                 "required": false,
        //                 "custom": "",
        //                 "customPrivate": false,
        //                 "strictDateValidation": false,
        //                 "multiple": false,
        //                 "unique": false
        //             },
        //             "conditional": {
        //                 "show": null,
        //                 "when": null,
        //                 "eq": ""
        //             },
        //             "overlay": {
        //                 "style": "",
        //                 "left": "",
        //                 "top": "",
        //                 "width": "",
        //                 "height": ""
        //             },
        //             "allowCalculateOverride": false,
        //             "encrypted": false,
        //             "showCharCount": false,
        //             "showWordCount": false,
        //             "properties": {},
        //             "allowMultipleMasks": false,
        //             "addons": [],
        //             "leftIcon": "",
        //             "rightIcon": ""
        //         }
        //     ]
        // }
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
              basic: {
                default: true,
                components: require('./formbuilder.json')
              }
            }
          }
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
