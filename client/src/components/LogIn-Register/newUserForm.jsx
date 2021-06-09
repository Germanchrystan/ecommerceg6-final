import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import UniversalNavBar from '../UniversalNavBar/universalNavBar'
import Icon from './icon';
import './authform.css';

import { register, googleLogIn } from '../../redux/actions/authentication_actions';
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


const NewUserForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [outcome, setOutcome] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    let [formData, setFormData] = useState(initialState);


    const currentMessage = useSelector(state => state.authenticationReducer.authData?.message)
    const dispatch = useDispatch();
    const history = useHistory();


    //================ HANDLERS =======================//
    
    function verifyPassword(e) {
        //e.preventDefault()
        //setState({...state, [e.target.name]: e.target.value})
        if ((e.target.name === "confirmPassword" && formData.password === e.target.value) || (e.target.name === "password" && formData.confirmPassword === e.target.value)) {
            //console.log('Las contraseñas coinciden');
            setFormData({ ...formData, [e.target.name]: e.target.value, equal: true })
        } else if (e.target.name === "confirmPassword" || e.target.name === "password") {
            //console.log('Las contraseñas no equal');
            setFormData({ ...formData, [e.target.name]: e.target.value, equal: false })
        }  else {
            setFormData({...formData, [e.target.name]: e.target.value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            swal({
                title: "Password Missing or doesn't match", text: 'Try Again!', icon: "warning", button: true
            })
                
            } else {
                swal({
                    title: 'Successfully Registered', text: 'Welcome!', icon: "success", button: true
                }).then(function () {
                    // window.location.replace(`https://e-commerce-g6.netlify.app/`)
                    history.push('/auth') 
                });
                dispatch(register(formData, history))
                // setOutcome(currentMessage)
            }
    }
    const toggleForm = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    //=================================================//

    return (
        <div>
            <div><UniversalNavBar/></div>
            <div className="grid min-h-screen mt-20 place-items-center bg-gray-200">
                <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6
                    bg-white rounded-lg shadow-md lg:shadow-lg mt-10 mb-10">
                    <h1 className="text-xl font-semibold">Register</h1>
                        <form className="mt-6" onSubmit={handleSubmit}>
                            <label className="block text-xs font-semibold text-gray-600 uppercase">Username</label> <br />
                            <input className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2
                                border-gray-200 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                                name="username" label="username" onChange={verifyPassword} /> <br />
                            <label className="block text-xs font-semibold text-gray-600 uppercase">First Name</label> <br />
                            <input className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2
                                border-gray-200 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                                    name="firstname" label="First Name" onChange={verifyPassword} /> <br />
                            <label className="block text-xs font-semibold text-gray-600 uppercase">Last Name </label> <br />
                            <input className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2
                                border-gray-200 ocus:text-gray-500 focus:outline-none focus:border-gray-200"
                                    name="lastname" label="Last Name" onChange={verifyPassword} /> <br />
                            <label className="block text-xs font-semibold text-gray-600 uppercase">E-mail</label> <br />
                            <input className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2
                                border-gray-200 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                                name="email" placeholder="E-mail" label="Email Address" onChange={verifyPassword} type="text" /> <br />
                            <label className="block text-xs font-semibold text-gray-600 uppercase">Phone</label> <br />
                            <input className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2
                                border-gray-200 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                                name="phone" placeholder="phone" label="phone" onChange={verifyPassword} type="number" /> <br />
                            <div >
                                <label className="block text-xs font-semibold text-gray-600 uppercase">Password</label> <br />
                                <input className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2
                                    border-gray-200 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                                    name="password" placeholder="Password" label="Password" onChange={verifyPassword} type="password"/> <br />
                                <label className="block text-xs font-semibold text-gray-600 uppercase">Confirm Password</label> <br />
                                <input className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2
                                    border-gray-200 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                                    name="confirmPassword" placeholder="Confirm Password" label="confirmPassword" onChange={verifyPassword} type="password"/>
                        </div>
                        <div> <br />
                            <h1 className="text-xl font-semibold">Address Information</h1> <br />
                            <label>Street Number</label> <br />
                            <input className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2
                                border-gray-200 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                                name='streetNumber' placeholder='Street Number' label='Street Number' onChange={verifyPassword} type='text'/> <br />
                            <label className="block text-xs font-semibold text-gray-600 uppercase">Street Name</label> <br />
                            <input className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2
                                border-gray-200 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                                name='street' placeholder='Street' label='Street' onChange={verifyPassword} type='text'/> <br />
                            <label className="block text-xs font-semibold text-gray-600 uppercase">State</label> <br />
                            <input className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2
                                border-gray-200 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                                name='state' placeholder='State' label='State' onChange={verifyPassword} type='text'/> <br />
                            <label className="block text-xs font-semibold text-gray-600 uppercase"> Country </label> <br />
                            <input className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2
                                border-gray-200 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                                name='country' placeholder='Country' label='Country' onChange={verifyPassword} type='text'/> <br />
                            <label className="block text-xs font-semibold text-gray-600 uppercase">Zip Code</label> <br />
                            <input className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2
                                border-gray-200 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                                name='zipcode' placeholder='Zip Code' label='Zip Code' onChange={verifyPassword} type='text'/>
                        </div>
                        <br />
                        <h2 style={{ color: `${outcome.style}`, fontWeight: 800 }}>
                            {outcome.message}
                        </h2>
                        <br />
                            <input type="submit" className="w-full py-3 mt-5 bg-green-700 rounded-sm font-medium text-white 
                            uppercase focus:outline-none hover:bg-green-600 hover:shadow-none" value={'Register'} />

                        <br />
                </form>
                    <Link to='/auth'>
                    <button className="w-full py-3 mt-5 bg-green-700 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-green-600 hover:shadow-none"
                    onClick={toggleForm}>Already have and account? Log in</button>
                    </Link>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )}

export default NewUserForm;