import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Datatable from '../common/datatable';
import * as InteractionAction from '../../actions/jobs'
import CompanyService from '../../service/company';
import { JOBS_ADMIN } from '../../constant/actionTypes';


function ViewJobs(props) {
    const [activePage, setActivePage] = useState(1);
    const [totalData, setTotalData] = useState(1);
    const [data, setData] = useState([])

    async function fetchJobs() {
        let jobCompaniesData = await CompanyService.fetchJobCompanies();
        setData(jobCompaniesData.data.data.fetchedCompanies);
    }



    useEffect(() => {
        fetchJobs();
    }, [])

    const columnsDynamic = [
        {
            Header: <b>Name</b>,
            accessor: 'name',
            style: {
                textAlign: 'center'
            }
        },
        {
            Header: <b>Email</b>,
            accessor: 'email',
            style: {
                textAlign: 'center'
            }
        },
        {
            Header: <b>Action</b>,
            id: 'edit',
            accessor: str => "edit",
            Cell: (row) => (
                <div className="btn-group">
                    <button className="btn btn-primary" type="button" onClick={() => handleEdit(row.original._id)}>
                        <span><i className="fa fa-pencil"></i></span>
                    </button>
                    <button className="btn btn btn-success" type="button" >
                        <span className="" > View </span>
                    </button>
                </div>
            ),
            style: {
                textAlign: 'center'
            },
            sortable: false
        }
    ]

    const handleEdit = data => {
        props.history.push({
            pathname: JOBS_ADMIN + "/viewCompanyDetails/" + data,
        })
    }

    const addCompany = () => {
        props.history.push({
            pathname: JOBS_ADMIN + "/addCompany"
        })
    }


    return (
        <div className="card">
            <div className="row ml-4 mr-4">
                <div className="card-header">
                    <h5>View Companies</h5>
                </div>
                <div className="card-header ml-auto"><span className="btn btn-primary" style={{ color: "white" }} onClick={() => addCompany(data)}> Add Company </span></div>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <Datatable
                        myData={data}
                        columns={columnsDynamic}
                        pageSize={20}
                        myClass='ReactTable'
                    />
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewJobs));