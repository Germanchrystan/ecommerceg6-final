import React, { useState, useEffect } from 'react'
import decode from 'jwt-decode'
import swal from 'sweetalert';
import { getUserById, removeAddress } from './../../redux/actions/user_actions'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import UniversalNavBar from '../UniversalNavBar/universalNavBar'
import Footer from '../../containers/Footer/footer'
import Spinner from '../../containers/Spinner/Spinner';

export default function UserDetail() {
    const [user, setUser] =
        useState(JSON.parse(localStorage.getItem('profile')));

    const dispatch = useDispatch()
    const location = useLocation();
    const history = useHistory();


    const userData = useSelector(
        (state) => state.userReducer?.user?.list?.userFound
    );
    
    const Loading = useSelector (
        (state) => state.userReducer?.isLoading
    )

    useEffect(() => {
        //Por ahora traigo el user guardado en el localStorage.
        //Después traigo un Usuario por params
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) console.log("Session expired!")
        }
        dispatch(getUserById(user?.result?._id))
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    const handleRemoveAddress = (userId, addressId) => {
        const objAddress = { addressId: addressId }
        dispatch(removeAddress(userId, objAddress, history, swal))
    }

    const logout = () => {
        dispatch({ type: "LOGOUT" });
        setUser(null);
        history.push("/")
    }

    // <h4>{user.result.username}</h4>
    return (
        <div className="bg-gray-200 tracking-wide font-bold">
            <div className="pb-10 bg-gray-200">
                <UniversalNavBar />
            </div>
            { 
                Loading ?
                <div>
                    <Spinner />
                </div>
                :
                user?.result && userData &&
                    <div className="bg-gray-200 mr-10 pt-20 pb-10">
                        <div className="max-w-4xl flex items-center mt-4 mb-4 bg-gray-200 flex-wrap mx-auto lg:my-0">
                            {/* <!--Main Col--> */}
                            <div id="profile" className="w-full  rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">
                                <div className="p-4 md:p-12  text-center lg:text-left">
                                    {/* <!-- Image for mobile view--> */}
                                    <h1 style={{fontFamily: "'Josefin Sans', sans-serif", fontWeight:"300"}} className="text-3xl text-center font-bold pt-8 lg:pt-0">  {(user.result) ? user.result.username : ""}'s Profile</h1>
                                    <div className="mx-auto lg:mx-0 w-5/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                                    <p className=" text-base font-bold  lg:justify-start"><svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>👤 Name: {(userData) ? userData?.firstname : ""}</p>
                                    <p className=" text-base font-bold  lg:justify-start"><svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>👤 Surname: {(userData) ? userData?.lastname : ""}</p>
                                    <p className=" text-base font-bold  lg:justify-start"><svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>📧 E-Mail: {(userData) ? userData?.email : ""}</p>
                                    {/* <p className=" text-base font-bold  lg:justify-start"><svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>📌 Street: {(userData) ? userData?.street : ""} {(userData) ? userData?.streetNumber : ""}</p>
                                    <p className=" text-base font-bold  lg:justify-start"><svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>📍 State: {(userData) ? userData?.state : ""}</p>
                                    <p className=" text-base font-bold  lg:justify-start"><svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>📭 Zip Code: {(userData) ? userData?.zipcode : ""}</p> */}
                                    <hr />
                                    {(userData && userData?.addresses?.length > 0) ? userData.addresses.map((a, i) => {
                                        return (
                                            <div key={i} className="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4">
                                                <div className="flex justify-between px-4 items-center">
                                                    <div className="text-lg font-semibold">
                                                        <p>{a.address}</p>
                                                    </div>
                                                    <div className="text-lg font-semibold transform rotate-45 ">
                                                        <button onClick={() => handleRemoveAddress(userData?._id, a._id)} className="focus:outline-none  bg-pink-700 hover:bg-pink-800 text-white font-bold py-2 px-2 rounded-full inline-flex items-center ">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className=" h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }) : <p>No addresses added</p>
                                    }

                                    <div className="grid grid-cols-2 grid-row-2 pt-12 pb-8   text-center content-between">
                                        <Link to={"/MyProfile/Edit/" + user.result._id}>
                                            <button className="mr-5  bg-green-700 flex justify-center hover:bg-green-900 text-white font-bold py-2 px-6  mt-4 rounded-full">
                                                Edit profile 🖍
                                    </button>

                                        </Link>
                                        <Link to={"/MyProfile/addAddress/" + user.result._id}>
                                            <button className="mr-5  bg-green-700 flex justify-center hover:bg-green-900 text-white font-bold py-2 px-6  mt-4 rounded-full">
                                                Add an Address 🖍
                                            </button>

                                        </Link>

                                        <Link to={`/whishlist/${user.result._id}`}>
                                            <button className="mr-5  bg-pink-700 flex justify-center hover:bg-pink-900 text-white font-bold py-2 px-6  mt-4 rounded-full">
                                                Whishlist
                                            </button>
                                        </Link>


                                        {
                                            user.result?.isAdmin &&
                                            <Link to="/Admin/Actions" >
                                                <button className="mr-5  bg-blue-700 hover:bg-blue-900 flex justify-center text-white font-bold py-2 mt-4 px-4 rounded-full">
                                                    Admin Actions
                                                </button>
                                            </Link>
                                        }
                                        {
                                            user.result?.username &&
                                            <Link to={"/users/password/" + user.result._id}  >
                                                <button className="mr-5  bg-gray-500 hover:bg-gray-700 flex justify-center text-white font-bold py-2 px-4 mt-4 rounded-full">
                                                    Change Password
                                    </button>
                                            </Link>
                                        }

                                        {
                                            user.result?.username &&
                                            <Link to={"/carts/" + user.result._id}  >
                                                <button className="mr-5  bg-blue-500 hover:bg-blue-700 flex justify-center text-white font-bold py-2 px-4 mt-4 rounded-full">
                                                    Purchase History 
                                    </button>
                                            </Link>
                                        }

                                        <button className="mr-5  bg-red-700 hover:bg-red-900 text-white  flex justify-center font-bold py-2 mt-4 w-32 rounded-full" onClick={logout}>
                                            Logout
                                            </button>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Pin to top right corner --> */}
                        </div>
                    </div>
            }
            <div className="pt-10 bg-gray-200">
                <Footer />
            </div>
        </div>
    )
}