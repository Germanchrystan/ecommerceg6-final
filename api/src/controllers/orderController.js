const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Order = require("./../models/Order");
const Product = require("./../models/Product");


const getAllOrders = asyncHandler(async(req, res, next) => {
  const pageSize = req.query.pageSize || 15;
  const page = req.query.page || 1;

  const keyword = req.query.keyword
  ? {
    name: {
      $regex: req.query.keyword,
      $options: "i",
    },
  }
  : {};
  const count = await Order.countDocuments({ ...keyword });
  Order.find({...keyword})
    // .select("product quantity _id")
    .populate("product")
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        pages: Math.ceil(count / pageSize),
        current: page,
        orders: docs.map((doc) => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            orderDate: doc.orderDate,
            orderStatus: doc.orderStatus,
            total: doc.total,
            mercadopagoId: doc.mercadopagoId,
            paymentLink: doc.paymentLink,
            request: {
              type: "GET",
              url: "http://localhost:3001/orders/" + doc._id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

const addOrderNew = (req, res, next) => { 
  Product.findById(req.body.id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.id,
        orderDate: req.body.orderDate,
        orderStatus: req.body.orderStatus,
        total: req.body.total,
        mercadopagoId: req.body.mercadopagoId,
        paymentLink: req.body.paymentLink
      });
      return order.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "Order stored",
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity,
          orderDate: result.orderDate,
          orderStatus: result.orderStatus,
          total: result.total,
          mercadopagoId: result.mercadopagoId,
          paymentLink: result.paymentLink,
        },
        request: {
          type: "GET",
          url: "http://localhost:3001/orders/" + result._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

const getOrderById = (req, res, next) => {
  console.log(req.params)
  Order.findById(req.params.id)
    .populate("product")
    .exec()
    .then((order) => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:3001/orders",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

// ruta para editar una orden

const updateProducts = async (req, res, next) => {
  Order.findOne({ _id: req.params.id }, (err, foundData) => {
    if(err){
      console.log(err)
      res.status(500).send()
    } else {
      if(!foundData){
        res.status(404).send()
      } else {
        if(req.body.orderStatus) {
          foundData.orderStatus = req.body.orderStatus
        }
        foundData.save((err, updateObject) => {
          if(err) {
            console.log(err)
            res.status(500).send()
          }
        })
      }
    }
  })
  .catch(err => res.send(err))
}

const deleteOrder = (req, res, next) => {
  Order.remove({ _id: req.params.id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:3001/orders",
          body: { productId: "ID", quantity: "Number" },
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

module.exports = {
  getAllOrders,
  addOrderNew,
  getOrderById,
  deleteOrder,
  updateProducts
};