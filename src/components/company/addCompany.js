import React, { useState, useEffect } from 'react'
import JobsService from '../../service/jobs';
import CompanyService from '../../service/company';
import { Typeahead } from 'react-bootstrap-typeahead';
import { FILE_URL } from '../../constant/actionTypes';
import { JOBS_ADMIN } from "../../constant/actionTypes";

const AddJobCompany = (props) => {

    const [companyMaster, setCompanyMaster] = useState([]);
    const [companyArray, setCompanyArray] = useState([]);
    const [data, setData] = useState({});

    const [userType, setUserType] = useState('');

    useEffect(() => { setUserType(localStorage.getItem('userType')) }, [])

    async function loadCompanyMaster() {
        let companyMasterArray = await CompanyService.fetchCompanies();
        setCompanyMaster(companyMasterArray.data.data.company);
    }

    const onSubmitCompany = async () => {
        let item = {}
        if (data.id.includes("new-id")) item.masterCompanyId = ""
        else item.masterCompanyId = data.id
        let formData = new FormData();
        formData.append("masterCompanyId", item.masterCompanyId);
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("description", data.description);
        formData.append("status", data.status);
        formData.append("image", data.image);

        let addCompany = await CompanyService.addJobCompany(formData);
        if (addCompany) props.history.push(JOBS_ADMIN + "/company")
    }

    const handleChange = async (updateFunction, value) => {
        updateFunction(prevstate => ({ ...prevstate, ...value }))
    }

    const handleViewList = data => {
        props.history.push({
            pathname: JOBS_ADMIN + "/company/" + data,
        })
    }

    useEffect(() => {
        loadCompanyMaster();
    }, [])

    useEffect(() => {
    }, [data])

    useEffect(() => {
        let comArray = []
        if (companyMaster) companyMaster.map((items, index) => { return (comArray.push({ id: items._id, label: items.name, image: items.image })) });
        setCompanyArray(comArray);
    }, [companyMaster])

    const handleSelectCompany = (e) => {
        let company = e[0];
        if (company) {
            if (company.id) { handleChange(setData, { id: company.id }) }
            if (company.label) { handleChange(setData, { name: company.label }) }
            if (company.image) { handleChange(setData, { image: company.image }) }
        }
        else {
            handleChange(setData, { id: "", name: "", image: null })
        }

    }

    return (
        <div className="container">
            <div className="card" >
                <div className="card-header ml-4">
                    <h5> Create Company
                    </h5>
                </div>
                <form className="form theme-form ml-4 mr-4">
                    <div className="card-body">

                        <div id="bloodhound">
                            <div className="theme-form">
                                <label htmlFor="fieldName">Company Name</label>
                                <div className="form-group">
                                    {/* onChange={(e) => handleChange(setData, { status: !data.status })} */}
                                    <Typeahead
                                        id="custom-typeahead"
                                        allowNew
                                        onChange={(e) => { handleSelectCompany(e) }}
                                        newSelectionPrefix="Add a new Company: "
                                        options={companyArray}
                                        placeholder="--Select Company--"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input className="form-control" type="email" name="email" id="fieldName"
                                        placeholder="email" required required
                                        onChange={(e) => handleChange(setData, { email: e.target.value })} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input className="form-control" type="password" name="password" id="fieldName"
                                        placeholder="password" required required
                                        onChange={(e) => handleChange(setData, { password: e.target.value })} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="fieldName">Description</label>
                                    <textarea className="form-control" rows="3" name="description" id="fieldName"
                                        type="text" placeholder="Enter About your description" required
                                        onChange={(e) => handleChange(setData, { description: e.target.value })}> </textarea>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {userType === 'admin' &&
                                (
                                    <div className="col">
                                        <div className="form-group"><label htmlFor="exampleFormControlSelect9">Status</label>
                                            <select className="form-control digits" id="exampleFormControlSelect9"
                                                onChange={(e) => handleChange(setData, { status: e.target.value })} >
                                                <option value="">--Select--</option>
                                                <option value={true}>Active</option>
                                                <option value={false}>Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                )}
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="fieldName">Image</label>
                                    {data.image && data.id && !data.id.includes("new-id") ?
                                        <div>
                                            <input className="form-control" value={data.image} type="hidden" name="image" id="fieldName" />
                                            <img src={FILE_URL + data.image} style={{ width: 50, height: 50 }} alt="Image not found" />
                                        </div>
                                        : <input className="form-control" type="file" id="fieldName"
                                            name="image1"
                                            onChange={(e) => handleChange(setData, { image: e.target.files[0] })} />}
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary" type="button" onClick={onSubmitCompany}>Submit</button>
                            <button className="btn btn-light ml-2" type="button" onClick={() => handleViewList()}>Back</button>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default AddJobCompany