import * as api from '../api/index.js';
import * as constants from "../constants";
//=============================================================================//
export const getAllProducts = (page,custom) => async (dispatch) => {
  dispatch({
    type: constants.GET_ALL_PRODUCTS,
  });
  return await api.getAllProducts(page,custom)
    .then((res) => {
      dispatch({
        type: constants.GET_PRODUCTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: constants.GET_PRODUCTS_ERROR,
        payload: err.response,
      });
    });
};
//=============================================================================//
export const searchProducts = (name) => async(dispatch) => {
    return await api.searchProducts(name)
      .then((res) => {
        dispatch({ 
          type: constants.SEARCH_PRODUCTS, 
          payload: res.data 
        });
    })

    .catch((error) => console.log(error));
}
//=============================================================================//
export const detailProduct = (id) => async(dispatch)=> {
  return await api.detailProduct(id)
  .then((res) => {
    dispatch({ 
      type: constants.DETAIL_PRODUCT, 
      payload: res.data 
    });
  })
  .catch((error) => {
    dispatch({
      type: constants.GET_PRODUCTS_ERROR,
      payload: error.payload
    })
  });
}
//=============================================================================//
export const addProducts = (body) => async (dispatch) => {
  dispatch({
    type: constants.ADD_PRODUCT,    
  });
  return await api.addProducts(body)
  .then((p) => {
    dispatch({
      type: constants.ADD_PRODUCT_SUCCESS,
      payload: p.data,
    });
  })
  .catch((err) => {
    dispatch({
      type: constants.ADD_PRODUCT_ERROR,
      payload: err.response,
    });
  });
};
//=============================================================================//
export const deleteProduct = (payload) => async(dispatch) => {
  return await api.deleteProduct(payload)
  .then(() => {
    dispatch({
      type: constants.DELETE_PRODUCT,
      payload
    })
  })
  .catch((error) => console.log(error))
}
//=============================================================================//
export const editProduct = (payload) => async(dispatch) => {
  return await api.editProduct(payload)
  .then((product) => {
    dispatch({
      type: constants.EDIT_PRODUCT,
      payload: product.data
    })
  })
  .catch((error) => console.log(error))
}
//=============================================================================//
export const stockUpdated = (id,quantity) => async(dispatch) => {
  return await api.editStock(id,quantity)
    .then((stock) => {
      dispatch({
        type: constants.EDIT_STOCK,
        payload: stock.data
      })
  })
  .catch((error) => console.log(error))
}
//=============================================================================//
export const deleteProductStock = (id) => async(dispatch) => {
  return await api.deleteStock(id)
  .then((stock) => {
      dispatch({
        type: constants.DELETE_STOCK,
        payload: stock.data
      })
  })
  .catch((error) => console.log(error))
}
//=============================================================================//
export const addProductDiscount = (productId, percentage, history, swal) => async(dispatch) => {
  dispatch({
    type: constants.ADD_PRODUCT_DISCOUNT
  })
  return await api.addProductDiscount(productId, percentage)
  .then((product) => {
    dispatch({
      type: constants.ADD_PRODUCT_DISCOUNT_SUCCESS,
      payload: product.data
    })
  })
  .then(async()=>{
    swal({
      title: "Done!",
      text: 'Discount Added to Product',
      icon: `success`
    })
  })
  .then(() => history.push(`/editDiscount/${productId}`))
  .catch((error) => {
    dispatch({
      type: constants.ADD_PRODUCT_DISCOUNT_ERROR,
      payload: error.response?.data
    })
    swal({
      title: 'Error',
      text: 'Discount couldn`t be added',
      icon: 'warning'
    })
  }) 
}
//=============================================================================//
export const removeProductDiscount = (productId, history, swal) => async(dispatch) => {
  dispatch({
    type: constants.REMOVE_PRODUCT_DISCOUNT
  })
  return await api.removeProductDiscount(productId)
  .then((product) => {
    dispatch({
      type: constants.REMOVE_PRODUCT_DISCOUNT_SUCCESS,
      payload: product.data
    })
  })
  .then(async()=>{
    swal({
      title: 'Done!',
      text: 'Discount removed from product',
      icon: 'info'
    })
  })
  .then(() => history.push(`/Admin`))
  .catch((error) => {
    dispatch({
      type: constants.REMOVE_PRODUCT_DISCOUNT_ERROR,
      payload: error.response?.data
    })
    swal({
      title: 'Error',
      text: 'Discount couldn`t be removed',
      icon: 'warning'
    })
  })
}
//=============================================================================//

//=============================================================================//