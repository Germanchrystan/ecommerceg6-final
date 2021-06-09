import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, deleteProduct, searchProducts } from "./../../redux/actions/products_actions";
import { Link, Redirect } from 'react-router-dom'
import swal from 'sweetalert';

const TableProduct = () => {
  const dispatch = useDispatch();

  const productsArray = useSelector(
    (state) => state.productsReducer.allProducts?.products
  );

  console.log("ppppp", productsArray)
  const [page, setPage] = useState(1)

  const next = () => {
    setPage(page + 1)

  }
  const prev = () => {
    setPage(page - 1)
  }

  useEffect(() => {
    dispatch(getAllProducts(page));
  }, [page]);

  const deleteC = (id) => {
    dispatch(deleteProduct(id))
    swal({
      title: "Deleted product",
      icon: "warning",
      buttons: false,
      dangerMode: true,
    })
    window.location.reload()
  }
  const [input, setInput] = useState({
    name: "",
  })

  function handleChange(e) {
    setInput({
      name: e.target.value
    })
  };

  function handleSubmit(e) {
    e.preventDefault()

    if (input.name) {
      dispatch(searchProducts(input.name))
    } else if (!input.name) {
      swal({
        title: "Search Not Valid",
        icon: "warning",
        button: true,
      })
    }


  }
  return (
    <div className="tracking-wide font-bold">
      <div className="mt-4 pt-20 mb-4 flex  justify-center">

        <div className="relative mr-6 my-2 ml-2 -mt-0.5">

          {/*   <button classNameName="bg-white" onClick={handleSubmit}>🔍</button> */}
          <div className="absolute pin-r pin-t mt-3 mr-4 text-purple-lighter">
            <svg version="1.1" className="h-4 text-dark" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 52.966 52.966" style={{ enableBackground: "new 0 0 52.966 52.966" }} xmlSpace="preserve">

            </svg>

          </div>
        </div>




      </div >

      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Product ID</th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Product</th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Prand</th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Color</th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Size</th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Stock</th>
            <th className="p-3 font-bold w-12 uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Image</th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {productsArray && productsArray.length > 0 ? productsArray.map((c, id) => {
            return <tr key={id} className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                {c._id}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                {c.name}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                {c.brand}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                {c.stock && c.stock.length > 0 &&
                  c.stock.map(prop => {
                    return <p>{prop.colorName}</p>
                  })}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                {c.stock && c.stock.length > 0 &&
                  c.stock.map(prop => {
                    return <p>{prop.sizeName}</p>
                  })}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                {c.stock && c.stock.length > 0 &&
                  c.stock.map(prop => {
                    return <p>{prop.stock}</p>
                  })}
              </td>
             
                <td className="p-2 mr-28 text-center border-r flex justify-center">

                  {c.img === undefined ? (
                    <div>loading</div>
                  ) : (
                    <img
                      src={`http://localhost:3001/products/image/${c.img}`}
                      alt="https://i.stack.imgur.com/y9DpT.jpg"
                      style={{ height: "100px", with: "150px", marginLeft:"120px", display:"flex",textAlign:"center",justifyContent: "center" }}
                    />

                  )}
                </td>
           
              <td className="  grid grid-cols-1  w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                <div className="flex gap-5 justify-center" >
                                            <button type="submit" title="Edit Product" class="flex text-white bg-indigo-500 border-0  mt-4 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" type="submit"><Link to={'/editProduct/' + c._id}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg></Link></button>
                                            <button onClick={() => deleteC(c._id)} title="Delete Product" class="flex text-white bg-red-500 border-0  mt-4 py-2 px-6 focus:outline-none hover:bg-red-700 rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" /></svg>
                                            </button>
                                        </div>
              
              </td>
            </tr>
          }) : ""}



        </tbody>
      </table>
      <br></br>
      <div className="flex justify-center">
        <button onClick={prev} disabled={page === 1} className="border border-teal-500 bg-teal-500 text-black block rounded-sm font-bold py-4 px-6 ml-2 flex items-center">
          <svg className="h-5 w-5 mr-2 fill-current" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-49 141 512 512" style={{ enableBackground: 'new -49 141 512 512' }} xmlSpace="preserve">
            <path id="XMLID_10_" d="M438,372H36.355l72.822-72.822c9.763-9.763,9.763-25.592,0-35.355c-9.763-9.764-25.593-9.762-35.355,0 l-115.5,115.5C-46.366,384.01-49,390.369-49,397s2.634,12.989,7.322,17.678l115.5,115.5c9.763,9.762,25.593,9.763,35.355,0 c9.763-9.763,9.763-25.592,0-35.355L36.355,422H438c13.808,0,25-11.193,25-25S451.808,372,438,372z"></path>
          </svg>
                                     Previous page
                             </button>
        <button onClick={next} disabled={productsArray && productsArray.length < 15} className="border border-teal-500 bg-teal-500 text-black block rounded-sm font-bold py-4 px-6 ml-2 flex items-center" >
          Next page
                            <svg className="h-5 w-5 ml-2 fill-current" clasversion="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="-49 141 512 512" style={{ enableBackground: 'new -49 141 512 512' }} xmlSpace="preserve">
            <path id="XMLID_11_" d="M-24,422h401.645l-72.822,72.822c-9.763,9.763-9.763,25.592,0,35.355c9.763,9.764,25.593,9.762,35.355,0
            l115.5-115.5C460.366,409.989,463,403.63,463,397s-2.634-12.989-7.322-17.678l-115.5-115.5c-9.763-9.762-25.593-9.763-35.355,0
            c-9.763,9.763-9.763,25.592,0,35.355l72.822,72.822H-24c-13.808,0-25,11.193-25,25S-37.808,422-24,422z"/>
          </svg>
        </button>
      </div>
    </div >
  )
}

export default TableProduct;
