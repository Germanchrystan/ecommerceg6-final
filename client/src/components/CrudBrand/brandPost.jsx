import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { addBrand } from '../../redux/actions/brand_actions';
import UniversalNavBar from "../UniversalNavBar/universalNavBar";
import Footer from "../../containers/Footer/footer";
import swal from 'sweetalert'

function BrandPostForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const newBrand = {
        name: "",
        description: "",
    };

    const [brand, setBrand] = useState(newBrand);

    const handleInputChange = (e) => {
        setBrand({
            ...brand,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (brand.name === '') return swal({
            title: "Name Field Cannot Be Empty",
            icon: "warning",
            button: true,
            dangerMode: true,
        })

        const sentBrand = {
            name: brand.name,
            description: brand.description,
        };

        dispatch(addBrand(sentBrand, history, swal)); //ADD HISTORY AND SWAL
    };



    return (
        <div class=" tracking-wide font-bold bg-gray-200">
            <UniversalNavBar />
                <form onSubmit={handleSubmit}>
                    <div class="flex items-center min-h-screen bg-gray-200 dark:bg-gray-900">
                        <div class="container mx-auto">
                            <div class="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-sm">
                                <div class="text-center">
                                    <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Post New Brand</h1>
                                </div>
                                <div class="m-7">
                                    <form >
                                        <div class="mb-6">
                                            <label for="name" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Brand</label>
                                            <input id="name"
                                                type="text"
                                                name="name"
                                                value={brand.name}
                                                onChange={handleInputChange}
                                                placeholder="Category"
                                                required
                                                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                                        </div>
    
                                        <div class="mb-6">
                                            <label for="description" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Description</label>
                                            <textarea
                                                id="description"
                                                type="text"
                                                name="description"
                                                value={brand.description}
                                                onChange={handleInputChange}
                                                placeholder="Product Description"
                                                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none 
                                    focus:ring focus:ring-indigo-100 
                                    focus:border-indigo-300 dark:bg-gray-700 
                                    dark:text-white dark:placeholder-gray-500 
                                    dark:border-gray-600 dark:focus:ring-gray-900 
                                    dark:focus:border-gray-500" required/>
                                    </div>
                                    <div class="mb-6">
                                        <button type="submit" onClick={handleSubmit} class="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">Send</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <Footer />
        </div>
    );
}

export default BrandPostForm
