const Brand = require('./../models/Brand');
const Product= require('./../models/Product');

//==========================================================================//
const getBrands = async(req, res) => {
    const brands = await Brand.find({})
    return res.status(200).json({brands: brands})
}
//==========================================================================//
const getBrandById = async(req, res) => {
    const { _id } = req.params;
    let brand = await Brand.findOne({_id});
    
    if (!brand) return res.status(404).json({message:'Brand Not Found'});

    return res.status(200).json({})
}
//==========================================================================//
const addBrand = async(req,res) => {
    let {
        name,
        description
    } = req.body;

    if(!name) return res.status(400).json({message: 'Brand should have a name'})
    name = name.charAt(0).toUpperCase() + name.slice(1);
    if(!description){ 
        description = '';
    } 
    //Should check if the name of the brand already exists in the database
    let isNameRepeated = await Brand.findOne({ name });
    if(isNameRepeated) return res.status(400).json({message:'Name Repeated'})

    const newBrand = new Brand({
        _id: new mongoose.Types.ObjectId(),
        name, 
        description
    })

    newBrand
    .save()
    .then((doc) => {
        res.status(201).json({
            data: doc,
        });
    })
    .catch((er) => {
        res.status(500).json({
            error: er,
        });
    });
}
//==========================================================================//
const removeBrand = async(req,res) => {
    const { _id } = req.params;
    
    //Brand shouldnt be removed if there are still products in the catalog with by that brand
    const areThereProducts = await Product.findOne({ brand });
    if(areThereProducts) return res.status(400).json({message:"Can't remove brand if it still has products on the database"})

    const brand = await Category.findOne({_id});

    if (brand) {
      await brand.remove();
      return res.status(200).json({ brand, message: "Brand removed" });
    } else {
      res.status(404);
      throw new Error("Brand not found");
    }
}
//==========================================================================//
module.exports = {
    addBrand,
    getBrandById,
    getBrands,
    removeBrand
}