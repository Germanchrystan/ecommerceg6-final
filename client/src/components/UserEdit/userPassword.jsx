// import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { changePassword } from "../../redux/actions/authentication_actions";
import { editPassword } from "../../redux/actions/user_actions";
import "../Catalog/catalog.css"
import UniversalNavBar from "../UniversalNavBar/universalNavBar";
import Footer from "../../containers/Footer/footer";
import { useParams, useHistory, Redirect } from 'react-router-dom';
import swal from 'sweetalert';

const UserPassword = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory()

    const newPassword = {
        _id: id,
        oldPassword: "",
        newPassword: "",
        repeatPassword: "",

    };
    const [password, setPassword] = useState(newPassword);

   
    const passwordArray = useSelector(
        (state) => state.authenticationReducer
    );

    

    function verifyPassword(e) {
        //e.preventDefault()
        //setState({...state, [e.target.name]: e.target.value})
        if ((e.target.name === "repeatPassword" && password.newPassword === e.target.value) || (e.target.name === "newPassword" && password.repeatPassword === e.target.value)) {
            //console.log('Las contraseñas coinciden');
            setPassword({ ...password, [e.target.name]: e.target.value, equal: true })
        } else if (e.target.name === "repeatPassword" || e.target.name === "newPassword") {
            //console.log('Las contraseñas no equal');
            setPassword({ ...password, [e.target.name]: e.target.value, equal: false })
        }
    }

    const handleInputChange = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        if (
            password.newPassword === password.repeatPassword) {

            //e.preventDefault();
            const passwordSend = {
                id: password._id,
                oldPassword: password.oldPassword,
                newPassword: password.repeatPassword

            };
            /*  if(password.name === '') return swal({
                 title: "Name Field Cannot Be Empty",
                 icon: "warning",
                 button: true,
                 dangerMode: true,
             })
               if(password.description === '') return  swal({
                 title: "Description Field Cannot Be Empty",
                 icon: "warning",
                 button: true,
                 dangerMode: true, */
            /*  }) */
            dispatch(editPassword(id, passwordSend));
            setPassword(newPassword)
            dispatch({ type: "LOGOUT" })
            history.push('/auth')

            swal("Password Changed!", "Well done!", "success", { button: true }).then(function () {
                // window.location.replace(`https://e-commerce-g6.netlify.app/`)
                history.push(`/auth`)
            });
        } else {
            swal("Password doesn't match", "Try Again", "warning", { button: true })
        }
        // window.location.replace(`https://e-commerce-g6.netlify.app/`)
    }
    // console.log(product)
    return (
        <div className=" tracking-wide font-bold bg-gray-200">
            <UniversalNavBar />
            <form>
                <div className="flex items-center min-h-screen bg-gray-200 dark:bg-gray-900">
                    <div className="container mx-auto">
                        <div className="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-sm">
                            <div className="text-center">
                                <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Edit Password</h1>

                            </div>
                            <div className="m-7">
                                <form >
                                    <div className="mb-6">

                                        <label for="oldPassword" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Current Password</label>
                                        <input id="oldPassword"
                                            type="password"
                                            name="oldPassword"
                                            value={password.oldPassword}
                                            onChange={handleInputChange}
                                            placeholder="Current"

                                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                                    </div>

                                    <div className="mb-6">
                                        <label for="newPassword" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">New Password</label>
                                        <input
                                            id="newPassword"
                                            type="password"
                                            name="newPassword"
                                            value={password.newPassword}
                                            onChange={verifyPassword}
                                            placeholder="New "
                                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none 
                                focus:ring focus:ring-indigo-100 
                                focus:border-indigo-300 dark:bg-gray-700 
                                dark:text-white dark:placeholder-gray-500 
                                dark:border-gray-600 dark:focus:ring-gray-900 
                                dark:focus:border-gray-500"
                                            required
                                        />

                                    </div>
                                    <div className="mb-6">
                                        <label for="newPassword" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">New Password</label>
                                        <input
                                            id="newPassword"
                                            type="password"
                                            name="repeatPassword"
                                            value={password.repeatPassword}
                                            onChange={verifyPassword}
                                            placeholder="New "
                                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none 
                                focus:ring focus:ring-indigo-100 
                                focus:border-indigo-300 dark:bg-gray-700 
                                dark:text-white dark:placeholder-gray-500 
                                dark:border-gray-600 dark:focus:ring-gray-900 
                                dark:focus:border-gray-500"
                                            required
                                        />


                                    </div>
                                    <div className="mb-6">
                                        <button type="button" onClick={handleSubmit} className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">Edit</button>
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
export default UserPassword;