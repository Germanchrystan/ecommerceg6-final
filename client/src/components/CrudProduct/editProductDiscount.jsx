import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from 'react-router-dom';
import { detailProduct } from "./../../redux/actions/products_actions";
import UniversalNavBar from "../UniversalNavBar/universalNavBar";
import Footer from "../../containers/Footer/footer";

function EditProductDiscount() {
    const [percentage, setPercentage] = useState(0);
    const { id } = useParams();
    const dispatch = useDispatch();

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
    
    const handlePercentageChange = () => {

    }

    const handleSubmitDiscount = () => {

    }

    const handleRemoveDiscount = () => {

    }

    return (
        <div className="tracking-wide font-bold">
            <UniversalNavBar />
            <section className="text-gray-700 body-font overflow-hidden mt-10 bg-gray-200">
                <div className="container px-5  py-28 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap bg-gray-100 pr-5 rounded sm:w-auto">
                        <h1>{productPreview.name}</h1>
                    </div>
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        {productPreview?.discount?.percentage === 0 ?
                        <p>There is not discount for this product</p>
                        : <p>{productPreview?.discount?.percentage}</p>
                        }
                    </div>
                </div>
            </section>
            <Footer style={{position:'fixed',bottom:0}}/>
        </div>
    )
}

export default EditProductDiscount;