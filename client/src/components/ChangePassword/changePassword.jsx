import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import UniversalNavBar from '../UniversalNavBar/universalNavBar'

import { login, register, googleLogIn } from '../../redux/actions/authentication_actions';
import Footer from '../../containers/Footer/footer';

const initialState = {
    oldPassword:'',
    newPassword:''
}

const changePassword = () => {
    return(
        <h1>Change Password</h1>
    )
}