import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from 'react-router-dom';
import { getCategories, getCategoryById } from "./../../redux/actions/category_actions";
import { deleteProductStock, detailProduct, editProduct, editStock, stockUpdated } from "./../../redux/actions/products_actions";
import "../Catalog/catalog.css";
import swal from 'sweetalert';
import UniversalNavBar from "../UniversalNavBar/universalNavBar";
import Footer from "../../containers/Footer/footer";


const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const categoryArray = useSelector(
    (state) => state.categoriesReducer.categories.list.categories);

  const categoryPreview = useSelector(
    (state) => state.categoriesReducer.categories.category);
  const productPreview = useSelector(
    (state) => state.productsReducer.allProducts);

  useEffect(() => {
    dispatch(getCategories());

    if (id) {
      dispatch(detailProduct(id));
    }

    if (productPreview.categories && productPreview.categories[0]) {
      // console.log("entra")
      dispatch(getCategoryById(productPreview.categories[0]))
    }
  }, [id, dispatch]);

  const [product, setProduct] = useState({
    id: id,
    name: "",
    brand: "",
    category: [],
    description: "",
    price: "",
    genre: "",
    size: [],
    color: [],
    stock: [],
    img: "",
  });

  const [selectedName, setSelectedName] = useState({ categoryName: [] });
  const [newStock, setNewStock] = useState(false);
  const [editStock, setEditStock] = useState(false);
  const [stockUpdate, setStockUpdate] = useState({ color: "", size: "", quantity: "" });
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
      let selectedCategoryNames =
        select.options[select.selectedIndex].innerText;
      let selectCategoryName = selectedName.categoryName.concat(
        selectedCategoryNames + " "
      );
      setSelectedName({ ...selectedName, categoryName: selectCategoryName });
      setProduct({ ...product, category: product.category.concat(selectValue) });
    }
  };

  const handleStock = () => {
    let colorName = document.getElementById("selectColorName").value;
    let sizeName = document.getElementById("selectSizeName").value;
    let stock = document.getElementById("selectStock").value;

    if (colorName || sizeName || stock) {
      setStockUpdate({ ...stockUpdate, color: colorName, size: sizeName, quantity: stock })
    }
  }

  const handleSelectSizes = (e) => {
    let size = e.target.value;
    if(size !== "Size" && size !== ""){
      setProduct({
        ...product,size:product.size.concat(size)
      })
    }
  }

  const handleMultipleInput = (e) => {
    let color = document.getElementById("color").value;
    let stock = document.getElementById("stock").value;
    let size = document.getElementById("size").value;
    // console.log("FUNCTION", color, stock, size)
    if (color !== "" && stock !== "" && size !== "Size" && size !== "") {
      setProduct({
        ...product,
        color: product.color.concat(color),
        // size: product.size.concat(size),
        stock: product.stock.concat(stock)
      })
    }
  }

  const updateStock = (stock) => {
    let getStock = document.getElementById("stockUpdated").value;
    //hago un find para traerme el id
    //hago el dispatch para actualizar el stock
    //le paso al dispatch el id del stock y la cantidad a editar
    let stockFinded = productPreview.stock.find(prop => prop.colorName === stock.color && prop.sizeName === stock.size);
    dispatch(stockUpdated(stockFinded._id, { quantity: getStock }))
  }

  const deleteStock = (stock) => {
    //hago el dispatch para eliminar el stock
    //hago un find para traerme el id
    let stockFinded = productPreview.stock.find(prop => prop.colorName === stock.color && prop.sizeName === stock.size);
    dispatch(deleteProductStock(stockFinded._id))
  }
  // console.log("PRUEBA", product)
  const deleteColor = (e) => {
    let filterColor = [];
    let filterSize = [];
    let filterStock = [];
    let targetColor = e.target.innerText.split("-")[0];

    product.color.map((color, i) => {
      if (color !== targetColor) {
        filterColor.push(color);
        filterSize.push(product.size[i]);
        filterStock.push(product.stock[i]);
      }
    })

    setProduct({ ...product, color: filterColor, size: filterSize, stock: filterStock });
  }

  const deleteCateg = (e) => {
    let filterCategory = []
    selectedName.categoryName.map(cate => {
      if (cate.trim() !== e.target.innerText) {
        filterCategory.push(cate);
      }
    });
    setSelectedName({ categoryName: filterCategory })
  }

  const [selectedFile, setSelectedFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files);
    setImgUrl(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();

    //--------------------------------------------------------
    let extension;
    if (selectedFile && selectedFile.length > 0) {
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
    fd.append("id", product.id);
    fd.append("name", product.name);
    fd.append("genre", product.genre);
    fd.append("brand", product.brand);
    fd.append("categories", product.category);
    fd.append("description", product.description);
    fd.append("price", product.price);
    fd.append("size", product.size);
    fd.append("color", product.color);
    fd.append("stock", product.stock);

    const payload = { id: product.id, data: fd }

    dispatch(editProduct(payload, config));
    alert("Activity successfullty edited");
  };
  // console.log("CCCCC", productPreview)
  return (
    <div className="tracking-wide font-bold">
      <UniversalNavBar />

      <div className="grid grid-cols-2 gap-2 bg-gray-200 mt-20">
        <div className="flex items-center min-h-screen bg-gray-200 dark:bg-gray-900">
          <div className="container mx-auto">
            <div className="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-sm">
              <div className="text-center">
                <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
                  Edit Product
                </h1>
              </div>
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
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    />
                  </div>
                  <div className="mb-6">
                    <select id="selectColorName" onChange={(e) => handleStock(e)} className="mr-4">
                      <option>Select</option>
                      {
                        productPreview.stock && productPreview.stock.length > 0 &&
                        productPreview.stock.map((prop, id) => {
                          return <option key={id} >{prop.colorName}</option>
                        })
                      }
                    </select>
                    <select onChange={(e) => handleStock(e)} id="selectSizeName" className="mr-4">
                      <option>Select</option>
                      {
                        productPreview.stock && productPreview.stock.length > 0 &&
                        productPreview.stock.map((prop, id) => {
                          return <option key={id}>{prop.sizeName}</option>
                        })
                      }
                    </select>
                    <select onChange={(e) => handleStock(e)} id="selectStock" className="mr-2">
                      <option>Select</option>{
                        productPreview.stock && productPreview.stock.length > 0 &&
                        productPreview.stock.map((prop, id) => {
                          return <option key={id}>{prop.stock}</option>
                        })
                      } </select>
                    <button type="button" onClick={() => setEditStock(!editStock)} className="ml-2">Edit</button>
                    <button type="button" onClick={() => setNewStock(!newStock)} className="ml-2"> New</button>
                    {editStock && <div className="mt-6"><input id="stockUpdated" className="w-24 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" placeholder="Quantity" />
                      <button type="button" onClick={() => updateStock(stockUpdate)} className="ml-4 w-20 px-3 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none">Update</button>
                      <button type="button" onClick={() => deleteStock(stockUpdate)} className="ml-4 w-20 px-3 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none">Delete</button>
                    </div>}

                    {newStock && <div className="mt-4"><label
                      for="color"
                      className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      Stock
                    </label>
                      <input
                        id="color"
                        type="text"
                        name="color"
                        placeholder="Color"
                        // value={product.color}
                        // required
                        className="w-24 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                      />
                      <select className="ml-4" id="size" onChange={handleSelectSizes}>
                        <option>Size</option>
                        <option>XS</option>
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                        <option>XXL</option>
                      </select>
                      {/* <input id="size" placeholder="Size" className="w-20 px-3 py-2 ml-4 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" /> */}
                      <input id="stock" placeholder="Quantity" type="number" className="w-28 px-3 py-2 ml-4 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />

                      <button type="button" onClick={handleMultipleInput} className="ml-4">+</button></div>}<br />
                    {product.color && product.color.length > 0 &&
                      product.color.map((color, i) => {
                        return <p onClick={deleteColor} className="inline-block mr-2 mt-4 cursor-pointer rounded round bg-gray-200 mb-2 w-20 text-center" key={i}>{color}-{product.size[i]}-{product.stock[i]}</p>
                      })}
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
                  {/* genre end */}
                  <div className="mb-6">
                  </div>
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
                      // required
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md 
                                  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 
                                  dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 
                                  dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    />
                  </div>
                  <div className="mb-6">

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
                    // required
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
                    // required
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
                              <option key={id} value={c._id}>
                                {c.name}
                              </option>
                            );
                          })
                          : ""}
                      </select><br />
                      {selectedName.categoryName.length > 0 ? selectedName.categoryName.map((cate, key) => {
                        return <p onClick={deleteCateg} key={key} className="inline-block mr-2 rounded round bg-gray-200 mb-2 w-20 text-center">
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
                    <label className="label-select">
                      <input type="file" onChange={handleFileInputChange} multiple />
                    </label>
                  </div>

                  <div className="mb-6">
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                    >
                      Edit Product
                    </button>
                  </div>
                  <p className="text-base text-center text-gray-400" id="result"></p>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* CARD ORIGINAL*/}

        <div className="mt-40">
          <div className="bg-gray-200 dark:bg-gray-900">
            <div className="container mx-auto">
              <div className="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-</div>sm">
                <div className=" justify-center justify-items-center content-center items-center">
                  <div className="card flex justify-center">
                    <img
                      src={`http://localhost:3001/products/image/${productPreview.img}`}
                      alt="https://i.stack.imgur.com/y9DpT.jpg"
                      style={{ height: "200px", width: "250px" }}
                    />
                    <div className="bg-gray-200" style={{ height: "1px" }}></div>
                    <div className="p-4">
                      <p className="text-black">{productPreview.name}</p>
                      <p className="text-blue-300">${productPreview.price}</p>
                      <p className="text-blue-300">{productPreview.brand}</p>
                      <div>
                        {/* {productPreview.categories && productPreview.categories.length > 0 ?
                          productPreview.categories.map((category,key)=>
                          {return <p className="text-blue-300 bg-blue-50">{console.log("asdsad",category)}</p>}) :""} */}
                        {/* <p className="text-blue-300 bg-blue-50">{productPreview}</p> */}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
          {/* CARD DE PREVIZUALIZACION */}
          <div className="bg-gray-200 dark:bg-gray-900">
            <div className="container mx-auto">
              <div className="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-</div>sm">
                <div className=" justify-center justify-items-center content-center items-center">
                  <div className="card justify-center">
                    <div className="flex justify-center">
                      <img
                        src={imgUrl}
                        alt={imgUrl}
                        style={{ height: "200px", width: "250px" }}
                      />
                    </div>
                    <div className="bg-gray-200" style={{ height: "1px" }}></div>
                    <div className="p-4">
                      <p className="text-black">{product.name}</p>
                      <p className="text-black">{product.color}</p>
                      <p className="text-black">{product.stock}</p>
                      <p className="text-black">{product.size}</p>
                      <p className="text-black">{product.brand}</p>
                      <p className="text-black">{product.description}</p>
                      <p className="text-blue-300">${product.price}</p>
                      <div>
                        {/* {productPreview.categories && productPreview.categories.length > 0 ?
                          productPreview.categories.map((category,key)=>
                          {return <p className="text-blue-300 bg-blue-50">{console.log("asdsad",category)}</p>}) :""} */}
                        {/* <p className="text-blue-300 bg-blue-50">{productPreview}</p> */}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
          {/* FIN DE CARD DE PREVIZUALIZACION */}
        </div>

        {/* FIN DE CARD ORIGINAL */}

      </div>
      <Footer />
    </div>
  )
}

export default EditProduct;