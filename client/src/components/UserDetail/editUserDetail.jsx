import React, { useState, useEffect } from 'react'
import decode from 'jwt-decode'
import { Link, useLocation, useHistory } from 'react-router-dom'
import UniversalNavBar from '../UniversalNavBar/universalNavBar'
import Footer from '../../containers/Footer/footer'

export default function EditUserDetail() {
    // const {id} = match.params;
    const [user, setUser] =
        useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user.result)

    const location = useLocation();
    useEffect(() => {
        //Por ahora traigo el user guardado en el localStorage.
        //Después traigo un Usuario por params
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) console.log("Session expired!")
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    return (
        <div className="bg-gray-200 tracking-wide font-bold">
            <div className="pb-10 bg-gray-200">
                <UniversalNavBar />
            </div>
            {user?.result &&
                <div className="bg-gray-200">
                    <div className="max-w-4xl flex items-center mt-4 mb-4 bg-gray-200 flex-wrap mx-auto lg:my-0">

                        {/* <!--Main Col--> */}
                        <div id="profile" className="w-full  rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">


                            <div className="p-4 md:p-12 text-center lg:text-left">
                                {/* <!-- Image for mobile view--> */}
                                {/* <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"></div> */}

                                <h1 className="text-3xl font-bold pt-8 lg:pt-0">  {user.result.username}'s Profile</h1>
                                <div className="mx-auto lg:mx-0 w-5/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                                <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start"><svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>👤 Name: {user.result.firstname}</p>
                                <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start"><svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>👤 Surname: {user.result.lastname}</p>
                                <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start"><svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>📧 E-Mail: {user.result.email}</p>
                                <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start"><svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>📌 Street: {user.result.street} {user.result.streetNumber}</p>
                                <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start"><svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>📍 State: {user.result.state}</p>
                                <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start"><svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>📭 Zip Code: {user.result.zipcode}</p>

                                <div className="pt-12 pb-8">
                                    <Link to="/MyProfile/Edit">
                                        <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
                                            Edit your profile 🖍
				                </button>
                                    </Link>
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
