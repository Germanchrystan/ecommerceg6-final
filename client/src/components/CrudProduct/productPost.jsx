import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { getCategories } from "./../../redux/actions/category_actions";
import { getBrands } from "./../../redux/actions/brand_actions";
import { addProducts } from "./../../redux/actions/products_actions";
import "../Catalog/catalog.css";
import swal from 'sweetalert'

const ProductPostForm = () => {
  const dispatch = useDispatch();

  const categoryArray = useSelector(
    (state) => state.categoriesReducer.categories.list.categories
  );

  const brandArray = useSelector(
    (state) => state.brandReducer.allBrands
  )

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, []);

  const newProduct = {
    name: "",
    brand: "",
    category: [],
    description: "",
    price: "",
    genre: "",
    size: [],
    color: [],
    stock: [],
    // colorQuantity:[],
    img: "",
  };
  const [product, setProduct] = useState(newProduct);
  const [selectedName, setSelectedName] = useState({ categoryName: [] });
  const [stockNum, setStockNum] = useState();

  const handleInputChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = () => {
    let select = document.getElementById("categoryId");

    if (select) {
      let selectValue = select.options[select.selectedIndex].value;
      let selectedCategoryNames = select.options[select.selectedIndex].innerText;

      setSelectedName({
        ...selectedName,
        categoryName: selectedName.categoryName.concat(selectedCategoryNames)
      });

      let selectCategory = product.category.concat(selectValue);
      setProduct({ ...product, category: selectCategory });

    }
  };

  const handleSelectSizes = (e) => {
    let size = e.target.value;
    
    if(size !== "Size" && size !== ""){
      setProduct({
        ...product,size:product.size.concat(size)
      })
    }
  }
  
