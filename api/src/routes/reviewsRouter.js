const server = require("express").Router();
const { 
    getReviews, 
    addReviews, 
    getReviewsById,
    filterById,
    getUserReviews
} = require("../controllers/reviewsController");

server.get("/", getReviews);
server.post("/", addReviews);
server.get("/:id", getReviewsById);
server.get("/rating/:id" , filterById);
server.get("/user/:userId", getUserReviews);
//server.delete("/user/:reviewId", )

module.exports = server;