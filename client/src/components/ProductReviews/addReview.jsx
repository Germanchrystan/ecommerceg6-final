import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../Catalog/catalog.css"
import UniversalNavBar from "../UniversalNavBar/universalNavBar";
import Footer from "../../containers/Footer/footer";
import { useParams, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { addReviews } from "../../redux/actions/reviews_actions";
import StarRatingComponent from 'react-star-rating-component';

const AddReview = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory()
    const [user, setUser] =
        useState(JSON.parse(localStorage.getItem('profile')));
    const [rate, setRate] = useState(1)

    const newReview = {
        productReview: id,
        review: "",
        rating: rate,
        username: user.result._id

    };
    const [review, setReview] = useState(newReview);
    console.log(newReview)

    // const categoryArray = useSelector(
    //     (state) => state.categoriesReducer.categories.list.categories
    // );
    function onStarClick(nextValue, prevValue, name) {
        setRate(nextValue);
    }
    console.log(rate)
    const handleInputChange = (e) => {
        setReview({
            ...review,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        const reviewSend = {
            productReview: review.productReview,
            review: review.review,
            rating: rate,
            username: user.result._id

        };
        if (review.review === '') return swal({
            title: "review Field Cannot Be Empty",
            icon: "warning",
            button: true,
            dangerMode: true,
        })
        if (review.rating === 0) return swal({
            title: "rating Field Cannot Be Empty",
            icon: "warning",
            button: true,
            dangerMode: true,
        })
        dispatch(addReviews(reviewSend));
        setReview(newReview)

        swal("Good job!", "Well done!", "success", { button: true }).then(function () {
            // window.location.replace(`https://e-commerce-g6.netlify.app/`)
            window.location.replace(`http://localhost:3000/product/` + id)
        });
        console.log(reviewSend)
    };
    return (
        <div class=" tracking-wide font-bold bg-gray-200">
            <UniversalNavBar />
            <form onSubmit={handleSubmit}>
                <div className="flex items-center min-h-screen bg-gray-200 dark:bg-gray-900">
                    <div className="container mx-auto">
                        <div className="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-sm">
                            <div className="text-center">
                                <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Add Review</h1>

                            </div>
                            <div className="m-7">
                                <form >
                                    <div className="mb-6">

                                        <label for="review" className="block mb-2 text-lg text-gray-600 dark:text-gray-400">Review:</label>
                                        <input id="review"
                                            type="text"
                                            name="review"
                                            value={review.review}
                                            onChange={handleInputChange}
                                            placeholder="Your Review"
                                            required
                                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                                    </div>

                                    <div className="mb-6 text-3xl">
                                        <label for="rating" className="block mb-2 text-lg text-gray-600 dark:text-gray-400">Rating:</label>
                                        <StarRatingComponent
                                            id="rating"
                                            name="rating"
                                            starCount={5}
                                            //value={rating}
                                            onStarClick={onStarClick}
                                        />
                                        {/* <textarea
                                            onChange={handleInputChange}
                                            type="text"
                                            name="rating"
                                            value={review.rating}
                                            placeholder="Product rating"
                                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none 
                                focus:ring focus:ring-indigo-100 
                                focus:border-indigo-300 dark:bg-gray-700 
                                dark:text-white dark:placeholder-gray-500 
                                dark:border-gray-600 dark:focus:ring-gray-900 
                                dark:focus:border-gray-500" required
                                        /> */}

                                    </div>
                                    <div className="mb-6">
                                        <button type="submit" onClick={handleSubmit} className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">Add</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <Footer />
        </div>
    );
};
//review, img, brand, category, rating, price, stock, rating, review, size, color
export default AddReview;