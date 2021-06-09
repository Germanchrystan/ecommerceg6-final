import React, { useEffect, useState } from 'react'
import UniversalNavBar from '../UniversalNavBar/universalNavBar'
import Footer from '../../containers/Footer/footer'
import { useDispatch, useSelector } from 'react-redux';
import { decrementProductUnitNotLogged, deleteItemNotLogged, getCartNotLogged, incrementProductUnitNotLogged } from '../../redux/actions/cart_actions';
import { useParams } from 'react-router';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

const NewCartNotLogged = () => {
    let userCart = getCartNotLogged()
    const [total, setTotal] = useState({ totalItems: 0, totalPrice: 0 })
    const [incrementCart, setIncrementCart] = useState(false);
    const [decrementCart, setDecrementCart] = useState(false);
    const [deleteItem, setDeleteItem] = useState(false)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const totalItems = () => {
        let totalItems = 0
        let totalPrice = 0
        for (var i = 0; i < userCart.length; i++) {
            totalItems = totalItems + userCart[i].quantity
            totalPrice = totalPrice + userCart[i].price
        }
        setTotal({ ...total, totalItems: totalItems, totalPrice: totalPrice })
    }
    console.log("AAAAAAAAAAAA", userCart)
    const deleteC = (productId) => {
        deleteItemNotLogged(productId)
        setDeleteItem(!deleteItem)
        swal({
            title: "Product Removed From Cart",
            message: "Updating Cart",
            icon: "warning",
            button: true,
            dangerMode: true,
        })
    }

    // const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(getCartFromUser(id))
    //     totalItems()
    //     console.log("TEST")
    // }, [])

    const increment = (id) => {
        incrementProductUnitNotLogged(id)
        setIncrementCart(!incrementCart)
        console.log("MAS")
    }
    const decrement = (id) => {
        decrementProductUnitNotLogged(id)
        setDecrementCart(!decrementCart)
        console.log("MENOS")
    }

    useEffect(() => {
        if(user?.result?._id){
            window.location.replace("/cart/" + user?.result?._id)
        }
        userCart = getCartNotLogged()
    }, [incrementCart, decrementCart, deleteItem])

    return (
        <div className="bg-gray-200 h-full md:h-screen tracking-wide font-bold">
            <UniversalNavBar />
            <div className="grid grid-cols-12 mt-16 pt-4 gap-6">
                <div className="col-span-12 sm:col-span-12 md:col-span-7 lg:col-span-8 xxl:col-span-8">
                    {userCart && userCart?.items && userCart?.items.length > 0 && userCart.items.map(cart => {
                        return (

                            <div className="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4">
                                <div className="flex justify-between px-4 items-center">
                                    <div className="text-lg font-semibold">
                                        <p>{cart.productName} {cart.colorName} {cart.sizeName}</p>
                                        <p className="text-gray-400 text-base">${cart.price}</p>
                                    </div>
                                    <div className="text-lg font-semibold transform rotate-45 ">
                                        <button onClick={() => deleteC(cart.productId)} className="focus:outline-none  bg-pink-700 hover:bg-pink-800 text-white font-bold py-2 px-2 rounded-full inline-flex items-center ">
                                            <svg xmlns="http://www.w3.org/2000/svg" className=" h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>

                <div className="col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-4 xxl:col-span-4">
                    <div className="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4">
                        {/* <!-- classic add --> */}
                        {userCart && userCart?.items?.length > 0 && userCart.items.map(cart => {
                            return (
                                <div className="flex justify-between border-b-2 mb-2">
                                    <div className="text-lg py-2">
                                        <p>{cart.productName} {cart.colorName} {cart.sizeName}</p>
                                    </div>
                                    <div className="text-lg py-2">
                                        <div className="flex flex-row space-x-2 w-full items-center rounded-lg">
                                            <button onClick={() => decrement(cart.productId, cart.colorName, cart.sizeName)} disabled={cart.quantity === 1} className="focus:outline-none bg-pink-700 hover:bg-pink-800 text-white font-bold py-1 px-1 rounded-full inline-flex items-center ">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
                                                </svg>
                                            </button>
                                            <p> {cart.quantity} </p>
                                            <button onClick={() => increment(cart.productId, cart.colorName, cart.sizeName)} disabled={cart.quantity === cart.stock} className="focus:outline-none bg-pink-700 hover:bg-pink-800 text-white font-bold py-1 px-1 rounded-full inline-flex items-center ">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }
                        {/* <!-- End classic add -->
                        {/* <!-- Total Item --> */}
                        <div className="flex justify-center items-center text-center">
                            <Link to={"/auth"}><button id="ch" className="bg-green-500 text-white rounded-md px-6 py-2">Log in to continue</button></Link>
                            {/* <div className="text-xl font-semibold">                           
                                <p>Total Item</p>
                                <p className="text-5xl">{total.totalItems}</p>
                            </div> */}
                        </div>
                        {/* <!-- End Total Item --> */}

                    </div>
                    <div className="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4">
                        {/* <!-- Total Price --> */}
                        <div className="flex justify-center items-center text-center">
                            <div className="text-xl font-semibold">
                                <p>Total Price</p>
                                <p className="text-5xl">${userCart ? userCart.totalAmount : ""}</p>
                            </div>
                        </div>
                        {/* <!-- End Total PRice --> */}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default NewCartNotLogged