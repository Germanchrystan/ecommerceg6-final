import React, { useState, useEffect } from 'react'
import decode from 'jwt-decode'
// import SearchBar from '../SearchBar/searchBar'
import { Link, useLocation, useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import UniversalNavBar from '../UniversalNavBar/universalNavBar'
import Footer from '../../containers/Footer/footer'
import { changeCartState, getCartFromUser, getCartsById } from '../../redux/actions/cart_actions'
import { getUserById } from '../../redux/actions/user_actions'

export default function UserDetail() {
    const { id } = useParams()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    const dispatch = useDispatch()
    const location = useLocation();
    const history = useHistory();

    const userData = useSelector(
        (state) => state.userReducer?.user?.list?.userFound
    );

    const orderData = useSelector(
        (state) => (state.cartReducer.cart && state.cartReducer.cart && state.cartReducer.cart.carts) ? state.cartReducer.cart.carts : state.cartReducer
    );
    console.log("USER DATAA", orderData)
    const [selectedState, setSelectedState] = useState("Paid")
    const handleSelect = () => {
        let select = document.getElementById("status")
        if (select) {
            let selectValue = select.options[select.selectedIndex].innerText
            setSelectedState(selectValue)
        }
    }
    console.log(selectedState)
    useEffect(() => {
        //Por ahora traigo el user guardado en el localStorage.
        //Después traigo un Usuario por params
        dispatch(getUserById(user?.result?._id))
        dispatch(getCartsById(id))
    }, [dispatch])

    const changeState = (state, cartId) => {
        dispatch(changeCartState(state, cartId))
        //window.location.reload()
    }
    // <h4>{user.result.username}</h4>
    return (
        <div className="bg-gray-200 tracking-wide font-bold">
            <div className="pb-10 bg-gray-200">
                <UniversalNavBar />
            </div>
            <div className="bg-gray-200 pt-20 pb-10">
                <div className="max-w-4xl flex items-center mt-4 mb-4 bg-gray-200 flex-wrap mx-auto lg:my-0">

                    {/* <!--Main Col--> */}
                    <div id="profile" className="w-full  rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">



                        {/* <!-- Image for mobile view--> */}
                        {/* <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"></div> */}
                        {orderData && orderData.length > 0 ? orderData.map((cart) => {
                            return (<div className="p-4 md:p-12  text-center lg:text-left">
                                <h1 className="text-3xl font-bold pt-8 lg:pt-0">  {cart?.userId?.username}'s Order</h1>
                                <div className="mx-auto lg:mx-0 w-5/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                                <p className=" text-base font-bold  lg:justify-start"><svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>👤 Buyer: {cart?.userId?.firstname} {cart?.userId?.lastname}</p>
                                <p className=" text-base font-bold  lg:justify-start"><svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>📧 E-Mail: {cart?.userId?.email}</p>
                                <p className=" text-base font-bold  lg:justify-start"><svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>📌 Address: {userData?.addresses[0]?.address}</p>


                                <div className="mx-auto lg:mx-0 w-5/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                                <p className=" text-base font-bold  lg:justify-start"><svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>👤 Product:</p>
                                {cart.items && cart.items.length > 0 ? cart.items.map((products) => {
                                    return (
                                        <h1 className=" text-base font-bold  lg:justify-start">{products.name} {products.colorName} {products.sizeName} ({products.quantity}) $ {products.price}</h1>

                                    )
                                }) : ""}
                                <p className=" text-base font-bold  lg:justify-start"><svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>👤 Total: $ {cart.totalAmount}</p>
                                <p className=" text-base font-bold  lg:justify-start"><svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>📍 Status: {cart.state}</p>
                                <p className=" text-base font-bold  lg:justify-start"><svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"></svg>📭 Change Status: <select id="status" onChange={handleSelect}>
                                    <option>Paid</option>
                                    <option>On it's Way</option>
                                    <option>Delivered</option>
                                    <option>Cancelled</option>
                                </select>
                                    <button onClick={() => changeState(selectedState, id)} className="h-8 px-2 m-2 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700">✍</button>
                                </p>

                                <div className="grid grid-cols-2 grid-row-2 pt-12 pb-8   text-center content-between">
                                </div>
                            </div>
                            )
                        }

                        ) : ""}
                    </div>

                    {/* <!-- Pin to top right corner --> */}
                </div>
            </div>
            {/* } */}
            <div className="pt-10 bg-gray-200">
                <Footer />
            </div>
        </div>
    )

}