import React, { useEffect } from "react";
import { useParams } from "react-router";
import {
  getOrCreateWhishlistFromUser,
  removeProductFromWhishlist,
} from "../../redux/actions/whishlist_action";
import UniversalNavBar from "../UniversalNavBar/universalNavBar";
import Footer from "../../containers/Footer/footer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const Whishlist = () => {
  var { id } = useParams();
  
  const dispatch = useDispatch();

  
    const whishlistData = useSelector(
        (state) => state.whishlistReducer?.whishlist?.whishlist
    );
    
    useEffect(() => {
        dispatch(getOrCreateWhishlistFromUser(id));
    }, [id, dispatch]);


    const handleClose = (id, productId, swal, history) => {
        dispatch(removeProductFromWhishlist(id, productId, swal, history));
    };

    return (
            <div className="tracking-wide font-bold pt-5">
                <div class="bg-white shadow-md rounded my-6">
                    <div className="pb-10 bg-gray-200">
                        <UniversalNavBar />
                    </div>
                </div>
                <div className="bg-gray-200 text-lg flex justify-center tracking-wide pt-10 content-center font-bold">
                    <h1>Your Whishlist</h1>
                    <hr/>
                </div> 
                <div  className="bg-gray-200 tracking-wide pt-10 pb-10 font-bold">
                {whishlistData?.products.length > 0 ? (
                whishlistData?.products.map((w, index) => (
                    <div
                    key={index}
                    class="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4">
                        <div className="flex justify-between px-4 items-center">
                            <Link to={`/product/${w.productId}`}>
                                <div className="text-lg font-semibold">
                                    <p>{w.name}</p>
                                    <p class="text-gray-400 text-base">${w.price}</p>
                                </div>
                            </Link>
                            <div className="text-lg font-semibold transform rotate-45 ">
                                <button
                                onClick={() => handleClose(id, w.productId)}
                                class="focus:outline-none  bg-pink-700 hover:bg-pink-800 text-white font-bold py-2 px-2 rounded-full inline-flex items-center "
                                >
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className=" h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    >
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))
                ) : (
                <div className="mb-70 bg-gray-200">
                    <p><br/><br/><br/><br/><br/>There are no products in your whishlist</p>
                </div>
                )}
            </div>
            <div className="mt-6 bg-gray-200">
                <Footer />
            </div>
            <div className="bg-black tracking-wide pb-12"></div>
        </div>
    );
};
export default Whishlist;
