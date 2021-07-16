import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import seven from '../../assets/images/user/user.png';
import '../../assets/css/vjobapp.css';
import { FILE_URL } from '../../constant/actionTypes';


function ApplicantsProfile(props) {
    const userData = props.modalData
    return (
        <Modal isOpen={props.modal} toggle={props.toggle} size="lg">
            <ModalHeader toggle={props.toggle}>
                <div className="row">
                    <div className="col-sm-10">
                        <div className="media">
                            <img className="img-100 rounded-circle rounded-circle mr-3" src={userData.photo ? userData.photo : seven} alt="Generic placeholder image" />
                            <div className="media-body align-self-center">
                                <h5 className="">{userData.fullname ? userData.fullname : "No name found"}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-2 align-self-center">
                        <a href={FILE_URL + userData.resume}
                            className="btn btn-primary"
                            target="_blank"
                            download={userData.fullname + "_resume"}>
                            <span><i className="fa fa-download"></i></span>
                        </a>
                    </div>
                </div>
            </ModalHeader>
            <ModalBody>
                <div className="card">
                    <div className="card-body ml-4">
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Full Name</label>
                            <div className="col-sm-8">
                                <div className="col-form-label" >{userData.fullname ? userData.fullname : "No name found"}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Email</label>
                            <div className="col-sm-8">
                                <div className="col-form-label"> {userData.email ? userData.email : "No email found"}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Mobile</label>
                            <div className="col-sm-8">
                                <div className="col-form-label"> {userData.mobile ? userData.mobile : "No phone found"} </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Gender</label>
                            <div className="col-sm-8">
                                <div className="col-form-label" >{userData.gender && userData.gender == 1 ? "Male" : "Female"}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Skills</label>
                            <div className="col-sm-8">
                                <div className="col-form-label" >{userData.skills.length > 0 ? userData.skills.toString() : "No skills found"}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Location</label>
                            <div className="col-sm-8">
                                <div className="col-form-label">
                                    {userData.countryid && userData.countryid.name}
                                    {userData.stateid && ", " + userData.stateid.name}
                                    {userData.city && ", " + userData.city.name}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>

    );
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ApplicantsProfile));