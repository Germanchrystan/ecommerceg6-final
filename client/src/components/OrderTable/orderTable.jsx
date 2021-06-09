import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from 'react-router-dom'
import swal from 'sweetalert';
import UniversalNavBar from "../UniversalNavBar/universalNavBar";
import Footer from "../../containers/Footer/footer";
// import { deleteOrder, getOrder, searchOrder } from "../../redux/actions/orders_actions";
import { changeCartState, getAllCarts } from "../../redux/actions/cart_actions";

const OrdersTable = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1)
    useEffect(() => {
        dispatch(getAllCarts("", page));
    }, [page]);

    const orderArray = useSelector(
        (state) => state.cartReducer.cart.carts
    );

    const quantityArray = useSelector(
        (state) => state.cartReducer.cart.totalQuantity
    );

    const [filter, setFilter] = useState("Paid")
    const [totalQuantity,setTotalQuantity] = useState(0);
    const next = () => {
        setPage(page + 1)

    }
    const prev = () => {
        setPage(page - 1)
    }
    
    const [selectedState, setSelectedState] = useState("")
    const handleSelect = () => {
        let select = document.getElementById("status")
        if (select) {
            let selectValue = select.options[select.selectedIndex].innerText
            setSelectedState(selectValue)
        }
    }
    console.log(selectedState)

    const changeState = (state, userId) => {
        dispatch(changeCartState(state, userId))
     }

    const deleteC = (payload) => {
         swal({
            title: "Deleted product",
            icon: "warning",
            buttons: false,
            dangerMode: true,
        })
        window.location.reload()
    }

    const reset = () => {
        setFilter("");
        dispatch(getAllCarts(""))
    }

    const selectedFilter = (filter) => {
        dispatch(getAllCarts(filter))
    }
    return (
        <div className="tracking-wide font-bold">
            <UniversalNavBar />
            <div className="mt-16 pt-4 mb-4 flex justify-center">

                <div className="relative mr-6 pt-8 my-2 ml-2">
                    {/* Filtros */}
                    <select className="h-11 rounded" id="selectOptions" onChange={(e) => setFilter(e.target.value)}>
                        <option>Filter by</option>
                        <option>Paid</option>
                        <option>Cancelled</option>
                        <option>On it´s way</option>
                        <option>Delivered</option>
                        <option>Active</option>
                    </select>
                    <button className="inline-block px-6 ml-4 h-11 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-green-500 rounded shadow ripple hover:shadow-lg hover:bg-green-600 focus:outline-none" onClick={() => selectedFilter(filter)}>Filter</button>
                    {filter && <p onClick={reset} className="px-2 py-1 inline-block mr-2 mt-4 ml-4 cursor-pointer rounded round border-4 border-red-400 mb-2 w-auto text-center">{filter} X</p>}
                </div>

            </div >

            <table className="border-collapse w-full">
                <thead>
                    <tr>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Date of Order</th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">User</th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Quantity</th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Total</th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Order Status</th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orderArray && orderArray.length > 0 ? orderArray.map((c, id) => {
                        return <tr key={id} className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                {c.fechaCierre && c.fechaCierre.split(".")[0].split("T")[0] + " / " + c.fechaCierre.split(".")[0].split("T")[1]}
                            </td>
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                {c.userId && c.userId.username ? c.userId.username : "User Not Logged"}
                            </td>
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                {quantityArray && quantityArray.length >0 && quantityArray[id] > 0?
                                <h1>{quantityArray[id]}</h1>
                                : <h1>No Products</h1>}
                            </td>

                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                ${c.totalAmount}
                            </td>
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                {c.state}
                            </td>

                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">


                                <div className="flex gap-5 justify-center" >
                                    <button type="submit" title="Edit Order" className="flex text-white bg-indigo-500 border-0  mt-4 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" type="submit"><Link to={'/orders/state/' + c._id}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z" /></svg></Link></button>
                                    {/* <button title="Delete Order" className="flex text-white bg-red-500 border-0  mt-4 py-2 px-6 focus:outline-none hover:bg-red-700 rounded">
                                        <svg onClick={() => deleteC(c._id)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" /></svg>
                                    </button> */}
                                </div>

                            </td>
                        </tr>
                    }) : ""}



                </tbody>
            </table>
            <br></br>
            <div className="flex justify-center mb-4">

                <button onClick={prev} disabled={page === 1} className="border border-teal-500 bg-teal-500 text-black block rounded-sm font-bold py-4 px-6 ml-2 flex items-center">
                    <svg className="h-5 w-5 mr-2 fill-current" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-49 141 512 512" style={{ enableBackground: 'new -49 141 512 512' }} xmlSpace="preserve">
                        <path id="XMLID_10_" d="M438,372H36.355l72.822-72.822c9.763-9.763,9.763-25.592,0-35.355c-9.763-9.764-25.593-9.762-35.355,0 l-115.5,115.5C-46.366,384.01-49,390.369-49,397s2.634,12.989,7.322,17.678l115.5,115.5c9.763,9.762,25.593,9.763,35.355,0 c9.763-9.763,9.763-25.592,0-35.355L36.355,422H438c13.808,0,25-11.193,25-25S451.808,372,438,372z"></path>
                    </svg>
                                     Previous page
                             </button>
                <button onClick={next} disabled={orderArray && orderArray.length < 15} className="border border-teal-500 bg-teal-500 text-black block rounded-sm font-bold py-4 px-6 ml-2 flex items-center" >
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

export default OrdersTable
