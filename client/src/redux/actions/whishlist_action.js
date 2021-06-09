import * as api from '../api/index.js';
import {
    GET_WHISHLIST,
    GET_WHISHLIST_SUCCESS,
    GET_WHISHLIST_ERROR,
    ADD_PRODUCT_TO_WHISHLIST, ADD_PRODUCT_TO_WHISHLIST_SUCCESS, ADD_PRODUCT_TO_WHISHLIST_ERROR,
    REMOVE_PRODUCT_FROM_WHISHLIST, REMOVE_PRODUCT_FROM_WHISHLIST_SUCCESS, REMOVE_PRODUCT_FROM_WHISHLIST_ERROR,
    TOGGLE_PRODUCT_IN_WHISHLIST, TOGGLE_PRODUCT_IN_WHISHLIST_SUCCESS, TOGGLE_PRODUCT_IN_WHISHLIST_ERROR,
    IS_PRODUCT_IN_WHISHLIST, IS_PRODUCT_IN_WHISHLIST_SUCCESS, IS_PRODUCT_IN_WHISHLIST_ERROR
} from '../constants';
//=============================================//
export const getOrCreateWhishlistFromUser = (userId) => async(dispatch) => {
    dispatch({
        type: GET_WHISHLIST,
    })
    return await api.getOrCreateWhishlistFromUser(userId).
    then((whishlist) => {
        dispatch({
            type: GET_WHISHLIST_SUCCESS,
            payload: whishlist.data
        })
        localStorage.setItem('whishlist', JSON.stringify(whishlist.data))
    })
    .catch((error) => {
        dispatch({
            type: GET_WHISHLIST_ERROR,
            payload: error.response?.data
        })
    })
}
//=============================================//
export const addProductToWhishlist = (userId, productId) => async(dispatch) => {
    dispatch({
        type: ADD_PRODUCT_TO_WHISHLIST,
    })
    return await api.addProductToWhishlist(userId, productId)
    .then((whishlist) => {
        dispatch({
            type: ADD_PRODUCT_TO_WHISHLIST_SUCCESS,
            payload: whishlist.data
        })
        localStorage.setItem('whishlist', JSON.stringify(whishlist.data))
    })
    .catch((error) => {
        dispatch({
            type: ADD_PRODUCT_TO_WHISHLIST_ERROR,
            payload: error.response?.data
        })
    })
}
//=============================================//
export const removeProductFromWhishlist = (userId, productId, swal, history) => async(dispatch) => {
    dispatch({
        type: REMOVE_PRODUCT_FROM_WHISHLIST    
    })
    return await api.removeProducFromWhishlist(userId, productId)
    .then((whishlist) => {
        dispatch({
            type: REMOVE_PRODUCT_FROM_WHISHLIST_SUCCESS,
            payload: whishlist.data
        })
        localStorage.setItem('whishlist', JSON.stringify(whishlist.data))
    })
    .then(async()=> {
        swal({
            title: "Done!",
            text: 'Product removed from your Whishlist',
            icon: `info`
        })
    })
    .then(() => history.push(`/whishlist/${userId}`))
    .catch((error) => {
        dispatch({
            type: REMOVE_PRODUCT_FROM_WHISHLIST_ERROR,
            payload: error.response?.data
        })
    })
}
//=============================================//
export const toggleProductFromWhishlist = (userId, productId, history) => async(dispatch) => {
    dispatch({
        type: TOGGLE_PRODUCT_IN_WHISHLIST
    })
    return await api.toggleProductFromWhishlist(userId,productId)
    .then((result) => {
        dispatch({
            type: TOGGLE_PRODUCT_IN_WHISHLIST_SUCCESS,
            payload: result.data
        })
        localStorage.setItem('whishlist', JSON.stringify(result.data))
    })
    .then(()=>history.push(`/product/${productId}`))
    .catch((error) => {
        console.log(error)
        dispatch({
            type: TOGGLE_PRODUCT_IN_WHISHLIST_ERROR,
            payload: error.response?.data
        })
    })
}
//=============================================//
export const isProductInWhishlist = (userId, productId) => async(dispatch) => {
    dispatch({
        type: IS_PRODUCT_IN_WHISHLIST
    })
    return await api.isProductInWhishlist(userId, productId)
    .then((result)=> {
        dispatch({
            type: IS_PRODUCT_IN_WHISHLIST_SUCCESS,
            payload: result.data
        })
    }).catch((error)=> {
        dispatch({
            type: IS_PRODUCT_IN_WHISHLIST_ERROR,
            payload: error.response?.data
        })
    })
}
//=============================================//