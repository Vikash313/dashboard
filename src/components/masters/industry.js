import React, { useState, useEffect } from 'react'
import Api from '../../service/master';
import Datatable from '../common/datatable';
import { withRouter } from 'react-router-dom';

const Industry = (props) => {
    const [industryType, setIndustryType] = useState();

    useEffect(() => {
        fetchIndustry()
    }, [])

    const fetchIndustry = async () => {
        const fetchIndustry = await Api.fetchIndustryType()
        if (fetchIndustry) setIndustryType(fetchIndustry.industry)
    }

    const columnsDynamic = [
        {
            Header: <b>Name</b>,
            accessor: 'name',
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
                    <button className="btn btn-primary" type="button" onClick={() => handleEdit(row.original)}>
                        <span><i className="fa fa-pencil"></i></span>
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
            pathname: "/jobs-admin/master/update-industry",
            state: data
        })
    }

    const addIndustry = () => {
        props.history.push({
            pathname: "/jobs-admin/master/update-industry",
        })
    }

    return (
        <div className="card">
            <div className="row ml-4 mr-4">
                <div className="card-header">
                    <h5>View Industry Type</h5>
                </div>
                <div className="card-header ml-auto"><span className="btn btn-primary" style={{ color: "white" }} onClick={() => addIndustry()}> Add Industry </span></div>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <Datatable
                        myData={industryType}
                        columns={columnsDynamic}
                        pageSize={20}
                        myClass='ReactTable'
                    />
                </div>
            </div>
        </div>
    );
}

export default withRouter(Industry);