import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import UniversalNavBar from '../UniversalNavBar/universalNavBar'
import Icon from './icon';
import './authform.css';
import { login, register, googleLogIn } from '../../redux/actions/authentication_actions';
import {getProvincias, getMunicipios, getCalles} from '../../redux/actions/addresses_actions'
// import {googleId} from '../../redux/api'
import Footer from '../../containers/Footer/footer';
import swal from 'sweetalert';

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
    city:'',
    province: '',
    zipcode: ''
}


const AuthForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    let [formData, setFormData] = useState(initialState);

    //===========ADDRESS INFO STATES===========//
    const [provinceInput, setProvinceInput] = useState('-');
    const [cityInput, setCityInput] = useState({text:'', selected:false});
    const [streetInput, setStreetInput] = useState({text:'', selected:false, min:0, max:undefined});
    const [streetNumberInput, setStreetNumberInput] = useState({text:'', selected:false});
    const [numberIndications, setNumberIndications] = useState('');
    const [zipcodeInput, setZipcodeInput] = useState('');
    //========================================//


    const currentMessage = useSelector(state => state.authenticationReducer.authData)
    //const message =JSON.parse(localStorage.getItem('profile'))?.message;
    const history = useHistory();
    const dispatch = useDispatch();
    
    const addressState = useSelector(
        (state) => (state.addressReducer) && state.addressReducer 
    );

    useEffect(() => {
        dispatch(getProvincias())

        if(provinceInput!=="-" && cityInput.length > 3){ 
             dispatch(getMunicipios(provinceInput, cityInput))
        }
    }, [dispatch, cityInput, provinceInput])

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
            }
            else {
                dispatch(register(formData, history, swal))
            }
        } else {
            dispatch(login(formData, history, swal))
        }
    }

    const toggleForm = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }
    //=============GOOGLE HANDLERS========================//
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
            dispatch(googleLogIn(formData, history,swal))
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = () => swal({
        title: "Google Log In failed.",
        icon: "warning"
    });


    //==========ADDRESS INFO HANDLERS==============//
    const handleProvinceChange = (e) => {
        setFormData({
            ...formData,
            province: e.target.value
        })
        setProvinceInput(e.target.value)
    }
    
    const handleCityInputChange = (e) => {
        setCityInput({
            text: e.target.value,
            selected: false
        });
        setFormData({
            ...formData,
            city: e.target.value
        })
        setStreetInput({
            text:'',
            selected:false
        })
        if(cityInput.text.length > 3) {
            dispatch(getMunicipios(provinceInput, cityInput.text))
        }
    };

    const completeCityInput = (cityName) => {
        setCityInput({
            text:cityName,
            selected: true
        })
        setFormData({
            ...formData,
            city: cityName
        })
    }

    const handleStreetInputChange = (e) => {
        setStreetInput({
            text:e.target.value,
            selected:false,
        })
        dispatch(getCalles(provinceInput, cityInput.text, streetInput.text))
        setFormData({
            ...formData,
            street: e.target.value
        })
        setNumberIndications('')
    }
    
    const completeStreetInput = (streetName) => {
        setStreetInput({
            text:streetName.nombre,
            selected: true,
            min: streetName.inicioAltura,
            max: streetName.finalAltura
        })
        setFormData({
            ...formData,
            street: streetName.nombre
        })
        if(streetName.finalAltura && streetName.finalAltura > 0){
            setNumberIndications(`Enter a number between ${streetName.inicioAltura} and ${streetName.finalAltura}`)
        }
    }

    const handleStreetNumberInputChange = (e) => {
        setStreetNumberInput(e.target.value)
        setFormData({
            ...formData,
            streetNumber:e.target.value
        })
    }

    const handleZipcodeInputChange = (e) => {
        setZipcodeInput(e.target.value)
        setFormData({
            ...formData,
            zipcode: e.target.value
        })
    }

    
    //============================================//


    //================ RETURN =========================//

    return (
        <div className="tracking-wide font-bold">
            <div>
                <UniversalNavBar />
            </div>
            <div className="grid min-h-screen mt-20 place-items-center bg-gray-200">
                <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg mt-10 mb-10">
                    <h1 class="text-xl font-semibold">{isSignup ? 'Register' : 'Log in'}</h1>
                    <form
                    className="mt-6"
                    onSubmit={handleSubmit}>
                    {
                        isSignup && (
                        <>
                        <label
                        className="block text-xs font-semibold text-gray-600 uppercase">
                            Username
                        </label>
                        <br />
                        <input
                        className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-200 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                        name="username"
                        label="username"
                        onChange={handleChange}
                        />
                        <br />
                        <label
                        className="block text-xs font-semibold text-gray-600 uppercase">
                            First Name
                        </label>
                        <br />
                        <input
                        className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-200 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                        name="firstname"
                        label="First Name"
                        onChange={handleChange}
                        />
                        <br />
                        <label
                        className="block text-xs font-semibold text-gray-600 uppercase">
                            Last Name
                        </label>
                        <br />
                        <input
                        className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-200 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                        name="lastname"
                        label="Last Name"
                        onChange={handleChange}
                        />
                        </>
                            )
                        }

                        <br />
                        <label
                        className="block text-xs font-semibold text-gray-600 uppercase">
                            E-mail
                        </label>
                        <br />
                        <input
                        className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-200 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                        name="email"
                        placeholder="E-mail"
                        label="Email Address"
                        onChange={handleChange}
                        type="text" />
                        <br />

                        <div >
                            <label className="block text-xs font-semibold text-gray-600 uppercase">
                                Password
                            </label>
                            <br />

                            <input
                            className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-200 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                            name="password"
                            placeholder="Password"
                            label="Password"
                            onChange={handleChange}
                            type="password"
                            />

                            {isSignup && 
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 uppercase">
                                    Confirm Password
                                </label>
                                <br />
                                <input
                                className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-200 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                label="Confirm Password"
                                onChange={handleChange}
                                type="password"
                                />
                            </div>
                            }
                        </div>
                        {isSignup && 
                        <div>
                            <br />
                            <h1 className="text-xl font-semibold">
                                Address Information
                            </h1>
                            <br />
                            {/*ADDRESS Form*/}
                            <select 
                            name ="state" 
                            id="state" 
                            value = {provinceInput}
                            onChange={(e)=>handleProvinceChange(e)}
                            required
                            >
                            <option value="-">Pick a Province</option>
                            {
                                (addressState?.provincias) && addressState.provincias.map((p) => 
                                    <option value={p}>{p}</option>
                                )
                            }
                            </select>

                            <input
                            value={cityInput.text}
                            onChange={handleCityInputChange}
                            id="city"
                            disabled={provinceInput==='-'}
                            type="text"
                            name="city"
                            placeholder="City"
                            autocomplete="current-password"
                            className="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                            required
                            />
                            <div className="-mt-2 ml-2">
                            {addressState &&
                            addressState.municipios?.length > 0 &&
                            !cityInput.selected &&
                            cityInput.text.length > 3 &&
                            addressState.municipios.map((m, key) => {
                            return (
                                <div className="flex justify-center" key={key}>
                                    <p
                                    onClick={(e) => completeCityInput(m)}
                                    className="cursor-pointer bg-white w-40 mr-80 hover:bg-gray-200">
                                        {m}
                                    </p>
                                </div>
                                );
                            })}
                        </div>
                        <input
                        value={streetInput.text}
                        onChange={handleStreetInputChange}
                        disabled={!addressState.municipios.includes(cityInput.text)}
                        id="street"
                        type="text"
                        name="street"
                        placeholder="Street Name"
                        autocomplete="current-password"
                        className="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                        required
                        />

                        <div className="-mt-2 ml-2">
                        {addressState &&
                        addressState.calles?.length > 0 &&
                        !streetInput.selected &&
                        addressState.municipios.includes(cityInput.text) &&
                        addressState.calles.map((s, key) => {
                        return (
                        <div className="flex justify-center" key={key}>
                            <p
                            onClick={(e) => completeStreetInput(s)}
                            className="cursor-pointer bg-white w-40 mr-80 hover:bg-gray-200">
                                {s.nombre}
                            </p>
                        </div>
                        );
                    })}
                    </div>
                    <p>{numberIndications}</p>
                    <input
                    value={streetNumberInput}
                    id="streetNumber"
                    onChange={handleStreetNumberInputChange}
                    type="number"
                    name="streetNumber"
                    placeholder="Street Number"
                    min={streetInput.inicioAltura ? streetInput.inicioAltura : 0 }
                    max={(streetInput.finalAltura && streetInput.finalAltura > 0) ? streetInput.finalAltura : 1000000}
                    className="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    required
                    />
                    <input
                    value={zipcodeInput}
                    onChange={handleZipcodeInputChange}
                    id="zipcode"
                    type="number"
                    name="zipcode"
                    placeholder="zipcode"
                    autocomplete="current-password"
                    className="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    required
                    />

                    <input
                    value={formData.phone}
                    name = "phone"
                    onChange={handleChange}
                    type="text"
                    placeholder="Phone (optional)"
                    className="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    />

                </div>
                }
                <GoogleLogin
                clientId={"990763304984-umq5mpevotk3odllue9hhm1mvct032ft.apps.googleusercontent.com"}
                render={(renderProps) => (
                <button
                className="w-full bg-red-700 py-3 px-4 mt-5 rounded-sm justify-center hover:bg-red-600 hover:shadow-none text-white font-bold focus:outline-none focus:shadow-outline inline-flex items-center"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}> 
                    <Icon /><div>  </div><div>{isSignup ? 'Register' : 'Login' } with Google</div></button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
                />
                <input
                type="submit"
                className="w-full py-3 mt-5 bg-green-700 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-green-600 hover:shadow-none"
                value={isSignup ? 'Register' : 'Log In'} />
                <br />
            </form>
            <button
            className="w-full py-3 mt-5 bg-green-700 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-green-600 hover:shadow-none"
            onClick={toggleForm}>
            {isSignup ?
            'Already have and account? Log in'
            :
            'Don`t have an account? Register'}
            </button>
            </div>
        </div>
    <div>
        <Footer />
    </div>
    </div>
    )
}
export default AuthForm;