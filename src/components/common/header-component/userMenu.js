import React, { Fragment, useEffect } from 'react';
import man from '../../../assets/images/dashboard/user.png';
import { User, Mail, Lock, Settings, LogOut } from 'react-feather';
import {logoutStart} from "../../../actions/auth"
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const UserMenu = (props) => {

    useEffect(() => {
        if (props.auth){
            if (props.auth.logOutSuccess){
                props.history.push('/')
            }else if (props.auth.logOutError){

            }
        }
    },[props.auth])

    return (
        <Fragment>
            <li className="onhover-dropdown">
                <div className="media align-items-center">
                    <img className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded" src={man} alt="header-user" />
                    <div className="dotted-animation">
                        <span className="animate-circle"></span>
                        <span className="main-circle"></span>
                    </div>
                </div>
                <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
                    {/* <li><a href="#javascript"><User />Edit Profile</a></li>
                    <li><a href="#javascript"><Mail />Inbox</a></li>
                    <li><a href="#javascript"><Lock />Lock Screen</a></li>
                    <li><a href="#javascript"><Settings />Settings</a></li> */}
                    <li onClick={() => props.logoutStart()}><LogOut /> Log out</li>
                </ul>
            </li>
        </Fragment>
    );
};

const mapStateToProps = state => ({
    auth : state.Auth
})

const mapDispatchToProps = {
    logoutStart
}

export default withRouter(connect( mapStateToProps, mapDispatchToProps )(UserMenu));