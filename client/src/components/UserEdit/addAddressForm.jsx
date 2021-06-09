import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UniversalBar from '../UniversalNavBar/universalNavBar';
import Footer from '../../containers/Footer/footer';
import { useHistory, useParams } from 'react-router-dom';
import { getUserById, addAddress } from '../../redux/actions/user_actions'
import {getProvincias, getMunicipios, getCalles} from '../../redux/actions/addresses_actions'
import swal from "sweetalert";


export default function AddAddressForm() {
    var { id } = useParams();

    const [provinceInput, setProvinceInput] = useState('-');
    const [cityInput, setCityInput] = useState({text:'', selected:false});
    const [streetInput, setStreetInput] = useState({text:'', selected:false, min:0, max:undefined});
    const [streetNumberInput, setStreetNumberInput] = useState({text:'', selected:false});
    const [numberIndications, setNumberIndications] = useState('');
    const [zipcodeInput, setZipcodeInput] = useState('');

    const history = useHistory();
    const dispatch = useDispatch()

    const addressState = useSelector(
        (state) => (state.addressReducer) && state.addressReducer 
    );
    
    useEffect(() => {
        dispatch(getUserById(id))
        dispatch(getProvincias())

        if(provinceInput!=="-" && cityInput.length > 3){ 
             dispatch(getMunicipios(provinceInput, cityInput))
        }
    }, [id, dispatch, cityInput, provinceInput])

//====================================== HANDLERS ============================================//
    const handleProvinceChange = (e) => {
        setProvinceInput(e.target.value)
    }
    
    const handleCityInputChange = (e) => {
        setCityInput({
            text: e.target.value,
            selected: false
        });
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
    }

    const handleStreetInputChange = (e) => {
        setStreetInput({
            text:e.target.value,
            selected:false,
        })
        dispatch(getCalles(provinceInput, cityInput.text, streetInput.text))
        
        setNumberIndications('')
    }
    
    const completeStreetInput = (streetName) => {
        setStreetInput({
            text:streetName.nombre,
            selected: true,
            min: streetName.inicioAltura,
            max: streetName.finalAltura
        })
        if(streetName.finalAltura && streetName.finalAltura > 0){
            setNumberIndications(`Enter a number between ${streetName.inicioAltura} and ${streetName.finalAltura}`)
        }
    }

    const handleStreetNumberInputChange = (e) => {
        setStreetNumberInput(e.target.value)
    }

    const handleZipcodeInputChange = (e) => {
        setZipcodeInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalAddress = {
            province: provinceInput,
            city: cityInput.text,
            street: streetInput.text,
            streetNumber: streetNumberInput,
            zipcode: zipcodeInput
        }
        dispatch(addAddress(id, finalAddress, history, swal));
    };
//====================================== RETURN ============================================//
    return (
        <div className="tracking-wide font-bold">
            <UniversalBar />
            <div className="grid min-h-screen place-items-center mt-20">
                <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 mt-4
            bg-white rounded-lg shadow-md lg:shadow-lg">

                    <h1 className="text-xl font-semibold">Add An Address</h1>
                    <form className="mt-6" onSubmit={handleSubmit}>
                        <h1 className="text-xl font-semibold mt-2">Address</h1>

                        <select 
                        name ="state" 
                        id="state" 
                        value = {provinceInput}
                        onChange={(e)=>handleProvinceChange(e)}
                        required
                        >   <option value="-">Pick a Province</option>
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
                            className="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
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
                            className="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
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
                            className="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                            required
                        />
                        <button type="submit" className="w-full py-3 mt-5 bg-green-700 rounded-sm
                            font-medium text-white uppercase
                            focus:outline-none hover:bg-green-600 hover:shadow-none">
                            Add
                            </button>

                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}
