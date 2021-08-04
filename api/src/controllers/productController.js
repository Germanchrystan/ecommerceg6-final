const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const Stock = require("../models/Stock");
// var EmailTemplate = require('email-templates-v2').EmailTemplate;
//const { where } = require("../models/Order");
// const { transporter } = require("../mailer");

const Product = require("./../models/Product");
const User = require("./../models/User");
const Cart = require("./../models/Cart");
const Whishlist = require("./../models/Whishlist");
//===================================================================================//
// @desc    Fetch all products
// @route   GET localhost:3001/products
// @access  Public
//===================================================================================//
const getProducts = asyncHandler(async (req, res, next) => {
  const pageSize = req.query.pageSize || 12;
  const page = req.query.page || 1;
  const custom = req.query.custom;
  let keyword = req.query.keyword;
  
  if (custom && keyword) {
    keyword = {
      name: {
        $regex: req.query.keyword,
        $options: "i",
      },
      custom: custom === "true" ? true : false
    }
  }
  if (!keyword && custom) {
    keyword = {
      custom: custom === "true" ? true : false
    }
  }
  if (!custom && keyword) {
    
    keyword = {
      name: {
        $regex: req.query.keyword,
        $options: "i",
      }
    }
  }
  else {
    keyword = {}
  }

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .populate("categories")
    .populate("productReview")
    .populate("stock")
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  if (req.query.keyword) {
    res.json({ products, current: page, pages: Math.ceil(count / pageSize), keyword: true });
  }
  else {
    // console.log("ASDSAD",products)
    res.json({ products, current: page, pages: Math.ceil(count / pageSize), keyword: false });
  }
});
//===================================================================================//
// @desc    Fetch a product by Id
// @route   GET localhost:3001/products/:_id
// @access  Public
//===================================================================================//
const getProductsById = async(req, res) => {
  const { id } = req.params;
  //Initializing a variable that will hold the whishlist bool  
  let isInWhishlist = null;
  let canReview = null;
  if(req.headers.authorization){
    //Getting token from headers (sent by API axios interceptor)
    const token = req.headers.authorization.split(' ')[1];

    //If there is a token, decode the userId and check the users whishlist
    if(token){
      //Decoding user id
      decodedData = jwt.verify(token, 'test');
      req.userId = decodedData?.id;
      //Getting the whishlist
      const whishlist = await Whishlist.findOne({userId: req.userId})  
      //If there is a whishlist check if it has the product
      if(whishlist){
        const productIndexInWhishlist = whishlist.products.findIndex((p) => p.productId.equals(id))
        if(productIndexInWhishlist > -1){
          isInWhishlist = true
        } else {
          isInWhishlist = false;
        }    
      } else {
        isInWhishlist = false;
      }
      //If there is a token decoded, get all Delivered carts to user
      const prevCarts = await Cart.find({ $and: [{ userId: req.userId }, { state: "Delivered" }]}, async (error, carts) => {
        if (error) {
          return res.status(400).json({
            message: "There was an Error"
          })
        }
        //If there are no delivered carts to this user, canReview is set to false
        if (!carts.length) canReview = false  
        else {
          //If there are delivered carts get items from each delivered cart. 
          //Then the array gets flattened get each _id
          //If the id of the product is found canReview is set to true
          canReview = carts.map((c) => c.items).flat().findIndex((i) => i.productId.equals(id)) > -1;
        }
      })
    }
  }

  Product.findById(id)
    .populate("productReview")
    .populate("stock")
    .then((product) => {
      if (!product) {
        return res.status(404).end();
      }

      product = { // This is an awful way of adding the isInWhishlist boolean. Remember to change this later
        discount: product.discount,
        img: product.img,
        categories: product.categories,
        stock: product.stock,
        name: product.name,
        _id: product._id,
        description: product.description,
        price: product.price,
        productReview: product.productReview,
        genre: product.genre,
        brand: product.brand,
        isInWhishlist,
        canReview
      }
      return res.status(200).json(product);
    });
};
//===================================================================================//
// @desc    Fetch products by filters
// @route   GET localhost:3001/products/filters
// @access  Public
//===================================================================================//
const getProductsFilter = (req, res, next) => {
  let filter = req.query.brand || req.query.size || req.query.genre || req.query.price;
  let keyword;
  let filterPrice;

  if (filter === "price") {
    filterPrice = {
      field: req.query.price
    }
  }

  if (filter !== "") {
    keyword = {
      brand: {
        $regex: req.query.brand,
        $options: "i",
      },
      genre: {
        $regex: req.query.genre,
        $options: "i",
      },
    }
  } else {
    keyword = {}
  }
  Product.find({ ...keyword }).sort({ price: req.query.price })
    .populate("categories")
    .populate("stock")
    .then(answer => {
      if (req.query.category) {
        let productsCategoriesAndSizes = [];
        if (answer && answer.length > 0) {
          for (let i = 0; i < answer.length; i++) {
            if (answer[i].categories.find(cat => cat.name.toLowerCase() === req.query.category.toLowerCase())) {
              if (req.query.size) {
                if (answer[i].stock.find(prop => prop.sizeName.toLowerCase() === req.query.size.toLowerCase())) {
                  productsCategoriesAndSizes.push(answer[i]);
                }
              }
              else {
                productsCategoriesAndSizes.push(answer[i]);
              }
            }
          }
          return res.status(200).json({ products: productsCategoriesAndSizes });
        }
      }
      else {
        if (req.query.size && !req.query.category && answer.length > 0) {
          let sizeArray = []
          for (let i = 0; i < answer.length; i++) {
            if (answer[i].stock.find(prop => prop.sizeName.toLowerCase() === req.query.size.toLowerCase())) {
              sizeArray.push(answer[i]);
            }
          }
          return res.status(200).json({ products: sizeArray });
        }
      }
      return res.status(200).json({ products: answer });
    })
    .catch(err => {
      res.status(404).json({ messege: "Product doesn't exist", err: err });
    })

}
//===================================================================================//
// @desc    Create a product
// @route   POST localhost:3001/products
// @access  Private/Admin
//===================================================================================//
const addProducts = async (req, res) => {
  // console.log(req.body)
  try {
    const { userId, name, custom, price, brand, description, stock, size, color, categories, genre, productReview } =
      req.body;
    let images = [];
    const categoriesArray = categories.split(",")
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        images.push(req.files[i].filename);
      }
    }
    // console.log(images)
    let colorArray = color.split(",");
    let sizeArray = size.split(",");
    let stockArray = stock.split(",");
    let stockId = []
    if (!custom || custom === "false") {
      if (colorArray && colorArray.length > 0) {
        colorArray.map((c, i) => {
          const newStock = Stock({
            _id: new mongoose.Types.ObjectId(),
            colorName: c,
            sizeName: sizeArray[i],
            userId: userId,
            stock: stockArray[i]
          })
          newStock.save();
          stockId.push(newStock._id);
        })
      }
    }
    const product = Product({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      price: price,
      brand: brand,
      description: description,
      stock: stockId,
      genre: genre,
      categories: categoriesArray,
      img: images,
      customSize: custom === "true" && size ? size : null,
      productReview: Product._id,
      custom: custom === "true" ? true : false,
      userId: custom === "true" && userId ? userId : "store"
    });

    const productStored = await product.save();

    return res.status(201).send({ product });
  } catch (e) {
    res.status(500).send({ message: e.errors });
  }
};

