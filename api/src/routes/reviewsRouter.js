const server = require("express").Router();
const { getReviews, addReviews, getReviewsById ,filterById} = require("../controllers/reviewsController");

server.get("/", getReviews);
server.post("/", addReviews);
server.get("/:id", getReviewsById);
server.get("/rating/:id" , filterById);

module.exports = server;