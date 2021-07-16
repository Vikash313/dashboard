import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Datatable from '../common/datatable';
import * as InteractionAction from '../../actions/jobs'
import JobsService from '../../service/jobs';
import { JOBS_ADMIN } from "../../constant/actionTypes"

function ViewJobs(props) {
    const [activePage, setActivePage] = useState(1);
    const [totalData, setTotalData] = useState(1);
    const [data, setData] = useState([])

    async function fetchJobs() {
        let jobsData = await JobsService.fetchJobs();
        setData(jobsData.data.data.fetchedJobs);
    }

    useEffect(() => {
        fetchJobs();
    }, [])

    const columnsDynamic = [
        {
            Header: <b>Title</b>,
            accessor: 'title',
            style: {
                textAlign: 'center'
            }
        },
        {
            Header: <b>Company</b>,
            accessor: 'companyId.name',
            style: {
                textAlign: 'center'
            }
        },
        {
            Header: <b>City</b>,
            accessor: 'location[0].cityId.name',
            width: 150,
            style: {
                textAlign: 'center'
            }
        },
        {
            Header: <b>Description</b>,
            accessor: 'description',
            style: {
                textAlign: 'center'
            }
        },
        {
            Header: <b>Exp Start</b>,
            accessor: 'expStart',
            width: 90,
            style: {
                textAlign: 'center'
            }
        },
        {
            Header: <b>Exp End</b>,
            accessor: 'expEnd',
            width: 90,
            style: {
                textAlign: 'center'
            }
        },
        {
            Header: <b>Salary Start</b>,
            accessor: 'payStart',
            width: 90,
            style: {
                textAlign: 'center'
            }
        },
        {
            Header: <b>Salary End</b>,
            accessor: 'payEnd',
            width: 90,
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
                    <button className="btn btn btn-success" type="button" onClick={() => viewApplicant(row.original._id)}>
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
            pathname: JOBS_ADMIN + "/viewJobDetails/" + data,
        })
    }
    const viewApplicant = data => {
        props.history.push({
            pathname: JOBS_ADMIN + "/viewJobApplicants/" + data,
        })
    }

    const addJob = () => {
        props.history.push({
            pathname: JOBS_ADMIN + "/addJob"
        })
    }

    return (
        <div className="card">
            <div className="row ml-4 mr-4">
                <div className="card-header">
                    <h5>View Jobs</h5>
                </div>
                <div className="card-header ml-auto"><span className="btn btn-primary btn-lg" type="button" style={{ color: "white" }} onClick={() => addJob(data)}> Add Jobs </span></div>
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