import { loginOrganization } from '../../actions'
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import useForm from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import * as authActions from '../../actions/auth';


const Login = props => {

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        props.loginUser(data);
    };


    useEffect(() => {
        if (props.auth.signInSuccess || localStorage.getItem('token')) {
            if (localStorage.getItem('token'))
                props.history.push('/jobs-admin/jobs')
            else if (localStorage.getItem('userType') == "admin")
                props.history.push('/user')
        }
    }, [props.auth.signInSuccess])

    return (
        // <div>
        <div className="page-wrapper">
            <div className="container-fluid p-0">
                {/* <!-- login page start--> */}
                <div className="authentication-main">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="auth-innerright">
                                <div className="authentication-box">
                                    {/*<div className="text-center">
                                             <img src={logo} alt="" /> 
                                        </div>*/}
                                    <div className="card mt-4">
                                        <div className="card-body">
                                            <div className="text-center">
                                                <h4>LOGIN</h4>
                                                <h6>Enter Organisation ID and Password </h6>
                                            </div>
                                            <form onSubmit={handleSubmit(onSubmit)} className="theme-form" >
                                                <div className="form-group">
                                                    <label className="col-form-label pt-0">Email</label>
                                                    <input className="form-control" type="email" name="email"

                                                        placeholder="Email"
                                                        ref={register({ required: true })}
                                                    />
                                                    {errors.org_id && <span className="text-danger">Email is required</span>}
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">Password</label>
                                                    <input className="form-control" type="password" name="password"

                                                        placeholder="Password"
                                                        ref={register({ required: true })}
                                                    />
                                                    {errors.password && <span className="text-danger">Password is required</span>}
                                                </div>

                                                <div className="form-group form-row mt-3 mb-0">
                                                    <button className="btn btn-primary btn-block" type="submit" >Login</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- login page end--> */}
            </div>

            {/* </div> */}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.Auth,
        // auth: true,
    }
}

const mapDispatchToProps = {
    ...authActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// const mapStateToProps = state => {
//     return ({
//       org_details: state.auth.org_details,
//       organisation: state.auth.organisation
//     })
//   }

//   export default connect(
//     mapStateToProps,
//     { loginOrganization }
//   )(Login);
