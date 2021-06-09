import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import UniversalNavBar from '../UniversalNavBar/universalNavBar'
import Icon from './icon';
import './authform.css';

import { login, register, googleLogIn } from '../../redux/actions/authentication_actions';
import Footer from '../../containers/Footer/footer';
import swal from 'sweetalert';

const { FRONT_URL } = process.env

const initialState = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    streetNumber: '',
    street: '',
    state: '',
    country: '',
    zipcode: ''
}


const AuthForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [outcome, setOutcome] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    let [formData, setFormData] = useState(initialState);


    const currentMessage = useSelector(state => state.authenticationReducer.authData?.message)
    //const message =JSON.parse(localStorage.getItem('profile'))?.message;
    const dispatch = useDispatch();
    const history = useHistory();


    //================ HANDLERS =======================//
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isSignup) {

            if (!formData.password || formData.password.trim() === "") {
                swal({
                    title: 'Password Missing',
                    text: 'Try Again!',
                    icon: "warning"
                })
            } else {
                swal({
                    title: 'Successfully Registered',
                    text: 'Welcome!',
                    icon: "success"
                }).then(function () {
                    // window.location.replace(`https://e-commerce-g6.netlify.app/`)
                   window.location.replace(`http://localhost:3000/`) 
                });
                dispatch(register(formData, history))
                // setOutcome(currentMessage)
            }

        } else {
            swal({
                title: 'Successfully Logged In',
                text: 'Welcome Back!',
                icon: "success"
            }).then(function () {
                // window.location.replace(`https://e-commerce-g6.netlify.app/`)
                window.location.replace(`http://localhost:3000/`) 
            });
            dispatch(login(formData, history));
            // setOutcome(currentMessage)
        }
    }

    const toggleForm = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const formData = {
            email: res.profileObj.email,
            username: res.profileObj.name,
            firstname: res.profileObj.givenName,
            lastname: res.profileObj.familyName

        }
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            swal({
                title: "Successfully Logged In with Google",
                text: 'Welcome Back!',
                icon: "success"
            }).then(function () {
                // window.location.replace(`https://e-commerce-g6.netlify.app/`)
                window.location.replace(`http://localhost:3000/`) 
                });
                dispatch(googleLogIn(formData, history))

        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = () => swal({
        title: "Google Log In failed.",
        icon: "warning"
    });

    //=================================================//

    return (
        <div>
            <div>
                <UniversalNavBar />
            </div>
            <div class="grid min-h-screen mt-20 place-items-center bg-gray-200">
                <div class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-white rounded-lg shadow-md lg:shadow-lg mt-10 mb-10">
                    <h1 class="text-xl font-semibold">Log in</h1>
                    <form class="mt-6" onSubmit={handleSubmit}> <br />
                        <label class="block text-xs font-semibold text-gray-600 uppercase">E-mail</label> <br />
                        <input class="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 
                            border-gray-200 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                            name="email" placeholder="E-mail" label="Email Address" onChange={handleChange} type="text" /> <br />
                        <div >
                            <label class="block text-xs font-semibold text-gray-600 uppercase">Password</label> <br />
                            <input class="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 
                                border-gray-200 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                                name="password" placeholder="Password" label="Password" onChange={handleChange} type="password" />
                        </div> <br />
                        <h2 style={{ color: `${outcome.style}`, fontWeight: 800 }}>{outcome.message}</h2> <br />
                        <GoogleLogin
                            clientId="990763304984-umq5mpevotk3odllue9hhm1mvct032ft.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <button class="w-full bg-red-700 py-3 px-4 mt-5 rounded-sm justify-center hover:bg-red-600 
                                    hover:shadow-none text-white font-bold focus:outline-none focus:shadow-outline inline-flex items-center"
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}> <Icon /><div>  </div><div>Log In with Google</div></button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />

                        <input type="submit" class="w-full py-3 mt-5 bg-green-700 rounded-sm font-medium text-white 
                            uppercase focus:outline-none hover:bg-green-600 hover:shadow-none" value={'Log In'} />

                        <br />

                    </form>
                    <Link to='/newUser'> 
                    <button class="w-full py-3 mt-5 bg-green-700 rounded-sm font-medium text-white uppercase
                        focus:outline-none hover:bg-green-600 hover:shadow-none" onClick={toggleForm}>Don`t have an account? Register</button>
                    </Link>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default AuthForm;