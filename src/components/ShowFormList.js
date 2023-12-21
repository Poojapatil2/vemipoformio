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
    return(
        <>
            <div>FORM LIST</div>
            {formList.map((ele, i) => <div key={i} style={{display: "flex"}}>
                <p>{ele.formName}</p>
                {/* <p>{ele.formId}</p> */}
                <a href={`/form-edit?formId=${ele.formId}`}>Edit</a>
            </div>)}
        </>
    )
}

export default ShowFormList;