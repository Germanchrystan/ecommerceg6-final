const { ObjectId } = require("bson");
const Cart = require("./../models/Cart");
const Product = require("./../models/Product");
const { transporter } = require("../mailer");
var EmailTemplate = require('email-templates-v2').EmailTemplate;
const asyncHandler = require("express-async-handler");
path = require('path');
//==========================================================================//

const getActiveCartFromUser = async (req, res) => {
  const { userId } = req.params;

  if (userId === "undefined") return res.status(404).json({message:"undefined user"})
   
  let cart = await Cart.findOne({ $and: [{ userId }, { state: "Active" }] });
  if (!cart) {
    const newCart = await Cart.create({
      userId,
      items: [],
      totalAmount: 0,
    });
    return res.status(201).json({ newCart });
  }
  if (cart.items.length === 0 && cart.totalAmount > 0) {
    cart.totalAmount = 0;
    cart = await cart.save();
  }
  let totalQuantity = 0;
  cart.items?.map((prop) => {
    totalQuantity += prop.quantity;
  });
  return res.status(200).json({ cart, totalQuantity: totalQuantity });
};
//==========================================================================//
const addItem = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity, colorName, sizeName, stock,custom } = req.body;
  try {
    let cart = await Cart.findOne({ $and: [{ userId }, { state: "Active" }] });
    
    let newItem = await Product.findOne({ _id: productId }).populate("stock");

    let stockSelected = newItem.stock.find(
      (prop) => prop.colorName === colorName && prop.sizeName === sizeName
    );
    newItem.stock = stockSelected;

    if (!newItem) return res.status(404).json({ message: "Product not found" });

    const price = newItem.discount.percentage > 0 ? newItem.discount.newPrice : newItem.price;
    const name = newItem.name;

    if (cart) {
      let itemIndex = -1;
 

      for (let i = 0; i < cart.items.length; i++) {
        if (cart.items[i].productId.equals(productId)) {
          if (
            cart.items[i].colorName === colorName &&
            cart.items[i].sizeName === sizeName
          ) {
            itemIndex = i;
            break;
          }
        }
      }

      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex];
        productItem.quantity += quantity;
        cart.items[itemIndex] = productItem;
      } else {
        cart.items.push({
          productId: newItem._id,
          name,
          quantity,
          price,
          colorName,
          sizeName,
          stock,
        });
      }

      cart.totalAmount += quantity * price;
      cart = await cart.save();

      return res.status(201).json({ cart });
    } else {
      const newCart = await Cart.create({
        userId,
        items: [
          {
            productId: newItem._id,
            name,
            quantity,
            colorName,
            sizeName,
            stock,
            price,
          },
        ],
        totalAmount: quantity * price,
      });

      return res.status(201).json({ });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "There was and error" });
  }
};
//==========================================================================//
const incrementProductUnit = async (req, res) => {
  const { userId } = req.params;
  const { productId, colorName, sizeName } = req.query;

  try {
    let cart = await Cart.findOne({ $and: [{ userId }, { state: "Active" }] });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    let itemFound = await Product.findOne({ _id: productId });
    if (!itemFound){
      console.log("Product not found")
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const price = itemFound.discount.percentage > 0 ? itemFound.discount.newPrice : itemFound.price;
    const stock = itemFound.stock;
    let itemIndex = cart.items.findIndex(
      (i) =>
        i.productId.equals(productId) &&
        i.colorName === colorName &&
        i.sizeName === sizeName
    );

    if (itemIndex === -1) {
      return res.status(400).json({ message: "Item not found" });
    }
    //========================================//
    let productItem = cart.items[itemIndex];
    if(!itemFound.custom){
    let totalQuantity = 0;
    if (productItem.stock >= productItem.quantity) {
      productItem.quantity += 1;
      cart.items?.map((prop) => {
        totalQuantity += prop.quantity;
      });
      cart.items[itemIndex] = productItem;
      cart.totalAmount += price;
      cart.totalQuantity = totalQuantity;
    }
  
    cart = await cart.save();
    return res.status(201).json({ cart, totalQuantity: totalQuantity });
  }
  else{
    cart.items[itemIndex].quantity++;
    cart.totalAmount += price;
    cart = await cart.save();
    return res.status(201).json({ cart, totalQuantity: cart.items[itemIndex].quantity });
  }
  
    //========================================//

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "There was an error" });
  }
};
//==========================================================================//
const decrementProductUnit = async (req, res) => {
  const { userId } = req.params;
  const { productId, colorName, sizeName } = req.query;
  try {
    let cart = await Cart.findOne({ $and: [{ userId }, { state: "Active" }] });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    let itemFound = await Product.findOne({ _id: productId });

    if (!itemFound)
      return res.status(404).json({
        message: "Product not found",
      });

    const price = itemFound.discount.percentage > 0 ? itemFound.discount.newPrice : itemFound.price;

    let itemIndex = cart.items.findIndex(
      (i) =>
        i.productId.equals(productId) &&
        i.colorName === colorName &&
        i.sizeName === sizeName
    );

    if (itemIndex === -1) return res.status(400).json({ message: "Item not found" });
    //========================================//
    if(!itemFound.custom){
    let productItem = cart.items[itemIndex];
    productItem.quantity -= 1;

    cart.items[itemIndex] = productItem;

    cart.totalAmount -= price;
    let totalQuantity = 0;
    cart.items?.map((prop) => {
      totalQuantity += prop.quantity;
    });

    cart = await cart.save();
    return res.status(201).json({ cart, totalQuantity: totalQuantity });
  }
  else{
    cart.items[itemIndex].quantity--;
    cart.totalAmount -= price;
    cart = await cart.save();
    return res.status(201).json({ cart, totalQuantity: cart.items[itemIndex].quantity });
  }
    //========================================//

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "There was an error" });
  }
};