const imageUpload = (req, res) => {
  let getImage;
  const { name } = req.params;
  const images = name.split(",")
  let pathImage = path.join(__dirname, "../");
  try {
    if (images.length > 0) {
      getImage = fs.readFileSync(`${pathImage}uploads/${images[0]}`);
    }
    else {
      getImage = fs.readFileSync(`${pathImage}uploads/${images[0]}`);
    }
  } catch (error) {
    getImage = fs.readFileSync(`${pathImage}uploads/noImage.png`);
  }
  res.set({ "Content-Type": "image/png" });
  res.send(getImage);
};
//===================================================================================//
// @desc    Update a product
// @route   PUT localhost:3001/products/:id
// @access  Private/Admin
//===================================================================================//
const updateProducts = asyncHandler(async (req, res) => {
  const {
    name,
    brand,
    categories,
    description,
    price,
    genre,
    stock,
    rating,
    size,
    color,
  } = req.body;
  const categoryArray = categories ? categories.split(",") : ""
  let images = [];
  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      images.push(req.files[i].filename);
    }
  }
  let colorArray = color.split(",");
  let sizeArray = size.split(",");
  let stockArray = stock.split(",");
  let stockId = []

  if (colorArray && colorArray.length > 0) {
    colorArray.map((c, i) => {
      const newStock = Stock({
        _id: new mongoose.Types.ObjectId(),
        colorName: c,
        sizeName: sizeArray[i],
        stock: stockArray[i]
      })
      newStock.save();
      stockId.push(newStock._id);
    })
  }
  const product = await Product.findById(req.params.id);
  if (product) {

    if (name) (product.name = name)
    if (brand) (product.brand = brand)
    if (categoryArray !== "") (product.categories = categoryArray)
    if (description) (product.description = description)
    if (price) (product.price = price)
    if (stockId) {
      let newStock = product.stock
      stockId.map(s => newStock.push(s))
      product.stock = newStock;
    }
    if (rating) (product.rating = rating)
    if (genre) (product.genre = genre)
    if (images) (product.img = images)

    const updateProduct = await product.save();
    res.json(updateProduct);
  } else {
    res.status(404);
    throw new Error("Porduct not found");
  }
});

