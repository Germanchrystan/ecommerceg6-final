import React from 'react'
import UniversalNavBar from '../UniversalNavBar/universalNavBar'
import Footer from '../../containers/Footer/footer'
import { Link } from "react-router-dom";

export default function AdminAction() {
    return (
        <div className="tracking-wide font-bold pt-20">
            <UniversalNavBar />
            <div class="w-2/6 mx-auto mt-28 mb-32 lg:mr-86  flex text-center items-center justify-center">
                <div class="bg-white shadow-md rounded my-6">
                    <table class="text-left w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-l text-grey-dark border-b border-grey-light">Admin Profile</th>
                                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-l text-grey-dark border-b border-grey-light">Actions</th>
                           
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-grey-lighter">
                                <td className="py-4 px-6 w-96 border-b border-gray-light  focus:outline-none hover:bg-gray-100 rounded ">Post New Product</td>
                                <td className="py-4 px-6 border-b border-grey-light ">
                                    <Link to="/post">
                                         <button type="submit" title="Post Product" className="tw-shadow:10px  flex text-white bg-green-700 border-0  mt-4 py-2 px-6 w-20 h-10 focus:outline-none hover:bg-green-800 rounded" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/></svg></button>
                                        {/* <button className="flex-no-shrink p-2 ml-4 mr-2  rounded hover:text-black  text-green font-semibold  hover:bg-yellow-300">➡</button> */}
                                    </Link>

                                </td>
                            </tr>
                            <tr className="hover:bg-grey-lighter">
                                <td className="py-4 px-6 w-96 border-b border-gray-light  focus:outline-none hover:bg-gray-100 rounded ">Product Table</td>
                                <td className="py-4 px-6 border-b border-grey-light ">
                                    <Link to="/Admin">
                                         <button type="submit" title= "Product Table" className="tw-shadow:10px  flex text-white bg-green-700 border-0  mt-4 py-2 px-6 w-20 h-10 focus:outline-none hover:bg-green-800 rounded" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/></svg></button>
                                        {/* <button className="flex-no-shrink p-2 ml-4 mr-2  rounded hover:text-black  text-green font-semibold  hover:bg-yellow-300">➡</button> */}
                                    </Link>

                                </td>
                            </tr>
                            <tr className="hover:bg-grey-lighter">
                                <td className="py-4 px-6 border-b border-grey-light  focus:outline-none hover:bg-gray-200 rounded">Category Table</td>
                                <td className="py-4 px-6 border-b border-grey-light">
                                    <Link to="/categories">
                                    <button type="submit" title="Create, Edit or Delete Category" className="flex text-white bg-green-700 border-0  mt-4 py-2 px-6 w-20 h-10 focus:outline-none hover:bg-green-800 rounded" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/></svg></button>

                                    </Link>
                                </td>
                            </tr>
                            <tr className="hover:bg-grey-lighter">
                                <td className="py-4 px-6 border-b border-grey-light  focus:outline-none hover:bg-gray-200 rounded">User Table</td>
                                <td className="py-4 px-6 border-b border-grey-light">
                                    <Link to="/users">
                                    <button type="submit" title="Make Admin, Edit or Delete User" className="flex text-white bg-green-700 border-0  mt-4 py-2 px-6 w-20 h-10 focus:outline-none hover:bg-green-800 rounded" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/></svg></button>
                                    </Link>
                                </td>
                            </tr>

                            <tr className="hover:bg-grey-lighter">
                                <td className="py-4 px-6 border-b border-grey-light  focus:outline-none hover:bg-gray-200 rounded">Brand Table</td>
                                <td className="py-4 px-6 border-b border-grey-light">
                                    <Link to="/brands">
                                    <button type="submit" title="Make Admin, Edit or Delete Brands" className="flex text-white bg-green-700 border-0  mt-4 py-2 px-6 w-20 h-10 focus:outline-none hover:bg-green-800 rounded" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/></svg></button>
                                    </Link>
                                </td>
                            </tr>

                            <tr className="hover:bg-grey-lighter">
                                <td className="py-4 px-6 border-b border-grey-light  focus:outline-none hover:bg-gray-200 rounded">Orders Table</td>
                                <td className="py-4 px-6 border-b border-grey-light">
                                    <Link to="/orders">
                                    <button type="submit" title="Edit or Delete Order" className="flex text-white bg-green-700 border-0  mt-4 py-2 px-6 w-20 h-10 focus:outline-none hover:bg-green-800 rounded" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/></svg></button>
                                    </Link>

                                </td>
                            </tr>
                          
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    )
}
