import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from 'react-router-dom'
import swal from 'sweetalert';
import { deleteUser, getUsers, searchUser, toggleAdmin } from "../../redux/actions/user_actions";
import UniversalNavBar from "../UniversalNavBar/universalNavBar";
import Footer from "../../containers/Footer/footer";


const UsersTable = () => {
    const dispatch = useDispatch();
    const usersArray = useSelector(
        (state) => state.userReducer.user.list.users
    );
    console.log(usersArray)
    const [page, setPage] = useState(1)

    const next = () => {
        setPage(page + 1)

    }
    const prev = () => {
        setPage(page - 1)
    }
  

    useEffect(() => {
        dispatch(getUsers(page));
    }, [page]);

    const deleteU = (id) => {
        dispatch(deleteUser(id))
        swal({
            title: "User Deleted",
            icon: "warning",
            buttons: false,
            dangerMode: true,
        })
        window.location.reload()
    }

    const makeAdmin = (id) => {
        swal({
            title: "Admin Property Changed",
            type: "warning"
        }).then(function () {
            window.location.reload()
        });
        dispatch(toggleAdmin(id))

    }

    const [input, setInput] = useState({
        email: "",
    })

    function handleChange(e) {
        setInput({
            email: e.target.value
        })
    };

    function handleSubmit(e) {
        e.preventDefault()

        if (input.email) {
            dispatch(searchUser(input.email))
        } else if (!input.email) {
            swal({
                title: "Search Not Valid",
                icon: "warning",
                button: true,
            });
        }


    }


    return (
        <div className="tracking-wide font-bold">
            <UniversalNavBar />
            <div className="mt-20 mb-4  flex justify-center ">
                <div className="relative mr-6 my-2 ml-2 -mt-0.5">
                    <input type="search" className="mt-8 bg-purple-white shadow rounded border-0 p-3" value={input.email} onChange={(e) => handleChange(e)} placeholder="Search by email...   " />
                    <button className="bg-gray" onClick={handleSubmit}>🔍</button>
                    <div className="absolute pin-r pin-t mt-3 mr-4 text-purple-lighter">
                        <svg version="1.1" className="h-4 text-dark" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 52.966 52.966" style={{ enableBackground: "new 0 0 52.966 52.966" }} xmlSpace="preserve">

                        </svg>

                    </div>
                </div>




            </div >

            <table className="border-collapse w-full">
                <thead>
                    <tr>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">ADMIN</th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">USERNAME</th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">USER E-MAIL</th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {usersArray && usersArray.length > 0 ? usersArray.map((c, id) => {
                        return <tr key={id} className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                            {c.isAdmin === true && <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">✔️</td>}
                            {c.isAdmin === false && <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">❌</td>}
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                {c.username}
                            </td>
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                {c.email}
                            </td>

                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">

 <div className="flex gap-5 justify-center" >
                                <button type="submit" title="Make Admin" className="flex text-white bg-indigo-500 border-0  mt-4 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" type="submit" onClick={() => makeAdmin(c._id)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.377 11.082c-.06 1.929-2.229 3.126-8.409 3.126-6.193 0-8.358-1.203-8.409-3.139 1.508 0 4.379-1.958 8.409-1.958 3.927-.001 7.144 1.971 8.409 1.971zm-8.408 4.09c-2.062 0-3.74-.131-5.078-.397.062.555.469 3.322 2.409 3.322 1.721 0 1.673-1.316 2.721-1.316 1.047 0 1.169 1.316 2.852 1.316 2.09 0 2.46-3.063 2.494-3.389-1.387.311-3.169.464-5.398.464zm6.405-.741c-.04 2.171-.717 4.769-2.28 6.437-1.048 1.119-2.377 1.687-3.949 1.687-1.575 0-2.898-.533-3.931-1.582-1.646-1.673-2.302-4.345-2.396-6.461-.523-.158-1.01-.347-1.484-.628-.016 2.472.704 5.942 2.821 8.094 1.321 1.341 3 2.022 4.99 2.022 1.972 0 3.712-.745 5.033-2.153 2.131-2.273 2.76-5.679 2.661-8.111-.459.308-.944.521-1.465.695zm-6.237-10.984l-.313.623-.701.1.507.485-.119.685.626-.324.627.324-.12-.685.507-.485-.7-.1-.314-.623zm7.211-.206s-2.537-.686-7.348-3.241c-4.812 2.555-7.348 3.241-7.348 3.241s-1.295 2.4-3.652 5.016l2.266 1.908c1.533-.165 4.64-2.082 8.734-2.082s7.201 1.917 8.734 2.083l2.266-1.909c-2.357-2.616-3.652-5.016-3.652-5.016zm-6.345 3.214c-.526.131-.605.188-.875.402-.269-.214-.349-.271-.875-.402-.731-.183-1.151-.656-1.151-1.299 0-.359.147-.691.318-1.146.192-.513.083-.675-.119-.882l-.171-.176.987-.819c.098.098.235.278.486.278.248 0 .416-.175.528-.271.102.09.268.271.523.271.248 0 .381-.171.49-.281l.983.823-.172.176c-.202.207-.311.369-.119.882.17.455.318.786.318 1.146 0 .641-.42 1.115-1.151 1.298z"/></svg></button>
                            <button type="submit" title="Edit User" className="flex text-white bg-indigo-500 border-0  mt-4 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" type="submit"><Link to={'/users/edit/' + c._id}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg></Link></button>
                                            <button onClick={() => deleteU(c._id)} title="Delete User" className="flex text-white bg-red-500 border-0  mt-4 py-2 px-6 focus:outline-none hover:bg-red-700 rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" /></svg>
                                            </button>
                                            </div>
                                
                                
                                
                                {/* <button title="Hacer ADMIN" className="h-10 px-5 m-2 text-blue-100 transition-colors duration-150 bg-yellow-500 rounded-lg focus:shadow-outline  hover:bg-yellow-400  " onClick={() => makeAdmin(c._id)}>👮🏽</button>
                                <button title="Editar Usuario" className="h-10 px-5 m-2 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700"> <Link to={'/users/edit/' + c._id}>✍</Link> </button>
                                <button title="Eliminar Usuario" className="h-10 px-5 m-2 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800" onClick={() => deleteU(c._id)}> 🗑 </button> */}
                            </td>
                        </tr>
                    }) : ""}



                </tbody>
            </table>
            <br></br>
            <div className="flex justify-center">
                <button onClick={prev} disabled={page === 1} className="border border-teal-500 bg-teal-500 text-black block rounded-sm font-bold py-4 px-6 ml-2 flex items-center">
                    <svg className="h-5 w-5 mr-2 fill-current" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-49 141 512 512" style={{ enableBackground: 'new -49 141 512 512' }} xmlSpace="preserve">
                        <path id="XMLID_10_" d="M438,372H36.355l72.822-72.822c9.763-9.763,9.763-25.592,0-35.355c-9.763-9.764-25.593-9.762-35.355,0 l-115.5,115.5C-46.366,384.01-49,390.369-49,397s2.634,12.989,7.322,17.678l115.5,115.5c9.763,9.762,25.593,9.763,35.355,0 c9.763-9.763,9.763-25.592,0-35.355L36.355,422H438c13.808,0,25-11.193,25-25S451.808,372,438,372z"></path>
                    </svg>
                                     Previous page
                             </button>
                <button onClick={next} disabled={usersArray && usersArray.length < 15} className="border border-teal-500 bg-teal-500 text-black block rounded-sm font-bold py-4 px-6 ml-2 flex items-center" >
                    Next page
                            <svg className="h-5 w-5 ml-2 fill-current" clasversion="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="-49 141 512 512" style={{ enableBackground: 'new -49 141 512 512' }} xmlSpace="preserve">
                        <path id="XMLID_11_" d="M-24,422h401.645l-72.822,72.822c-9.763,9.763-9.763,25.592,0,35.355c9.763,9.764,25.593,9.762,35.355,0
            l115.5-115.5C460.366,409.989,463,403.63,463,397s-2.634-12.989-7.322-17.678l-115.5-115.5c-9.763-9.762-25.593-9.763-35.355,0
            c-9.763,9.763-9.763,25.592,0,35.355l72.822,72.822H-24c-13.808,0-25,11.193-25,25S-37.808,422-24,422z"/>
                    </svg>
                </button>
            </div>
            <Footer />
        </div >
    )
}

export default UsersTable