//==========================================================================//
const stateChange = async (req, res) => {
  const { cartId } = req.params;
  const { state } = req.query;

  const statesArray = [
    "Active",
    "Cancelled",
    "On it's Way",
    "Paid",
    "Delivered",
  ];
  if (!statesArray.includes(state))
    return res.status(400).json({ message: "State not valid" });

  try {
    let cart = await Cart.findOne({ _id: cartId }).populate("userId"); 
    if (cart) {
      cart.state = req.query.state;
      cart.fechaCierre = new Date();
      cart = await cart.save();
      if (cart.state === "Paid") {
        let arrProducts = []

        for(let i=0;i<cart.items.length;i++){
          arrProducts.push({nameProducto:cart.items[i].name,cantidad:cart.items[i].quantity,precioUnitario:cart.items[i].price})
        }

        let users = [
          {
              name: cart.userId.firstname,
              email: cart.userId.email,
              orden: cart._id,
              productos: arrProducts,
              total:cart.totalAmount
          }
        ];

        await loadTemplate('paid', users).then((results) => {
          return Promise.all(results.map((result) => {
              sendEmail({
                  to: result.context.email,
                  from: "ecommerceg6ft11@gmail.com",
                  subject: "Compra realizada!",
                  html: result.email.html,
                  text: result.email.text,
              });
          }));
        })
        /*
        let foo = await transporter.sendMail({
          from: '"Ecommerce" <ecommerceg6ft11@gmail.com>', // sender address
          to: cart.userId.email, // list of receivers
          subject: "Compra realizada", // Subject line
          text: "Su compra se ha realizado satisfactoriamente. Muchas gracias!", // plain text body
          html: "<b>Hello world?</b>", // html body
        });*/
      }
      if (cart.state === "On it's Way") {
        let foo = await transporter.sendMail({
          from: '"Ecommerce" <ecommerceg6ft11@gmail.com>', // sender address
          to: cart.userId.email, // list of receivers
          subject: "Your order is On it's Way", // Subject line
          text: "Su compra se ha realizado satisfactoriamente. Muchas gracias!", // plain text body
          html: "<b>Hello, your order is on it's way. <br/> Your traking code is: 000017560296431 </b>", // html body
        });
      }
      if (cart.state === "Delivered") {
        let foo = await transporter.sendMail({
          from: '"Ecommerce" <ecommerceg6ft11@gmail.com>', // sender address
          to: cart.userId.email, // list of receivers
          subject: "Your order has arrived", // Subject line
          text: "Su compra se ha realizado satisfactoriamente. Muchas gracias!", // plain text body
          html: "<b>Hello, your order has arrived, we waiting for you review</b>", // html body
        });
      }
      if (cart.state === "Cancelled") {
        let foo = await transporter.sendMail({
          from: '"Ecommerce" <ecommerceg6ft11@gmail.com>', // sender address
          to: cart.userId.email, // list of receivers
          subject: "Your order has been Cancelled", // Subject line
          text: "Su compra se ha realizado satisfactoriamente. Muchas gracias!", // plain text body
          html: "<b>Hello, your order has been successfully cancelled</b>", // html body
        });
      }
      res.status(200).json({ carts: [cart] });
    } else {
      res.status(400).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "There was and error" });
  }
};
//==========================================================================//
const getAllCarts = asyncHandler(async (req, res) => {
  const pageSize = req.query.pageSize || 15;
  const page = req.query.page || 1;
  const state = req.query.state;
  let stateOrder;

  if(state === "undefined" || !state){
    stateOrder = {}
}else{
  stateOrder = {
    state: {
      $regex: state,
      $options: "i",
    }
}
}
  let quantityArray = [];
  const count = await Cart.countDocuments({ ...stateOrder });
  const carts = await Cart.find({ ...stateOrder })
    .populate("userId")
    .populate("items.productId")
    .populate("productId.stock")
    .limit(pageSize)
    .skip(pageSize * (page - 1));
    if(carts && carts.length > 0){
      carts.map(prop => {
        let totalQuantity = 0;
        if(prop.items && prop.items.length > 0){
          prop.items.map(p => {
            totalQuantity += p.quantity;
          })
        }
        quantityArray.push(totalQuantity);
      })
    }
  return res.json({ carts,totalQuantity:quantityArray ,current: page, pages: Math.ceil(count / pageSize) });
});

