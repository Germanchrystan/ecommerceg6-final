import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import './filterBar.css';
import { filterByBrand, filterByName, filterByPrice, filterBySize } from "../../redux/actions/filters_actions";
import { getCategories } from '../../redux/actions/category_actions';
import { getAllProducts } from "../../redux/actions/products_actions";


function FilterBar() {
  const dispatch = useDispatch();
  const [filterName, setFilterName] = React.useState({ brand: "", size: "", genre: "", price: "", category: "" });
  const [filter, setFilter] = React.useState(null);
  const [applyFilter, setApplyFilter] = React.useState(false);
  const [arrayBrand, setArrayBrand] = React.useState([]);
  const categoryArray = useSelector(
    (state) => state.categoriesReducer.categories.list.categories
  );
  let productsArray = useSelector((state) => state.productsReducer.allProducts);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  console.log("ASDSADSAD",user)
  useEffect(() => {
    dispatch(getCategories())
    brandArray()
  }, [filterName])


  function handleOnClick(e) {
    setFilterName({ ...filterName, [e.target.id]: e.target.innerText });
    setFilter(e.target.id);

    console.log("zxczxczxc", filterName)
  }
  //me filtra el array y me deja los brand sin repetir
  function brandArray() {
    let array = [];
    if (productsArray.products) {
      productsArray.products.map(prop => {
        if (!array.includes(prop.brand)) {
          array.push(prop.brand);
        }
      })
    }
    setArrayBrand(array);
  }
  console.log(arrayBrand)
  function handleSubmit() {
    dispatch(filterByBrand(filterName))

  }
  
  return (
    <div>


      <div className="grid grid-cols-3 grid-rows-1 w-80 bg-gray-200 tracking-wide font-bold pt-4 pb-4 gap-4 justify-center">

        < div className="group inline-block mt-4 cursor-pointer" >
          <button
            className="outline-none focus:outline-none border px-3 py-1  bg-white rounded-sm flex items-center min-w-32"
          >
            <span className="pr-1 font-semibold flex-1">Filters</span>
            <span>
              <svg
                className="fill-current h-4 w-4 transform group-hover:-rotate-180
        transition duration-150 ease-in-out"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </span>
          </button>
          {/* primer filtro Talle */}
          <ul
            className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
  transition duration-150 ease-in-out origin-top min-w-32"
          >
            <li className="rounded-sm relative px-3 py-1 hover:bg-gray-100">
              <button
                className="w-full text-left flex items-center outline-none focus:outline-none"
              >
                <span className="pr-1 flex-1">Size</span>
                <span className="mr-auto">
                  <svg
                    className="fill-current h-4 w-4
            transition duration-150 ease-in-out"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                  </svg>
                </span>
              </button>
              <ul
                className="bg-white border rounded-sm absolute top-0 right-0 
  transition duration-150 ease-in-out origin-top-left
  min-w-32
  "
              >
                {/* <a href = {`/filter-by-size/${filterName}`}> */}
                <li className="rounded-sm relative px-3 py-1 hover:bg-gray-100">
                  <button
                    className="w-full text-left flex items-center outline-none focus:outline-none"
                  >

                    <span onClick={handleOnClick} name="size" id="size" className="pr-1 flex-1">Small</span>
                    <span className="mr-auto">
                    </span>
                  </button>
                </li>

                <li onClick={handleOnClick} id="size" name="size" className="px-3 py-1 hover:bg-gray-100">Medium</li>
                <li onClick={handleOnClick} id="size" name="size" className="px-3 py-1 hover:bg-gray-100">Large</li>

                {/* </a> */}
              </ul>
            </li>

            {/* segundo filtro Brand */}
            <li className="rounded-sm relative px-3 py-1 hover:bg-gray-100">
              <button
                className="w-full text-left flex items-center outline-none focus:outline-none"
              >
                <span className="pr-1 flex-1">Brand</span>
                <span className="mr-auto">
                  <svg
                    className="fill-current h-4 w-4
            transition duration-150 ease-in-out"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                  </svg>
                </span>
              </button>
              <ul
                className="bg-white border rounded-sm absolute top-0 right-0 
              transition duration-150 ease-in-out origin-top-left
              min-w-32">
                {/* <a href = {`/filter-by-stock/${filterName}`}> */}
                {/* { productsArray.products && productsArray.products.length > 0 && productsArray.products.map(prop => {
                return <li onClick={handleOnClick} id="brand" name="brand" className="px-3 py-1 hover:bg-gray-100">{prop.brand}</li>
              })
              } */}
                <li className="rounded-sm relative px-3 py-1 hover:bg-gray-100">
                  <button
                    className="w-full text-left flex items-center outline-none focus:outline-none">

                    <span onClick={handleOnClick} id="brand" name="brand" className="pr-1 flex-1 ">Adidas</span>
                    <span className="mr-auto">
                    </span>
                  </button>
                </li>
                <li onClick={handleOnClick} id="brand" name="brand" className="px-3 py-1 hover:bg-gray-100">Puma</li>
                <li onClick={handleOnClick} id="brand" name="brand" className="px-3 py-1 hover:bg-gray-100">Nike</li>
                <li onClick={handleOnClick} id="brand" name="brand" className="px-3 py-1 hover:bg-gray-100">Umbro</li>
              </ul>
            </li>
            {/* Tercer filtro Genero */}
            <li className="rounded-sm relative px-3 py-1 hover:bg-gray-100">
              <button
                className="w-full text-left flex items-center outline-none focus:outline-none"
              >
                <span className="pr-1 flex-1">Genre</span>
                <span className="mr-auto">
                  <svg
                    className="fill-current h-4 w-4
            transition duration-150 ease-in-out"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                  </svg>
                </span>
              </button>
              <ul
                className="bg-white border rounded-sm absolute top-0 right-0 
              transition duration-150 ease-in-out origin-top-left
              min-w-32">
                {/* <a href = {`/filter-by-genre/${filterName}`}> */}
                <li className="rounded-sm relative px-3 py-1 hover:bg-gray-100">
                  <button
                    className="w-full text-left flex items-center outline-none focus:outline-none"
                  >
                    <span onClick={handleOnClick} id="genre" className="pr-1 flex-1">Men</span>
                    <span className="mr-auto">
                    </span>
                  </button>
                </li>
                <li onClick={handleOnClick} id="genre" className="px-3 py-1 hover:bg-gray-100">Woman</li>
                <li onClick={handleOnClick} id="genre" className="px-3 py-1 hover:bg-gray-100">Unisex</li>
                <li onClick={handleOnClick} id="genre" className="px-3 py-1 hover:bg-gray-100">Boys</li>
                <li onClick={handleOnClick} id="genre" className="px-3 py-1 hover:bg-gray-100">Girls</li>
                {/* </a> */}
              </ul>
            </li>

            {/* cuarto filtro Precio */}
            <li className="rounded-sm relative px-3 py-1 hover:bg-gray-100">
              <button
                className="w-full text-left flex items-center outline-none focus:outline-none"
              >
                <span className="pr-1 flex-1">Price</span>
                <span className="mr-auto">
                  <svg
                    className="fill-current h-4 w-4
            transition duration-150 ease-in-out"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                  </svg>
                </span>
              </button>
              <ul
                className="bg-white border rounded-sm absolute top-0 right-0 
                transition duration-150 ease-in-out origin-top-left
                min-w-32
                ">
                <li onClick={handleOnClick} id="price" name="price" className="px-3 py-1 hover:bg-gray-100">ASC</li>
                <li onClick={handleOnClick} id="price" name="price" className="px-3 py-1 hover:bg-gray-100">DESC</li>

              </ul>
            </li>
            <li className="rounded-sm relative px-3 py-1 hover:bg-gray-100">
              <button
                className="w-full text-left flex items-center outline-none focus:outline-none"
              >
                <span className="pr-1 flex-1">Category</span>
                <span className="mr-auto">
                  <svg
                    className="fill-current h-4 w-4
            transition duration-150 ease-in-out"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                  </svg>
                </span>
              </button>
              <ul
                className="bg-white border rounded-sm absolute top-0 right-0 
  transition duration-150 ease-in-out origin-top-left
  min-w-32
  "
              >
                <li className="rounded-sm relative px-3 py-1 hover:bg-gray-100">
                  <button
                    className="w-full text-left flex items-center outline-none focus:outline-none"
                  >

                    <span className="mr-auto">
                    </span>
                  </button>
                </li>
                {(categoryArray && categoryArray.length > 0) ?
                  categoryArray.map(category => {
                    return <li onClick={handleOnClick} id="category" className="flex flex-col cursor-pointer px-3 py-1 hover:bg-gray-100">{category.name}</li>
                  }) : ""}

              </ul>
            </li>


          </ul>
        </div >
        {/* arreglar */}
        <div className="">
          <button onClick={handleSubmit} className="w-42 h-10 mt-2 inline-block px-6 ml-6 h-11 py-0 text-xs font-medium leading-6 text-center text-white uppercase transition bg-green-500 rounded shadow ripple hover:shadow-lg hover:bg-green-600 focus:outline-none">Apply Filter</button>
        </div>
        {window.location.pathname === "/custom" ? (
          <div className="">
            <button onClick={() => window.location.replace("/shop")} className="w-42 h-10 mt-2 inline-block px-6 ml-2 h-11 py-0 text-xs font-medium leading-6 text-center text-white uppercase transition bg-indigo-500 rounded shadow ripple hover:shadow-lg hover:bg-indigo-600 focus:outline-none">Store</button>
          </div>) :(user !== null)? (<div className="">
            <button onClick={() => window.location.replace("/custom")} className="w-42 h-10 mt-2 inline-block px-6 ml-2 h-11 py-0 text-xs font-medium leading-6 text-center text-white uppercase transition bg-indigo-500 rounded shadow ripple hover:shadow-lg hover:bg-indigo-600 focus:outline-none">Custom Made</button>
          </div>):""}
      </div >
      <div className="grid grid-cols-5 gap-1">
        {filterName.size && <p onClick={() => setFilterName({ ...filterName, size: "" })} className=" inline-block  mt-2  cursor-pointer rounded round border-4 border-red-400 mb-2 ">{filterName.size}</p>}
        {filterName.brand && <p onClick={() => setFilterName({ ...filterName, brand: "" })} className=" inline-block  mt-2  cursor-pointer rounded round border-4 border-red-400 mb-2 ">{filterName.brand}</p>}
        {filterName.genre && <p onClick={() => setFilterName({ ...filterName, genre: "" })} className=" inline-block  mt-2  cursor-pointer rounded round border-4 border-red-400 mb-2 ">{filterName.genre}</p>}
        {filterName.price && <p onClick={() => setFilterName({ ...filterName, price: "" })} className=" inline-block  mt-2  cursor-pointer rounded round border-4 border-red-400 mb-2 ">{filterName.price}</p>}
        {filterName.category && <p onClick={() => setFilterName({ ...filterName, category: "" })} className=" inline-block  mt-2  cursor-pointer rounded round border-4 border-red-400 mb-2 ">{filterName.category}</p>}
      </div>
    </div>
  )
}

export default FilterBar;
