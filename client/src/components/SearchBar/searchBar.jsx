import React, { useState } from 'react';
import swal from 'sweetalert';
import { searchProducts } from '../../redux/actions/products_actions';
import { useDispatch, useSelector } from "react-redux";

function SearchBar() {
    const dispatch = useDispatch();
    let productsArray = useSelector((state) => state.productsReducer.allProducts.products);
    const [input, setInput] = useState({
        name: "",
    })

    function handleChange(e) {
        setInput({
            name: e.target.value
        })
    };

    function handleSubmit(e) {
        e.preventDefault()

        if (input.name) {
            dispatch(searchProducts(input.name));
        } else if (!input.name) {
            swal({
                title: "Search Not Valid",
                icon: "warning",
                button: true,
            });
        }
    }
    return (
        <div className="relative text-lg bg-transparent tracking-wide font-bold text-gray-800">
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
                    <input className="bg-white border-none rounded-full h-8 mr-3 px-2 leading-tight focus:outline-none" value={input.name} onChange={(e) => handleChange(e)} type="text" placeholder="Search" />
                    <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                        <svg className="h-4 mt-1 mr-2 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style={{ enableBackground: "new 0 0 56.966 56.966" }} xmlSpace="preserve" width="512px" height="512px" >
                            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>

    )
}

export default (SearchBar)