//==========================================================================//
const getCartsByUser = async (req, res) => {
  const { userId } = req.params;
  const pageSize = req.query.pageSize || 15;
  const page = req.query.page || 1;

  const count = await Cart.countDocuments();
  let carts = await Cart.find({ userId })
    .populate("userId")
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  return res.json({ carts, current: page, pages: Math.ceil(count / pageSize) });
};
//==========================================================================//
const removeProductFromCart = async (req, res) => {
  const { userId } = req.params;
  const { productId, colorName, sizeName } = req.query;
  let cartFiltered = [];
  try {
    let cart = await Cart.findOne({ $and: [{ userId }, { state: "Active" }] });
    let itemIndex = cart.items.findIndex(
      (i) =>
        i.productId.equals(productId) &&
        i.colorName === colorName &&
        i.sizeName === sizeName
    );

    cart.totalAmount =
      cart.totalAmount -
      cart.items[itemIndex].price * cart.items[itemIndex].quantity;

    cart.items.map((prop, i) => {
      if (i !== itemIndex) {
        cartFiltered.push(cart.items[i]);
      }
    });
    cart.items = cartFiltered;
    let totalQuantity = 0;
    cart.items?.map((prop) => {
      totalQuantity += prop.quantity;
    });
    const updateCart = await cart.save();
    res.status(200).json({ cart: updateCart, totalQuantity: totalQuantity });
  } catch (error) {
    return res.status(500).json({ message: "There was an error" });
  }
};
//==========================================================================//

const getCartsById = async (req, res) => {
  const { _id } = req.params;
  const pageSize = req.query.pageSize || 15;
  const page = req.query.page || 1;

  const count = await Cart.countDocuments();
  let carts = await Cart.find({ _id })
    .populate("userId")
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  return res.json({ carts, current: page, pages: Math.ceil(count / pageSize) });
};

//==========================================================================//
function sendEmail (obj) {
  return transporter.sendMail(obj);
}
function loadTemplate (templateName, contexts) {
let template = new EmailTemplate(path.join(__dirname, 'templates', templateName));
return Promise.all(contexts.map((context) => {
    return new Promise((resolve, reject) => {
        template.render(context, (err, result) => {
            if (err) reject(err);
            else resolve({
                email: result,
                context,
            });
        });
    });
}));
}
//==========================================================================//

module.exports = {
  addItem,
  stateChange,
  getAllCarts,
  getCartsByUser,
  getActiveCartFromUser,
  removeProductFromCart,
  incrementProductUnit,
  decrementProductUnit,
  getCartsById,
};