// console.log(product)
  const handleMultipleInput = (e) => {
    let color = document.getElementById("color").value;
    let stock = document.getElementById("stock").value;
    let size = document.getElementById("size").value;

    if (color !== "" && stock !== "" && size !== "Size" && size !== "") {
      setProduct({
        ...product,
        color: product.color.concat(color),
        size: product.size.concat(size),
        stock: product.stock.concat(stock)
      })
    }
  }

  const deleteColor = (e) => {
    let filterColor = [];
    let filterSize = [];
    let filterStock = [];
    let targetColor =  e.target.innerText.split("-")[0];

    product.color.map((color, i) => {
      if (color !== targetColor) {
        filterColor.push(color);
        filterSize.push(product.size[i]);
        filterStock.push(product.stock[i]);
      }
    })
    
    setProduct({ ...product, color: filterColor, size: filterSize, stock: filterStock });
  }
  const deleteSize = (e) => {
    let filterSize = [];
    // product.size.map(size => {
    //   if (size !== e.target.innerText) {
    //     filterSize.push(size);
    //   }
    // })
    // setProduct({ ...product, size: filterSize });
  }

  const deleteCateg = (e) => {
    let filterCategory = []
    selectedName.categoryName.map(cate => {
      if (cate !== e.target.innerText) {
        filterCategory.push(cate);
      }
    });
    setSelectedName({ categoryName: filterCategory })
  }
  const [selectedFile, setSelectedFile] = useState([]);
  const [imgUrl, setImgUrl] = useState(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files);
    setImgUrl(URL.createObjectURL(event.target.files[0]));

  };
  const handleStockChange = (e) => {
    setStockNum(e.target.value === undefined ? undefined : Math.max(1, e.target.value))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    //--------VALIDACION IMAGEN-------------------------------

    if (product.name == '') return swal({
      title: "Name Field Cannot Be Empty",
      icon: "warning",
      button: true,
      dangerMode: true,
    })
    if (product.color == '') return swal({
      title: "Color Field Cannot Be Empty",
      icon: "warning",
      button: true,
      dangerMode: true,
    })
    if (product.stock == '') return swal({
      title: "Strock Field Cannot Be Empty",
      icon: "warning",
      button: true,
      dangerMode: true,
    })
    if (product.price == '') return swal({
      title: "Price Field Cannot Be Empty",
      icon: "warning",
      button: true,
      dangerMode: true,
    })
    if (product.brand == '') return swal({
      title: "Brand Field Cannot Be Empty",
      icon: "warning",
      button: true,
      dangerMode: true,
    })
    if (product.description == '') return swal({
      title: "Description Field Cannot Be Empty",
      icon: "warning",
      button: true,
      dangerMode: true,
    })
    if (product.category == '') return swal({
      title: "Category Field Cannot Be Empty",
      icon: "warning",
      button: true,
      dangerMode: true,
    })
    if (selectedFile === null) return swal({
      title: "Image Field Cannot Be Empty",
      icon: "warning",
      button: true,
      dangerMode: true,
    })
    //--------------------------------------------------------
    let extension;
    if (selectedFile.length > 0) {
      for (let i = 0; i < selectedFile.length; i++) {
        extension = selectedFile[i].name.split(".");
        fd.append(
          "img",
          selectedFile[i],
          product.name + "." + extension[1]
        );
      }
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    fd.append("name", product.name);
    fd.append("genre", product.genre);
    fd.append("brand", product.brand);
    fd.append("categories", product.category);
    fd.append("description", product.description);
    fd.append("price", product.price);
    fd.append("size", product.size);
    fd.append("color", product.color);
    fd.append("stock", product.stock);
    // fd.append("colorQuantity", product.colorQuantity);
    // console.log("AQUI",product)
    dispatch(addProducts(fd, config));
    // setProduct(newProduct);
    swal({
      title: "Product Created",
      icon: "success",
      button: true,
    }).then(function () {
      // window.location.reload()
    });
  };

  return (
    <div class="grid grid-cols-2 tracking-wide font-bold gap-2 pt-20 bg-gray-200">
      <div class="flex items-center min-h-screen bg-gray-200 dark:bg-gray-900">
        <div class="container mx-auto">
          <div class="max-w-md -mx-2 my-10 bg-white p-5 rounded-md shadow-sm">
            <div class="text-center">
              <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
                Post New Product
              </h1>
            </div>
            {/* COLOR */}
            <div className="m-7">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    for="name"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Product
                  </label>
                  <input
                    id="product"
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    placeholder="Product"
                    required
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  />
                </div>
                <div className="mb-6 w-full">
                  <label
                    for="color"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Color
                  </label>
                  <input
                    id="color"
                    type="text"
                    name="color"
                    placeholder="Color"
                    // value={product.color}
                    required
                    className="w-28 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  />
                  <select className ="ml-4" id ="size" onChange = {handleSelectSizes}>
                    <option>Size</option>
                    <option>XS</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                    <option>XXL</option>
                  </select>
                  {/* <input id="size" placeholder="Size" className="w-20 px-3 py-2 ml-4 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" /> */}
                  <input id="stock" value={stockNum} onChange={handleStockChange} placeholder="Stock" type="number" className="w-24 px-3 py-2 ml-4 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />

                  <button type="button" onClick={handleMultipleInput} className="ml-4">+</button><br />
                  {product.color && product.color.length > 0 &&
                    product.color.map((color, i) => {
                      return <p onClick={deleteColor} className="inline-block mr-2 mt-4 cursor-pointer rounded round bg-gray-200 mb-2 w-20 text-center" key={i}>{color}-{product.size[i]}-{product.stock[i]}</p>
                    })}
                </div>
                <div className="mb-6">

                </div>
                <div className="mb-6 mt-4">

                </div>

                {/* genre */}
                <div>
                  <div className="mb-1"><label for="genres" className="text-sm text-gray-600 dark:text-gray-400">Genres</label></div>
                  <label className="inline-flex items-center mt-3">
                    <input type="checkbox" name="genre" value="men" onChange={handleInputChange} className="form-checkbox h-4 w-4 text-purple-600" /><span className="ml-2 text-gray-700 mr-2">Men</span>
                  </label>
                  <label className="inline-flex items-center mt-3">
                    <input type="checkbox" name="genre" value="woman" onChange={handleInputChange} className="form-checkbox h-4 w-4 text-purple-600" /><span className="ml-2 text-gray-700 mr-2">Woman</span>
                  </label>
                  <label className="inline-flex items-center mt-3">
                    <input type="checkbox" name="genre" value="unisex" onChange={handleInputChange} className="form-checkbox h-4 w-4 text-purple-600" /><span className="ml-2 text-gray-700 mr-2">Unisex</span>
                  </label>
                  <label className="inline-flex items-center mt-3">
                    <input type="checkbox" name="genre" value="boys" onChange={handleInputChange} className="form-checkbox h-4 w-4 text-purple-600" /><span className="ml-2 text-gray-700 mr-2">boys</span>
                  </label><label className="inline-flex items-center mt-3">
                    <input type="checkbox" name="genre" value="girls" onChange={handleInputChange} className="form-checkbox h-4 w-4 text-purple-600" /><span className="ml-2 text-gray-700">girls</span>
                  </label>
                </div>
                {/* fin genre */}
                <div className="mb-6">
                  <label
                    for="price"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Price
                  </label>
                  <input
                    id="price"
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleInputChange}
                    min="0"
                    required
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md 
                                focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 
                                dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 
                                dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  />
                </div>
                <div className="mb-6">
                  <label
                    for="brand"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Brand
                  </label>
                  <input
                    id="brand"
                    type="text"
                    name="brand"
                    value={product.brand}
                    onChange={handleInputChange}
                    placeholder="Brand"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md 
                                    focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 
                                 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 
                                 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    for="description"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    type="text"
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
                    placeholder="Product Description"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none 
                                focus:ring focus:ring-indigo-100 
                                focus:border-indigo-300 dark:bg-gray-700 
                                dark:text-white dark:placeholder-gray-500 
                                dark:border-gray-600 dark:focus:ring-gray-900 
                                dark:focus:border-gray-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    for="category"
                    className="block text-xs font-semibold text-gray-600 mt-2 uppercase"
                  >
                    Category
                  </label>
                  <label className="label-select">
                    <select id="categoryId" onChange={handleSelect} className="mb-2">
                      <option value="">--- category ---</option>
                      {categoryArray && categoryArray.length > 0
                        ? categoryArray.map((c, id) => {
                          return (
                            <option key={c.id} value={c._id}>
                              {c.name}
                            </option>
                          );
                        })
                        : ""}
                    </select><br />
                    {/* muestro las categorias que se eligio */}
                    {selectedName.categoryName.length > 0 ? selectedName.categoryName.map((cate, key) => {
                      return <p onClick={deleteCateg} key={key} id={key} className="inline-block mr-2 rounded round bg-gray-200 mb-2 w-20 text-center">
                        {cate}
                      </p>
                    }) : ""}
                    <p className="text-sm mt-2 -mb-2">Can't find your Category? <Link to='/postCategory' className="underline text-sm text-blue-800">Add New One</Link></p>
                  </label>
                </div>
                <div className="mb-6">
                  <label
                    for="img"
                    className="block text-xs font-semibold text-gray-600 mt-2 uppercase"
                  >
                    Images
                  </label>
                  <label className="label-select" >
                    <input type="file" onChange={handleFileInputChange} required multiple />
                  </label>
                </div>

                <div className="mb-6">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full px-3 py-4 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none"
                  >
                    Post New Product
                  </button>
                </div>
                <p className="text-base text-center text-gray-400" id="result"></p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center min-h-screen bg-gray-200 dark:bg-gray-900">
          <div className="container mx-auto">
            <div className="max-w-md px-22 mx-8 my-10 bg-white p-5 rounded-md shadow-</div>sm">
              <div className=" justify-center justify-items-center content-center items-center">
                <div className="card">
                  <div className="flex justify-center">
                    <img
                      src={imgUrl}
                      alt={imgUrl}
                    />
                  </div>
                  <div className="bg-gray-200" style={{ height: "1px" }}></div>
                  <div className="p-4">
                    <p className="text-black">{product.name}</p>
                    <p className="text-blue-300">${product.price}</p>
                    <p className="text-blue-300">{product.brand}</p>
                    <p className="text-blue-300 bg-blue-50">
                      {selectedName.categoryName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ProductPostForm;
