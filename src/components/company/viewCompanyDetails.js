import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import useForm from 'react-hook-form';
import CompanyService from '../../service/company';
import { FILE_URL, JOBS_ADMIN } from '../../constant/actionTypes';

function ViewJobCompanyDetails(props) {
    let id = props.match.params.id;
    const [data, setData] = useState({});
    const [companyMaster, setCompanyMaster] = useState([]);
    const { register, handleSubmit, errors } = useForm();

    const [userType, setUserType] = useState('');

    useEffect(() => { setUserType(localStorage.getItem('userType')) }, [])

    const onCompanyEdit = async (item) => {
        let payload = { ...data, ...item }
        payload.companyId = payload._id
        let response = await CompanyService.updateJobCompany(payload)
        props.history.push(JOBS_ADMIN + "/company/activeCompany");
    }

    async function loadCompanyMaster() {
        let companyMasterArray = await CompanyService.fetchCompanies();
        setCompanyMaster(companyMasterArray.data.data.company);
    }

    async function fetchJobCompanyDetails(id) {
        let payload = { companyId: id };
        let jobCompanyData = await CompanyService.fetchJobCompanyDetails(payload);
        setData(jobCompanyData.data.data.fetchedCompanyDetails);

    }

    useEffect(() => {
        fetchJobCompanyDetails(id);
        loadCompanyMaster();
    }, [])

    const handleViewList = data => {
        props.history.push({
            pathname: JOBS_ADMIN + "/company/" + data,
        })
    }

    useEffect(() => {
    }, [data, companyMaster])


    const handleChange = (updateFunction, value) => {
        updateFunction(prevstate => ({ ...prevstate, ...value }))
    }

    return (
        <div className="container">
            <div className="card" >
                <div className="card-header ml-4">
                    <h5> View | Edit Company </h5>
                </div>
                <form className="form theme-form ml-4 mr-4" onSubmit={handleSubmit(onCompanyEdit)}>
                    <div className="card-body">
                        <div class="row">
                            <div class="col">
                                <div className="form-group">
                                    <label htmlFor="fieldName">Master Company</label>
                                    <select id="field" name="companyId" className="custom-select"
                                        value={data.masterCompanyId ? data.masterCompanyId._id : 'default'}
                                        disabled>
                                        <option value="default">--Select--</option>
                                        {companyMaster.map((items, index) => {
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
                                <div className="form-group">
                                    <label for="email">Email</label>
                                    <input className="form-control" type="email" name="email" id="fieldName" defaultValue={data.email} required disabled />
                                </div>
                            </div>
                            <div class="col">
                                <div className="form-group">
                                    <label for="password">Password</label>
                                    <input className="form-control" type="password" name="password" id="fieldName" placeholder="password" required disabled />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div className="form-group">
                                    <label htmlFor="fieldName">Description</label>
                                    <textarea className="form-control" rows="4" ref={register} name="description" placeholder="Enter Description" defaultValue={data.description} required></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div className="form-group">
                                    <label htmlFor="fieldName">Image</label>
                                    {data.masterCompanyId &&
                                        <div>
                                            {/* <input className="form-control" value={data.image} type="hidden" name="image" id="fieldName" ref={register} /> */}
                                            <img src={FILE_URL + data.masterCompanyId.image} style={{ width: 100, height: 100, marginLeft: 20 }} />
                                        </div>}
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            {userType === 'admin' &&
                                (
                                    <div class="col">
                                        <div className="form-group">
                                            <label htmlFor="fieldName">Status</label>
                                            <select id='field' name='status' className='custom-select' value={data.status ? 'true' : 'false'}
                                                title='Select the state first to select city'
                                                onChange={(e) => handleChange(setData, { status: !data.status })}
                                                ref={register({ validate: value => value !== '' })}>
                                                <option value="">--Select--</option>
                                                <option value={true}>Active</option>
                                                <option value={false}>Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                )}
                        </div>
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewJobCompanyDetails));