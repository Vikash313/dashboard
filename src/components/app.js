import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import Header from './common/header-component/header';
import Sidebar from './common/sidebar-component/sidebar';
import RightSidebar from './common/right-sidebar';
import Footer from './common/footer';
import ThemeCustomizer from './common/theme-customizer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './common/loader';
import authenticationService from '../service/authentication';


const AppLayout = (props) => {
    useEffect(() => {

        if (!localStorage.getItem("token"))
            props.history.push("/")

        // if (userRole == "admin")
        //     props.history.push("/user")
        // else
        //     props.history.push("/interaction")
    }, [])

    if (localStorage.getItem("token")) {
        return (
            <div>
                <Fragment>
                    {/* <Loader /> */}
                    <div className="page-wrapper">
                        <div className="page-body-wrapper">
                            <Header />
                            <Sidebar />
                            <RightSidebar />

                            <div className="page-body ">
                                {props.children}
                            </div>

                            <Footer />
                            {/* <ThemeCustomizer /> */}
                        </div>
                    </div>
                    <ToastContainer />
                </Fragment>
            </div>
        )
    } else {
        return (
            <Loader />
        )

    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.Auth
    }
}

const mapDispatchToProps = {

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppLayout));