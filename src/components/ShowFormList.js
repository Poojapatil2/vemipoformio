import axios from "axios";
import React, { useEffect, useState } from "react";

const ShowFormList = () => {
    const [formList, setFormList] = useState([]);
    useEffect(() => {
        axios.get("http://13.59.130.104:8080/form?formName=")
            .then(res => {
                console.log("res", res.data.data)
                setFormList(res.data.data)
            })
            .catch(err => console.log("error", err))
    }, [])
    return (
        <>
            <div style={{paddingTop: '10px'}}>
                <h3 style={{paddingTop: '20px', paddingBottom: '20px', textAlign: 'center'}}>FORM LIST</h3>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-evenly', border: '1px solid #ccc', marginLeft: "50px", marginRight: '50px', maxWidth: '1200px'}}>
                <h5>Form Name</h5>
                <h5>Action</h5>
            </div>
            {formList.map((ele, i) => 
            <div key={i} style={{ display: "flex", justifyContent: 'space-evenly', border: '1px solid #ccc', marginLeft: "50px", marginRight: '50px', maxWidth: '1200px' }}>
                <p>{ele.formName}</p>
                {/* <p>{ele.formId}</p> */}
                <a href={`/form-edit?formId=${ele.formId}`}>Edit</a>
            </div>
            )}

        </>
    )
}

export default ShowFormList;