import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import useForm from 'react-hook-form';
import JobsService from '../../service/jobs';
import LocationService from '../../service/location';
import { JOBS_ADMIN } from '../../constant/actionTypes';
import { Typeahead } from 'react-bootstrap-typeahead';

function ViewJobDetails(props) {
    let id = props.match.params.id;
    const [data, setData] = useState({});
    const { register, handleSubmit, errors } = useForm();
    const [countriesData, setCountriesData] = useState([]);
    const [stateData, setStateData] = useState([]);
    const [citiesData, setCitiesData] = useState([]);
    const [companiesData, setCompaniesData] = useState([]);
    const [industryTypeData, setIndustryTypeData] = useState([]);
    const [jobTypeData, setjobTypeData] = useState([]);
    const [masterSkills, setMasterSkills] = useState([]);
    const [skillsArray, setSkillsArray] = useState([]);
    const [skills, setSkills] = useState([]);
    const [dataSkills, setDataSkills] = useState([]);
    const [location, setLocation] = useState({ countryId: '', stateId: '', cityId: '' });
    // const [companyJobType, setCompanyJobType] = useState({ companyId: '', jobTypeId: '', industryTypeId: '' });

    const [userType, setUserType] = useState('');

    useEffect(() => { setUserType(localStorage.getItem('userType')) }, [])

    const onEditJob = async (item) => {
        let loc = []
        let eachLoc = { ...location }
        let skillsArr = []
        dataSkills.forEach(element => {
            skillsArr.push(element.label)
        });
        loc.push(eachLoc);
        item.location = loc;
        item.skills = skillsArr;
        let response = await JobsService.updateJob(item);
        props.history.push(JOBS_ADMIN + '/jobs');
    }

    async function loadCountry() {
        let countryList = await LocationService.fetchCountries();
        setCountriesData(countryList.data.data);
    }

    async function loadJobTypeIndustryType() {
        let jobMaster = await JobsService.fetchCompanyJobTypesIndustryTypes();
        setIndustryTypeData(jobMaster.data.data.jobIndustryType);
        setjobTypeData(jobMaster.data.data.jobType);
        setCompaniesData(jobMaster.data.data.company)
    }

    async function loadState(id) {
        let stateList = await LocationService.fetchStates(id);
        setStateData(stateList.data.data);
    }
    async function loadCities(id) {
        let citiesList = await LocationService.fetchCities(id);
        setCitiesData(citiesList.data.data);
    }

    async function fetchJobDetails(id) {
        let payload = { jobId: id };
        let jobsData = await JobsService.fetchJobDetails(payload);
        let skills = []
        let dataSkills = []
        setLocation(jobsData.data.data.fetchedJobDetails.location[0]);
        loadCountry();
        loadState(jobsData.data.data.fetchedJobDetails.location[0].countryId);
        loadCities(jobsData.data.data.fetchedJobDetails.location[0].stateId);
        // setLocalSkills
        dataSkills = jobsData.data.data.fetchedJobDetails.skills
        if (dataSkills) {
            dataSkills.map((items, index) => { return (skills.push({ label: items })) })
        }
        setDataSkills(skills);
        setData(jobsData.data.data.fetchedJobDetails);

    }

    const handleSkills = (e) => {
        setDataSkills(e)
    }

    async function loadMasterSkills() {
        let masterSkills = await JobsService.fetchSkills();
        setMasterSkills(masterSkills.data.data.skill);
    }

    useEffect(() => {
        let skillsArray = []
        if (masterSkills) masterSkills.map((items, index) => { return (skillsArray.push({ label: items.name })) });
        setSkillsArray(skillsArray);
    }, [masterSkills])

    useEffect(() => {
        fetchJobDetails(id);
        loadJobTypeIndustryType();
        loadMasterSkills();
    }, [])

    useEffect(() => {
    }, [data, location, dataSkills])


    const viewApplicant = data => {
        props.history.push({
            pathname: JOBS_ADMIN + '/viewJobApplicants/' + data,
        })
    }

    const handleViewList = data => {
        let url = JOBS_ADMIN + "/jobs/";
        if (data) url.concat(data);
        props.history.push({
            pathname: url,
        })
    }

    const handleChange = (updateFunction, value) => {
        updateFunction(prevstate => ({ ...prevstate, ...value }))
        // console.log('location: ', location)
    }

    return (
        <div className='container'>
            <div className='card'>
                <div className='cal'>
                    <div className="row ml-4 mr-4">
                        <div className="card-header">
                            <h5>View | Edit Job Details</h5>
                        </div>
                        <div className="card-header ml-auto"><span className='btn btn-primary my-2' type="button" style={{ color: "white" }} onClick={() => viewApplicant(data._id)} > View Applicants </span></div>
                    </div>
                </div>
                <form className="form theme-form ml-4 mr-4" onSubmit={handleSubmit(onEditJob)}>
                    <div className="card-body">
                        <input ref={register} type='hidden' className='form-control' name='jobId' defaultValue={data._id} />
                        <div className='row'>
                            <div className='col-8'>
                                <div className='form-group'>
                                    <label htmlFor='fieldName'>Title</label>
                                    <input ref={register} type='text' className='form-control' name='title' defaultValue={data.title} />
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className='form-group'>
                                    <label htmlFor='fieldName'>Opening(s)</label>
                                    <input ref={register} type='number' className='form-control' name='opening' defaultValue={data.opening} />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div className='form-group'>
                                    <label htmlFor='fieldName'>Company</label>
                                    <select id='field' name='companyId' value={data.companyId ? data.companyId._id : 'default'}
                                        className='custom-select'
                                        onChange={(e) => { handleChange(setData, { companyId: e.target.value }) }}
                                        ref={register({ validate: value => value !== '' })} required>
                                        <option value='default' disabled>--Select--</option>
                                        {companiesData.map((items, index) => {
                                            return (
                                                // data.companyId._id == items._id ?
                                                //     <option value={items._id} key={items._id} selected>{items.name}</option>
                                                //     :
                                                <option value={items._id} key={items._id}>{items.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div class="col">
                                <div className='form-group'>
                                    <label htmlFor='fieldName'>Job Type</label>
                                    <select id='field' name='jobTypeId' value={data.jobTypeId ? data.jobTypeId._id : 'default'}
                                        className='custom-select'
                                        onChange={(e) => { handleChange(setData, { jobTypeId: e.target.value }) }}
                                        ref={register({ validate: value => value !== '' })} required>
                                        <option value='default' disabled>--Select--</option>
                                        {jobTypeData.map((items, index) => {
                                            return (
                                                // data.jobTypeId._id == items._id ?
                                                //     <option value={items._id} key={items._id} selected>{items.name}</option>
                                                //     :
                                                <option value={items._id} key={items._id}>{items.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div class="col">
                                <div className='form-group'>
                                    <label htmlFor='fieldName'>Industry Type</label>
                                    <select id='field' name='industryTypeId' value={data.industryTypeId ? data.industryTypeId._id : 'default'}
                                        className='custom-select'
                                        onChange={(e) => { handleChange(setData, { industryTypeId: e.target.value }) }}
                                        ref={register({ validate: value => value !== '' })} required>
                                        <option value='default' disabled>--Select--</option>
                                        {industryTypeData.map((items, index) => {
                                            return (
                                                // data.industryTypeId._id == items._id ?
                                                //     <option value={items._id} key={items._id} selected>{items.name}</option>
                                                //     :
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
                                        id="basic-typeahead-multiple"
                                        selected={dataSkills}
                                        id="custom-typeahead"
                                        multiple
                                        allowNew
                                        onChange={handleSkills}
                                        newSelectionPrefix="Add Skill"
                                        options={skillsArray}
                                        placeholder="--Select Skills--"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div className='form-group'>
                                    <label htmlFor='fieldName'>Start Experience (In years)</label>
                                    <input ref={register} type='number' className='form-control' name='expStart' defaultValue={data.expStart} required />
                                </div>
                            </div>
                            <div class="col">
                                <div className='form-group'>
                                    <label htmlFor='fieldName'>End Experience (In years)</label>
                                    <input ref={register} type='number' className='form-control' name='expEnd' defaultValue={data.expEnd} required />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div className='form-group'>
                                    <label htmlFor='fieldName'>Start Salary</label>
                                    <input ref={register} type='number' className='form-control' name='payStart' defaultValue={data.payStart} required />
                                </div>
                            </div>
                            <div class="col">
                                <div className='form-group'>
                                    <label htmlFor='fieldName'>End Salary</label>
                                    <input ref={register} type='number' className='form-control' name='payEnd' defaultValue={data.payEnd} required />
                                </div>
                            </div>
                            <div class="col">
                                <div className="form-group">
                                    <label htmlFor="fieldName">Currency</label>
                                    <select id="field" name="currency" className="custom-select"
                                        value={data.currency ? data.currency : 'default'}
                                        onChange={(e) => { handleChange(setData, { currency: e.target.value }) }}
                                        ref={register({ validate: value => value != '' })} required>
                                        <option value="">--Select--</option>
                                        <option value="INR">Indian rupees</option>
                                        <option value="USD">US dollar</option>
                                        <option value="CAD">Canadian dollar</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div className='form-group'>
                                    <label htmlFor='field'>Country</label>
                                    <select id='field' name='countryId' value={location ? location.countryId : 'default'}
                                        className='custom-select' title='Select the country'
                                        onChange={(e) => { handleChange(setLocation, { countryId: e.target.value }); loadState(e.target.value) }}
                                        ref={register({ validate: value => value !== '' })} required>
                                        <option value='default' disabled>--Select--</option>
                                        {countriesData.map((items, index) => {
                                            return (
                                                <option value={items._id} key={items._id}>{items.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div class="col">
                                <div className='form-group'>
                                    <label htmlFor='field'>State</label>
                                    <select id='field' name='stateId' value={location ? location.stateId : 'default'}
                                        className='custom-select' title='Select the country first to select state'
                                        onChange={(e) => { handleChange(setLocation, { stateId: e.target.value }); loadCities(e.target.value) }}
                                        ref={register({ validate: value => value !== '' })} required>
                                        <option value='default' disabled>--Select--</option>
                                        {stateData.map((items, index) => {
                                            return (
                                                <option value={items._id} key={items._id}>{items.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div class="col">
                                <div className='form-group'>
                                    <label htmlFor='field'>City</label>
                                    <select id='field' name='cityId' className='custom-select' value={location ? location.cityId : 'default'}
                                        title='Select the state first to select city'
                                        onChange={(e) => handleChange(setLocation, { cityId: e.target.value })}
                                        ref={register({ validate: value => value !== '' })} required>
                                        <option value='default' disabled>--Select--</option>
                                        {citiesData.map((items, index) => {
                                            return (
                                                <option value={items._id} key={items._id}>{items.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div className='form-group'>
                                    <label htmlFor='fieldName'>Description</label>
                                    <textarea className='form-control' ref={register} name='description' placeholder='Enter About your description' defaultValue={data.description} required></textarea>
                                </div>
                            </div>
                        </div>
                        {userType === 'admin' &&
                            (
                                <div class="row">
                                    <div className='col-4'>
                                        <div className='form-group'>
                                            <label htmlFor='fieldName'>Job Status</label>
                                            <select id='field' name='isActive' className='custom-select' value={data.isActive ? 'true' : 'false'}
                                                title='Select the state first to select city'
                                                onChange={(e) => handleChange(setData, { isActive: !data.isActive })}
                                                ref={register({ validate: value => value !== '' })} required>
                                                <option value="">--Select--</option>
                                                <option value={true}>Active</option>
                                                <option value={false}>Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}
                        <div className="card-footer">
                            <button className="btn btn-primary" type="submit">Save</button>
                            <button className="btn btn-light ml-2" type="button" onClick={() => handleViewList()}>Back</button>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    );
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewJobDetails));