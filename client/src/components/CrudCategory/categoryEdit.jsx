import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories, editCategory } from "../../redux/actions/category_actions";
import "../Catalog/catalog.css"
import UniversalNavBar from "../UniversalNavBar/universalNavBar";
import Footer from "../../containers/Footer/footer";
import { useParams, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const CategoryEdit = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory()

    const newCategory = {
        id: id,
        name: "",
        description: "",

    };
    console.log(id)
    const [category, setProduct] = useState(newCategory);
    console.log(newCategory)

    const categoryArray = useSelector(
        (state) => state.categoriesReducer.categories.list.categories
    );


    const handleInputChange = (e) => {
        setProduct({
            ...category,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        const categorySend = {
            id: category.id,
            name: category.name,
            description: category.description

        };
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
        dispatch(editCategory(categorySend));
        setProduct(newCategory)

        swal("Good job!", "Well done!", "success", { buttons: false })
        history.goBack()
    };
    
    return (
        <div class=" tracking-wide font-bold bg-gray-200">
            <UniversalNavBar />
            <form onSubmit={handleSubmit}>
                <div className="flex items-center min-h-screen bg-gray-200 dark:bg-gray-900">
                    <div className="container mx-auto">
                        <div className="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-sm">
                            <div className="text-center">
                                <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Edit New Category</h1>

                            </div>
                            <div className="m-7">
                                <form >
                                    <div className="mb-6">

                                        <label for="name" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Category</label>
                                        <input id="name"
                                            type="text"
                                            name="name"
                                            value={category.name}
                                            onChange={handleInputChange}
                                            placeholder="Category"
                                            required
                                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                                    </div>

                                    <div className="mb-6">
                                        <label for="description" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Description</label>
                                        <textarea
                                            id="description"
                                            type="text"
                                            name="description"
                                            value={category.description}
                                            onChange={handleInputChange}
                                            placeholder="Product Description"
                                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none 
                                focus:ring focus:ring-indigo-100 
                                focus:border-indigo-300 dark:bg-gray-700 
                                dark:text-white dark:placeholder-gray-500 
                                dark:border-gray-600 dark:focus:ring-gray-900 
                                dark:focus:border-gray-500" required
                                        />

                                    </div>
                                    <div className="mb-6">
                                        <button type="submit" onClick={handleSubmit} className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">Edit</button>
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
export default CategoryEdit;