const updateStock = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, state, color, size, productId } = req.body;

  if (id === "undefined") {
    const product = await Product.findById(productId).populate("stock");

    if (product && product.custom === false) {
      let stockFinded = product?.stock?.find(p => p.colorName === color && p.sizeName === size)
      
      if (stockFinded) {
        const stock = await Stock.findById(stockFinded._id);
        
        if (stock && state === "Paid") {
          stock.stock -= quantity;
          await stock.save();
          return res.sendStatus(200);
        }
      }
    }
  }
  else{
  const stock = await Stock.findById(id);
  if (stock && state !== "Paid") {
    stock.stock = quantity;
    await stock.save();
    return res.sendStatus(200);
  }
}
  res.sendStatus(400);
})

const removeProductStock = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const stock = await Stock.findById(id);
  if (stock) {
    await stock.remove();
    return res.sendStatus(200);
  }
  res.sendStatus(400);
});
//===================================================================================//
// @desc    Delete a product by id
// @route   DELETE localhost:3001/products/:id
// @access  Private/Admin
//===================================================================================//
const deleteProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    if (product.stock.length > 0) {
      product.stock.map(id => {
        Stock.findById(id).then(res => {
          res.remove();
        });
      })
    }
    await product.remove();
    res.json({ messege: "Product removed successfully" });
  } else {
    res.status(404);
    throw new Error("Porduct not found");
  }
});
//===================================================================================//
//===================================================================================//
const addDiscount = async(req, res) => {
  const { productId } = req.params;
  const { percentage } = req.body;
  try {
    const product = await Product.findById(productId);
    if(!product) return res.status(404).json({message: 'Product not found'});
  
    const newPrice = product.price - (product.price/100 * Number(percentage));
  
    product.discount.percentage = percentage;
    product.discount.newPrice = newPrice;
    product.save()
    return res.status(201).json(product)
  } catch(error){
    console.log(error)
    return res.status(500).json({message: 'There was an  Error'})
  }
}
//===================================================================================//

//===================================================================================//
const removeDiscount = async(req, res) => {
  const {productId} = req.params;
  try {
    const product = await Product.findById(productId);
    if(!product) return res.status(404).json({message: 'Product not found'});

    product.discount.percentage = 0;
    product.discount.newPrice = 0;

    product.save();
    return res.status(200).json(product);

  }catch(error){
    
    console.log(error)
    return res.status(500).json({message: 'There was an  Error'})
  
  }
} 
//===================================================================================//
//===================================================================================//
const getRandomDiscount = async(req, res) => {
  let product = await Product.find({ 'discount.percentage': { $gte: 1 }}, async (error, discountsFound) => {
        if (error) {
            return res.status(400).json({
              message: "There was an Error"
            })
        }
        if (!discountsFound.length) return res.status(200).json({ message: 'There are not any discounts' })

        if(discountsFound.length > 0){
          const randomProduct = discountsFound[Math.floor(Math.random() * discountsFound.length)]
          const {
            _id,
            name,
            discount,
          } = randomProduct

          return res.status(200).json({message:`There is a ${discount.percentage}% discount on ${name}`, _id});
        }
    });
}
//===================================================================================//

//===================================================================================//
const getRandomDiscountByKeyword = async(req, res) => {
  const { keyword } = req.params;
  let product = await Product.find({ $and: [{name: { $regex: keyword, $options: "i" } } , {'discount.percentage': { $gte: 1 }}]}, async (error, discountsFound) => {
      if (error) {
        return res.status(400).json({
          message: "There was an Error"
        })
      }
      if (!discountsFound.length) return res.status(200).json({ message: 'There are not any matching discounts' })
      
      if(discountsFound.length > 0){
        const randomProduct = discountsFound[Math.floor(Math.random() * discountsFound.length)]
        const {
          _id,
          name,
          discount,
        } = randomProduct

      return res.status(200).json({message:`There is a ${discount.percentage}% discount on ${name}`, _id});
    }
  });
}
//===================================================================================//
module.exports = {
  getProducts,
  getProductsFilter,
  addProducts,
  updateProducts,
  updateStock,
  removeProductStock,
  deleteProducts,
  getProductsById,
  imageUpload,
  addDiscount,
  removeDiscount,
  getRandomDiscount,
  getRandomDiscountByKeyword
};
//==========================================================================//
