import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCategory } from "../../redux/actions/category_actions";
import "../Catalog/catalog.css"
import UniversalNavBar from "../UniversalNavBar/universalNavBar";
import Footer from "../../containers/Footer/footer";
import swal from 'sweetalert'

const ProductPostForm = () => {
    const dispatch = useDispatch();


    const newCategory = {
        name: "",
        description: "",

    };
    const [category, setCategory] = useState(newCategory);

    const handleInputChange = (e) => {
        setCategory({
            ...category,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        const categorySend = {
            name: category.name,
            description: category.description,

        };
        dispatch(addCategory(categorySend));
        setCategory(newCategory)
        window.location.replace("http://localhost:3000/categories")
        /*   alert("Activity successfullty created"); */
        //--------VALIDACION-------------------------------
        if (category.name === '') return swal({
            title: "Name Field Cannot Be Empty",
            icon: "warning",
            button: true,
            dangerMode: true,
        })
        if (category.description === '') return swal({
            title: "Description Field Cannot Be Empty",
            icon: "warning",
            button: true,
            dangerMode: true,
        })
    };


    // console.log(product)
    return (
        <div class=" tracking-wide font-bold bg-gray-200">
            <UniversalNavBar />
            <form onSubmit={handleSubmit}>
                <div class="flex items-center min-h-screen bg-gray-200 dark:bg-gray-900">
                    <div class="container mx-auto">
                        <div class="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-sm">
                            <div class="text-center">
                                <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Post New Category</h1>

                            </div>
                            <div class="m-7">
                                <form >
                                    <div class="mb-6">
                                        <label for="name" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Category</label>
                                        <input id="name"
                                            type="text"
                                            name="name"
                                            value={category.name}
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
                                            value={category.description}
                                            onChange={handleInputChange}
                                            placeholder="Product Description"
                                            class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none 
                                focus:ring focus:ring-indigo-100 
                                focus:border-indigo-300 dark:bg-gray-700 
                                dark:text-white dark:placeholder-gray-500 
                                dark:border-gray-600 dark:focus:ring-gray-900 
                                dark:focus:border-gray-500" required
                                        />

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
};
//name, img, brand, category, description, price, stock, rating, review, size, color
export default ProductPostForm;