import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div className="tracking-wide font-bold
        relative bottom-0">
            <footer className="footer bg-black relative pt-1 border-b-2 border-black">
                <div className="container mx-auto px-6">

                    <div className="sm:flex sm:mt-8">
                        <div className="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-between">
                            <div className="flex flex-col">
                                <span className="font-bold text-white uppercase mb-2">Account</span>
                                <span className="my-2 text-white"><Link to="/MyProfile" className="text-white">Your user account</Link></span>
                                <span className="my-2 text-white"><Link to="/MyProfile/Edit" className="text-white">Edit your account</Link></span>
                                <span className="my-2 text-white"><Link to="/Order" className="text-white">Your Orders</Link></span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-white uppercase mt-4 md:mt-0 mb-2">About</span>
                                <span className="my-2 text-white"><Link to="/About" className="text-white">About us</Link></span>
                                <span className="my-2 text-white"><Link to="/Terms" className="text-white">Terms of use</Link></span>
                                <span className="my-2 text-white"><Link to="/Privacy" className="text-white">Privacy Policy</Link></span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-white uppercase mt-4 md:mt-0 mb-2">Contact us</span>
                                <span className="my-2 text-white"><a href="https://www.facebook.com/" className="text-white  text-md ">Facebook</a></span>
                                <span className="my-2 text-white"><a href="https://www.twitter.com/" className="text-white  text-md ">Twitter</a></span>
                                <span className="my-2 text-white"><a href="https://www.instagram.com/" className="text-white  text-md ">Instagram</a></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-6">
                    <div className="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
                        <div className="sm:w-2/3 text-center py-6">
                            <p className="text-sm text-white font-bold mb-2">
                                © 2021 by HENRY STUDENTS
                </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}