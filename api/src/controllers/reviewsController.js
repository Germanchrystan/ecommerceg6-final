const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Review = require("../models/Review");
const Product = require("./../models/Product");

const getReviews = asyncHandler(async (req, res) => {
    const pageSize = req.query.pageSize || 15;
    const page = req.query.page || 1;

    const count = await Review.countDocuments();
    const reviews = await Review.find().populate( "products")
        .limit(pageSize).skip(pageSize * (page - 1));
        res.json({ reviews, current: page, pages: Math.ceil(count / pageSize) });
        
});

const getReviewsById = async (req, res) => {
    const pageSize = req.query.pageSize || 15;
    const page = req.query.page || 1;


    const count = await Review.countDocuments();
    const reviews = await Review.find({ productReview: req.params.id }).populate('username')
    .limit(pageSize).skip(pageSize * (page - 1));
    res.json({ reviews, current: page, pages: Math.ceil(count / pageSize) });

};

const filterById = async (req, res) => {


const reviews = await Review.find({ productReview: req.params.id }).populate('username')

console.log(reviews[reviews.length-1])


res.json({ reviews});
}




const addReviews = async (req, res) => {
    try {
        const{ productReview, username, review, rating } = req.body;

        //Check If there is a review by the same user on the same product first
        

        const reviews = new Review({
            _id: new mongoose.Types.ObjectId(),
            productReview: productReview,
            username: username,
            review: review,
            rating: rating 
        });
        const answer = await reviews.save();
        const product = await Product.findById(productReview)
        if (product) product.productReview = [...product.productReview, reviews._id]
        const updateProduct = await product.save();
        console.log(product)
        res.status(200).send({answer})
    }
    catch(err) {
        res.status(400).send(err)
    }
}

module.exports = { getReviews, addReviews, getReviewsById, filterById }