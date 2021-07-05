import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import { detailProduct, addProductDiscount, removeProductDiscount} from "./../../redux/actions/products_actions";
import UniversalNavBar from "../UniversalNavBar/universalNavBar";
import Footer from "../../containers/Footer/footer";
import swal from "sweetalert";

function EditProductDiscount() {
    const [discount, setDiscount] = useState(
        {
            percentage:0,
            newPrice:0
        }
    );
    
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (id) {
          dispatch(detailProduct(id));
        }
        // if (productPreview.categories && productPreview.categories[0]) {
        //   // console.log("entra")
        //   dispatch(getCategoryById(productPreview.categories[0]))
        // }
      }, [id, dispatch]);

    const productPreview = useSelector(
        (state) => state.productsReducer.allProducts
    );
    
    const handlePercentageChange = (e) => {
        if(e.target.value === "-") {
            setDiscount({
                percentage: 0,
                newPrice: 0
            })
        } else {
            setDiscount({
                percentage: e.target.value,
                newPrice: productPreview.price - (productPreview.price/100 * Number(e.target.value)) //product.price - (product.price/100 * percentage);
            })
        }
    }

    const handleSubmitDiscount = () => {
       console.log("SUBMIT")
        if(discount.percentage){
            dispatch(addProductDiscount(id, {percentage:discount.percentage}, history, swal))
        }
    }

    const handleRemoveDiscount = () => {
        dispatch(removeProductDiscount(id, history, swal))
    }

    return (
        <div className="tracking-wide font-bold">
            <UniversalNavBar />
            <section className="text-gray-700 body-font overflow-hidden mt-10 bg-gray-200">
                <div className="container px-5  py-28 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap bg-gray-100 pr-5 rounded sm:w-auto">
                        <h1>{productPreview?.name}</h1>
                    </div>
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        {productPreview?.discount?.percentage === 0 ?
                        <p>There is not discount for this product</p>
                        : <p>{productPreview?.discount?.percentage}% Discount</p>
                        }
                    </div>
                    <div className="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4">
                        <div className="flex justify-between px-4 items-center">
                            <div className="text-lg font-semibold">
                                <p>{productPreview?.discount?.percentage === 0 ? 'Add a Discount' : 'Change/Delete Discount'}</p>
                            </div>
                            <div>
                                <select onChange={(e) => handlePercentageChange(e)} id="selectPercentage" className="mr-2">
                                    <option value="-">Select a Percentage</option>
                                    <option value="15">15%</option>
                                    <option value="25">25%</option>
                                    <option value="30">30%</option>
                                    <option value="40">40%</option>
                                    <option value="50">50%</option>
                                    <option value="75">75%</option>
                                </select>
                            </div>
                            <div>
                                {discount.percentage > 0 && <p>New Price:{discount.newPrice}</p>}
                            </div>
                            <div className="text-lg font-semibold transform rotate-45 ">
                            {
                                discount?.percentage > 0 ?
                                <button onClick={handleSubmitDiscount} className="focus:outline-none  bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-2 rounded-full inline-flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" transform="rotate(45 0 0)" className=" h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M 12 9 v 3 m 0 0 v 3 m 0 -3 h 3 m -3 0 H 9 m 12 0 a 9 9 90 1 1 -18 0 a 9 9 90 0 1 18 0 z" stroke="#FFF" fill="none"/>
                                    </svg>
                                </button>
                                :
                                productPreview?.discount?.percentage > 0 ?
                                <button onClick={handleRemoveDiscount} className="focus:outline-none  bg-pink-700 hover:bg-pink-800 text-white font-bold py-2 px-2 rounded-full inline-flex items-center ">
                                    <svg xmlns="http://www.w3.org/2000/svg" className=" h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                                :null
                            }
                            
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer style={{position:'fixed',bottom:0}}/>
        </div>
    )
}

export default EditProductDiscount;