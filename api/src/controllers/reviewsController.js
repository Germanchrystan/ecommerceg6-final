const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Review = require("../models/Review");
const Product = require("./../models/Product");
//===================================================================================//

//===================================================================================//
const getReviews = asyncHandler(async (req, res) => {
    const pageSize = req.query.pageSize || 15;
    const page = req.query.page || 1;

    const count = await Review.countDocuments();
    const reviews = await Review.find()
    .populate( "products")
    .limit(pageSize).skip(pageSize * (page - 1));

    res.status(200).json({ reviews, current: page, pages: Math.ceil(count / pageSize) });
});
//===================================================================================//

//===================================================================================//
const getReviewsById = async (req, res) => {
    const pageSize = req.query.pageSize || 15;
    const page = req.query.page || 1;


    const count = await Review.countDocuments();
    const reviews = await Review.find({ productReview: req.params.id }).populate('username')
    .limit(pageSize).skip(pageSize * (page - 1));
    res.status(200).json({ reviews, current: page, pages: Math.ceil(count / pageSize) });

};

const filterById = async (req, res) => {
    const reviews = await Review.find({ productReview: req.params.id }).populate('username')
    res.status(200).json({ reviews});
}
//===================================================================================//

//===================================================================================//
const addReviews = async (req, res) => {
    try {
        const{ productId, username, review, rating } = req.body;

        const isPreviousReview = 
        //Check If there is a review by the same user on the same product first
        await Review.findOne(
            { $and: [
                { _id: productId  }, 
                {username: username}
            ]}, async(error, previousReview) => {
                if(error) {
                    return res.status(400).json({
                        message:"There was an Error"
                    })
                }

                if(!previousReview) {
                    const reviews = new Review({
                        _id: new mongoose.Types.ObjectId(),
                        productId: productId,
                        username: username,
                        review: review,
                        rating: rating 
                    });
                    const answer = await reviews.save();
                    const product = await Product.findById(productId)
                    if (product) product.productId = [...product.productId, reviews._id]
                    const updateProduct = await product.save();
                    
                    return res.status(200).send({answer})
                }

                previousReview.review = review;
                previousReview.rating = rating;
                
                previousReview.save(function (error, answer) {
                    if (error) {
                        return res.status(400).json({ message: "There was an Error in saving the change" })
                    }
                    res.status(200).json({ answer })
                })

            })

    }
    catch(err) {
        res.status(400).send(err)
    }
}
//===================================================================================//
const getUserReviews = async(id) => {
    const { userId } = req.params;
    try{
        //Check If there is a review by the same user on the same product first
        const isPreviousReview = await Review.find({username: userId}, async(error, reviewsFound) => {
            if(error){
                return res.status(400).json({
                    message:"There was an Error"
                })
            }
    
            if(!reviewsFound.length) return res.status(200).json({noReviews:true, message:"You have no reviews yet"})
    
            return res.status(200).json({reviewsFound})
        })
    } catch (err) {
        res.status(400).send(err)
    }

}
//===================================================================================//
module.exports = { getReviews, addReviews, getReviewsById, filterById, getUserReviews }