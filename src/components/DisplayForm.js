import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import NestedDataComponent from "./NestedDataComponent";

const DisplayForm = () => {
    const [jsonSchema, setSchema] = useState({
        components: [],
    });
    const [formData, setFormData] = useState({});
    const [isSubmittedform, setIsSubmittedForm] = useState(false)

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // Accessing specific search parameters
    const formId = searchParams.get('formId');

    const handleUpdateFormData = (newFormData) => {
        setFormData(newFormData);
        setIsSubmittedForm(true)
    };

    useEffect(() => {
        console.log("locatop", formId)
        if (formId) {
            axios.get(`http://3.23.40.210:8081/form/formid/${formId}`)
                .then(res => {
                    console.log("res", res.data.data)
                    setSchema(res.data.data)
                    if(!isSubmittedform) {
                        setFormData(res.data.data.patientData)
                    }
                    
                })
                .catch(err => console.log("error", err))
        }
    }, [isSubmittedform, formId])

    return (
        <>
            <div style={{maxWidth: '1300px', display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                {/* <div style={{ display: 'flex', marginTop: '20px', fontWeight: 'bold' }}>
                    <span style={{ width: '105px', fontWeight: 'bold', textAlign: 'center' }}>  </span> <h3>{jsonSchema.formName}</h3> 
                </div> */}
                <div className="container">
                    <NestedDataComponent patientData={jsonSchema.patientData} components={jsonSchema.components} updateFormData={handleUpdateFormData}
                        formData={formData} />
                </div>
            </div>
        </>
    )

}

export default DisplayForm;