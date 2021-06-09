import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Footer from '../../containers/Footer/footer';
import { getReviewsById } from "../../redux/actions/reviews_actions";
import UniversalNavBar from '../UniversalNavBar/universalNavBar';
import StarRatingComponent from 'react-star-rating-component';

const Reviews = () => {

    var { id } = useParams()
    const dispatch = useDispatch();
    const reviewsArray = useSelector(
        (state) => state.reviewReducer.allReviews.reviews
    );
    console.log(reviewsArray)
    const [page, setPage] = useState(1)

    const next = () => {
        setPage(page + 1)

    }
    const prev = () => {
        setPage(page - 1)
    }
    useEffect(() => {
        dispatch(getReviewsById(id, page));
    }, [id, page]);



    return (
        <div className="tracking-wide font-bold">
            <UniversalNavBar />

            <table className="border-collapse w-full mt-24">
                <thead>
                    <tr>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">User</th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Review</th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {reviewsArray && reviewsArray.length > 0 ? reviewsArray.map((c, id) => {
                        return <tr key={id} className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                {c.username[0].username}
                            </td>
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                {c.review}
                            </td>
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                <StarRatingComponent
                                    name="rate2"
                                    editing={false}
                                    renderStarIcon={() => <span>★</span>}
                                    starCount={5}
                                    value={c.rating}
                                />
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
                <button onClick={next} disabled={reviewsArray && reviewsArray.length < 15} className="border border-teal-500 bg-teal-500 text-black block rounded-sm font-bold py-4 px-6 ml-2 flex items-center" >
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

export default Reviews
