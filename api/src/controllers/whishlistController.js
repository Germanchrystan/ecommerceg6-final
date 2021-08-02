const { ObjectId } = require("bson");
const Whishlist = require("./../models/Whishlist");
const Product = require("./../models/Product");
const User = require('./../models/User');
//==========================================================================//

const getOrCreateWhishlistFromUser = async (req, res) => {
    const {userId} = req.params;
    try {
        let user = await User.findById(userId);
        if(!user) return res.status(404).json({message:'User Not Found'});
    
        let whishlist = await Whishlist.findOne({userId})
    
        if(!whishlist){
            const newWhishlist = await Whishlist.create({
                userId,
                products: []
            })
            return res.status(201).json({ newWhishlist })
        }
    
        return res.status(200).json({whishlist})
    } catch(error){
        console.log(error)
        return res.status(500).json({message:'There was an Error'})
    }
}
//==========================================================================//
const addProductToWhishlist = async(req, res) => {
    const { userId } = req.params;
    const { productId } = req.params;

    try{
        let whishlist
        
        whishlist = await Whishlist.findOne({userId})

        if(!whishlist){
            whishlist = await Whishlist.create({
                userId,
                products: []
            })//reasignación que puede dar problemas
        }
        
        let newProduct = await Product.findOne({ _id: productId })
        if(!newProduct) return res.status(404).json({message:'Product does not exist'});

        whishlist.products.push({
            productId,
            name:newProduct.name,
            price: newProduct.price
        })
        whishlist.save();
        console.log(whishlist.products)
        return res.status(202).json(whishlist);
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'There was an Error'})
    }
}
//==========================================================================//
const removeProductFromWhishlist = async(req, res) => {
    const { userId } = req.params;
    const { productId } = req.params;

    try {
        let whishlist = await Whishlist.findOne({userId});

        if(!whishlist) return res.status(404).json({message: 'Whishlist not found'});

        whishlist.products = whishlist.products.filter((p) => !p.productId.equals(productId))

        whishlist.save();

        return res.status(200).json(whishlist)

    } catch(error) {
        console.log(error);
        return res.status(500).json({message:'There was an Error'})
    }
}
//==========================================================================//
const toggleProductFromWhishlist = async(req, res) => {
    const { userId } = req.params;
    const { productId } = req.params;

    try {
        let newProduct = await Product.findOne({ _id: productId })
        if(!newProduct) return res.status(404).json({message:'Product does not exist'});
        
        const price = newProduct.price;
        const name = newProduct.name;
        
        let user = await User.findById(userId);
        if(!user) return res.status(404).json({message:'User Not Found'});

        let whishlist;
        whishlist = await Whishlist.findOne({userId});
        
        if(!whishlist){
            const products = [{productId, price, name}]
            const newWhishlist = await Whishlist.create({
                userId,
                products
            })
            newWhishlist.save()
            return res.status(201).json({ newWhishlist })
        }
        
        let productIndex = whishlist.products.findIndex((i) => i.productId.equals(productId))

        if(productIndex === -1) {
            whishlist.products.push({productId, name, price})
            whishlist.save();
            return res.status(201).json({whishlist})
        } else {
            whishlist.products = whishlist.products.filter((p) => !p.productId.equals(productId))
            whishlist.save();
            return res.status(201).json({whishlist})
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'There was an Error'});
    }
}
//==========================================================================//



//==========================================================================//
module.exports = {
    getOrCreateWhishlistFromUser,
    addProductToWhishlist,
    removeProductFromWhishlist,
    toggleProductFromWhishlist,
}