import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Datatable from '../common/datatable';
import JobsService from '../../service/jobs';
import moment from 'moment'
import '../../assets/css/vjobapp.css';
import ApplicantsProfile from './viewApplicantsProfile';
import { FILE_URL } from '../../constant/actionTypes';
import { JOBS_ADMIN } from "../../constant/actionTypes"


function ViewJobApplicants(props) {
    let id = props.match.params.id;
    const [activePage, setActivePage] = useState(1);
    const [totalData, setTotalData] = useState(1);
    const [data, setData] = useState([])
    const [appliedCount, setAppliedCount] = useState(0)


    async function fetchJobApplicants(id) {
        let jobsData = await JobsService.fetchJobApplicants({ jobId: id });
        setData(jobsData.data.data.fetchedJobApplicants);
        setAppliedCount(jobsData.data.data.appliedCount)
    }

    const handleView = data => {
        props.history.push({
            pathname: JOBS_ADMIN + "/viewJobApplicants/" + data,
        })
    }

    async function updateJobData(){ 
    const bodyData = {jobId:id, hasRecentlyApplied:0}
      let data = await JobsService.updateJob(bodyData)
    }


    useEffect(() => {
        fetchJobApplicants(id);
        updateJobData();
    }, [])

    useEffect(() => {
    }, [data])

    const handleViewList = data => {
        let url = JOBS_ADMIN + "/jobs/";
        if (data) url.concat(data);
        props.history.push({
            pathname: url,
        })
    }

    const [modal, setModal] = useState();

    const toggle = () => {
        setModal(!modal)
    }


    const columnsDynamic = [
        {
            Header: <b>Full Name</b>,
            accessor: 'userId.fullname',
            style: {
                textAlign: 'center'
            }
        },
        {
            Header: <b>Email</b>,
            accessor: 'userId.email',
            style: {
                textAlign: 'center'
            }
        },
        {
            Header: <b>Mobile</b>,
            accessor: 'userId.mobile',
            style: {
                textAlign: 'center'
            }
        },
        {
            Header: <b>Applied On</b>,
            accessor: 'createdAt',
            Cell: (row) => <div>{moment(row.original.createdAt).format('DD-MM-YYYY HH:mm')}</div>,
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
                    <a href={FILE_URL + row.original.userId.resume}
                        className="btn btn-primary"
                        target="_blank"
                        download={row.original.userId.fullname + "_resume"}>
                        <span><i className="fa fa-download"></i></span>
                    </a>
                    <button className="btn btn btn-success" type="button" onClick={toggle}>
                        <span className="" > View </span>
                    </button>
                    <ApplicantsProfile toggle={toggle} modal={modal} modalData={row.original.userId} />
                </div>
            ),
            style: {
                textAlign: 'center'
            },
            sortable: false
        }
    ]

    return (
        <div className="card">
            <div className="row ml-4 mr-4">
                <div className="card-header">
                    <h5>Job Applicants</h5>
                </div>
                <div className="card-header ml-auto">
                    <button className="btn btn-primary ml-2" type="button" onClick={() => handleViewList()}>Back</button>
                </div>
            </div>
            <div className="card-body">
                <h4>Applicantion Count {appliedCount}</h4>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewJobApplicants));