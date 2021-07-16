import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import useForm from 'react-hook-form';
import JobsService from '../../service/jobs';
import LocationService from '../../service/location';
import { JOBS_ADMIN } from '../../constant/actionTypes';
import { Typeahead } from 'react-bootstrap-typeahead';


function AddJob(props) {
    const [countriesData, setCountriesData] = useState([]);
    const [stateData, setStateData] = useState([]);
    const [citiesData, setCitiesData] = useState([]);
    const [companiesData, setCompaniesData] = useState([]);
    const [industryTypeData, setIndustryTypeData] = useState([]);
    const [jobTypeData, setjobTypeData] = useState([]);
    const [masterSkills, setMasterSkills] = useState([]);
    const [skillsArray, setSkillsArray] = useState([]);
    const [skills, setSkills] = useState([]);
    const { register, handleSubmit, errors } = useForm();

    const [userType, setUserType] = useState('');

    useEffect(() => { setUserType(localStorage.getItem('userType')) }, [])

    const onSubmitJob = async (item) => {
        let location = []
        let eachLoc = { countryId: item.countryId, stateId: item.stateId, cityId: item.cityId }
        location.push(eachLoc);
        item.location = location;
        item.skills = skills;
        let response = await JobsService.addJob(item);
        props.history.push(JOBS_ADMIN + "/jobs")

    }

    async function loadCountry() {
        let countryList = await LocationService.fetchCountries();
        setCountriesData(countryList.data.data);
    }
    async function loadState(id) {
        let stateList = await LocationService.fetchStates(id);
        setStateData(stateList.data.data);
    }
    async function loadCities(id) {
        let citiesList = await LocationService.fetchCities(id);
        setCitiesData(citiesList.data.data);
    }
    async function loadJobTypeIndustryType() {
        let jobMaster = await JobsService.fetchCompanyJobTypesIndustryTypes();
        setIndustryTypeData(jobMaster.data.data.jobIndustryType);
        setjobTypeData(jobMaster.data.data.jobType);
        setCompaniesData(jobMaster.data.data.company)
    }

    useEffect(() => {
        let skillsArray = []
        if (masterSkills) masterSkills.map((items, index) => { return (skillsArray.push({ label: items.name })) });
        setSkillsArray(skillsArray);
    }, [masterSkills])

    async function loadMasterSkills() {
        let masterSkills = await JobsService.fetchSkills();
        setMasterSkills(masterSkills.data.data.skill);
    }

    const handleSkills = (e) => {
        let arr = []
        e.forEach(element => {
            arr.push(element.label)
        });
        setSkills(arr)
    }

    const handleViewList = data => {
        let url = JOBS_ADMIN + "/jobs/";
        if (data) url.concat(data);
        props.history.push({
            pathname: url,
        })
    }

    useEffect(() => {
        loadMasterSkills();
        loadCountry();
        loadJobTypeIndustryType();
    }, [])


    return (
        <div className="container">
            <div className="card" >
                <div className="card-header ml-3">
                    <h5>Add New Job</h5>
                </div>
                <form className="form theme-form ml-4 mr-4" onSubmit={handleSubmit(onSubmitJob)}>
                    <div className="card-body">
                        <div className="row" >
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="fieldName">Title</label>
                                    <input ref={register} type="text" className="form-control" id="fieldName" name="title" required />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="fieldName">Company</label>
                                    <select id="field" name="companyId" className="custom-select" ref={register({ validate: value => value != '' })} required>
                                        <option value="">--Select--</option>
                                        {companiesData.map((items, index) => {
                                            return (
                                                <option value={items._id} key={items._id}>{items.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="fieldName">Job Type</label>
                                    <select id="field" name="jobTypeId" className="custom-select" ref={register({ validate: value => value != '' })} required>
                                        <option value="">--Select--</option>
                                        {jobTypeData.map((items, index) => {
                                            return (
                                                <option value={items._id} key={items._id}>{items.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="fieldName">Industry Type</label>
                                    <select id="field" name="industryTypeId" className="custom-select" ref={register({ validate: value => value != '' })} required>
                                        <option value="">--Select--</option>
                                        {industryTypeData.map((items, index) => {
                                            return (
                                                <option value={items._id} key={items._id}>{items.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="fieldName">Skills</label>
                                    <Typeahead
                                        id="custom-typeahead"
                                        multiple
                                        allowNew
                                        onChange={(e) => { handleSkills(e) }}
                                        newSelectionPrefix="Add Skill"
                                        options={skillsArray}
                                        placeholder="--Select Skills--"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="fieldName">Start Experience (In years)</label>
                                    <input ref={register} type="number" className="form-control" id="fieldName" name="expStart" required />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="fieldName">End Experience (In years)</label>
                                    <input ref={register} type="number" className="form-control" id="fieldName" name="expEnd" required />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="fieldName">Start Salary</label>
                                    <input ref={register} type="number" className="form-control" id="fieldName" name="payStart" required />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="fieldName">End Salary</label>
                                    <input ref={register} type="number" className="form-control" id="fieldName" name="payEnd" required />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="fieldName">Currency</label>
                                    <select id="field" name="currency" className="custom-select" ref={register({ validate: value => value != '' })} required>
                                        <option value="">--Select--</option>
                                        <option value="INR">Indian rupees</option>
                                        <option value="USD">US dollar</option>
                                        <option value="CAD">Canadian dollar</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="field">Country</label>
                                    <select id="field" name="countryId" className="custom-select" title="Select the country" onChange={(e) => loadState(e.target.value)} ref={register({ validate: value => value != '' })} required>
                                        <option value="">--Select--</option>
                                        {countriesData.map((items, index) => {
                                            return (
                                                <option value={items._id} key={items._id}>{items.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="field">State</label>
                                    <select id="field" name="stateId" className="custom-select" title="Select the country first to select state"
                                        onChange={(e) => loadCities(e.target.value)} ref={register({ validate: value => value != '' })} required>
                                        <option value="">--Select--</option>
                                        {stateData.map((items, index) => {
                                            return (
                                                <option value={items._id} key={items._id}>{items.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="field">City</label>
                                    <select id="field" name="cityId" className="custom-select" title="Select the state first to select city" ref={register({ validate: value => value != '' })} required>
                                        <option value="">--Select--</option>
                                        {citiesData.map((items, index) => {
                                            return (
                                                <option value={items._id} key={items._id}>{items.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="fieldName">Description</label>
                                    <textarea className="form-control" rows={4} ref={register} name="description" id="fieldName"
                                        placeholder="Enter About your description" required> </textarea>
                                </div>
                            </div>
                        </div>
                        {userType === 'admin' &&
                            (
                                <div className="row">
                                    <div className="col-4">
                                        <div className="form-group"><label htmlFor="exampleFormControlSelect9">Job Status</label>
                                            <select className="form-control digits" id="exampleFormControlSelect9" name="isActive"
                                                ref={register({ validate: value => value != '' })} required>
                                                <option value={true}>Active</option>
                                                <option selected value={false}>Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}
                        <div className="card-footer">
                            <button className="btn btn-primary" type="submit">Submit</button>
                            <button className="btn btn-light ml-2" type="button" onClick={() => handleViewList()}>Back</button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    );
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddJob));