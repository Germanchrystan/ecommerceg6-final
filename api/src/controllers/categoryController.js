const Category = require("./../models/Category");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");



// @desc    Create a category
// @route   POST /localhost:3001/categories
// @access  Private/Admin
const addCategories = (req, res) => {
  const category = new Category({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
  });


  category
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

// @desc    Get all categories with pagination
// @route   GET /localhost:3001/categories
// @access  Private/Admin
const getCategories = asyncHandler(async (req, res) => {
  const {pageNumber} = req.query;
  let page;
  const pageSize = 15;

  if(pageNumber !== "undefined"){
    page = Number(req.query.pageNumber);
  } else {
    page = 1;
  }

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const count = await Category.countDocuments({ ...keyword });
  const categories = await Category.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ categories, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get all categories with pagination
// @route   GET /localhost:3001/productCategory/id
// @access  Private/Admin
const getCategoryById = (req, res) => {
  Category.findById(req.params.id).then((category) => {
    if (!category) {
      return res.status(404).end();
    }
    return res.status(200).json(category);
  });
};


// @desc    Update a product
// @route   PUT /categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const category = await Category.findById(req.params.id);

  if (category) {
    category.name = name;
    category.description = description;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

// @desc    Delete a category by id
// @route   DELETE /categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await category.remove();
    res.json({ message: "Category removed" });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

module.exports = {
  addCategories,
  getCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
};
