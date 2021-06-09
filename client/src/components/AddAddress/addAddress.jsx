import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import UniversalNavBar from '../UniversalNavBar/universalNavBar'


import Footer from '../../containers/Footer/footer';

const initialState = {
    streetNumber: '',
    street: '',
    state: '',
    country: '',
    zipcode: ''
}

const AddAddress = () => {
    const [addressData, setAddressData] = useState(initialState);

    const handleChange = (e) => {
        setAddressData({
            ...addressData,
            [e.target.name]:e.target.value
        })
    }

    return (
        <form>
            <h1 className="text-xl font-semibold">
                Address Information
            </h1>
            <br />
            <label>Street Number</label>
            <br />
            <input
            className="block w-full py-3 px-1 mt-2
            text-gray-800 appearance-none 
            border-b-2 border-gray-200
            focus:text-gray-500 focus:outline-none focus:border-gray-200"
            name='streetNumber'
            placeholder='Street Number'
            label='Street Number'
            onChange={handleChange}
            type='text'
            />
            <br />
            <label
            className="block text-xs font-semibold text-gray-600 uppercase">
                Street Name
            </label>
            <br />
            <input
            className="block w-full py-3 px-1 mt-2
            text-gray-800 appearance-none 
            border-b-2 border-gray-200
            focus:text-gray-500 focus:outline-none focus:border-gray-200"
            name='street'
            placeholder='Street'
            label='Street'
            onChange={handleChange}
            type='text'
            />
            <br />
            <label className="block text-xs font-semibold text-gray-600 uppercase">
                State
            </label>
            <br />
            <input
            className="block w-full py-3 px-1 mt-2
            text-gray-800 appearance-none 
            border-b-2 border-gray-200
            focus:text-gray-500 focus:outline-none focus:border-gray-200"
            name='state'
            placeholder='State'
            label='State'
            onChange={handleChange}
            type='text'
            />
            <br />
            <label className="block text-xs font-semibold text-gray-600 uppercase">
                Country
            </label>
            <br />
            <input
            className="block w-full py-3 px-1 mt-2
            text-gray-800 appearance-none 
            border-b-2 border-gray-200
            focus:text-gray-500 focus:outline-none focus:border-gray-200"
            name='country'
            placeholder='Country'
            label='Country'
            onChange={handleChange}
            type='text'
            />
            <br />
            <label className="block text-xs font-semibold text-gray-600 uppercase">
                Zip Code
            </label>
            <br />
            <input
            className="block w-full py-3 px-1 mt-2
            text-gray-800 appearance-none 
            border-b-2 border-gray-200
            focus:text-gray-500 focus:outline-none focus:border-gray-200"
            name='zipcode'
            placeholder='Zip Code'
            label='Zip Code'
            onChange={handleChange}
            type='text'    
            />            

        </form>
    )
}