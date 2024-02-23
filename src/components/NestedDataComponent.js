import React, { useRef } from "react";
import SignatureCanvas from 'react-signature-canvas';
import { useLocation } from "react-router-dom";
import axios from "axios";

const NestedDataComponent = ({ components, updateFormData, formData = {}, patientData }) => {
    console.log("pat", patientData)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // Accessing specific search parameters
    const formId = searchParams.get('formId');

    const signatureRef = useRef();

    //function for gettings user defined values of textfield, textarea and many more 
    const handleChange = (e, name) => {
        if (updateFormData) {
            updateFormData({ ...formData, [name]: e });
            console.log(formData, 'tempData')
        }
    };

    const handleChangeData = (name, key, type) => {
        const tempData = { ...formData };
        tempData[key] = { ...formData[key] }
        tempData[key][type] = name;
        updateFormData(tempData)
        console.log(name, key, tempData)
    }

    const handleCheck = (e, name) => {
        if (updateFormData) {
            updateFormData({ ...formData, [name]: !formData[name] });
        }
    };

    const handleSignatureRefresh = (e) => {
        // Clear the signature pad
        signatureRef.current.clear();

        // If you also want to clear the signature data in your state or elsewhere, update it accordingly
        // handleChange('', e.key);
    };

    const handleClick = (btn) => {

        const formDataWithSubmissionStatus = {
            ...formData,
            isSubmitted: btn === "Submit" ? true : false,
        };
        console.log("form", formDataWithSubmissionStatus)
        const body = {
            patientData:
                formDataWithSubmissionStatus

        }
        axios.put(`http://3.23.40.210:8081/form/formid/${formId}/patient`, body)
            .then((response) => {
                console.log(response.data, formData, 'Form Saved and resume')
                updateFormData(formData)
            })
            .catch((err) => console.log(err))
    }



    return <div style={{ margin: '30px' }}>

        {components?.map((e, i) => {
            switch (e.type) {
                case "textarea":
                    return <>

                        <div className="form-group has-feedback formio-component formio-component-textarea formio-component-textArea">
                            <p className="col-form-label">{e.label} {e.validate.required ? <span className="field-required"></span> : ""}</p>
                            <textarea className="form-control" required={e.validate.required} defaultValue={patientData ? patientData[e.key] : ""} onChange={el => handleChange(el.target.value, e.key)}></textarea>
                        </div>

                    </>


                case "textfield":
                    return <>
                        <div className="form-group has-feedback formio-component formio-component-textfield formio-component-textField  required">
                            <p className="col-form-label">{e.label} {e.validate.required ? <span className="field-required"></span> : ""}</p>
                            <input className="form-control" required={e.validate.required} defaultValue={patientData ? patientData[e.key] : ""} onChange={el => handleChange(el.target.value, e.key)}></input>
                        </div>
                    </>

                case "number":
                    return <>
                        <div className="form-group has-feedback formio-component formio-component-number formio-component-number">
                            <p className="col-form-label">{e.label} {e.validate.required ? <span className="field-required"></span> : ""}</p>
                            <input className="form-control" required={e.validate.required} defaultValue={patientData ? patientData[e.key] : ""} onChange={el => handleChange(el.target.value, e.key)}></input>
                        </div>
                    </>

                case "password":
                    return <>
                        <div className="form-group has-feedback formio-component formio-component-password formio-component-password  required">
                            <p className="col-form-label">{e.label} {e.validate.required ? <span className="field-required"></span> : ""}</p>
                            <input className="form-control" required={e.validate.required} defaultValue={patientData ? patientData[e.key] : ""} onChange={el => handleChange(el.target.value, e.key)}></input>
                        </div>
                    </>

                case "select":
                    return <>
                        <div className="form-group has-feedback formio-component formio-component-select formio-component-select">
                            <p className="col-form-label">{e.label} {e.validate.required ? <span className="field-required"></span> : ""}</p>
                            <div className="choices form-group formio-choices">
                                <select className="form-control ui fluid selection dropdown" required={e.validate.required} defaultValue={patientData ? patientData[e.key] : ""} onChange={el => handleChange(el.target.value, e.key)}>

                                    {e.data.values.map((ele, i) =>
                                        <option value={ele.value}>{ele.label}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                    </>

                case "selectboxes":
                    return <>
                        <div className="form-group has-feedback formio-component formio-component-selectboxes formio-component-selectBoxes">
                            <p className="col-form-label">{e.label} {e.validate.required ? <span className="field-required"></span> : ""}</p>
                            <div className="form-radio radio">
                                <div className="checkbox form-check">
                                    {e.values.map((ele, i) =>

                                        <label className="form-check-label label-position-right">
                                            <input type="checkbox" className="form-check-input" name={e.id} required={e.validate.required} value={ele.value} defaultValue={patientData ? patientData[e.key] : ""} onChange={el => handleCheck(el.target.value, e.key)} />  {ele.label}
                                        </label>

                                    )}
                                </div>
                            </div>

                        </div>
                    </>

                case "radio":
                    return <>
                        <div className="form-group has-feedback formio-component formio-component-radio formio-component-radio">
                            <div className="field-wrapper">
                                <div className="field-label" style={{flex: '100', marginRight: '5%'}}>
                                <p className="col-form-label">{e.label} {e.validate.required ? <span className="field-required"></span> : ""}</p>
                                </div>  
                                <div className="field-content"> 
                                {e.values.map((ele, i) =>
                                        <label style={{ padding: '5px' }} className={`form-check-label label-position-${e.optionsLabelPosition}`} >
                                            <input type="radio" name={e.id} required={e.validate.required} value={ele.value} defaultChecked={patientData && patientData[e.key] === ele.value}
                                                onChange={el => handleChange(el.target.value, e.key)} />  {ele.label}
                                        </label>
                                )}
                                  </div>
                            </div>
                        </div>
                    </>

                case "checkbox":
                    return <>
                        <div className="form-group has-feedback formio-component formio-component-checkbox formio-component-checkbox">
                            <p className="col-form-label"></p>
                            <label >
                                <input type="checkbox" required={e.validate.required} defaultValue={patientData ? patientData[e.key] : ""} onChange={el => handleCheck(el.target.value, e.key)} />{e.label}
                            </label>
                        </div>
                    </>


                case "checkmatrix":
                    return <>
                        <div className="form-group has-feedback formio-component formio-component-checkmatrix formio-component-termsAndConditions">
                            <p className="col-form-label">{e.label} {e.validate.required ? <span className="field-required"></span> : ""}</p>
                            <label>
                                <hr style={{ width: "100vw" }} />
                                <input type="checkbox" required={e.validate.required} defaultValue={patientData ? patientData[e.key] : ""} onChange={el => handleCheck(el.target.value, e.key)} />
                                <hr />
                            </label>
                        </div>
                    </>



                case "email":
                    return <>
                        <div className="form-group has-feedback formio-component formio-component-email formio-component-email">
                            <p className="col-form-label">{e.label} {e.validate.required ? <span className="field-required"></span> : ""}</p>
                            <input className="form-control" type="email" required={e.validate.required} defaultValue={patientData ? patientData[e.key] : ""} onChange={el => handleChange(el.target.value, e.key)}></input>
                        </div>
                    </>

                case "url":
                    return <>
                        <div className="form-group has-feedback formio-component formio-component-url formio-component-url">
                            <p className="col-form-label">{e.label} {e.validate.required ? <span className="field-required"></span> : ""}</p>
                            <input className="form-control" type="url" required={e.validate.required} defaultValue={patientData ? patientData[e.key] : ""} onChange={el => handleChange(el.target.value, e.key)}></input>
                        </div>
                    </>

                case "phoneNumber":
                    return <>
                        <div className="form-group has-feedback formio-component formio-component-phoneNumber formio-component-phoneNumber">
                            <p className="col-form-label">{e.label} {e.validate.required ? <span className="field-required"></span> : ""}</p>
                            <input className="form-control" required={e.validate.required} defaultValue={patientData ? patientData[e.key] : ""} onChange={el => handleChange(el.target.value, e.key)}></input>
                        </div>
                    </>

                case "signature":
                    return <>
                        <div className="form-group has-feedback formio-component formio-component-signature formio-component-signature  signature-pad">
                            <p className="col-form-label">{e.label} {e.validate.required ? <span className="field-required"></span> : ""}</p>
                            <div className="signature-pad-body">
                                <button className="btn btn-sm btn-light signature-pad-refresh" onClick={handleSignatureRefresh}><i className="fa fa-refresh"></i></button>
                                <SignatureCanvas
                                    ref={signatureRef}
                                    canvasProps={{
                                        className: 'signature-pad-canvas',
                                        style: {
                                            height: `${e.height}`,
                                            backgroundColor: `${e.backgroundColor}`,
                                            width: `${e.width}`,
                                            maxWidth: `${e.maxWidth}`,
                                            minWidth: `${e.minWidth}`,
                                        },
                                    }}
                                    onEnd={() => {
                                        // Handle the signature data when the user finishes drawing
                                        const signatureData = signatureRef.current.toDataURL();
                                        handleChange(signatureData, e.key);
                                    }}
                                    onLoad={() => {
                                        patientData && patientData[e.key] &&
                                            <img src={patientData[e.key]} />
                                    }}
                                />
                            </div>
                            <div className="signature-pad-footer" >{e.footer}</div>
                        </div>
                    </>

                case "button":
                    return <>
                        <div className="form-group has-feedback formio-component formio-component-button formio-component-submit  form-group">
                            <br />
                            <button className={`btn btn-${e.theme} btn-${e.size}`} required={e.validate.required}
                                defaultValue={e.defaultValue}
                                theme={e.theme} onClick={() => handleClick(e.label)}
                                disabled={patientData?.isSubmitted ? true : false}
                            >{e.label}</button>
                        </div>
                    </>

                case "panel":
                    return <div className="mb-2 card border">
                        <p className={`card-header bg-${e.theme} mb-0 card-title text-light`}>{e.title}</p>
                        <NestedDataComponent components={e.components} updateFormData={updateFormData} formData={formData} patientData={patientData} />
                    </div>

                case "container":
                    return <>
                        <div className="card-body">
                            <NestedDataComponent
                                components={e.components}
                                updateFormData={updateFormData}
                                formData={formData}
                                patientData={patientData}
                            />
                        </div>
                    </>

                case "columns":
                    return (
                        <div className="builder-component" key={i}>
                            <div className="row formio-component formio-component-columns formio-component-columns  formio-component-label-hidden">
                                {e.columns.map((col, ind) => (
                                    <div
                                        key={ind}
                                        className={`col-${col.size}-${col.currentWidth} col-${col.size}-offset-${col.offset} col-${col.size}-push-${col.push} col-${col.size}-pull-${col.push}`}
                                    >
                                        {/* Recursively render nested components */}
                                        <NestedDataComponent
                                            components={col.components}
                                            updateFormData={updateFormData}
                                            formData={formData}
                                            patientData={patientData} // Pass patientData to nested components
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    );

                default:
                    const key = e.key || i.toString();
                    return (
                        <div key={key}>
                            {/* Render other cases and input fields here */}
                            <p className="col-form-label">{e.label}:</p>
                            <input
                                type="text"
                                value={patientData ? patientData[e.key] : ""}
                                onChange={(event) => handleChange(event.target.value, key)}
                            />
                        </div>
                    );

                case "address":
                    return <>
                        <div className="form-group has-feedback formio-component formio-component-address formio-component-address">
                            <p className="col-form-label">{e.label} {e.validate.required ? <span className="field-required"></span> : ""}</p>
                            <NestedDataComponent
                                components={e.components}
                                updateFormData={updateFormData}
                                formData={formData}
                                patientData={patientData}
                                className={`form-group has-feedback formio-component formio-component-address formio-component-${e.label}`}
                            />
                        </div>
                    </>

                case "day":
                    return <>
                        <div className="form-group has-feedback formio-component formio-component-address formio-component-dateOfBirth">
                            <p className="col-form-label">{e.label} {e.validate.required ? <span className="field-required"></span> : ""}</p>
                            <div className="d-flex row">
                                <div className="col col-xs-4">
                                    <label>Month {e.fields?.month.required ? <span className="field-required"></span> : ""}</label>
                                    <div>
                                        <select className="form-control" defaultValue={patientData ? patientData[e.key]?.month : ""} onChange={(ele) => handleChangeData(ele.target.value, e.key, "month")}>
                                            <option>Select</option>
                                            <option value={1}>January</option>
                                            <option value={2}>February</option>
                                            <option value={3}>March</option>
                                            <option value={4}>April</option>
                                            <option value={5}>May</option>
                                            <option value={6}>June</option>
                                            <option value={7}>July</option>
                                            <option value={8}>August</option>
                                            <option value={9}>September</option>
                                            <option value={10}>October</option>
                                            <option value={11}>November</option>
                                            <option value={12}>December</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col col-xs-3">
                                    <label>Day {e.fields.day.required ? <span className="field-required"></span> : ""}</label>
                                    <input className="form-control formio-day-component-day" max={31} min={1} maxLength={2} type="number" defaultValue={patientData ? patientData[e.key]?.day : ""} onChange={(el) => handleChangeData(el.target.value, e.key, "day")} />
                                </div>
                                <div className="col col-xs-5">
                                    <label>Year {e.fields.year.required ? <span className="field-required"></span> : ""}</label>
                                    <input className="form-control formio-day-component-year" max={2030} min={1900} maxLength={4} type="number" defaultValue={patientData ? patientData[e.key]?.year : ""} onChange={(el) => handleChangeData(el.target.value, e.key, "year")} />
                                </div>
                            </div>
                        </div>
                    </>

                case "file":
                    return (
                        <>
                            <div className="form-group has-feedback formio-component formio-component-file formio-component-fileUpload required">
                                <label className="col-form-label">{e.label} {e.validate.required ? <span className="field-required"></span> : ""}</label>
                                <ul className="list-group list-group-striped">
                                    <li className="list-group-item list-group-header hidden-xs hidden-sm">
                                        <div className="row">
                                            <div className="col-md-1"></div>
                                            <div className="col-md-9">
                                                <strong>File Name</strong>
                                            </div>
                                            <div className="col-md-2">
                                                <strong>Size</strong>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div className="fileSelector">
                                    <i className="fa fa-cloud-upload"></i> Drop files to attach,or{' '}
                                    <a className="browse" onClick={(event) => { event.preventDefault(); handleChange(event.target.files?.[0], e.key); }}>browse</a>
                                </div>
                                {/* You can display additional information or feedback here */}
                            </div>
                        </>
                    );

                case "htmlelement":
                    return (
                        <div key={i}>
                            {e.tag !== 'hr'?<e.tag> {e.content}</e.tag>: <e.tag></e.tag>}
                        </div>
                    );

                case "content":
                    return (
                        <div key={i}>
                            {/* Render HTML content */}
                            <div dangerouslySetInnerHTML={{ __html: e.html }} />
                        </div>
                    );

                case "table":
                    return (
                        <div className="table-responsive formio-component formio-component-table formio-component-table  no-top-border-table">
                            <table key={i} className="table">
                                <tbody>
                                    {/* Loop through rows */}
                                    {e.rows.map((rowData, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {/* Loop through columns */}
                                            {rowData.map((cellData, colIndex) => (
                                                <td key={colIndex}>
                                                    {/* Render cell content */}
                                                    <NestedDataComponent
                                                        components={cellData.components}
                                                        updateFormData={updateFormData}
                                                        formData={formData}
                                                        patientData={patientData} />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    );
            }
        })}
    </div>
}

export default NestedDataComponent;